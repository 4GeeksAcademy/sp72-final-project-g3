import React, { useContext, useState } from "react";
import '../../styles/musicinfo.css';
import image from '../../img/image.jpg';
import { Context } from "../store/appContext";



export const MusicInfo = () => {

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
          {store.cover.genre ?
            <div className="music-info-container" key={store.cover.id}>
              <img src={image} alt="" className="album-image" />
              <div className="card-content col-sm-12">
                <h1 className="album-title">{store.cover.name}</h1>
                <h2 className="band-name">{store.artist_name}</h2>
                <p className="album-genre">{store.cover.genre}</p>
                <p className="album-description">{store.cover.description}</p>
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
                  <p className="rating-number">{store.cover.valuation}</p>
                </div>
              </div>
            </div>
            :
            ''
          }
        </div>
      </div>
    </div>
  );
};