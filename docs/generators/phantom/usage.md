# Поддержка кошелька Phantom

```bash
yarn run new
# select phantom
```
Необходимые пакеты будут установлены автоматически.

<details>
 <summary>По умолчанию подключаются следующие кошельки:</summary>

 - Phantom
 - Slope
 - Solflare
 - Torus
 - Ledger
 - Sollet
 - Sollet (Extension)

 Убрать не нужные кошельки можно в компоненте
 src/components/ContextProvider
</details>

<details>
  <summary>Структура добавляемых файлов</summary>

  ```bash
  my-project
  |-- src
  |   |-- assets
  |   |   |-- styles
  |   |   |   |-- app.less
  |   |-- components
  |   |   |-- ContextProvider
  |   |   |   |-- index.tsx
  |   |   |-- Notify
  |   |   |   |-- index.tsx
  |   |   |-- index.ts
  |   |-- hooks
  |   |   |-- phantom
  |   |   |   |-- index.ts
  |   |   |   |-- useRequestAirdrop.ts
  |   |   |   |-- useSendTransaction.ts
  |   |   |-- index.ts
  ```
</details>

### Пример использования:
<details>
  <summary>Test connection</summary>

```tsx
import React, { useMemo } from 'react';
import {
  WalletConnectButton,
  WalletDisconnectButton,
  WalletModalButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-ant-design';
import { useWallet } from '@solana/wallet-adapter-react';
import { Typography, Space, Button } from 'antd';
import { useSendTransaction, useRequestAirdrop } from 'hooks';

const { Text } = Typography;

export const ExampleWallets = () => {
  const {
    publicKey, connecting, connected, wallet,
  } = useWallet();
  const onSendTransaction = useSendTransaction();
  const onRequestAirdrop = useRequestAirdrop();

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (connecting) return 'Connecting ...';
    if (connected) return 'Connected';
    if (wallet) return 'Connect';
    return 'Connect Wallet';
  }, [connecting, connected, wallet]);

  return (
    <Space direction="vertical" align="center" style={{ width: '100%', marginTop: '100px' }}>
      <Space>
        <WalletConnectButton />
        <WalletDisconnectButton />
        <WalletModalButton />
        <WalletMultiButton />
      </Space>
      <Text>
        Address:
        {base58}
      </Text>
      <Text>
        Status:
        {content}
      </Text>
      <Button onClick={() => onSendTransaction(1)}>SendTransaction</Button>
      <Button onClick={() => onRequestAirdrop()}>RequestAirdrop</Button>
    </Space>
  );
};
```
</details>

