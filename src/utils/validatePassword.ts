export const validatePassword = (password: string) => {
  const minLength = 8;
  const upper = /[A-Z]/;
  const lower = /[a-z]/;
  const number = /[0-9]/;
  const special = /[!@#$%^&()_+=~`.,;[\]{}-]/;
  let score = 0;
  if (password.length >= minLength) score += 1;
  if (upper.test(password)) score += 1;
  if (lower.test(password)) score += 1;
  if (number.test(password)) score += 1;
  if (special.test(password)) score += 1;
  return (score >= 4);
};
