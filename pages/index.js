import { Client } from "../lib/prismic";
import Prismic from "prismic-javascript";

import Meta from "../components/meta";
import ProjectThumb from "../components/project";
import Hero from "../components/hero";

import styles from "../styles/pages/home.module.scss";
import grid from "../styles/grid.module.scss";

import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home({ projects }) {
	let { locale } = useRouter();
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
						(project) => project.lang.toLowerCase() == locale.toLowerCase()
					)
					.map((project) => (
						<div key={project.title} className={styles.project}>
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

export async function getStaticProps() {
	const client = Client();
	const response = await client.query(
		Prismic.Predicates.at("document.type", "project"),
		{ lang: "*" }
	);

	const projects = response
		? response.results.map((p) => {
				return { ...p.data, slug: p.uid, lang: p.lang };
		  })
		: [];

	projects.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});

	return {
		props: {
			projects,
		},
	};
}
