import React from "react";
import cover from '../../img/cover-example.jpg';
import '../../styles/index.css';

export const CoverCard = () => {

    return (
        <div className="card-container">
            <div className="row">
                <span className="card">
                    <img src={cover} width="120" height="75" className="card-img-left" alt="cover-example" />
                    <div className="card-body">
                        <h3 className="card-title">Canción</h3>
                        <p className="card-genre">Genre</p>
                        <a className="card-artist">Artist Name</a>
                    </div>
                </span>
                <span className="card">
                    <img src={cover} width="120" height="75" className="card-img-left" alt="cover-example" />
                    <div className="card-body">
                        <h3 className="card-title">Canción</h3>
                        <p className="card-genre">Genre</p>
                        <a className="card-artist">Artist Name</a>
                    </div>
                </span>        <span className="card">
                    <img src={cover} width="120" height="75" className="card-img-left" alt="cover-example" />
                    <div className="card-body">
                        <h3 className="card-title">Canción</h3>
                        <p className="card-genre">Genre</p>
                        <a className="card-artist">Artist Name</a>
                    </div>
                </span>
                </div>
        </div>
    );
};