import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
// Custom components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom Pages
import { Home } from "./pages/Home.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { LoginSignup } from "./pages/LoginSignup.jsx";
import { Cover } from "./pages/Cover.jsx";
import { ArtistPage } from "./pages/ArtistPage.jsx";
import { ArtistProfile } from "./component/ArtistProfile.jsx";
import { CoverFirst } from "./pages/CoverFirst.jsx";
import { CoverSecond } from "./pages/CoverSecond.jsx";
import { CoverThird } from "./pages/CoverThird.jsx";
import { ArtistProfileSecond } from "./component/ArtistProfileSecond.jsx";
import { ArtistProfileThird } from "./component/ArtistProfileThird.jsx";
import { PoliticasDeCoikies } from "./pages/PoliticasDeCookies.jsx";



// Create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Error404/>} path="*"/>
                        <Route element={<LoginSignup/>} path="/loginsignup"/>
                        <Route element={<Cover/>} path="/cover"/>
                        <Route element={<ArtistPage/>} path="/artistpage"/>
                        <Route element={<ArtistProfile/>} path="/artistprofile&id=1"/>
                        <Route element={<CoverFirst />} path="/cover&id=1"/>
                        <Route element={<CoverSecond/>} path="/cover&id=2"/>
                        <Route element={<ArtistProfileSecond />} path="/artistprofile&id=2"/>
                        <Route element={<CoverThird/>} path="/cover&id=3"/>
                        <Route element={<ArtistProfileThird />} path="/artistprofile&id=3"/>
                        <Route element={<PoliticasDeCoikies/>} path="/politicasdecookies" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
