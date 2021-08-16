module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		curly: 'error',
		quotes: ['warn', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
		'no-unused-vars': ['error'],
		semi: ['error'],
		'no-use-before-define': 'error',
		'no-undef': 'error',
		'no-multi-spaces': 'warn',
		indent: ['warn', 'tab'],
	},
};
