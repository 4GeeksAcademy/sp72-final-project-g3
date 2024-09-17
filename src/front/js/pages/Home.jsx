import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { HeroSection } from "../component/HeroSection.jsx";
import { ReviewCard } from "../component/ReviewCard.jsx";
import { CoverCard } from "../component/CoverCard.jsx";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<HeroSection />
			<CoverCard />
			<ReviewCard />
		</div>
	);
};
