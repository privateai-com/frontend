import {
  maticIcon,
} from 'assets/img';
import { StaticImageData } from 'next/image';

export enum Network {
  MaticTest = 'PolygonTestnet',
}

export const networkChains: Record<Network, string> = {
  [Network.MaticTest]: '0x13881',
};

export const chainNameById: Record<string, string> = {
  '0x13881': 'PolygonTestnet',
};

type Chain = {
  chainId?: string,
  chainName: string,
  chainNameString: string,
  nativeCurrency: {
    name: string,
    symbol: string,
    decimals: number,
  },
  rpcUrls: string[],
  blockExplorerUrls: string[],
  image: StaticImageData;
};

type Chains = Pick<
Record<Network, Chain>,
Network.MaticTest>;

export const chains: Chains = {
  [Network.MaticTest]: {
    chainId: networkChains[Network.MaticTest],
    chainName: 'Polygon',
    chainNameString: 'PolygonTestnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    image: maticIcon,
  },
};

export const MATIC_NETWORKS = [networkChains[Network.MaticTest]];

export const evmNetworks = [Network.MaticTest];

export const polygonScanLink = 'https://mumbai.polygonscan.com/address/';
