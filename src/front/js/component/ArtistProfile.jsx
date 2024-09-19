import React, { useContext, useState } from "react";
import '../../styles/musicinfo.css';
import image from '../../img/image.jpg';
import { Context } from "../store/appContext";




export const ArtistProfile = () => {

    const { store } = useContext(Context);


    return (
        <div className="container component-container ">
            <div className="row">
                <div className="music-card col-md-12 col-sm-6">
                        <div className="music-info-container">
                            <img src={image} alt="" className="album-image" />
                            <div className="card-content col-sm-12">
                                <h1 className="album-title">Marcel Rivero</h1>
                                <h2 className="band-name">Greates Covers</h2>
                                <p className="album-genre">Alternaitve</p>
                                <p className="album-description">Es un artista de la región de Baleares, en España. Le encanta la música antigua, de la buena como suele decir. Está inspirado por artistas como Frank Sinatra, Bobby Darin, Jimmy durante, entre otros.
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};