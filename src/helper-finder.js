import globby from 'globby';
import { parse, transform } from 'ember-template-recast';
import fs from 'fs';
import camelCase from 'lodash.camelcase';

export function getHelpers(pathName) {
  const helperPaths = globby.sync(`${pathName}/app/helpers/*.js`, { absolute: true });

  if (!helperPaths) {
    throw new Error('no helpers found');
  }

  return helperPaths.reduce((helperObj, path) => {
    helperObj = helperObj || {};
    const helperName = camelCase(path.split('/helpers/')[1].replace('.js', ''));

    helperObj[helperName] = 0;
    return helperObj;
  }, {});
}

export function getUnusedHelpers(pathName, showOutput=true) {
  const files = globby.sync(`${pathName}/app/**/*.hbs`, { absolute: true });

  const HELPER_COUNT = getHelpers(pathName);

  files.forEach((file) => {
    const fileText = fs.readFileSync(file, { encoding: 'UTF-8' });
    const ast = parse(fileText);

    transform(ast, () => {
      return {
        MustacheStatement(node) {
          processMustacheOrSubStatement(node, HELPER_COUNT);
          return node;
        },
        SubExpression(node) {
          processMustacheOrSubStatement(node, HELPER_COUNT);
          return node;
        },
      }
    })
  });

  if (showOutput) {
    printOutput(HELPER_COUNT);
  }

  return HELPER_COUNT;
}

export function processMustacheOrSubStatement(node, HELPER_COUNT) {
  const { path: { original } } = node;
  const camelName = camelCase(original);
  if (HELPER_COUNT[camelName] >= 0) {
    HELPER_COUNT[camelName]++;
  }
}

function printOutput(HELPER_COUNT) {
  const keys = Object.keys(HELPER_COUNT);

  const unusedHelpers = keys.filter((key) => {
    return HELPER_COUNT[key] === 0;
  });

  if (!unusedHelpers.length) {
    // eslint-disable-next-line no-console
    console.log('nice! you\'re using all your helpers!');
    return;
  }
  
  // eslint-disable-next-line no-console
  console.log('You\'ve got some stuff you haven\'t used:')

  unusedHelpers.forEach((helper) => {
    // eslint-disable-next-line no-console
    console.log(helper);
  });

}
