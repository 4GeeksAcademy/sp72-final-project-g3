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
import { Artist } from "./pages/Artist.jsx";
import { ArtistProfile } from "./pages/ArtistProfile.jsx";
import { Artists } from "./pages/Artists.jsx";
import { Covers } from "./pages/Covers.jsx";
import { Cover } from "./pages/Cover.jsx";
import { ProfileFan } from "./pages/ProfileFan.jsx";



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
                        <Route element={<ProfileFan/>} path="/pages/ProfileFan"/>
                        <Route element={<Cover />} path="/pages/Cover" />
                        <Route element={<Covers />} path="/pages/Covers" />
                        <Route element={<ArtistProfile />} path="/pages/ArtistProfile" />
                        <Route element={<Artist />} path="/pages/Artist" />
                        <Route element={<Artists />} path="/pages/Artists" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
