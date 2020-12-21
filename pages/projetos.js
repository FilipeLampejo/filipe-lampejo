import { fetchAllPosts } from "../lib/contentful";
import Layout from "../components/layout";

import useTranslation from "next-translate/useTranslation";
import { ProjectList } from "../components/project";

export default function Projetos({ projects }) {
	let { t } = useTranslation();
	return (
		<Layout pageTitle={t("common:menu.projects")}>
			<ProjectList projects={projects} />
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
