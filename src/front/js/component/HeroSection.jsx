import React from "react";
import '../../styles/index.css';
import heroImage from '../../img/heropic.jpg';
/* import image from '../../img/hero-' */

export const HeroSection = () => {
    return (
        <div>
            <section className="hero-section" style={{ height: '1080', width: '1080', backgroundImage: `url(${heroImage})`,backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container">
                <div className="hero-content">
                    <h1 className="display-4 text-white">Somo la mejor comunidad para descubrir artistas emergentes</h1>
                    <p className="lead text-white mb-4">Una vez formes parte de la comunidad vas a poder ver los covers, artistas y también dejar tu valoraciones y comentarios.</p>
                    <a href="#productos" className="btn btn-primary btn-lg">Formar parte de la comunidad</a>
                </div>
                </div>
            </section>
        </div>
    );
};