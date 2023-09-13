import { Network, chains } from 'appConstants';

export const getTxUrl = (network: Network, txHash: string) => {
  switch (network) {
    case Network.MaticTest:
      return `${chains[network].blockExplorerUrls}/tx/${txHash}`;
    default:
      return '';
  }
};
