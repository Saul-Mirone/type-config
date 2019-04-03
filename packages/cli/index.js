#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');
const program = require('commander');

function prompt() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'style',
      message: 'What style do you want to use?',
      choices: [{
        name: 'standard - Can be use in mostly scene.',
        value: 'standard',
        short: 'standard',
      }, {
        name: 'strict - The most strict config, useful to create package.',
        value: 'strict',
        short: 'strict',
      }, {
        name: 'react - Common typescript config for react app.',
        value: 'react',
        short: 'react',
      }, {
        name: 'easy - Use the most loose rules, useful for migrate from js.',
        value: 'easy',
        short: 'easy',
      }]
    }, {
      type: 'input',
      name: 'source',
      default: 'src',
      message: 'Where is your source code?',
      suffix: ' [use ; to split if you have many.]'
    }, {
      type: 'input',
      name: 'outDir',
      default: 'dist',
      message: 'Where is your output code?'
    }, {
      type: 'confirm',
      name: 'decorator',
      default: false,
      message: 'Do you use docorators?'
    }, {
      type: 'confirm',
      name: 'declaration',
      default: true,
      message: 'Do you need declaration file?'
    }
  ]);
}

function promptHandler(configName) {
  return (result) => {
    const pkgName = `@type-config/${result.style}`;
    const include = result.source.split(';').filter(x => x.length > 0);
    const outDir = result.outDir;
    const exclude = ['node_modules', outDir];
    const baseUrl = '.'

    const decorator = result.decorator ? {
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
    }: {};
    const declaration = result.declaration ? {
      declaration: true
    }: {};

    const config = {
      extends: pkgName,
      compilerOptions: Object.assign({
        outDir,
        baseUrl,
      }, decorator, declaration),
      include,
      exclude,
    };

    const useYarn = fs.existsSync(path.join('./yarn.lock'));

    let command = 'npm';
    let args = ['install', '-D']
    if (useYarn) {
      command = 'yarnpkg';
      args = ['add']
    }
    args.push(pkgName);

    const proc = spawn.sync(command, args, { stdio: 'inherit' });
    if (proc.status !== 0) {
      console.error(`\`${command} ${args.join(' ')}\` failed`);
      return;
    }

    fs.writeFileSync(configName, JSON.stringify(config, null, 2));

    console.info(`Generate typescript config: ${configName} success!`)
  }
}

function promptError(err) {
  console.error('An error occur in type-config!');
  console.error(err.stack);
}

program
  .command('init [name]')
  .description('generate tsconfig by name, default: tsconfig.json')
  .action((name) => {
    let configName = name || 'tsconfig.json';

    const fileExists = fs.existsSync(path.join('./', configName));
    if (fileExists) {
      console.error(`File: ${configName} is already exists!`);
      return;
    }

    prompt().then(promptHandler(configName)).catch(promptError);
  });

program.parse(process.argv);
