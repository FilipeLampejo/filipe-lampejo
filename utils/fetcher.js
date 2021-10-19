import { queryRepeatableDocuments } from "./queries";
import { mutate } from "swr";
import { Client } from "./prismicHelpers";
import { localeToPrismic } from "./prismicHelpers";

export async function fetcher(input) {
	const [docType, locale] = input.split("/");
	const documents = await queryRepeatableDocuments(
		(doc) => doc.type === docType && doc.lang.slice(0, 2) === locale.slice(0, 2)
	);
	const projects = documents.map((p) => {
		return { ...p.data, slug: p.uid, lang: p.lang };
	});
	return projects;
}

export async function indexFetcher(locale) {
	const client = Client();
	return (
		(await client.getSingle("home", {
			lang: localeToPrismic(locale),
			fetchLinks: [
				"project.capa",
				"project.displaytitle",
				"project.categories",
				"category.title"
			],
		})) || {}
	);
}

export function fetchAndCache(key, fetcher) {
	const request = fetcher(key);
	mutate(key, request, false);
	return request;
}

export function getProjects(locale) {
	return fetchAndCache(`project/${locale}`, fetcher);
}

export function getHomeIndex(locale) {
	return fetchAndCache(locale, indexFetcher);
}
