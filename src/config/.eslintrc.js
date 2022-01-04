module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 13,
	},
	rules: {
		'default-case-last': ['warn'],
		'default-param-last': ['error'],
		eqeqeq: ['error', 'always'],
		'func-style': ['warn', 'expression'],
		'no-alert': ['warn'],
		'no-console': ['warn'],
		'no-confusing-arrow': ['error', { allowParens: true }],
		'no-eval': ['error'],
		'no-floating-decimal': ['warn'],
		'no-lonely-if': ['warn'],
		yoda: ['error', 'never'],
	},
};
