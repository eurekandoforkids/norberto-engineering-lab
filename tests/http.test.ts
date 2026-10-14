import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createAppServer} from '../src/server.ts';
import {EXAMPLES} from '../src/examples.ts';

async function app(): Promise<{base: string; close: () => Promise<void>}> {
  const server = createAppServer();
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (typeof address !== 'object' || !address) throw new Error('server not listening');
  return {
    base: `http://127.0.0.1:${address.port}`,
    close: () => new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())),
  };
}

test('health and examples endpoints are available without external dependencies', async () => {
  const {base, close} = await app();
  try {
    const health = await fetch(`${base}/health`);
    assert.equal(health.status, 200);
    assert.equal((await health.json()).status, 'ok');
    const examples = await fetch(`${base}/api/examples`);
    assert.equal(examples.status, 200);
    assert.equal((await examples.json()).initiatives.length, 3);
  } finally { await close(); }
});

test('valid scoring request returns breakdown and rejects invalid method', async () => {
  const {base, close} = await app();
  try {
    const response = await fetch(`${base}/api/evaluate`, {
      method: 'POST', headers: {'content-type':'application/json'},
      body: JSON.stringify({initiatives: EXAMPLES}),
    });
    assert.equal(response.status, 200);
    const output = await response.json();
    assert.equal(output.results.length, 3);
    assert.equal(output.results[0].id, 'a1');
    assert.equal(response.headers.get('cache-control'), 'no-store');
    const unexpected = await fetch(`${base}/api/evaluate`, {method:'GET'});
    assert.equal(unexpected.status, 404);
  } finally { await close(); }
});

test('rejects invalid content type and malformed JSON; no internal details leaked', async () => {
  const {base, close} = await app();
  try {
    const noType = await fetch(`${base}/api/evaluate`, {method:'POST',body:'{}'});
    assert.equal(noType.status, 400);
    const invalid = await fetch(`${base}/api/evaluate`, {method:'POST',headers:{'content-type':'application/json'},body:'{bad}'});
    assert.equal(invalid.status, 400);
    const out = await invalid.json();
    assert.equal(out.error, 'JSON inválido.');
    assert.equal(invalid.headers.get('x-content-type-options'), 'nosniff');
  } finally { await close(); }
});

test('serves only allowlisted static files', async () => {
  const {base, close} = await app();
  try {
    const html = await fetch(base);
    assert.equal(html.status, 200);
    assert.match(await html.text(), /Decision Lab/);
    assert.equal((await fetch(`${base}/package.json`)).status, 404);
    assert.equal((await fetch(`${base}/.env`)).status, 404);
    assert.match(html.headers.get('content-security-policy') || '', /script-src 'self'/);
  } finally { await close(); }
});
