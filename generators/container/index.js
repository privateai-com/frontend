const { namespaceExists } = require('../utils/namespaceExists');

module.exports = {
  description: "Создать контейнер",
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'container name please',
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
      path: "../src/containers/{{ properCase name }}/index.tsx",
      templateFile: "./container/index.tsx.hbs",
      abortOnFail: true,
    },
    {
      type: "add",
      path: "../src/containers/{{ properCase name }}/styles.module.css",
      templateFile: "./container/styles.css.hbs",
      abortOnFail: true,
    },
    {
      type: "append",
      path: "../src/containers/index.ts",
      templateFile: "./templates/index.ts.hbs",
      abortOnFail: true,
    },
    {
      type: "showDoc",
      url: "generators/container/usage.md"
    },
  ]
}
