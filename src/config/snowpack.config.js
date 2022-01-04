module.exports = {
	mount: {
		views: '/',
		assets: { url: '/assets', static: true },
	},
	devOptions: {
		port: 3000,
	},
	exclude: [],
	buildOptions: {
		out: './',
		metaUrlPath: './assets/lib',
	},
};
