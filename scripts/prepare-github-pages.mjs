import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const basePath = '/TalantIa';
const serverOnlyPaths = ['api', 'private', '.htaccess'];

for (const path of serverOnlyPaths) {
  await rm(join(outputDirectory, path), { recursive: true, force: true });
}

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
console.log('Removed server-only api/, private/ and .htaccess from the Pages artifact.');
