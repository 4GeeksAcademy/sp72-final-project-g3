import React from "react";
import '../../styles/musicinfo.css';
import image from '../../img/image.jpg';



export const MusicInfo = () => {
    return(
        <div className="music-card">
      <img src={image} alt="" className="album-image" />
      <div className="card-content">
        <h1 className="album-title"> Tittle</h1>
        <h2 className="band-name"> band</h2>
        <p className="album-genre"> genre </p>
        <p className="album-description"> description</p>
        <div className="rating">
          <p className="rating-number">4,5</p>
        </div>
      </div>
    </div>
    );
};