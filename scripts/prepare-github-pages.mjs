import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const basePath = '/TalantIa';

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtmlFiles(path));
    else if (extname(entry.name) === '.html') files.push(path);
  }

  return files;
}

for (const file of await collectHtmlFiles(outputDirectory)) {
  const html = await readFile(file, 'utf8');
  const prefixed = html.replace(
    /\b(href|src|action)=(['"])\/(?!\/|TalantIa\/)/g,
    `$1=$2${basePath}/`,
  );
  await writeFile(file, prefixed);
}

console.log(`Prepared ${basePath}/ paths for GitHub Pages.`);
