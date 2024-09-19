import React from 'react';
import original from "../../img/image.jpg";
import coverthird from "../../img/coverthird.jpg";
import shape from "../../img/shapeofyou.jpg";
import "../../styles/extrainfo.css";
import { Link } from "react-router-dom";

export const ExtraInfoThird = () => {
    return (
        <div>
            <h2 className='info-text'>Más Información</h2>
            <div className="card-container-extra">
                <Link className="text-decoration-none" to={'/artistprofile&id=3'}>
                    <div className="card-extra">
                        <img
                            src={coverthird}
                            alt="Artista"
                            className="card-image-extra"
                        />
                        <div className="card-content-extra">
                            <h3>Oswaldo Briceño</h3>
                            <p>Pop</p>
                            <p>
                            Este artista se especializa en realizar covers animados acompañados por la guitarra española, fusionando la calidez del flamenco con su pasión por la animación.
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="card-extra">
                    <img
                        src={shape} // Reemplaza con la URL real de la imagen
                        alt="Canción Original"
                        className="card-image-extra"
                    />
                    <div className="card-content-extra">
                        <h3>Shape of you - Ed Shreeran</h3>
                        <p>pop</p>
                        <p>
                        Una de las canciones más icónicas de los 90, ha sido versionada por artistas de distintos géneros, desde cantantes de pop hasta bandas de metal. Entre los artistas que la han versionado están Kelly Clarkson, Damien Rice y Tori Amos.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};