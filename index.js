const rules = {
  "only-dev": {
    meta: {
      type: "problem",
      docs: {},
    },
    create: function(context) {
      const report = (node, name) => {
        context.report({
          node,
          message: `${name} must be called only in DEVELOPMENT environment.`
        })
      }

      return {
        CallExpression(node) {
          if (process.env.NODE_ENV != "development") {
            if (node.callee.name && node.callee.name.includes("__dev__")) {
              report(node.callee, node.callee.name)
            }

            if (node.callee.property && node.callee.property.name.includes("__dev__")) {
              report(node.callee, node.callee.property.name)
            }
          }
        },
      };
    },
  },
};

module.exports = {
  rules,
};
