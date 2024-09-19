import React, { useContext, useState } from "react";
import '../../styles/musicinfo.css';
import image from '../../img/image.jpg';
import { Context } from "../store/appContext";
import coversecond from '../../img/coversecond.jpg';



export const MusicInfoSecond = () => {

  const { store } = useContext(Context);
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null);
  const openForm = (i) => {
    setSelected(i + 1)
    
  }

  return (
    <div className="container component-container ">
      <div className="row">
        <div className="music-card col-md-12 col-sm-6">
            <div className="music-info-container">
              <img src={coversecond} alt="" className="album-image" />
              <div className="card-content col-sm-12">
                <h1 className="album-title">Creep</h1>
                <h2 className="band-name">Jaime Alvarez</h2>
                <p className="album-genre">Rock</p>
                <p className="album-description">Este cover de "Creep" de Radiohead ofrece una reinterpretación íntima y melancólica de la icónica canción de 1992. Con un enfoque más suave y minimalista, destaca la vulnerabilidad emocional de la letra a través de arreglos de guitarra acústica y un delicado piano. La voz del intérprete resuena con un tono introspectivo y emotivo, capturando la angustia y el anhelo de pertenencia que definen el tema original, mientras le añade una atmósfera más personal y contemplativa.</p>
                <div className="rating">
                  <div className="fs-2 text-center">
                    {[...Array(5)].map((star, i) => {
                      return (
                        <i
                          key={i}
                          className={`fa-star text-warning mx-1 ${i + 1 <= (hover || selected) ? "fas" : "far"}`}
                          onMouseEnter={() => setHover(i + 1)}
                          onMouseLeave={() => setHover(null)}
                          onClick={() => openForm(i)}
                        />
                      );
                    })}
                  </div>
                  <p className="rating-number">5 rating</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};