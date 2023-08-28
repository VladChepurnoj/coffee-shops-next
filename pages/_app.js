import styles from "../styles/globals.css";

import StoreProvider from "../store/store-context";

function MyApp({ Component, pageProps }) {
	console.log(styles);
	return (
		<StoreProvider>
			<Component {...pageProps} />
		</StoreProvider>
	);
}

export default MyApp;

