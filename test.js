const { rules } = require('./index.js');
const { RuleTester } = require('eslint');
const tester = new RuleTester();

tester.run("only-dev", rules["only-dev"].create, {
  valid: [
    'function __dev__thisisvalid() {};',
    'var a = function __dev__thisisvalid() {};',
    'var f = { __dev__thisisvalid: function() {} };',
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
      code: 'instance.__dev__thisisinvalid();',
      errors: [
        {
          message: '__dev__thisisinvalid must be called only in DEVELOPMENT environment.',
          type: 'MemberExpression',
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
    }
  ],
})
