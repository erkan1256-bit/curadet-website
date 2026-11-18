import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const serverRoot = path.resolve(here, '..');

test('real .env file is not committed', () => {
  assert.equal(fs.existsSync(path.join(serverRoot, '.env')), false);
});

test('.env.example contains placeholders, not mailbox secrets', () => {
  const sample = fs.readFileSync(path.join(serverRoot, '.env.example'), 'utf8');
  assert.match(sample, /INFO_PASSWORD=replace-locally/);
  assert.match(sample, /SYNC_PASSWORD=replace-locally/);
  assert.match(sample, /RIGHTS_PASSWORD=replace-locally/);
  assert.match(sample, /CURADET_CENTER_TOKEN=replace-with-a-long-random-server-token/);
});

test('.gitignore blocks local secret files', () => {
  const gitignore = fs.readFileSync(path.join(serverRoot, '.gitignore'), 'utf8');
  assert.match(gitignore, /^\.env$/m);
  assert.match(gitignore, /^node_modules\/$/m);
});
