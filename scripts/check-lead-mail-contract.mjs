import { readFileSync } from 'node:fs';

const source = readFileSync(
  new URL('../public/api/lead.php', import.meta.url),
  'utf8',
);

const requiredFragments = [
  "function is_safe_sender_address(string $email): bool",
  "preg_match('/[\\r\\n]/', $recipient) === 1",
  "'From: ' . $sender",
  "'Content-Type: text/plain; charset=UTF-8'",
  '$headerBlock = implode("\\r\\n", $headers);',
  '$messageBody = implode("\\r\\n", $messageLines);',
  "$sendmailParameters = '-f' . $sender;",
  'mb_encode_mimeheader($subject',
];

const forbiddenFragments = [
  "'From: ' . $siteName",
  "'Content-Transfer-Encoding: 8bit'",
  "'X-Mailer:",
  'implode(PHP_EOL, $messageLines)',
  'mail($recipient, $encodedSubject, $messageBody, $headers',
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

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Lead mail contract: OK');
