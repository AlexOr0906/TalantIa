<?php

declare(strict_types=1);

const MAX_BODY_BYTES = 16384;
const MIN_FILL_TIME_MS = 2500;
const MAX_FILL_TIME_MS = 86400000;
const RATE_LIMIT_WINDOW_SECONDS = 600;
const RATE_LIMIT_MAX_REQUESTS = 3;

date_default_timezone_set('Asia/Yekaterinburg');

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

function respond(int $status, string $message, bool $ok = false): void
{
    http_response_code($status);
    echo json_encode(
        ['ok' => $ok, 'message' => $message],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

function clean_text($value, int $maxLength): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = preg_replace('/[\x00-\x1F\x7F-\x9F]/u', ' ', $value) ?? '';
    $value = preg_replace('/\s+/u', ' ', trim($value)) ?? '';

    return function_exists('mb_substr')
        ? mb_substr($value, 0, $maxLength, 'UTF-8')
        : substr($value, 0, $maxLength);
}

function normalize_phone($value): ?string
{
    if (!is_string($value)) {
        return null;
    }

    $digits = preg_replace('/\D+/', '', $value) ?? '';
    if (strlen($digits) === 10) {
        $digits = '7' . $digits;
    } elseif (strlen($digits) === 11 && $digits[0] === '8') {
        $digits = '7' . substr($digits, 1);
    }

    return strlen($digits) === 11 && $digits[0] === '7'
        ? '+7' . substr($digits, 1)
        : null;
}

function is_safe_sender_address(string $email): bool
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false
        && preg_match('/[\r\n]/', $email) !== 1
        && preg_match(
            '/^[A-Za-z0-9][A-Za-z0-9._+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/D',
            $email
        ) === 1;
}

function request_matches_current_host(): bool
{
    $host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
    $source = (string) ($_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '');

    if ($host === '' || $source === '') {
        return false;
    }

    $sourceHost = strtolower((string) parse_url($source, PHP_URL_HOST));
    $sourcePort = parse_url($source, PHP_URL_PORT);
    $serverHost = strtolower((string) parse_url('http://' . $host, PHP_URL_HOST));
    $serverPort = parse_url('http://' . $host, PHP_URL_PORT);
    $scheme = strtolower((string) parse_url($source, PHP_URL_SCHEME));

    return in_array($scheme, ['http', 'https'], true)
        && $sourceHost !== ''
        && hash_equals($serverHost, $sourceHost)
        && $sourcePort === $serverPort;
}

function start_rate_limit_session(): void
{
    session_name('talantiya_lead');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'httponly' => true,
        'samesite' => 'Strict',
    ]);

    if (!session_start()) {
        respond(503, 'Онлайн-отправка временно недоступна. Пожалуйста, позвоните нам.');
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, 'Метод запроса не поддерживается.');
}

$contentType = strtolower(trim(explode(';', (string) ($_SERVER['CONTENT_TYPE'] ?? ''))[0]));
if ($contentType !== 'application/json') {
    respond(415, 'Ожидается запрос в формате JSON.');
}

if (!request_matches_current_host()) {
    respond(403, 'Запрос отклонён.');
}

$declaredLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($declaredLength > MAX_BODY_BYTES) {
    respond(413, 'Запрос слишком большой.');
}

$rawBody = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($rawBody === false || strlen($rawBody) > MAX_BODY_BYTES) {
    respond(413, 'Запрос слишком большой.');
}

