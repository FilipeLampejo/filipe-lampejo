import Footer from "../footer";
import Navbar from "../navbar";
import { useEffect } from "react";
import { getProjects } from "../../utils/fetcher";
import { useRouter } from "next/router";

export default function Layout({ children, footer, altLangs }) {
	const { locale } = useRouter();
	useEffect(() => getProjects(locale), []);
	return (
		<>
			<Navbar altLangs={altLangs} />
			<main>{children}</main>
			{footer && <Footer data={footer.data} />}
		</>
	);
}
