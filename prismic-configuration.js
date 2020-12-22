module.exports = {
	// -- Prismic API endpoint
	// Determines which repository to query and fetch data from
	// Configure your site's access point here
	apiEndpoint: "https://filipe-lampejo.cdn.prismic.io/api/v2",
	// process.env.NEXT_PUBLIC_PRISMIC_API_ENDPOINT,
	accessToken:
		"MC5YOTlma1JFQUFDQUE2TUJB.Ne-_ve-_ve-_ve-_vTLvv73vv70377-977-9Ou-_ve-_vQd977-9R1xVeu-_vSgCVw_vv70J77-977-9I3I",
	// process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN

	// -- Link resolution rules
	// Manages links to internal Prismic documents
	// Modify as your project grows to handle any new routes you've made
	linkResolver: function (doc) {
		if (doc.type === "project") {
			return `/${doc.lang}/projetos/${doc.uid}`;
		}
		if (doc.type === "homepage") {
			return `/${doc.lang}`;
		}
		return "/";
	},

	// Additional helper function for Next/Link component
	hrefResolver: function (doc) {
		if (doc.type === "project") {
			return `/${doc.lang}/projetos/${doc.uid}`;
		}
		if (doc.type === "homepage") {
			return `/${doc.lang}`;
		}
		return "/";
	},
};
