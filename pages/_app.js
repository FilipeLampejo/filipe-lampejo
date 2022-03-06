import "../styles/globals.scss";

import ReactGA from 'react-ga';

function initializeAnalytics() {
	ReactGA.initialize('G-TB2GCYR7WW');
	ReactGA.pageview(window.location.pathname + window.location.search);
}

function MyApp({ Component, pageProps }) {
	initializeAnalytics();
	return <Component {...pageProps} />;
}

export default MyApp;
