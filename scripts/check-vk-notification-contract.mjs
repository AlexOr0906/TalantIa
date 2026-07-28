import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const source = readFileSync(
  new URL('../public/api/lead.php', import.meta.url),
  'utf8',
);
const configExample = readFileSync(
  new URL('../deployment/lead-config.example.php', import.meta.url),
  'utf8',
);

const required = [
  "($config['vk_enabled'] ?? false) !== true",
  "preg_match('/^\\d+\\.\\d+$/D', $apiVersion)",
  "!is_int($peerId) || $peerId <= 0",
  "hash('sha256', $submissionId . ':' . $peerId)",
  "'peer_id' => $peerId",
  "'random_id' => vk_random_id($submissionId, $peerId)",
  "json_decode($responseBody, true, 16, JSON_THROW_ON_ERROR)",
  "array_key_exists('response', $response)",
  "is_int($response['error']['error_code'] ?? null)",
  "Удобный способ связи: ",
];

const forbidden = [
  'VK_GROUP_ACCESS_TOKEN=',
  'Authorization: Bearer',
  'CURLOPT_FOLLOWLOCATION',
  'HTTP_IDEMPOTENCY_KEY]',
  "error_log($responseBody)",
  "error_log($vkConfig",
  "error_log($peerId",
  "error_log($message",
];

const failures = [
  ...required
    .filter((fragment) => !source.includes(fragment))
    .map((fragment) => `Не найден обязательный фрагмент VK-контракта: ${fragment}`),
  ...forbidden
    .filter((fragment) => source.includes(fragment))
    .map((fragment) => `Найден запрещённый фрагмент VK-контракта: ${fragment}`),
];

for (const fragment of [
  "'vk_enabled' => false",
  "'vk_group_token' => 'VK_GROUP_ACCESS_TOKEN'",
  "'vk_peer_ids' => [",
  "'vk_api_version' => '5.199'",
]) {
  if (!configExample.includes(fragment)) {
    failures.push(`Не найден обязательный фрагмент примера конфигурации: ${fragment}`);
  }
}

function randomId(submissionId, peerId) {
  const hex = createHash('sha256')
    .update(`${submissionId}:${peerId}`)
    .digest('hex')
    .slice(0, 8);
  const value = Number.parseInt(hex, 16) & 0x7fffffff;
  return value === 0 ? 1 : value;
}

const hashes = [
  ['submission-a', 101],
  ['submission-a', 202],
  ['submission-b', 101],
].map(([submissionId, peerId]) => randomId(submissionId, peerId));

if (new Set(hashes).size !== hashes.length) {
  failures.push('Тестовые пары submissionId/peer_id должны различаться.');
}
if (randomId('submission-a', 101) !== randomId('submission-a', 101)) {
  failures.push('Одинаковая пара submissionId/peer_id должна давать одинаковый random_id.');
}
if (hashes.some((value) => value < 1 || value > 0x7fffffff)) {
  failures.push('random_id должен быть положительным 31-битным целым числом.');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('VK notification contract: OK');
