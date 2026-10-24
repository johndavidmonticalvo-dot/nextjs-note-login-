export const MIN_PASSWORD_LENGTH = 7;

export function validateLogin(email, password) {
  const errors = {};
  if (!email.trim()) errors.email = 'Email is required.';
  else if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@gmail\.com$/i.test(email.trim())) {
    errors.email = 'Enter a valid email ending in @gmail.com.';
  }
  if (!password) errors.password = 'Password is required.';
  else if (password.length < MIN_PASSWORD_LENGTH) errors.password = 'Password must be more than 6 characters (at least 7).';
  return errors;
}
