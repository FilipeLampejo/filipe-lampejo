import "../styles/globals.scss";

import ReactGA from 'react-ga';

const history = createHistory()
ReactGA.initialize('UA-221231072-1');
history.listen((location, action) => {
    ReactGA.pageview(location.pathname + location.search);
    console.log(location.pathname)
});

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
