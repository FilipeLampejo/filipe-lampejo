import { manageLocal } from "../utils/prismicHelpers";
import { queryRepeatableDocuments } from "../utils/queries";

import Meta from "../components/meta";
import Layout from "../components/layout";

import useTranslation from "next-translate/useTranslation";
import { ProjectList } from "../components/project";

export default function Projetos({ projects, lang }) {
	let { t } = useTranslation();
	return (
		<Layout>
			<Meta pageTitle={t("common:menu.projects")} />
			<ProjectList projects={projects} locale={lang.currentLang} />
		</Layout>
	);
}

export async function getStaticProps({
	// preview,
	// previewData,
	locale,
	locales,
}) {
	// const ref = previewData ? previewData.ref : null;
	// const isPreview = preview || false;
	const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

	const documents = await queryRepeatableDocuments(
		(doc) =>
			doc.type === "project" && doc.lang.slice(0, 2) === currentLang.slice(0, 2)
	);

	const projects = documents.map((p) => {
		return { ...p.data, slug: p.uid, lang: p.lang };
	});

	if (documents) {
		return {
			props: {
				projects,
				// preview: {
				// 	isActive: isPreview,
				// 	activeRef: ref,
				// },
				lang: {
					currentLang,
					isMyMainLanguage,
				},
			},
		};
	}
}
