import { fetchAllPosts } from "../lib/contentful";
import Layout from "../components/layout";
import ProjectThumb from "../components/project";
import Hero from "../components/hero";

import styles from "../styles/pages/home.module.scss";
import grid from "../styles/grid.module.scss";

import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

export default function Home({ projects }) {
	let { t } = useTranslation();
	const [heroInvisible, setHeroInvisible] = useState(false);

	return (
		<Layout home>
			<Hero
				title={t("common:title")}
				desc={t("common:desc")}
				invisible={heroInvisible}
			/>
			<section className={`${styles.projectList} ${grid.inner}`}>
				{projects.map((project) => (
					<div key={project.title} className={styles.project}>
						<ProjectThumb
							onHover={(newState) => setHeroInvisible(newState)}
							project={project}
						/>
					</div>
				))}
			</section>
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetchAllPosts({ contentType: "project" });

	const projects = res.map((p) => {
		return p.fields;
	});

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
