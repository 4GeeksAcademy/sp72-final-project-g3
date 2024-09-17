import React, { useContext } from "react";
import cover from '../../img/cover-example.jpg';
import '../../styles/index.css';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CoverCard = () => {

    const { store, actions } = useContext(Context)

    return (
        <div className="card-container">
            <div className="row">
                {store.populars.map((item) =>
                    <div key={item.id} className="col-md-4" >
                        <Link to={"/cover"} className="text-decoration-none" onClick={() => actions.getCover(item.id)}>
                            <div className="card mb-4">
                                <img src={cover} width="120" height="75" className="card-img-left" alt="cover-example" />
                                <div className="card-body">
                                    <h3 className="card-title" >{item.name}</h3>
                                    <p className="card-genre">{item.genre}</p>
                                    <a className="card-artist">{item.artist_name}</a>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div >
    );
};