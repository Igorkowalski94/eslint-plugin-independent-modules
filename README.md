# eslint-plugin-independent-modules

Eslint plugin that allows you to create independent modules.

```bsh
$ yarn add -D eslint-plugin-independent-modules
```

```bsh
$ npm i --dev eslint-plugin-independent-modules
```

## Getting started

> [!CAUTION]
> The library is in the early testing phase. Detailed documentation will come soon.

### Step 1

Add the following lines to **`.eslintrc`**.

```jsonc
{
    "plugins": ["independent-modules"],
    "rules": {
        "independent-modules/validate": "error", // warn | error
    },
    "settings": {
        "independent-modules/config-path": "independentModules.json", // json | yaml
    },
}
```
