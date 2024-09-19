import React, { useContext, useState } from "react";
import '../../styles/musicinfo.css';
import image from '../../img/image.jpg';
import { Context } from "../store/appContext";
import coverfirst from '../../img/coverfirst.jpg';



export const MusicInfoFirst = () => {

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
              <img src={coverfirst} alt="" className="album-image" />
              <div className="card-content col-sm-12">
                <h1 className="album-title">Fly me to the moon</h1>
                <h2 className="band-name">Marcel Rivero</h2>
                <p className="album-genre">Jazz and R&B</p>
                <p className="album-description">Simply put, Frank Sinatra's “Fly Me to the Moon” is centered on the singer being deeply in love. And the title is a metaphor which is based on how he feels about his significant other. Or “fly me to the moon” is a fancy way of saying that being with his lover makes him feel euphoric.</p>
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
                  <p className="rating-number">4.5 rating</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};