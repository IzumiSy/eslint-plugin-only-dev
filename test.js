const { rules } = require('./index.js');
const { RuleTester } = require('eslint');
const tester = new RuleTester();

tester.run("only-dev", rules["only-dev"].create, {
  valid: [
    'function __dev__thisisvalid() {};',
    'function __dev__thisisvalid() { __dev__thisisvalid2(); };',
    'var f = { __dev__thisisvalid: function() {} };',
    'var f = { __dev__thisisvalid: function() { __dev__thisisvalid2(); } };',
    'var __dev__thisisinvalid = { f: __dev__thisisvalid2 };',
  ],
  invalid: [
    {
      code: '__dev__thisisinvalid();',
      errors: [
        {
          message: '__dev__thisisinvalid must be called only in DEVELOPMENT environment.',
          type: 'Identifier',
        },
      ],
    },
    {
      code: 'var f = { target: __dev__thisisinvalid };',
      errors: [
        {
          message: '__dev__thisisinvalid must be called only in DEVELOPMENT environment.',
          type: 'Identifier',
        },
      ],
    },
    {
      code: 'var f = __dev__thisisinvalid;',
      errors: [
        {
          message: '__dev__thisisinvalid must be called only in DEVELOPMENT environment.',
          type: 'Identifier',
        },
      ],
    },
    {
      code: 'function f() { __dev__thisisinvalid(); };',
      errors: [
        {
          message: '__dev__thisisinvalid must be called only in DEVELOPMENT environment.',
          type: 'Identifier',
        },
      ],
    },
    {
      code: 'var f =  { a: function() { __dev__thisisinvalid(); } };',
      errors: [
        {
          message: '__dev__thisisinvalid must be called only in DEVELOPMENT environment.',
          type: 'Identifier',
        },
      ],
    },
    {
      code: 'instance.__dev__thisisinvalid();',
      errors: [
        {
          message: '__dev__thisisinvalid must be called only in DEVELOPMENT environment.',
          type: 'Identifier',
        },
      ],
    },
    {
      code: '__dev__thisisinvalid.f();',
      errors: [
        {
          message: '__dev__thisisinvalid must be called only in DEVELOPMENT environment.',
          type: 'Identifier',
        },
      ],
    }
  ],
})
