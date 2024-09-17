import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { CoverCard } from "../component/CoverCard.jsx";
import { HeroSection } from "../component/HeroSection.jsx";
import { ImageUploader } from "../component/ImageUploader.jsx";


export const Home = () => {
	const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
	const token = 'your-auth-token';
	const { store, actions } = useContext(Context);

	const handleUploadSuccess = (imageUrl) => {
		setUploadedImageUrl(imageUrl);
	}

	return (
		<div className="text-center mt-5">
			<HeroSection />
			<CoverCard />
			<div>
				<h1>Perfil de Usuario</h1>
				< ImageUploader token={token} onUploadSuccess={handleUploadSuccess} />
				{uploadedImageUrl && (
					<div>
						<h2>Artwork del cover</h2>
						<img src={uploadedImageUrl} alt="Uploaded image" />
					</div>
				)}
			</div>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
