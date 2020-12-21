import { Client } from "../lib/prismic";
import Prismic from "prismic-javascript";

import { useRouter } from "next/router";
import Meta from "../components/meta";

import useTranslation from "next-translate/useTranslation";
import { ProjectList } from "../components/project";

export default function Projetos({ projects }) {
	let { t } = useTranslation();
	let router = useRouter();
	return (
		<>
			<Meta pageTitle={t("common:menu.projects")} />
			<ProjectList projects={projects} locale={router.locale} />
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
