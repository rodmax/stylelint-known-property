var stylelint   = require('stylelint');
var report      = stylelint.utils.report;

var vendor = require("postcss").vendor;
var stylelint   = require('stylelint');
var ruleName    = 'known-property';
var knownProperties  = require('./../data');
var messages = stylelint.utils.ruleMessages(ruleName, {
    rejected: function(propName) {
        return'Unknown property: ' + propName;
    }
});

var defaults = {
    extra: []
};

function knownPropertyPlugin(options) {
    var props = knownProperties.concat(options.extra);
    return function validate(root, result) {

        root.walkDecls(function (decl) {
            var prop = decl.prop;
            if (props.indexOf(vendor.unprefixed(prop)) === -1) {
                report({
                    message: messages.rejected(prop),
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
