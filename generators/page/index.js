const { pageExists } = require("../utils/namespaceExists");

module.exports = {
  description: "Создать страницу",
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'page name please',
    validate: value => {
      if (/.+/.test(value)) {
        return pageExists(value)
          ? 'A page with this name already exists'
          : true;
      }

      return 'The name is required';
    },
  }],
  actions: [
    {
      type: "add",
      path: "../src/pages/{{ properCase name }}/index.tsx",
      templateFile: "./page/index.tsx.hbs",
      abortOnFail: true,
    },
    {
      type: "append",
      path: "../src/pages/index.ts",
      templateFile: "./templates/index.ts.hbs",
      abortOnFail: true,
    },
    {
      type: "showDoc",
      url: "generators/page/usage.md"
    },
  ]
}
