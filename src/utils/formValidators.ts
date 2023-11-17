import { emailRegex, passwordRegex } from 'appConstants';

export const passwordValidator = (password: string) => {
  if (!password) {
    return 'Password required';
  }
  if (password.length < 8) {
    return 'Password min 8 characters';
  }
  if (!new RegExp(passwordRegex).test(password)) {
    return 'Your password must be at least 8 characters long, be of mixed case and also contain at least one digit and at least one symbol.';
  }
  return '';
};

export const passwordConfirmValidator = (
  password: string,
  passwordConfirm: string,
) => {
  if(password !== passwordConfirm) {
    return 'Entered passwords mismatch. Please check them and try one more time.';
  }
  return '';
};

export const emailValidator = (email: string) => {
  if (!email) {
    return 'Email required';
  }
  if (!new RegExp(emailRegex).test(email)) {
    return 'Email incorrect';
  }
  return '';
};

export const otpValidator = (otp: string) => {
  if (!otp || otp.length !== 6) {
    return 'Wrong code';
  }
  return '';
};
