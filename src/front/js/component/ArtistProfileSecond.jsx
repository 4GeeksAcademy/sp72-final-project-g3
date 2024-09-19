import React, { useContext, useState } from "react";
import '../../styles/musicinfo.css';
import coversecond from '../../img/coversecond.jpg';
import { Context } from "../store/appContext";




export const ArtistProfileSecond = () => {

    const { store } = useContext(Context);


    return (
        <div className="container component-container ">
            <div className="row">
                <div className="music-card col-md-12 col-sm-6">
                        <div className="music-info-container">
                            <img src={coversecond} alt="" className="album-image" />
                            <div className="card-content col-sm-12">
                                <h1 className="album-title">Jaime Alvarez</h1>
                                <h2 className="band-name">Recopilatorio V2</h2>
                                <p className="album-genre">Rock</p>
                                <p className="album-description"> El artista detrás de este cover es un cantante y compositor emergente, conocido por su enfoque introspectivo y emocional. Con una voz delicada y una habilidad única para reinterpretar clásicos, transforma canciones icónicas en versiones íntimas, llenas de sensibilidad y profundidad.
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};