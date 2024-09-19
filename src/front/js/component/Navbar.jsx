import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from '../../img/logo.png';
import '../../styles/navbar.css';
import { Context } from "../store/appContext";


export const Navbar = () => {

	const { store, actions } = useContext(Context)
	const Logout = () => {
		actions.Logout()
	}  


	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid d-flex">
				<Link to="/" className="navbar-logo" >
					<img src={logo} width="120" height="75"/>
					<span className="logo-text">SOUNDEX</span>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
					<ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
						<li className="nav-item">
							{store.currentUser ? 
							<Link to='#' onClick={()=>Logout()} className="nav-link">LogOut</Link>
							:
							<Link to="/loginsignup" className="nav-link" href="#">Log in / SignUp</Link>}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};