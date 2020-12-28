import Footer from "../footer";
import Navbar from "../navbar";

export default function Layout({ children, altLangs }) {
	return (
		<>
			<Navbar altLangs={altLangs} />
			<main>{children}</main>
			<Footer />
		</>
	);
}
