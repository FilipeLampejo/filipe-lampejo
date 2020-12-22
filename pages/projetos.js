import { manageLocal } from "../utils/prismicHelpers";
import { queryRepeatableDocuments } from "../utils/queries";

import Meta from "../components/meta";

import useTranslation from "next-translate/useTranslation";
import { ProjectList } from "../components/project";

export default function Projetos({ projects, lang }) {
	let { t } = useTranslation();
	return (
		<>
			<Meta pageTitle={t("common:menu.projects")} />
			<ProjectList projects={projects} locale={lang.currentLang} />
		</>
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

	const documents = await queryRepeatableDocuments(
		(doc) => doc.type === "project"
	);

	const projects = documents.map((p) => {
		return { ...p.data, slug: p.uid, lang: p.lang };
	});

	const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

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
