const nextTranslate = require("next-translate");

module.exports = {
	...nextTranslate({
		webpack: (config, { isServer, webpack }) => {
			return config;
		},
	}),
	images: {
		domains: ["images.prismic.io"],
		deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048],
	},
};
