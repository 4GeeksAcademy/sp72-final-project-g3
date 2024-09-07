import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/soundex2.0.jpg";
import navbar from "../../styles/navbar.css";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<img src={logo} alt="" className="navbar-logo"/>
			<Link className="navbar-brand" to="/">Soundex</Link>
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav ms-auto">
					<li className="nav-item">
						<Link className="nav-link active" aria-current="page" to="/">Home</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="#">Features</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="#">Pricing</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link disabled" to="#" tabIndex="-1" aria-disabled="true">Disabled</Link>
					</li>
				</ul>
			</div>

		</nav>
	);
};

