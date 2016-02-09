var stylelint   = require('stylelint');
var report      = stylelint.utils.report;

var vendor = require("postcss").vendor;
var stylelint   = require('stylelint');
var ruleName    = 'known-property';
var knownProperties  = require('./../data');
var messages = stylelint.utils.ruleMessages(ruleName, {
    rejected: 'Nesting exceeds maximum nesting depth',
});

function knownPropertyPlugin(options) {
    return function validate(root, result) {

        root.walkDecls(function (decl) {
            var prop = decl.prop;
            if (knownProperties.indexOf(vendor.unprefixed(prop)) === -1) {
                report({
                    message: 'Unknown property: ' + prop,
                    node: decl,
                    result: result,
                    ruleName: ruleName
                });
            }
        });
    };
}

module.exports = stylelint.createPlugin(ruleName, knownPropertyPlugin);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
