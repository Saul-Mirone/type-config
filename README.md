# TypeConfig

## Motivation

Typescript is greet. However, every time we start a project with typescript (or migrate our old js project), we must choose [compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for our project. Going through all the rules is really painful.

*TypeConfig* comes to make getting start with tsconfig really easier: just pick the style and enjoy.

## Quick Start

```
npm install @type-config/cli -g

type-config init
```

## Introduction

*TypeConfig* provide following receipes (Addition is welcome):

* *standard*: Can be use in most projects. Use most type check rules, but not anything more(like no used something).
* *strict*: Fit for packages. Use the most strict rules.
* *react*: Fit for app using react.
* *easy*: Fit for new starter or old javascript projects. Use the most loose rules, allow using javascript.

### CLI usage:
```
# you can decide the name of the config file
type-config init [config-name.json]
```
