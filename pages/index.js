import { Client, manageLocal, localeToPrismic } from "../utils/prismicHelpers";

import Meta from "../components/meta";
import ProjectThumb from "../components/project";
import Hero from "../components/hero";

import styles from "../styles/pages/home.module.scss";
import grid from "../styles/grid.module.scss";

import Layout from "../components/layout";

import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { RichText } from "prismic-reactjs";

export default function Home({ doc, footer, lang }) {
	let { t } = useTranslation();
	const [heroInvisible, setHeroInvisible] = useState(false);

	if (doc && doc.data) {
		return (
			<Layout altLangs={doc.alternate_languages} footer={footer}>
				<Meta
					pageTitle={t("common:portfolio")}
					pageDesc={RichText.asText(doc.data.bio)}
				/>
				<Hero
					title={doc.data.titulo}
					desc={<RichText render={doc.data.bio} />}
					invisible={heroInvisible}
				/>
				<section className={`${styles.projectList} ${grid.inner}`}>
					{doc.data.projetos.map((p, i) => {
						const project = p.projeto;
						return (
							<div key={project.slug} className={styles.project}>
								<ProjectThumb
									onHover={(newState) => setHeroInvisible(newState)}
									project={{ ...project.data, slug: project.uid }}
								/>
							</div>
						);
					})}
				</section>
			</Layout>
		);
	} else {
		return <Meta pageTitle={t("common:portfolio")} />;
	}
}

export async function getStaticProps({
	preview,
	previewData,
	locale,
	locales,
}) {
	const ref = previewData ? previewData.ref : null;
	const isPreview = preview || false;

	const client = Client();
	const doc =
		(await client.getSingle("home", {
			lang: localeToPrismic(locale),
			fetchLinks: [
				"project.capa",
				"project.displaytitle",
				"project.categories",
			],
		})) || {};

	const footer =
		(await client.getSingle("contato", { lang: localeToPrismic(locale) })) ||
		{};

	const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

	return {
		props: {
			doc: doc || {},
			footer: footer || {},
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
