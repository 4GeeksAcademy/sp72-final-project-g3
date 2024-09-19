import React, { useContext, useState } from "react";
import '../../styles/musicinfo.css';
import image from '../../img/image.jpg';
import { Context } from "../store/appContext";
import coverthird from '../../img/coverthird.jpg';



export const MusicInfoThird = () => {

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
              <img src={coverthird} alt="" className="album-image" />
              <div className="card-content col-sm-12">
                <h1 className="album-title">Shape of you</h1>
                <h2 className="band-name">Oswaldo Briseño</h2>
                <p className="album-genre">Pop</p>
                <p className="album-description">
                Imagina un cover animado de "Shape of You" interpretado con guitarra española, donde cada rasgueo de las cuerdas cobra vida visualmente. La escena se desarrolla en un atardecer cálido en una plaza española, con edificios antiguos y coloridos de fondo. La guitarra española reemplaza el ritmo moderno del original por un sonido más orgánico y melódico, con cada nota acentuada por los ecos de la madera del instrumento.</p>
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
                  <p className="rating-number">2 rating</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};