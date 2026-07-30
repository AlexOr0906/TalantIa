import { readFileSync } from 'node:fs';

const source = readFileSync(
  new URL('../public/api/lead.php', import.meta.url),
  'utf8',
);

const requiredFragments = [
  "function is_safe_sender_address(string $email): bool",
  '$configPath = dirname(__DIR__)',
  "error_log('[lead] configuration could not be loaded');",
  "error_log('[lead] mail transport exception');",
  "error_log('[lead] mail transport failed');",
  'function normalize_vk_configuration(array $config): ?array',
  'function vk_random_id(string $submissionId, int $peerId): int',
  'function send_vk_notification(',
  "curl_init('https://api.vk.com/method/messages.send')",
  "'access_token' => $vkConfig['token']",
  'CURLOPT_CONNECTTIMEOUT => 3',
  'CURLOPT_TIMEOUT => 5',
  'CURLOPT_SSL_VERIFYPEER => true',
  'CURLOPT_SSL_VERIFYHOST => 2',
  "error_log('[lead] vk delivery unavailable');",
  "error_log('[lead] vk delivery failed');",
  "error_log('[lead] vk configuration invalid');",
  "preg_match('/[\\r\\n]/', $recipient) === 1",
  "'From: ' . $sender",
  "'Content-Type: text/plain; charset=UTF-8'",
  '$headerBlock = implode("\\r\\n", $headers);',
  '$messageBody = implode("\\r\\n", $messageLines);',
  "$sendmailParameters = '-f' . $sender;",
  'mb_encode_mimeheader($subject',
  "['phone', 'max']",
  "'max' => 'MAX'",
];

const forbiddenFragments = [
  'dirname(__DIR__, 2)',
  'getMessage()',
  'getTrace',
  'var_dump(',
  'print_r(',
  'display_errors',
  'CURLOPT_SSL_VERIFYPEER => false',
  'CURLOPT_SSL_VERIFYHOST => 0',
  'api.vk.com/method/messages.send?',
  "'peer_id='",
  "'From: ' . $siteName",
  "'Content-Transfer-Encoding: 8bit'",
  "'X-Mailer:",
  'implode(PHP_EOL, $messageLines)',
  'mail($recipient, $encodedSubject, $messageBody, $headers',
  "'telegram'",
  'Telegram',
];

const failures = [
  ...requiredFragments
    .filter((fragment) => !source.includes(fragment))
    .map((fragment) => `Не найден обязательный фрагмент: ${fragment}`),
  ...forbiddenFragments
    .filter((fragment) => source.includes(fragment))
    .map((fragment) => `Найден запрещённый фрагмент: ${fragment}`),
];

const mailCall = source.match(/mail\(\s*([\s\S]*?)\s*\);/);
if (!mailCall || !mailCall[1].includes('$sendmailParameters')) {
  failures.push('mail() должен получать безопасный envelope sender пятым аргументом.');
}

const mailFailurePosition = source.indexOf("if (!$sent)");
const acceptedPosition = source.indexOf("$sentIds[$idHash] = $now;");
const vkDeliveryPosition = source.indexOf('send_vk_notification(',
  source.indexOf('respond(200'));

if (
  mailFailurePosition < 0
  || acceptedPosition < mailFailurePosition
  || vkDeliveryPosition < acceptedPosition
) {
  failures.push(
    'VK должен запускаться только после успешного email и фиксации submissionId.',
  );
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Lead mail contract: OK');
