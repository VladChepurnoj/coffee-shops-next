// import "../styles/globals.css";
import styles from "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	console.log(styles);
	return (
		<div>
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;

