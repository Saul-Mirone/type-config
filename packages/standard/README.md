# @type-config/standard

Typescript compiler options can be used in most cases. Use every type check rules, but nothing more(like no-used-something).

## rules
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "noEmitOnError": true,

    "declaration": true,
    "sourceMap": true,

    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,

    "strict": true
  }
}
```
