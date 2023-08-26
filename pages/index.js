"use client";
import { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import coffeeStoresData from "../data/coffee-stores.json";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";

import { ACTION_TYPES, StoreContext } from "./_app";

export async function getStaticProps(context) {
	const coffeeStores = fetchCoffeeStores();
	return {
		props: { coffeeStores },
	};
}

export default function Home(props) {
	console.log("props", props);

	const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
		useTrackLocation();

	// const [coffeeStores, setCoffeeStores] = useState("");
	const [coffeeStoresError, setCoffeeStoresError] = useState(null);

	const { dispatch, state } = useContext(StoreContext);

	const { coffeeStores, latLong } = state;

	useEffect(() => {
		async function setCoffeeStoresByLocation() {
			if (latLong) {
				try {
					const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);
					console.log({ fetchedCoffeeStores });
					// setCoffeeStores(fetchedCoffeeStores);
					dispatch({
						type: ACTION_TYPES.SET_COFFEE_STORES,
						payload: {
							coffeeStores: fetchedCoffeeStores,
						},
					});
				} catch (error) {
					//set error
					console.log({ error });
					setCoffeeStoresError(error.message);
				}
			}
		}
		setCoffeeStoresByLocation();
	}, [latLong]);

	const handleOnBannerBtnClick = () => {
		console.log("hi banner button");
		handleTrackLocation();
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Connoisseur</title>
				<link rel="icon" href="../public/static/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<Banner
					buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
					handleOnClick={handleOnBannerBtnClick}
				/>
				{locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
				{coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
				<div className={styles.heroImage}>
					<Image src="/static/hero-image.png" width={700} height={400} />
				</div>

				{coffeeStores.length > 0 && (
					<div className={styles.sectionWrapper}>
						<h2 className={styles.heading2}>Stores near me</h2>
						<div className={styles.cardLayout}>
							{coffeeStores.map((coffeeStore) => {
								return (
									<Card
										key={coffeeStore.id}
										name={coffeeStore.name}
										imgUrl={
											coffeeStore.imgUrl ||
											"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
										}
										href={`/coffee-store/${coffeeStore.id}`}
										className={styles.card}
									/>
								);
							})}
						</div>
					</div>
				)}
				<div className={styles.sectionWrapper}>
					<div className={styles.heroImage}>
						<Image src="/static/hero-image.png" width={700} height={400} />
					</div>
					{props.coffeeStores.length > 0 && (
						<>
							<h2 className={styles.heading2}>Toronto stores</h2>
							<div className={styles.cardLayout}>
								{props.coffeeStores.map((coffeeStore) => {
									return (
										<Card
											key={coffeeStore.id}
											name={coffeeStore.name}
											imgUrl={
												coffeeStore.imgUrl ||
												"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
											}
											href={`/coffee-store/${coffeeStore.id}`}
											className={styles.card}
										/>
									);
								})}
							</div>
						</>
					)}
				</div>
			</main>
		</div>
	);
}

