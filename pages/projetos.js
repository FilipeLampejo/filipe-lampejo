import { queryRepeatableDocuments } from "../utils/queries";
import useSWR from "swr";

import Meta from "../components/meta";
import Layout from "../components/layout";

import useTranslation from "next-translate/useTranslation";
import { ProjectList } from "../components/project";
import { useRouter } from "next/router";
import { Client, localeToPrismic } from "../utils/prismicHelpers";

export default function Projetos({ footer }) {
	let { t } = useTranslation();

	const { locale } = useRouter();
	const { data } = useSWR(`project/${locale}`, fetcher, {
		revalidateOnFocus: false,
		revalidateOnMount: true,
		revalidateOnReconnect: false,
	});

	return (
		<Layout footer={footer}>
			<Meta pageTitle={t("common:menu.projects")} />
			<ProjectList projects={data} />
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
	return projects;
}

export async function getStaticProps({ locale }) {
	const client = Client();
	const footer =
		(await client.getSingle("contato", { lang: localeToPrismic(locale) })) ||
		{};

	return {
		props: {
			footer,
		},
	};
}
