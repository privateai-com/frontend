import { authErrorWords } from 'appConstants';
import { AuthErrorTransformResult } from 'types';

const searchError = (
  arr: string[],
  arrSearch: typeof authErrorWords,
) => arrSearch.reduce((acc, str) => {
  arr.forEach((word) => {
    if (word.toLowerCase().includes(str) && !acc[str]) {
      acc[str] = word;
    }
  });
  return acc;
}, {} as Record<string, string>);

export const responseExceptionToFormError = (
  exception: unknown,
): AuthErrorTransformResult => {
  let message = '';
  if (exception instanceof Error) {
    message = exception.message;
  } else if (typeof exception === 'string') {
    message = exception;
  }

  const searchArr = message.split(',');

  return {
    message,
    fields: searchError(searchArr, authErrorWords),
  };
};
