/*
 * Config file for stylelint tool
 *
 * (c) 2016 Synesis LLC.
 * All Rights Reserved.
**/
module.exports = {
    plugins: [
        './src/index.js'
    ],
    rules: {
        'rule-no-duplicate-properties': true,
        'selector-no-universal': true,  // '*' in selector
        'known-property': {
            extra: [
                'blob'
            ]
        }
    }
};