export enum Wallet {
  Metamask = 'Metamask',
}

export const linkWallet: Record<Wallet, string> = {
  [Wallet.Metamask]: 'https://metamask.io/download/',
};
