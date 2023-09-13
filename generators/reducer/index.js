const { storeExists } = require("../utils/namespaceExists");


module.exports = {
  description: "Создать reducer(store)",
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'auth',
      validate: value => {
        if (/.+/.test(value)) {
          return storeExists(value)
            ? 'A store with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
  ],
  actions: (data) => {
    return [
      {
        type: 'add',
        path: '../src/store/{{ camelCase name }}/index.ts',
        templateFile: './reducer/index.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/store/{{ camelCase name }}/actionsTypes.ts',
        templateFile: './reducer/actionsTypes.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/store/{{ camelCase name }}/actionCreators.ts',
        templateFile: './reducer/actionCreators.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/store/{{ camelCase name }}/handlers.ts',
        templateFile: './reducer/handlers.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/store/{{ camelCase name }}/selectors.ts',
        templateFile: './reducer/selectors.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/store/{{ camelCase name }}/sagas/index.ts',
        templateFile: './reducer/sagas/index.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/store/{{ camelCase name }}/sagas/getData.ts',
        templateFile: './reducer/sagas/getData.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/types/store/{{ properCase name }}State.ts',
        templateFile: './reducer/storeType.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '../src/types/store/index.ts',
        pattern: /export interface State {/,
        template: '  {{ camelCase name }}: {{ properCase name }}State,',
        abortOnFail: true,
      },
      {
        type: 'modify',
        path: '../src/types/store/index.ts',
        pattern: /^/,
        template: `import { {{ properCase name }}State } from './{{ properCase name }}State';\n`,
        abortOnFail: true,
      },
      {
        type: 'modify',
        path: '../src/store/rootReducer.ts',
        pattern: /^/,
        template: `import {{ camelCase name }} from './{{ camelCase name }}';\n`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '../src/store/rootReducer.ts',
        pattern: /export default {/,
        template: `  {{ camelCase name }},`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '../src/store/rootSaga.ts',
        pattern: /\/\/ sagas/,
        template: `import {{ camelCase name }}Saga from './{{ camelCase name }}/sagas';`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '../src/store/rootSaga.ts',
        pattern: /export default function\* rootSaga\(\) {/,
        template: `  yield fork({{ camelCase name }}Saga);`,
        abortOnFail: true,
      },
      {
        type: "showDoc",
        url: "generators/reducer/setup.md"
      },
      {
        type: "showDoc",
        url: "generators/reducer/usage.md"
      },
    ];
  },
}
