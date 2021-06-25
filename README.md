# eslint-plugin-only-dev

This rule checks if the functions with the name including `__dev__` are NOT called in the production environment.

## Example
Giving a file like below

```js
function __dev__thisisafunction() {
  console.log("hello")
}

__dev__thisisafunction();

var aaa = {
  __dev__hoge: function() {
    console.log("world")
  },
}

aaa.__dev__hoge();
```

Will let eslint say like this:

```bash
$ npx eslint index.js

/Users/izumi/Devs/test-eslint-only-dev/index.js
   5:1  error  __dev__thisisafunction must be called only in DEVELOPMENT environment  only-dev/only-dev
  13:1  error  __dev__hoge must be called only in DEVELOPMENT environment             only-dev/only-dev

✖ 2 problems (2 errors, 0 warnings)
```

This plugin does not do anything when `NODE_ENV` is `development` or `test`.
