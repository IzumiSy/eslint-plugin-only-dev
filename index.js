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

      if (["development", "test"].includes(process.env.NODE_ENV)) {
        return {}
      }

      return {
        CallExpression(node) {
          if (node.callee.name && node.callee.name.includes("__dev__")) {
            report(node.callee, node.callee.name)
          }

          if (node.callee.property && node.callee.property.name.includes("__dev__")) {
            report(node.callee, node.callee.property.name)
          }
        },

        VariableDeclarator(node) {
          if (node.init.name && node.init.name.includes("__dev__")) {
            report(node.init, node.init.name)
          }

          if (node.init.properties) {
            node.init.properties.forEach(p => {
              if (p.value.name && p.value.name.includes("__dev__")) {
                report(p.value, p.value.name)
              }
            })
          }
        },
      };
    },
  },
};

module.exports = {
  rules,
};
