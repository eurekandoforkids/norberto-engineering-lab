# Cadastro — validações e integração

**Origem:** trechos reais e parciais de frontend/src/app/cadastro/page.tsx, branch privada main, consultada em 14/10/2026.  
**História interna:** SCRUM-13 — Criar cadastro com e-mail e senha (concluída).

## Validação no frontend

~~~typescript
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!EMAIL_PATTERN.test(email.trim())) {
    setMessage('Digite um e-mail válido.');
    return;
}

if (password.length < 8) {
    setMessage('A senha deve ter pelo menos 8 caracteres.');
    return;
}
~~~

## Cadastro por SDK de identidade

~~~typescript
const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
});
~~~

## Tratamento de erro — trecho real

~~~typescript
if (error) {
    if (error.message === 'email rate limit exceeded') {
        setMessage(
            'Muitas tentativas foram realizadas. Aguarde alguns minutos e tente novamente.',
        );
    } else {
        setMessage(REGISTRATION_ERROR_MESSAGE);
    }

    setLoading(false);
    return;
}
~~~

**Limites:** são trechos parciais, não um programa executável. Validações do cliente não substituem validações do provedor e autorização no backend. Este código **não demonstra login completo**, nem certifica todos os cenários de segurança.

Para avaliar comportamento diante de falhas, precisam ser verificados testes reais e a separação final de responsabilidades do módulo Identity.

[Voltar ao case](../README.md)

