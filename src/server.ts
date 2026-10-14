/** Minimal standard-library HTTP API; illustrates clean, testable boundaries. */
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { InputError, evaluateBatch, WEIGHTS } from './core.ts';
import { EXAMPLES } from './examples.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../public');
const staticRoutes = new Map<string, {path: string; mime: string}>([
  ['/', {path: 'index.html', mime: 'text/html; charset=utf-8'}],
  ['/app.js', {path: 'app.js', mime: 'text/javascript; charset=utf-8'}],
  ['/style.css', {path: 'style.css', mime: 'text/css; charset=utf-8'}],
]);

function send(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  });
  res.end(JSON.stringify(body));
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  const type = (req.headers['content-type'] || '').split(';')[0]?.trim();
  if (type !== 'application/json') throw new InputError('Content-Type deve ser application/json.');
  let total = 0;
  const parts: Buffer[] = [];
  for await (const part of req) {
    const bytes = Buffer.isBuffer(part) ? part : Buffer.from(part);
    total += bytes.byteLength;
    if (total > 65536) throw new InputError('Payload excede 64 KB.');
    parts.push(bytes);
  }
  try {
    return JSON.parse(Buffer.concat(parts).toString('utf8')) as unknown;
  } catch {
    throw new InputError('JSON inválido.');
  }
}

export function createAppServer() {
  return createServer(async (req, res) => {
    res.setHeader('x-content-type-options', 'nosniff');
    res.setHeader('referrer-policy', 'no-referrer');
    res.setHeader('x-frame-options', 'DENY');
    res.setHeader('content-security-policy',
      "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; base-uri 'none'; object-src 'none'; frame-ancestors 'none'");
    try {
      const route = (req.url || '').split('?')[0];
      if (req.method === 'GET' && route === '/health') {
        return send(res, 200, {status: 'ok'});
      }
      if (req.method === 'GET' && route === '/api/examples') {
        return send(res, 200, {initiatives: EXAMPLES, weights: WEIGHTS});
      }
      if (req.method === 'POST' && route === '/api/evaluate') {
        const input = await readJson(req);
        if (typeof input !== 'object' || input === null || Array.isArray(input) ||
            Object.keys(input).join(',') !== 'initiatives') {
          throw new InputError('Envie um objeto com initiatives.');
        }
        return send(res, 200, {results: evaluateBatch((input as {initiatives: unknown}).initiatives)});
      }
      if (req.method === 'GET' && staticRoutes.has(route)) {
        const target = staticRoutes.get(route)!;
        const content = await readFile(resolve(root, target.path));
        res.writeHead(200, {'content-type': target.mime, 'cache-control': 'public, max-age=60'});
        return res.end(content);
      }
      return send(res, 404, {error: 'Rota não encontrada.'});
    } catch (error) {
      if (error instanceof InputError) return send(res, 400, {error: error.message});
      console.error('Unhandled request failure:', error instanceof Error ? error.name : 'unknown');
      return send(res, 500, {error: 'Erro interno.'});
    }
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const port = Number(process.env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('PORT inválida.');
    process.exit(1);
  }
  const host = process.env.HOST || '127.0.0.1';
  createAppServer().listen(port, host, () => {
    console.log(`Decision Lab ready at http://${host}:${port}`);
  });
}
