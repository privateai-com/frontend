import {
  compose,
  combineReducers,
  Store,
} from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';
import {
  // AccountState,
  AuthState,
  MetamaskState,
  State,
} from 'types';
import reducer from './rootReducer';
import rootSaga from './rootSaga';

const reducers = {
  ...reducer,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION__: typeof compose;
  }
}

export interface SagaStore extends Store {
  sagaTask?: Task;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  __persistor?: any;
}

const makeConfiguredStore = () =>
  configureStore({
    reducer: combineReducers(reducers),
    devTools: true,
  });

// eslint-disable-next-line import/no-mutable-exports
export let store: Store;

export const makeStore = () => {
  const isServer = typeof window === 'undefined';
  
  if (isServer) return makeConfiguredStore();
  
  const persistConfig = {
    key: 'metamask',
    storage: storageSession,
    whitelist: ['isLostWallet'] as Array<keyof MetamaskState>,
  };

  const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: [
      'accessToken',
      'refreshToken',
      'timestamp',
    ] as Array<keyof AuthState>,
  };

  // const accountPersistConfig = {
  //   key: 'account',
  //   storage,
  //   whitelist: [
  //     'username',
  //   ] as Array<keyof AccountState>,
  // };
  
  const persistedReducer = combineReducers({
    ...reducer,
    metamask: persistReducer(persistConfig, reducer.metamask),
    auth: persistReducer(authPersistConfig, reducer.auth),
    // account: persistReducer(accountPersistConfig, reducer.account),
  });
  
  const sagaMiddleware = createSagaMiddleware();

  store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware),
  });

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  (store as SagaStore).__persistor = persistStore(store);
  return store;
};

export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });
