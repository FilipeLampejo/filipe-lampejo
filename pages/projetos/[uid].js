import grid from "../../styles/grid.module.scss";
import styles from "../../styles/pages/project.module.scss";

// import { Client } from "../../lib/prismic";
// import Prismic from "prismic-javascript";

import { RichText } from "prismic-reactjs";
import typography from "../../styles/typography.module.scss";

import Meta from "../../components/meta";
// import { useRouter } from "next/router";
import SliceMachine from "../../components/sliceMachine";
import Layout from "../../components/layout";

import { queryRepeatableDocuments } from "../../utils/queries";
import {
	Client,
	localeToNext,
	localeToPrismic,
} from "../../utils/prismicHelpers";
// import useUpdatePreviewRef from "../../utils/hooks/useUpdatePreviewRef";

export default function Project({
	doc,
	// lang,
	// preview
}) {
	if (doc && doc.data) {
		// useUpdatePreviewRef(preview, doc.id);
		const project = doc.data;
		return (
			<Layout altLangs={doc.alternate_languages}>
				<article className={styles.container}>
					<Meta
						pageTitle={project.titulo}
						pageDesc={RichText.asText(project.sobre)}
						pageType="article"
						pageImage={project.capa.url}
					/>
					<header className={`${grid.col} ${styles.header}`}>
						<h1 className={`${styles.title} ${typography.headingOne}`}>
							<RichText render={project.displaytitle} />
						</h1>
						<div className={`${styles.info} ${typography.body}`}>
							<RichText render={project.sobre} />
						</div>
					</header>
					<SliceMachine slices={project.body} />
				</article>
			</Layout>
		);
	}
	return (
		<Layout>
			<article className={styles.container}>
				Couldn't load page. This is a technical issue and not your fault at all.
				Please contact people@penumbra.design and we'll try our best to sort it
				out.
			</article>
		</Layout>
	);
}

export async function getStaticPaths() {
	const documents = await queryRepeatableDocuments(
		(doc) => doc.type === "project"
	);

	return {
		paths: documents.map((doc) => {
			return {
				params: { uid: doc.uid },
				locale: localeToNext(doc.lang),
			};
		}),
		fallback: false,
	};
}

export async function getStaticProps({
	// preview,
	// previewData,
	params,
	locale,
	// locales,
}) {
	// const ref = previewData ? previewData.ref : null;
	// const isPreview = preview || false;
	const client = Client();
	const doc = await client.getByUID(
		"project",
		params.uid,
		// ref ? { ref, lang: locale } :
		{ lang: localeToPrismic(locale) }
	);
	// const menu =
	// 	(await client.getSingle(
	// 		"top_menu",
	// 		ref ? { ref, lang: locale } : { lang: locale }
	// 	)) || {};
	// const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

	if (doc) {
		return {
			props: {
				// menu,
				doc: doc ? doc : {},
				// preview: {
				// 	isActive: isPreview,
				// 	activeRef: ref,
				// },
				// lang: {
				// 	currentLang,
				// 	isMyMainLanguage,
				// },
			},
		};
	}
}
