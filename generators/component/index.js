const { namespaceExists } = require('../utils/namespaceExists');

module.exports = {
  description: "Создать компонент",
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'component name please',
    validate: value => {
      if (/.+/.test(value)) {
        return namespaceExists(value)
          ? 'A component or container with this name already exists'
          : true;
      }

      return 'The name is required';
    },
  }],
  actions: [
    {
      type: "add",
      path: "../src/components/{{ properCase name }}/index.tsx",
      templateFile: "./component/index.tsx.hbs",
      abortOnFail: true,
    },
    {
      type: "add",
      path: "../src/components/{{ properCase name }}/{{ camelCase name }}.stories.tsx",
      templateFile: "./component/stories.tsx.hbs",
      abortOnFail: true,
    },
    {
      type: "add",
      path: "../src/components/{{ properCase name }}/styles.module.css",
      templateFile: "./component/styles.css.hbs",
      abortOnFail: true,
    },
    {
      type: "append",
      path: "../src/components/index.ts",
      templateFile: "./templates/index.ts.hbs",
      abortOnFail: true,
    },
    {
      type: "showDoc",
      url: "generators/component/usage.md"
    },
  ]
}
