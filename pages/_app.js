import "../styles/globals.scss";

import ReactGA from 'react-ga';
ReactGA.initialize('UA-221231072-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
