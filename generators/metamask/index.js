const constantsConfig = [
  {
    type: "append",
    path: "../src/appConstants/index.ts",
    templateFile: "./metamask/appConstants/index.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/appConstants/network.ts",
    templateFile: "./metamask/appConstants/network.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/appConstants/notifications.ts",
    templateFile: "./metamask/appConstants/notifications.ts.hbs",
    abortOnFail: true,
  },
]

const storeConfig = [
  {
    type: "add",
    path: "../src/store/metamask/sagas/connectMetamaskSaga.ts",
    templateFile: "./metamask/store/metamask/sagas/connectMetamaskSaga.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/store/metamask/sagas/disconnectMetamask.ts",
    templateFile: "./metamask/store/metamask/sagas/disconnectMetamask.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/store/metamask/sagas/index.ts",
    templateFile: "./metamask/store/metamask/sagas/index.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/store/metamask/actionCreators.ts",
    templateFile: "./metamask/store/metamask/actionCreators.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/store/metamask/actionTypes.ts",
    templateFile: "./metamask/store/metamask/actionTypes.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/store/metamask/handlers.ts",
    templateFile: "./metamask/store/metamask/handlers.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/store/metamask/index.ts",
    templateFile: "./metamask/store/metamask/index.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/store/metamask/selectors.ts",
    templateFile: "./metamask/store/metamask/selectors.ts.hbs",
    abortOnFail: true,
  },
  {
    type: 'append',
    path: '../src/store/rootReducer.ts',
    pattern: /^/,
    template: `import metamask from './metamask';`,
    abortOnFail: true,
  },
  {
    type: 'append',
    path: '../src/store/rootReducer.ts',
    pattern: /export default {/,
    template: `  metamask,`,
    abortOnFail: true,
  },
  {
    type: 'append',
    path: '../src/store/rootSaga.ts',
    pattern: /\/\/ sagas/,
    template: `import metamaskSaga from './metamask/sagas';`,
    abortOnFail: true,
  },
  {
    type: 'append',
    path: '../src/store/rootSaga.ts',
    pattern: /export default function\* rootSaga\(\) {/,
    template: `  yield fork(metamaskSaga);`,
    abortOnFail: true,
  },
]

const utilsConfig = [
  {
    type: "append",
    path: "../src/utils/index.ts",
    templateFile: "./metamask/utils/index.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/utils/getNetworkName.ts",
    templateFile: "./metamask/utils/getNetworkName.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/utils/metamask.ts",
    templateFile: "./metamask/utils/metamask.ts.hbs",
    abortOnFail: true,
  },
]

const typesConfig = [
  {
    type: "add",
    path: "../src/types/store/MetamaskState.ts",
    templateFile: "./metamask/types/store/MetamaskState.ts.hbs",
    abortOnFail: true,
  },
  {
    type: 'append',
    path: '../src/types/store/index.ts',
    pattern: /export interface State {/,
    template: '  metamask: MetamaskState,',
    abortOnFail: true,
  },
  {
    type: 'modify',
    path: '../src/types/store/index.ts',
    pattern: /^/,
    template: `import { MetamaskState } from './MetamaskState';\n`,
    abortOnFail: true,
  },
  {
    type: 'modify',
    path: '../src/types/index.ts',
    pattern: /^/,
    template: `export * from './store/MetamaskState';\n`,
    abortOnFail: true,
  }
]

module.exports = {
  description: "Добавить поддержку Metamask",
  prompts: [],
  actions: [
    {
      type: "metamaskDep",
    },
    ...constantsConfig,
    ...storeConfig,
    ...utilsConfig,
    ...typesConfig,
    {
      type: "showDoc",
      url: "generators/metamask/setup.md"
    },
    {
      type: "showDoc",
      url: "generators/metamask/usage.md"
    },
  ]
}

