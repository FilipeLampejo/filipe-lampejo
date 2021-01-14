import Footer from "../footer";
import Navbar from "../navbar";
import { useEffect } from "react";
import { getProjects } from "../../utils/fetcher";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Layout({ children, footer, altLangs }) {
	const { locale } = useRouter();
	useEffect(() => getProjects(locale), []);
	return (
		<>
			<Head>
				<link rel="preload" href="/fonts/Antwerp-Light.woff" />
				<link rel="preload" href="/fonts/Antwerp-LightItalic.woff" />
			</Head>
			<Navbar altLangs={altLangs} />
			<main>{children}</main>
			{footer && <Footer data={footer.data} />}
		</>
	);
}
