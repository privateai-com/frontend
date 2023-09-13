# Модуль авторизации

### Краткое описание:
Данный модуль позволяет логиниться через JWT token, и автоматически рефрешить его.
Рефреш токена происходит, если при запросе на бек вернётся ошибка 401.

<details>
  <summary>Структура добавляемых файлов</summary>

  ```bash
  my-project
  |-- src
  |   |-- appConstants
  |   |   |-- api.ts
  |   |-- api
  |   |   |-- apiInterceptors.ts
  |   |-- containers
  |   |   |-- ProtectedRoute
  |   |   |   |-- index.tsx
  |   |-- store
  |   |   |-- auth
  |   |        |-- sagas
  |   |            |-- login.ts
  |   |            |-- index.ts
  |   |        |-- actionCreators.ts
  |   |        |-- actionTypes.ts
  |   |        |-- handlers.ts
  |   |        |-- index.ts
  |   |        |-- selectors.ts
  |   |-- hooks
  |   |    |-- index.ts
  |   |    |-- useAuth.ts
  |   |--types
  |   |    |-- store
  |   |    |   |-- index.ts
  |   |    |   |-- AuthState.ts
  ```
</details>

### Внести изменения в код:
src/store/rootSaga.ts
раскоментировать строку
// import { fork } from 'redux-saga/effects';

### Пример использования Protected Route:
<details>
  <summary>Protected route</summary>

```tsx
export const Routes = () => (
  <RoutesDom>
    <Route
      path="/"
      element={<Layout />}
    >
      <Route path={'/home'} element={<Home /> }/>
      
      <Route element={<ProtectedRoute />}>
        <Route path={'/settings'} element={<Settings />}/>
        <Route path={'/profile'} element={<Profile />}/>
      </Route>
    </Route>
  </RoutesDom>
);

```
</details>
