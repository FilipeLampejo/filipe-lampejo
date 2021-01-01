import { useProjects } from "../utils/hooks/useProjects";
import Meta from "../components/meta";
import Layout from "../components/layout";

import useTranslation from "next-translate/useTranslation";
import { ProjectList } from "../components/project";

import { Client, localeToPrismic } from "../utils/prismicHelpers";

export default function Projetos({ footer }) {
	let { t } = useTranslation();
	const { data } = useProjects();

	return (
		<Layout footer={footer}>
			<Meta pageTitle={t("common:menu.projects")} />
			<ProjectList projects={data} />
		</Layout>
	);
}

export async function getStaticProps({ locale }) {
	const client = Client();
	const footer =
		(await client.getSingle("contato", { lang: localeToPrismic(locale) })) ||
		{};

	return {
		props: {
			footer: footer || {},
		},
	};
}
