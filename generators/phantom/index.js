const { hooksExists } = require("../utils/namespaceExists");

const hooksConfig = [
  {
    type: hooksExists("index.ts") ? "append" : "add",
    path: "../src/hooks/index.ts",
    templateFile: "./phantom/hooks/index.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/hooks/phantom/index.ts",
    templateFile: "./phantom/hooks/phantom/index.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/hooks/phantom/useRequestAirdrop.ts",
    templateFile: "./phantom/hooks/phantom/useRequestAirdrop.ts.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/hooks/phantom/useSendTransaction.ts",
    templateFile: "./phantom/hooks/phantom/useSendTransaction.ts.hbs",
    abortOnFail: true,
  },
]

const componentsConfig = [
  {
    type: "add",
    path: "../src/components/ContextProvider/index.tsx",
    templateFile: "./phantom/components/contextProvider.tsx.hbs",
    abortOnFail: true,
  },
  {
    type: "add",
    path: "../src/components/NotifyTx/index.tsx",
    templateFile: "./phantom/components/notifyTx.tsx.hbs",
    abortOnFail: true,
  },
  {
    type: "append",
    path: "../src/components/index.ts",
    templateFile: "./phantom/components/index.ts.hbs",
    abortOnFail: true,
  },
]

module.exports = {
  description: "Добавить поддержку Phantom(Solana)",
  prompts: [],
  actions: [
    {
      type: "phantomDep",
    },
    {
      type: 'modify',
      path: '../src/assets/styles/app.less',
      pattern: /^/,
      template: `@import '@solana/wallet-adapter-ant-design/styles.css';\n`,
      abortOnFail: true,
    },
    ...hooksConfig,
    ...componentsConfig,
    {
      type: "showDoc",
      url: "generators/phantom/setup.md"
    },
    {
      type: "showDoc",
      url: "generators/phantom/usage.md"
    },
  ]
}
