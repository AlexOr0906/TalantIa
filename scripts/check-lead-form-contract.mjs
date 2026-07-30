import { readFileSync } from 'node:fs';

const formSource = readFileSync(
  new URL('../src/components/LeadFormModal.astro', import.meta.url),
  'utf8',
);
const endpointSource = readFileSync(
  new URL('../public/api/lead.php', import.meta.url),
  'utf8',
);

const required = [
  'type ContactMethod = \'phone\' | \'max\'',
  'value="phone"',
  'value="max"',
  'MAX',
  'placeholder="+7 ___ ___-**-**"',
  'name="childAge"',
  'Возраст ребёнка',
  "childAge: childAgeInput?.value.trim() ?? ''",
  "$childAge = clean_text($payload['childAge'] ?? '', 30);",
  "'Возраст ребёнка: ' . ($childAge !== '' ? $childAge : 'Не указан')",
  "selectedContactMethod === 'max' ? 'max' : 'phone'",
  'responseData?.ok !== true',
  "setResult('success'",
  'form.reset();',
  "setResult('error'",
  "['phone', 'max']",
  "'max' => 'MAX'",
];

const forbidden = [
  'value="telegram"',
  'Telegram',
  "'telegram'",
  '+7 999 123-45-67',
  'type="password"',
];

const combinedSource = `${formSource}\n${endpointSource}`;
const failures = [
  ...required
    .filter((fragment) => !combinedSource.includes(fragment))
    .map((fragment) => `Не найден обязательный фрагмент формы: ${fragment}`),
  ...forbidden
    .filter((fragment) => combinedSource.includes(fragment))
    .map((fragment) => `Найден запрещённый фрагмент формы: ${fragment}`),
];

const resetPosition = formSource.indexOf('form.reset();');
const successPosition = formSource.indexOf("setResult('success'");
const errorPosition = formSource.indexOf("setResult('error'");

if (resetPosition < successPosition || resetPosition > errorPosition) {
  failures.push('Форма должна очищаться только после подтверждённого успеха.');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Lead form contract: OK');
