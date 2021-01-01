import { queryRepeatableDocuments } from "./queries";
import { mutate } from "swr";

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

export function fetchAndCache(key) {
	const request = fetcher(key);
	mutate(key, request, false);
	return request;
}

export function getProjects(locale) {
	return fetchAndCache(`project/${locale}`);
}
