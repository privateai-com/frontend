export const useAuth = () => {
  const accessToken = true;

  return {
    isUserAuthenticated: accessToken !== undefined,
  };
};
