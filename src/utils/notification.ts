import { toast } from 'react-toastify';

export const notification = {
  destroy: toast.dismiss,
  error: ({ message, description }: { message: string, description?: string }) => {
    toast.error(description ? `${message}: ${description}` : message, {
      autoClose: false,
      hideProgressBar: true,
    });
  },
  success: ({ message }: { message: string }) => {
    toast.success(message, {
      hideProgressBar: true,
    });
  },
  info: ({ message }: { message: string }) => {
    toast.info(message, {
      hideProgressBar: true,
    });
  },
};
