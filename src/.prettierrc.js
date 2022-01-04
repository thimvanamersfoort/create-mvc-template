module.exports = {
	endOfLine: 'auto',
	semi: true,
	singleQuote: false,
	tabWidth: 2,
	useTabs: true,

	overrides: [
		{
			files: '**/*.js',
			options: {
				singleQuote: true,
			},
		},
	],
};
