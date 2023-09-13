export const throwApiError = (data: { error: string, message: string, statusCode: number }) => {
  const msgError = `${data.statusCode}: ${data.message}`;
  throw new Error(msgError);
};
