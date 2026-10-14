/**
 * Adaptação didática independente de regras simples de cadastro.
 * NÃO é função extraída do QBugado nem integra autenticação ou banco.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegistrationInput(email, password) {
  if (typeof email !== 'string' || typeof password !== 'string') {
    return { ok: false, code: 'INVALID_INPUT' };
  }
  if (!email.trim() || !password) {
    return { ok: false, code: 'REQUIRED_FIELDS' };
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    return { ok: false, code: 'INVALID_EMAIL' };
  }
  if (password.length < 8) {
    return { ok: false, code: 'SHORT_PASSWORD' };
  }
  return { ok: true };
}

