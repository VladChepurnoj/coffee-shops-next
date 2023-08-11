import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="preload"
						href="/fonts/Lato-Bold.ttf"
						as="font"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/fonts/Lato-Regular.ttf"
						as="font"
						crossOrigin="anonymous"
					/>

					<link
						rel="preload"
						href="/fonts/Lato-Italic.ttf"
						as="font"
						crossOrigin="anonymous"
					/>
				</Head>
				<body>
					<Main></Main>
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
// F:\PROGRAMMINGPROJECTS\ZMT\NEXT\discover-coffee-stores\public\fonts\Lato-Regular.ttf
