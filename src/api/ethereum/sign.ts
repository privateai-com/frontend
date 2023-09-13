import { getProvider } from 'api/ethereum';

export const signPersonalEvm = async (msg: string) => {
  const provider = await getProvider();

  return provider.getSigner().signMessage(msg);
};
