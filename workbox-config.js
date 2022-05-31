module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{svg,png,jpg,html,js,json,css,config,md}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};