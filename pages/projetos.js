import { queryRepeatableDocuments } from "../utils/queries";
import useSWR from "swr";

import Meta from "../components/meta";
import Layout from "../components/layout";

import useTranslation from "next-translate/useTranslation";
import { ProjectList } from "../components/project";
import { useRouter } from "next/router";

export default function Projetos({ projects, lang }) {
	let { t } = useTranslation();
	const { locale } = useRouter();
	const { data } = useSWR(`project/${locale}`, fetcher, {
		revalidateOnMount: true,
	});

	return (
		<Layout>
			<Meta pageTitle={t("common:menu.projects")} />
			<ProjectList projects={data} locale={lang} />
		</Layout>
	);
}

async function fetcher(input) {
	const [docType, locale] = input.split("/");
	const documents = await queryRepeatableDocuments(
		(doc) => doc.type === docType && doc.lang.slice(0, 2) === locale.slice(0, 2)
	);
	const projects = documents.map((p) => {
		return { ...p.data, slug: p.uid, lang: p.lang };
	});
	console.log(projects, input);
	return projects;
}

// export async function getServerSideProps({
// 	// preview,
// 	// previewData,
// 	locale,
// 	// locales,
// }) {
// 	const projects = await fetcher(`project/${locale}`);
// 	if (projects) {
// 		return {
// 			props: {
// 				projects,
// 				lang: {
// 					locale,
// 				},
// 			},
// 		};
// 	} else {
// 		return {
// 			props: {
// 				projects: [],
// 				lang: {
// 					locale,
// 				},
// 			},
// 		};
// 	}
// }
