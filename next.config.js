const nextTranslate = require("next-translate");

module.exports = {
	...nextTranslate(),
	images: {
		domains: ["images.ctfassets.net"],
	},
};
