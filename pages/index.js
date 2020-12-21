import { manageLocal } from "../utils/prismicHelpers";
import { queryRepeatableDocuments } from "../utils/queries";

import Meta from "../components/meta";
import ProjectThumb from "../components/project";
import Hero from "../components/hero";

import styles from "../styles/pages/home.module.scss";
import grid from "../styles/grid.module.scss";

import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

export default function Home({ projects, lang }) {
	let { t } = useTranslation();
	const [heroInvisible, setHeroInvisible] = useState(false);

	return (
		<>
			<Meta />
			<Hero
				title={t("common:title")}
				desc={t("common:desc")}
				invisible={heroInvisible}
			/>
			<section className={`${styles.projectList} ${grid.inner}`}>
				{projects
					.filter(
						(project) =>
							project.lang.toLowerCase() == lang.currentLang.toLowerCase()
					)
					.map((project) => (
						<div key={project.slug} className={styles.project}>
							<ProjectThumb
								onHover={(newState) => setHeroInvisible(newState)}
								project={project}
							/>
						</div>
					))}
			</section>
		</>
	);
}

export async function getStaticProps({
	preview,
	previewData,
	locale,
	locales,
}) {
	const ref = previewData ? previewData.ref : null;
	const isPreview = preview || false;

	const documents = await queryRepeatableDocuments(
		(doc) => doc.type === "project"
	);

	const projects = documents.map((p) => {
		return { ...p.data, slug: p.uid, lang: p.lang };
	});

	projects.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});

	const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

	return {
		props: {
			projects,
			preview: {
				isActive: isPreview,
				activeRef: ref,
			},
			lang: {
				currentLang,
				isMyMainLanguage,
			},
		},
	};
}
