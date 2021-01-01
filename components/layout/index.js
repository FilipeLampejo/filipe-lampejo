import Footer from "../footer";
import Navbar from "../navbar";
import { useEffect } from "react";
import { getProjects } from "../../utils/fetcher";

export default function Layout({ children, footer, altLangs }) {
	useEffect(() => getProjects(), []);
	return (
		<>
			<Navbar altLangs={altLangs} />
			<main>{children}</main>
			{footer && <Footer data={footer.data} />}
		</>
	);
}
