import { fetchAllPosts } from "../../lib/contentful";
import useTranslation from "next-translate/useTranslation";
import Layout from "../../components/layout";
import { useRouter } from "next/router";

export default function Project({ postData }) {
	let router = useRouter();
	const dt = (obj) => {
		if (!obj) return false;
		return obj[router.locale] || obj[router.defaultLocale];
	};
	console.log(dt(postData.title));
	return <Layout pageTitle={dt(postData.title)}>{dt(postData.title)}</Layout>;
}
export async function getStaticPaths() {
	const res = await fetchAllPosts({ contentType: "project" });
	const paths = res.map((p) => {
		return {
			params: {
				slug: p.fields.slug["pt-BR"],
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const res = await fetchAllPosts({
		contentType: "project",
		slug: params.slug,
	});
	const postData = res[0].fields;

	return {
		props: {
			postData,
		},
	};
}
