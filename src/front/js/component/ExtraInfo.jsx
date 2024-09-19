import React from 'react';
import original from "../../img/image.jpg";
import hero from "../../img/heropic.jpg";
import frank from "../../img/frank.jpg";
import "../../styles/extrainfo.css";
import { Link } from "react-router-dom";

export const ExtraInfo = () => {
    return (
        <div>
            <h2 className='info-text'>Más Información</h2>
            <div className="card-container-extra">
                <Link className="text-decoration-none" to={'/artistprofile&id=1'}>
                    <div className="card-extra">
                        <img
                            src={original}
                            alt="Artista"
                            className="card-image-extra"
                        />
                        <div className="card-content-extra">
                            <h3>Marcel Rivero</h3>
                            <p>Jazz</p>
                            <p>
                                Es un artista de la región de Baleares, en España. Le encanta la música antigua, de la buena como suele decir.
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="card-extra">
                    <img
                        src={frank} // Reemplaza con la URL real de la imagen
                        alt="Canción Original"
                        className="card-image-extra"
                    />
                    <div className="card-content-extra">
                        <h3>Fly me to the moon</h3>
                        <p>Jazz</p>
                        <p>
                            La canción original fue compuesta por frank sinatra, un maestro del jazz
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

