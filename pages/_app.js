import "../styles/globals.scss";

import ReactGA from 'react-ga';

ReactGA.initialize('UA-221231072-1');
if (typeof window !== 'undefined') { 
	ReactGA.set({ page: window.location.pathname }); 
	ReactGA.pageview(window.location.pathname); 
} 

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
