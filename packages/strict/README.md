# @type-config/strict

The most strict typescript compiler options, check everthing typescript can check. Useful for packages.

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

    "strict": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUnusedParameters": true,
    "noUnusedLocals": true
  }
}
```
