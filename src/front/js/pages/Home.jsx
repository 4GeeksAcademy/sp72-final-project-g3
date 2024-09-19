import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { HeroSection } from "../component/HeroSection.jsx";
import { ImageUploader } from "../component/ImageUploader.jsx";
import { ExtraInfo } from "../component/ExtraInfo.jsx";
import { CoverCardTrial } from "../component/CoverCardTrial.jsx";
import { InfoCover } from "../component/InforCover.jsx";


export const Home = () => {
	const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
	const token = 'your-auth-token';
	const { store, actions } = useContext(Context);

	const handleUploadSuccess = (imageUrl) => {
		setUploadedImageUrl(imageUrl);
	}

	return (
		<div className="text-center">
			<HeroSection />
			<CoverCardTrial />
			<InfoCover />
		</div>
	);
};
