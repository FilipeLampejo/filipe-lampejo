import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

export default function Meta({ pageTitle, pageDesc }) {
	let { t } = useTranslation();
	const tabInfo = {
		title: pageTitle
			? `${pageTitle} — ${t("common:title")}`
			: t("common:title"),
		desc: pageDesc ? pageDesc : t("common:desc"),
	};
	return (
		<Head>
			<title>{tabInfo.title}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="icon" href="/favicon.ico" />
			<meta name="theme-color" content="#ffffff" />
			<link rel="icon" href="/favicon.svg" />
			<link rel="mask-icon" href="/favicon.svg" color="#000000" />
			<link rel="apple-touch-icon" href="/favicon.png" />
			<link rel="manifest" href="/manifest.json" />
			<meta property="og:title" content={tabInfo.title} />
			<meta property="og:type" content="website" />
			<meta property="og:description" content={tabInfo.desc} />
			<meta name="description" content={tabInfo.desc} />
			<meta name="og:title" content={tabInfo.title} />
			<meta name="twitter:card" content="summary_large_image" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
}
