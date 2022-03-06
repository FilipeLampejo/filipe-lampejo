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

import { useHomeIndex } from "../utils/hooks/useHomeIndex";
import { indexFetcher } from "../utils/fetcher";

import ReactGA from 'react-ga';
ReactGA.initialize('G-TB2GCYR7WW');

export default function Home({ doc, footer }) {
	const { data } = useHomeIndex();
	const projects = data
		? data.data.projetos
		: [{ projeto: { data: null, uid: "" } }];
	let { t } = useTranslation();
	const [heroInvisible, setHeroInvisible] = useState(false);

	if (doc && doc.data) {
		return (
			<Layout altLangs={doc.alternate_languages} footer={footer}>
				<Meta
					pageTitle={doc.data.seo_title || t("common:portfolio")}
					pageDesc={
						doc.data.seo_metadescription || RichText.asText(doc.data.bio)
					}
					pageImage={doc.data.seo_image?.url}
				/>
				<Hero
					title={doc.data.titulo}
					desc={<RichText render={doc.data.bio} />}
					invisible={heroInvisible && doc.data.hoverfx}
				/>
				<section className={`${styles.projectList} ${grid.inner}`}>
					{projects.map((p, i) => {
						const project = p.projeto;
						return (
							<ProjectThumb
								key={project.uid + i}
								onHover={(newState) => setHeroInvisible(newState)}
								project={{ ...project.data, slug: project.uid }}
								layoutInfo={{
									colstart: p.colstart,
									colend: p.colend,
									marginbottom: p.mbottom,
									image: p.image,
									hoverfx: doc.data.hoverfx,
								}}
							/>
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
	const doc = await indexFetcher(locale)

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
