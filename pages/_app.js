import "../styles/globals.scss";

import ReactGA from 'react-ga';

ReactGA.initialize('UA-221231072-1');
ReactGA.pageview('/');

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
