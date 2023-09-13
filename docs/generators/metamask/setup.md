# Plop install Metamask
```bash
yarn run new
# select metamask
```
Необходимый пакет будет установлен автоматически.

### Внести изменения в код:
src/store/rootSaga.ts
раскомментировать строку
// import { fork } from 'redux-saga/effects';

### Пример использования:
<details>
  <summary>Test connection</summary>

```tsx
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Space } from 'antd';
import { metamaskConnect } from 'store/metamask/actionCreators';

export const UsageMetamask = () => {
  const dispatch = useDispatch();

  const onConnectWallet = useCallback(() => {
    dispatch(metamaskConnect());
  }, [dispatch]);

  return (
    <Space>
      <Button onClick={onConnectWallet}>Connect</Button>
    </Space>
  );
};
```
</details>

### Возможные ошибки и их решения.

<details>
  <summary>WARNING in ./node_modules/@metamask/detect-provider/dist/index.js</summary>

добавить в .env.development и .env.production
```bash
GENERATE_SOURCEMAP=false
```
</details>
