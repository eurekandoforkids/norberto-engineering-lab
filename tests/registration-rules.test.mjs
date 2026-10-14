import assert from 'node:assert/strict';
import test from 'node:test';
import { validateRegistrationInput } from '../examples/registration-rules.mjs';

test('aceita e-mail e senha com pelo menos 8 caracteres', () => {
  assert.deepEqual(validateRegistrationInput('pessoa@example.test', 'abcdefgh'), { ok: true });
});

test('rejeita campos obrigatórios ausentes', () => {
  assert.deepEqual(validateRegistrationInput('', 'abcdefgh'), { ok: false, code: 'REQUIRED_FIELDS' });
  assert.deepEqual(validateRegistrationInput('pessoa@example.test', ''), { ok: false, code: 'REQUIRED_FIELDS' });
});

test('rejeita formato de e-mail inválido', () => {
  assert.deepEqual(validateRegistrationInput('invalido', 'abcdefgh'), { ok: false, code: 'INVALID_EMAIL' });
});

test('rejeita senha com menos de oito caracteres', () => {
  assert.deepEqual(validateRegistrationInput('pessoa@example.test', 'abc'), { ok: false, code: 'SHORT_PASSWORD' });
});

test('rejeita entradas com tipos inválidos', () => {
  assert.deepEqual(validateRegistrationInput(null, 'abcdefgh'), { ok: false, code: 'INVALID_INPUT' });
});

