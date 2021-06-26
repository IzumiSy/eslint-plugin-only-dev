# eslint-plugin-only-dev

This rule checks if the functions with the name including `__dev__` are not used in the production environment, only working when `NODE_ENV` is neither `development` nor `test`.

## Usage
```json
{
  "plugins": ["only-dev"],
  "rules": {
    "only-dev/only-dev": "error"
  }
}
```

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

Test shows more details

```bash
  only-dev
    valid
      ✔ function __dev__thisisvalid() {};
      ✔ function __dev__thisisvalid() { __dev__thisisvalid2(); };
      ✔ var f = { __dev__thisisvalid: function() {} };
      ✔ var f = { __dev__thisisvalid: function() { __dev__thisisvalid2(); } };
      ✔ var __dev__thisisinvalid = { f: __dev__thisisvalid2 };
    invalid
      ✔ __dev__thisisinvalid();
      ✔ var f = { target: __dev__thisisinvalid };
      ✔ var f = __dev__thisisinvalid;
      ✔ function f() { __dev__thisisinvalid(); };
      ✔ var f =  { a: function() { __dev__thisisinvalid(); } };
      ✔ instance.__dev__thisisinvalid();
      ✔ __dev__thisisinvalid.f();
```
