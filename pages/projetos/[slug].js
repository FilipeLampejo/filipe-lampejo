import grid from "../../styles/grid.module.scss";
import styles from "../../styles/pages/project.module.scss";

import { Client } from "../../lib/prismic";
import Prismic from "prismic-javascript";

import { RichText } from "prismic-reactjs";
import typography from "../../styles/typography.module.scss";

import Meta from "../../components/meta";
import { useRouter } from "next/router";
import SliceMachine from "../../components/sliceMachine";

export default function Project({ postData }) {
	let router = useRouter();

	const project =
		postData.filter(
			(project) => project.lang.toLowerCase() === router.locale.toLowerCase()
		)[0] || postData[0];
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
export async function getStaticPaths() {
	const client = Client();
	const response = await client.query(
		Prismic.Predicates.at("document.type", "project"),
		{ lang: "*" }
	);
	const paths = response
		? response.results.map((p) => {
				return {
					params: {
						slug: p.uid,
					},
				};
		  })
		: {};

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const client = Client();
	const response = await client.query(
		Prismic.Predicates.at("my.project.uid", params.slug),
		{ lang: "*" }
	);

	const postData = response
		? response.results.map((p) => {
				return { ...p.data, slug: p.uid, lang: p.lang };
		  })
		: [];

	return {
		props: {
			postData,
		},
	};
}
