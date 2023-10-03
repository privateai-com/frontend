import { ApiError, notification, transformBackendErrorToString } from 'utils';

function isApiError(obj: unknown): obj is ApiError {
  return (
    typeof obj === 'object'
     && obj !== null
     && 'status' in obj
      && 'error' in obj
      && 'message' in obj
  );
}

export const getDataFromException = (exception: unknown) => {
  if (isApiError(exception)) {
    const { message, status, error } = exception;
    return { message, status, error };
  }

  let message = '';

  if (exception instanceof Error) {
    message = exception.message;
  } else if (typeof exception === 'string') {
    message = exception;
  } else if (typeof exception === 'object') {
    const exc = exception as { message: string };
    message = exc?.message || 'Something went wrong';
  }
  return { message };
};

export const sagaExceptionHandler = (exception: unknown) => {
  let message = '';
  if (exception instanceof Error) {
    message = transformBackendErrorToString(exception);
  }

  if (typeof exception === 'string') {
    message = exception;
  }

  // eslint-disable-next-line no-console
  console.error(message);

  notification.error({
    message: 'Error',
    description: message,
  });
};
