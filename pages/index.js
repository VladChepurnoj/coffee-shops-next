"use client";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import coffeeStoresData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
	const options = {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: "heregoesapikey,willgetitlater",
		},
	};

	const response = await fetch(
		"https://api.foursquare.com/v3/places/search",
		options
	);
	const data = response.json();

	return {
		props: { coffeeStores: data },
	};
}

export default function Home(props) {
	console.log("props", props);
	const handleOnBannerBtnClick = () => {
		console.log("hi banner button");
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Connoisseur</title>
				<link rel="icon" href="../public/static/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<Banner
					buttonText="View stores nearby"
					handleOnClick={handleOnBannerBtnClick}
				/>
				<div className={styles.heroImage}>
					<Image src="/static/hero-image.png" width={700} height={400} />
				</div>
				{coffeeStoresData.length > 0 && (
					<>
						<h2 className={styles.heading2}>Toronto Stores</h2>
						<div className={styles.cardLayout}>
							{coffeeStoresData.map((coffeeStore) => {
								return (
									<Card
										key={coffeeStore.fsq_id}
										name={coffeeStore.name}
										imgUrl={coffeeStore.imgUrl}
										href={`/coffee-store/${coffeeStore.fsq_id}`}
										className={styles.card}
									/>
								);
							})}
						</div>
					</>
				)}
			</main>
		</div>
	);
}

