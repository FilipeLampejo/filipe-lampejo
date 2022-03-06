import "../styles/globals.scss";

import ReactGA from 'react-ga';
ReactGA.initialize('G-TB2GCYR7WW');
ReactGA.pageview(window.location.pathname + window.location.search);

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
