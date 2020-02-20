module.exports = {
    'root': true,
    'extends': ['eslint:recommended'],
    'rules': {
        'no-console': [
            'error',
            {
                'allow': ['warn', 'error', 'info']
            }
        ],
        'indent': ['error', 2]
        // 'quotes': [
        //     'error',
        //     'single'
        // ],
        // 'semi': 'off'
    },
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'script'
    },
    'env': {
        'browser': false,
        'node': true,
        'es6': true,
        'mocha': true
    }
}
