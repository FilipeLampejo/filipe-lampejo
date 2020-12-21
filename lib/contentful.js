import { useRouter } from "next/router";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require("contentful").createClient({
	space: space,
	accessToken: accessToken,
});

export async function fetchPost(entryId) {
	const entry = await client.getEntry(entryId);
	if (entry) return entry;
	console.warn(`Error getting Entries for ${entryId}.`);
}

export const dt = (obj) => {
	let router = useRouter();
	return obj[router.locale] || obj[router.defaultLocale];
};

export async function fetchAllPosts({ contentType, slug }) {
	let settings = {
		content_type: contentType,
		locale: "*",
	};
	if (slug) settings["fields.slug[in]"] = slug;

	const entries = await client.getEntries(settings);
	if (entries.items) return entries.items;
	console.warn(`Error getting Entries for ${contentType.name}.`);
}
