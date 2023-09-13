# Setup Phantom

### Внести изменения в код:
1) craco.config.js
добавить после массива plugins:
```js
webpack: {
  configure: {
    resolve: {
      fallback: {
        stream: require.resolve("stream-browserify")
      }
    }
  }
}
```

2) src/index.tsx
необходимо обернуть приложение в ContextProvider
```tsx
import { ContextProvider } from 'components';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

### Возможные ошибки и их решения:
<details>
  <summary>Не может найти sourcemap</summary>
  добавить в .env.development и .env.production

  ```bash
  GENERATE_SOURCEMAP=false
  ```
</details>
