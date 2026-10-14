// Fast pre-commit check: every JS module parses and every local import resolves to a real export.
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));

async function listJs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((e) => (e.isDirectory() ? listJs(join(dir, e.name)) : e.name.endsWith('.js') ? [join(dir, e.name)] : [])));
  return files.flat();
}

const files = await listJs(join(ROOT, 'assets/js'));
const exportsOf = new Map();
for (const f of files) {
  const src = await readFile(f, 'utf8');
  exportsOf.set(f, new Set([...src.matchAll(/^export (?:const|let|function) (\w+)/gm)].map((m) => m[1])));
}

let failed = 0;
for (const f of files) {
  const parse = spawnSync(process.execPath, ['--check', f], { encoding: 'utf8' });
  if (parse.status !== 0) {
    failed++;
    console.error(`✗ ${f}\n${parse.stderr}`);
    continue;
  }
  const src = await readFile(f, 'utf8');
  for (const [, names, spec] of src.matchAll(/^import \{([^}]+)\} from '([^']+)';/gm)) {
    const target = resolve(dirname(f), spec);
    const available = exportsOf.get(target);
    for (const name of names.split(',').map((n) => n.trim())) {
      if (!available?.has(name)) {
        failed++;
        console.error(`✗ ${f}: '${name}' is not exported by ${spec}`);
      }
    }
  }
}
console.log(failed ? `${failed} problem(s) found` : `✓ ${files.length} modules OK`);
process.exit(failed ? 1 : 0);
