import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

export default function Meta({ pageTitle, pageDesc, pageType, pageImage }) {
	let { t } = useTranslation();
	const { asPath } = useRouter();
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
			<meta name="copyright" content="Filipe Lampejo" />
			<meta name="designer" content="Penumbra design et web" />
			<meta name="robots" content="index,follow" />
			<link rel="canonical" href={`https://filipelampejo.cc${asPath}`} />
			<meta name="og:url" href={`https://filipelampejo.cc${asPath}`} />
			<link rel="icon" href="/favicon.svg" />
			<link rel="mask-icon" href="/favicon.svg" color="#000000" />
			<link rel="apple-touch-icon" href="/favicon.png" />
			<link rel="manifest" href="/manifest.json" />
			<meta property="og:title" content={tabInfo.title} />
			<meta property="og:type" content="website" />
			<meta property="og:description" content={tabInfo.desc} />
			<meta name="description" content={tabInfo.desc} />
			<meta name="og:title" content={tabInfo.title} />
			{pageImage && <meta name="og:image" content={pageImage} />}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="og:type" content={pageType || "website"} />
			<meta name="og:email" content="contato@filipelampejo.cc" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
}
