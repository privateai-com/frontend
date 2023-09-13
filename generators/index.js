const { exec } = require('child_process');
const fs = require('node:fs');
const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const pageGenerator = require('./page/index.js');
const reducerGenerator = require('./reducer/index.js');
const metamaskGenerator = require('./metamask/index.js');
const phantomGenerator = require('./phantom/index.js');
const authGenerator = require('./auth/index.js')

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('page', pageGenerator);
  plop.setGenerator('reducer', reducerGenerator);
  plop.setGenerator('metamask', metamaskGenerator);
  plop.setActionType('metamaskDep', () => {
    try {
      exec('yarn add @metamask/detect-provider@1.2.0');
    } catch (err) {
      throw err;
    }
  });
  plop.setGenerator('phantom', phantomGenerator);
  plop.setActionType('phantomDep', () => {
    try {
      exec('yarn add @solana/wallet-adapter-ant-design@0.11.4 @solana/wallet-adapter-base@0.9.5 @solana/wallet-adapter-react@0.15.4 @solana/wallet-adapter-wallets@0.15.5 @solana/web3.js@1.37.0');
    } catch (err) {
      throw err;
    }
  });
  plop.setActionType('showDoc', function (answers, config, plop) {
      try {
        const data = fs.readFileSync(`${__dirname}/../docs/${config.url}`, 'utf8');
        console.log('------------------------------');
        console.log(data);
        console.log('------------------------------');
      } catch (err) {
        throw err;
      }
  });
  plop.setGenerator('auth', authGenerator)
};
