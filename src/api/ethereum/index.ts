import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, providers } from 'ethers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Provider = any;

export async function getProvider() {
  const ethProvider = (await detectEthereumProvider()) as providers.ExternalProvider;
  return new ethers.providers.Web3Provider(ethProvider);
}

export * from './sign';
