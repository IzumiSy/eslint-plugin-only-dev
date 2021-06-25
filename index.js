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
          if (
            node.parent.type == "ExpressionStatement" &&
            node.parent.parent.type == "BlockStatement" &&
            node.parent.parent.parent.type == "FunctionDeclaration" &&
            node.parent.parent.parent.id.name.includes("__dev__")
          ) {
            return
          } else if (
            node.parent.type == "ExpressionStatement" &&
            node.parent.parent.type == "BlockStatement" &&
            node.parent.parent.parent.type == "FunctionExpression" &&
            node.parent.parent.parent.parent.type == "Property" &&
            node.parent.parent.parent.parent.key.name.includes("__dev__")
          ) {
            return
          }

          if (node.callee.type == "Identifier") {
            if (node.callee.name && node.callee.name.includes("__dev__")) {
              report(node.callee, node.callee.name)
            }
          } else if (node.callee.type == "MemberExpression") {
            if (node.callee.object.name && node.callee.object.name.includes("__dev__")) {
              report(node.callee.object, node.callee.object.name)
            }

            if (node.callee.property.name && node.callee.property.name.includes("__dev__")) {
              report(node.callee.property, node.callee.property.name)
            }
          }
        },

        VariableDeclarator(node) {
          if (node.id.name && !node.id.name.includes("__dev__")) {
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
          }
        },
      };
    },
  },
};

module.exports = {
  rules,
};
