import fs from 'fs';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import multi from '@rollup/plugin-multi-entry';
import typescript from '@rollup/plugin-typescript';

console.log(process.argv);
const lastArg = process.argv[process.argv.length - 1];
const script = lastArg.includes('--') ? 'all' : lastArg;
const configBuilder = (name) => {
  console.log(`Preparing to bundle index file from src/${name}/`);
  return {
    input: `./src/${name}/index.*`,
    output: {
      file: `./dist/${name}.js`,
      format: 'iife',
      intro: '\n\n' +
        '/** ************************************************************************\n' +
        ' * FORGEROCK | AM SCRIPT MANAGER\n' +
        ' * \n' +
        ' * ' + name + '.js\n' +
        ' * \n' +
        ' *  Copyright (c) 2020 ForgeRock. All rights reserved.\n' +
        ' *  This software may be modified and distributed under the terms\n' +
        ' *  of the MIT license. See the LICENSE file for details.\n' +
        ' * \n' +
        ' * *************************************************************************\n' +
        ' * \n' +
        ' * THIS IS A GENERATED FILE. Do not directly modify.\n' +
        ' * For more information about this file, visit this Github repo:\n' +
        ' * https://github.com/ForgeRock/forgerock-am-script-manager.\n' +
        ' * \n' +
        ' * If you would like to modify this script or use it as a reference\n' +
        ' * for building your own matching script, we recommend cloning the git\n' +
        ' * repo above and use it as a development toolkit to get started.\n' +
        ' * *************************************************************************/'
    },
    plugins: [ multi(), nodeResolve(), commonjs(), typescript(), babel({ babelHelpers: 'bundled' }) ]
  };
};

if (script === 'all') {
  const contents = fs.readdirSync('./src', { withFileTypes: true });
  module.exports = contents.filter((item) => item.isDirectory())
    .map((dir) => configBuilder(dir.name));
} else {
  module.exports = configBuilder(script);
}
