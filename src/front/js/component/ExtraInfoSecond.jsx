import React from 'react';
import original from "../../img/image.jpg";
import coversecond from "../../img/coversecond.jpg";
import creep from "../../img/creep.jpg";
import "../../styles/extrainfo.css";
import { Link } from "react-router-dom";

export const ExtraInfoSecond = () => {
    return (
        <div>
            <h2 className='info-text'>Más Información</h2>
            <div className="card-container-extra">
                <Link className="text-decoration-none" to={'/artistprofile&id=2'}>
                    <div className="card-extra">
                        <img
                            src={coversecond}
                            alt="Artista"
                            className="card-image-extra"
                        />
                        <div className="card-content-extra">
                            <h3>Jaime Alvarez</h3>
                            <p>Rock</p>
                            <p>
                            El artista detrás de este cover es un cantante y compositor emergente, conocido por su enfoque introspectivo y emocional. Con una voz delicada y una habilidad única para reinterpretar clásicos, transforma canciones icónicas en versiones íntimas, llenas de sensibilidad y profundidad.
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="card-extra">
                    <img
                        src={creep} // Reemplaza con la URL real de la imagen
                        alt="Canción Original"
                        className="card-image-extra"
                    />
                    <div className="card-content-extra">
                        <h3>Creep - RadioHead</h3>
                        <p>Rock</p>
                        <p>
                        Una de las canciones más icónicas de los 90, ha sido versionada por artistas de distintos géneros, desde cantantes de pop hasta bandas de metal. Entre los artistas que la han versionado están Kelly Clarkson, Damien Rice y Tori Amos.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};
