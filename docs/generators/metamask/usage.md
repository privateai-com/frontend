# Использование Metamask в проекте
```bash
yarn run new
# select metamask
```
Необходимый пакет будет установлен автоматически.

<details>
  <summary>Структура добавляемых файлов</summary>

  ```bash
  my-project
  |-- src
  |   |-- appConstants
  |   |   |-- index.ts
  |   |   |-- network.ts
  |   |   |-- notifications.ts
  |   |-- store
  |   |   |-- metamask
  |   |        |-- sagas
  |   |            |-- connectMetamaskSaga.ts
  |   |            |-- disconnectMetamask.ts
  |   |            |-- index.ts
  |   |        |-- actionCreators.ts
  |   |        |-- actionTypes.ts
  |   |        |-- handlers.ts
  |   |        |-- index.ts
  |   |        |-- selectors.ts
  |   |-- utils
  |   |    |-- index.ts
  |   |    |-- getNetworkName.ts
  |   |    |-- metamask.ts
  |   |--types
  |   |    |-- store
  |   |    |   |-- index.ts
  |   |    |   |-- MetamaskState.ts
  |   |    |-- index.ts
  ```
</details>

В браузере должно быть установлено расширение Metamask ([ссылка](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)),
иначе вы увидите ошибку "Please install the MetaMask extension"

### 1. Регистрируем аккаунт
инструкция: ([ссылка](https://psm7.com/cryptocurrency/kak-zaregistrirovat-i-ispolzovat-ethereum-koshelek-metamask-poshagovaya-instrukciya.html))

### 2. В кошельке добавляем сети
инструкция: ([ссылка](https://academy.binance.com/ru/articles/connecting-metamask-to-binance-smart-chain))

<details>
  <summary>Binance Testnet</summary>

- Название сети: Smart Chain - Testnet
- Новый RPC URL: ```https://data-seed-prebsc-1-s1.binance.org:8545/```
- ID сети: 97
- Символ: BNB
- URL блок-эксплорера: ```https://testnet.bscscan.com```

тест подключения: ([ссылка](https://umbria.network/connect/binance-smart-chain-testnet))
</details>

<details>
  <summary>Mainnet</summary>

- Название сети: BSC Mainnet
- Новый RPC URL: ```https://bsc-dataseed.binance.org/```
- ID сети: 0x38
- Символ: BNB
- URL блок-эксплорера: ```https://bscscan.com/```

тест подключения: ([ссылка](https://umbria.network/connect/binance-smart-chain-mainnet))
</details>

<details>
  <summary>Rinkeby</summary>
настройки прописаны в metamask по умолчанию

тест подключения: ([ссылка](https://umbria.network/connect/ethereum-testnet-rinkeby))
</details>

## Описание saga actions
Для тестирования подключения создайте компонент UsageMetamask
```tsx
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Space, Typography } from 'antd';
import { metamaskConnect, metamaskDisconnect } from 'store/metamask/actionCreators';
import { metamaskSelectors } from 'store/metamask/selectors';

const { Text } = Typography;

export const UsageMetamask = () => {
  const dispatch = useDispatch();
  const { status, address } = useSelector(metamaskSelectors.getState);

  const onConnectWallet = useCallback(() => {
    dispatch(metamaskConnect());
  }, [dispatch]);

  const onDisconnectWallet = useCallback(() => {
    dispatch(metamaskDisconnect());
  }, [dispatch]);

  return (
    <Space direction="vertical" align="center" style={{ width: '100%' }}>
      <Button onClick={onConnectWallet}>Connect</Button>
      <Button onClick={onDisconnectWallet}>Disconnect</Button>
      <Text>
        Status:
        {status}
      </Text>
      <Text>
        Address:
        {address}
      </Text>
    </Space>
  );
};
```

### metamaskConnect();
metamaskConnect - функция подключения к кошельку

### metamaskDisconnect();
metamaskConnect - функция отключения от кошелька

### metamaskSelectors
metamaskSelectors.getState - получить весь стейт metamask
metamaskSelectors.getProp('address') - получить стейт по ключу
