import useSWR from "swr";
import { useRouter } from "next/router";
import { Client, localeToPrismic } from "../prismicHelpers";
import Prismic from "prismic-javascript";

export const fetchAllProjects = async (key) => {
	const [,locale] = key.split("-");
	const lang = localeToPrismic(locale);
	const response = await Client().query(Prismic.Predicates.at('document.type','project'), { pageSize: 100, fetchLinks: "category.title", lang: lang });
	return response.results || [];
}

export function useProjects(initialData = []) {
	const { locale } = useRouter();
	
	
	return useSWR(`projects-${locale}`, fetchAllProjects,{
		initialData,
		revalidateOnFocus: false,
		revalidateOnMount: true,
		revalidateOnReconnect: false,
	});
}
