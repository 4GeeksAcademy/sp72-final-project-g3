import React, { useContext, useState } from "react";
import '../../styles/musicinfo.css';
import coverthird from '../../img/coverthird.jpg';
import { Context } from "../store/appContext";




export const ArtistProfileThird = () => {

    const { store } = useContext(Context);


    return (
        <div className="container component-container ">
            <div className="row">
                <div className="music-card col-md-12 col-sm-6">
                        <div className="music-info-container">
                            <img src={coverthird} alt="" className="album-image" />
                            <div className="card-content col-sm-12">
                                <h1 className="album-title">Oswaldo Briceño</h1>
                                <h2 className="band-name">Mis Mejores Covers</h2>
                                <p className="album-genre">Pop</p>
                                <p className="album-description"> Este artista se especializa en realizar covers animados acompañados por la guitarra española, fusionando la calidez del flamenco con su pasión por la animación. Sus interpretaciones dan vida a canciones populares de manera única, combinando arreglos instrumentales vibrantes con visuales creativos, creando una experiencia envolvente que mezcla música y arte visual en perfecta armonía.
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};