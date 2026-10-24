import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLogin } from '../lib/validation.mjs';

test('empty fields return both required errors', () => {
  assert.deepEqual(Object.keys(validateLogin('  ', '')), ['email', 'password']);
});
test('rejects missing local part, wrong domains, suffix tricks and malformed emails', () => {
  for (const email of ['@gmail.com', 'user@yahoo.com', 'user@gmail.com.evil.com', 'user@gmailXcom', 'a b@gmail.com', 'a@@gmail.com', 'a..b@gmail.com']) {
    assert.ok(validateLogin(email, '1234567').email, email);
  }
});
test('password threshold is strictly more than six characters', () => {
  assert.ok(validateLogin('student@gmail.com', '123456').password);
  assert.deepEqual(validateLogin('student@gmail.com', '1234567'), {});
});
test('accepts trimmed Gmail address, case variations and plus addressing', () => {
  assert.deepEqual(validateLogin(' Student.Name+notes@GMAIL.COM ', 'test123'), {});
});
