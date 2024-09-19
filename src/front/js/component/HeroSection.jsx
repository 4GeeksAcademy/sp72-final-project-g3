import React from "react";
import '../../styles/index.css';
import heroImage from '../../img/heropic.jpg';
import { Link } from "react-router-dom";

export const HeroSection = () => {
    return (
        <div>
            <section className="hero-section" style={{ height: '1080', width: '1080', backgroundImage: `url(${heroImage})`,backgroundSize: 'cover', backgroundPosition: 'center', padding: '35px' }}>
                <div className="container">
                <div className="hero-content">
                    <h1 className="display-4 text-white">Amplificando voces, conectando pasiones</h1>
                    <p className="lead text-white mb-4">Soundex es donde las pasiones musicales se encuentran y las comunidades crecen, impulsadas por el amor compartido por la música.</p>
                    <Link to= {"/loginsignup"} className="btn-hero btn-lg" style={{backgroundColor: '#1F3D54', textDecoration: 'none'}} > Formar parte de la comunidad</Link>
                </div>
                </div>
            </section>
        </div>
    );
};