import { notification, transformBackendErrorToString } from 'utils';

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
