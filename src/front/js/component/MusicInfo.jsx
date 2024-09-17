import React, { useContext } from "react";
import '../../styles/musicinfo.css';
import image from '../../img/image.jpg';
import { Context } from "../store/appContext";



export const MusicInfo = () => {

  const { store } = useContext(Context)

  return (
    <div className="music-card">
      {store.cover.genre ?
        <div key={store.cover.id}>
          <img src={image} alt="" className="album-image" />
          <div className="card-content">
            <h1 className="album-title">{store.cover.name}</h1>
            <h2 className="band-name">{store.artist_name}</h2>
            <p className="album-genre">{store.cover.genre}</p>
            <p className="album-description">{store.cover.description}</p>
            <div className="rating">
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <p className="rating-number">{store.cover.valuation}</p>
            </div>
          </div>
        </div>
        :
        ''
      }
    </div>
  );
};