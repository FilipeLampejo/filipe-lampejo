import grid from "../../styles/grid.module.scss";
import styles from "../../styles/pages/project.module.scss";

// import { Client } from "../../lib/prismic";
// import Prismic from "prismic-javascript";

import { RichText } from "prismic-reactjs";
import typography from "../../styles/typography.module.scss";

import Meta from "../../components/meta";
// import { useRouter } from "next/router";
import SliceMachine from "../../components/sliceMachine";

import { queryRepeatableDocuments } from "../../utils/queries";
import { Client, manageLocal } from "../../utils/prismicHelpers";
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
			<article>
				<Meta pageTitle={project.titulo} />
				<header className={`${grid.col} ${styles.header}`}>
					<h1 className={`${styles.title} ${typography.headingOne}`}>
						<RichText render={project.displaytitle} />
					</h1>
					<div className={styles.info}>
						<RichText render={project.sobre} />
					</div>
				</header>
				<SliceMachine slices={project.body} />
			</article>
		);
	}
}

export async function getStaticPaths() {
	const documents = await queryRepeatableDocuments(
		(doc) => doc.type === "project"
	);

	return {
		paths: documents.map((doc) => {
			return {
				params: { uid: doc.uid },
				locale: doc.lang.slice(0, 3) + doc.lang.slice(3).toUpperCase(),
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
		{ lang: locale }
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

	// const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

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
