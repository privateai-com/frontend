const fs = require('fs');
const path = require('path');
const projectComponents = fs.readdirSync(path.join(__dirname, '../../src/components'));
const projectContainers = fs.readdirSync(path.join(__dirname, '../../src/containers'));
const projectPage = fs.readdirSync(path.join(__dirname, '../../src/pages'));
const projectStore = fs.readdirSync(path.join(__dirname, '../../src/store'));
const components = projectComponents.concat(projectContainers);
const hooks = fs.readdirSync(path.join(__dirname, '../../src/hooks'));

function namespaceExists(comp) {
  return components.indexOf(comp) >= 0;
}

function pageExists(page) {
  return projectPage.indexOf(page) >= 0;
}

function storeExists(store) {
  return projectStore.indexOf(store) >= 0;
}

function hooksExists(store) {
  return hooks.indexOf(store) >= 0;
}

module.exports = {
  namespaceExists,
  pageExists,
  storeExists,
  hooksExists
};
