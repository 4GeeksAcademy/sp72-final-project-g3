import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { CoverCard } from "../component/CoverCard.jsx";
import { HeroSection } from "../component/HeroSection.jsx";
import { ReviewCard } from "../component/ReviewCard.jsx";
import { MusicInfo } from "../component/MusicInfo.jsx"


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<HeroSection />
			<CoverCard />
			<MusicInfo />
			<ReviewCard />
		</div>
	);
};
