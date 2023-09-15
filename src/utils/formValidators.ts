import { emailRegex, passwordRegex } from 'appConstants';

export const passwordValidator = (password: string) => {
  if (!password) {
    return 'Password required';
  } if (password.length < 8) {
    return 'Password min 8 characters';
  } if (!new RegExp(passwordRegex).test(password)) {
    return 'Password incorrect';
  }
  return '';
};

export const emailValidator = (email: string) => {
  if (!email) {
    return 'Email required';
  } if (!new RegExp(emailRegex).test(email)) {
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
