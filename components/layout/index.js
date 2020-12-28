import Footer from "../footer";
import Navbar from "../navbar";

export default function Layout({ children, footer, altLangs }) {
	return (
		<>
			<Navbar altLangs={altLangs} />
			<main>{children}</main>
			{footer && <Footer data={footer.data} />}
		</>
	);
}