try {
    $payload = json_decode($rawBody, true, 32, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond(400, 'Некорректный формат запроса.');
}

if (!is_array($payload)) {
    respond(400, 'Некорректный формат запроса.');
}

$honeypot = clean_text($payload['company'] ?? '', 100);
if ($honeypot !== '') {
    respond(200, 'Заявка принята.', true);
}

$startedAt = $payload['startedAt'] ?? null;
$startedAt = is_int($startedAt) || is_float($startedAt) || (is_string($startedAt) && ctype_digit($startedAt))
    ? (int) $startedAt
    : 0;
$elapsedMs = (int) floor(microtime(true) * 1000) - $startedAt;
if ($startedAt <= 0 || $elapsedMs < MIN_FILL_TIME_MS || $elapsedMs > MAX_FILL_TIME_MS) {
    respond(400, 'Не удалось проверить форму. Пожалуйста, заполните её ещё раз.');
}

$name = clean_text($payload['name'] ?? '', 100);
$phone = normalize_phone($payload['phone'] ?? null);
$interest = clean_text($payload['interest'] ?? '', 160);
$contactMethod = clean_text($payload['contactMethod'] ?? '', 20);
$page = clean_text($payload['page'] ?? '/', 200);
$consent = ($payload['consent'] ?? false) === true;
$submissionId = clean_text(
    $_SERVER['HTTP_IDEMPOTENCY_KEY'] ?? $payload['submissionId'] ?? '',
    128
);

if ($phone === null) {
    respond(422, 'Проверьте номер телефона.');
}
if (!$consent) {
    respond(422, 'Необходимо согласие на обработку персональных данных.');
}
if ($contactMethod !== '' && !in_array($contactMethod, ['phone', 'telegram'], true)) {
    respond(422, 'Некорректный способ связи.');
}
if ($submissionId === '' || !preg_match('/^[A-Za-z0-9._-]{8,128}$/', $submissionId)) {
    respond(400, 'Некорректный идентификатор запроса.');
}
if (substr($page, 0, 1) !== '/' || substr($page, 0, 2) === '//') {
    $page = '/';
}

start_rate_limit_session();

$now = time();
$attempts = array_values(array_filter(
    is_array($_SESSION['lead_attempts'] ?? null) ? $_SESSION['lead_attempts'] : [],
    static fn ($timestamp): bool => is_int($timestamp)
        && $timestamp > $now - RATE_LIMIT_WINDOW_SECONDS
));

if (count($attempts) >= RATE_LIMIT_MAX_REQUESTS) {
    session_write_close();
    header('Retry-After: ' . RATE_LIMIT_WINDOW_SECONDS);
    respond(429, 'Слишком много попыток. Пожалуйста, попробуйте позже или позвоните нам.');
}

$sentIds = is_array($_SESSION['lead_sent_ids'] ?? null) ? $_SESSION['lead_sent_ids'] : [];
$idHash = hash('sha256', $submissionId);
if (isset($sentIds[$idHash]) && is_int($sentIds[$idHash]) && $sentIds[$idHash] > $now - 86400) {
    session_write_close();
    respond(200, 'Заявка уже была принята.', true);
}

$attempts[] = $now;
$_SESSION['lead_attempts'] = $attempts;
session_write_close();

$configPath = dirname(__DIR__)
    . DIRECTORY_SEPARATOR . 'private'
    . DIRECTORY_SEPARATOR . 'lead-config.php';

if (!is_readable($configPath)) {
    error_log('[lead] configuration unavailable');
    respond(503, 'Онлайн-отправка временно недоступна. Пожалуйста, позвоните нам.');
}

try {
    $config = require $configPath;
} catch (Throwable) {
    error_log('[lead] configuration could not be loaded');
    respond(503, 'Онлайн-отправка временно недоступна. Пожалуйста, позвоните нам.');
}

$recipient = is_array($config) ? (string) ($config['recipient_email'] ?? '') : '';
$sender = is_array($config) ? (string) ($config['sender_email'] ?? '') : '';
$siteName = is_array($config) ? clean_text($config['site_name'] ?? 'ТАЛАНТиЯ', 80) : '';

if (
    filter_var($recipient, FILTER_VALIDATE_EMAIL) === false
    || preg_match('/[\r\n]/', $recipient) === 1
    || !is_safe_sender_address($sender)
    || $siteName === ''
) {
    error_log('[lead] configuration is invalid');
    respond(503, 'Онлайн-отправка временно недоступна. Пожалуйста, позвоните нам.');
}

$contactLabels = [
    'phone' => 'Телефон',
    'telegram' => 'Telegram',
    '' => 'Не указан',
];

$messageLines = [
    'Новая заявка с сайта «' . $siteName . '»',
    '',
    'Имя: ' . ($name !== '' ? $name : 'Не указано'),
    'Телефон: ' . $phone,
    'Направление: ' . ($interest !== '' ? $interest : 'Не указано'),
    'Способ связи: ' . $contactLabels[$contactMethod],
    'Страница отправки: ' . $page,
    'Дата и время: ' . date('d.m.Y H:i:s') . ' (Челябинск)',
];

$subject = 'Новая заявка с сайта «ТАЛАНТиЯ»';
$encodedSubject = function_exists('mb_encode_mimeheader')
    ? mb_encode_mimeheader($subject, 'UTF-8', 'B', "\r\n")
    : '=?UTF-8?B?' . base64_encode($subject) . '?=';
$headers = [
    'From: ' . $sender,
    'Content-Type: text/plain; charset=UTF-8',
];
$headerBlock = implode("\r\n", $headers);
$messageBody = implode("\r\n", $messageLines);
$sendmailParameters = '-f' . $sender;

try {
    $sent = mail(
        $recipient,
        $encodedSubject,
        $messageBody,
        $headerBlock,
        $sendmailParameters
    );
} catch (Throwable) {
    error_log('[lead] mail transport exception');
    $sent = false;
}

if (!$sent) {
    error_log('[lead] mail transport failed');
    respond(503, 'Не удалось отправить заявку. Пожалуйста, позвоните нам.');
}

start_rate_limit_session();
$sentIds = is_array($_SESSION['lead_sent_ids'] ?? null) ? $_SESSION['lead_sent_ids'] : [];
$sentIds = array_filter(
    $sentIds,
    static fn ($timestamp): bool => is_int($timestamp) && $timestamp > $now - 86400
);
$sentIds[$idHash] = $now;
$_SESSION['lead_sent_ids'] = $sentIds;
session_write_close();

respond(200, 'Заявка принята.', true);
