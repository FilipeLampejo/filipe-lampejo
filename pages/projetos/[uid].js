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
	footer,
	// lang,
	// preview
}) {
	if (doc && doc.data) {
		// useUpdatePreviewRef(preview, doc.id);
		const project = doc.data;
		return (
			<Layout altLangs={doc.alternate_languages} footer={footer}>
				<article className={styles.container}>
					<Meta
						pageTitle={RichText.asText(project.displaytitle) || project.titulo}
						pageDesc={RichText.asText(project.sobre)}
						pageType="article"
						pageImage={
							project.capa
								? project.capa.SEO
									? project.capa.SEO.url
									: project.capa.url
								: ""
						}
					/>
					<header className={`${grid.col} ${styles.header}`}>
						<div className={`${styles.title} ${typography.headingOne}`}>
							{project.displaytitle ? (
								<RichText render={project.displaytitle} />
							) : (
								<h1>{project.titulo}</h1>
							)}
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
		fallback: true,
	};
}

export async function getStaticProps({ params, locale }) {
	const client = Client();
	const doc = await client.getByUID(
		"project",
		params.uid,
		// ref ? { ref, lang: locale } :
		{ lang: localeToPrismic(locale) }
	);
	const footer =
		(await client.getSingle("contato", { lang: localeToPrismic(locale) })) ||
		{};

	if (doc) {
		return {
			revalidate: 60,
			props: {
				doc: doc || {},
				footer: footer || {},
			},
		};
	}
	return { revalidate: 10, props: { doc: [], footer: [] } };
}
