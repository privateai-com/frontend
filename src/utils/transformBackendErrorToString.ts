// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformBackendErrorToString = (e: any) => {
  if (e?.response?.data?.message) {
    return e.response.data.message as string;
  }

  return e.message as string;
};
