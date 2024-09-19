import React, { useContext } from "react";
import cover from '../../img/cover-example.jpg';
import coverfirst from '../../img/coverfirst.jpg';
import coversecond from '../../img/coversecond.jpg';
import coverthird from '../../img/coverthird.jpg';
import '../../styles/index.css';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CoverCardTrial = () => {

    const { store, actions } = useContext(Context)

    return (
        <div className="card-container">
            <div>
                <h2 className="cover-semanal"> Cover Semanal</h2>
            <div className="row">
                    <div className="col-md-4" >
                        <Link to={"/cover&id=1"} className="text-decoration-none">
                            <div className="card mb-4">
                                <img src={coverfirst} width="120" height="75" className="card-img-left" alt="cover-example" />
                                <div className="card-body">
                                    <h3 className="card-title" >Fly me to the moon</h3>
                                    <p className="card-genre">Jazz</p>
                                    <a className="card-artist">Marcel</a>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4" >
                        <Link to={"/cover&id=2"} className="text-decoration-none">
                            <div className="card mb-4">
                                <img src={coversecond} width="120" height="75" className="card-img-left" alt="cover-example" />
                                <div className="card-body">
                                    <h3 className="card-title" >Creep</h3>
                                    <p className="card-genre">Rock</p>
                                    <a className="card-artist">Jaime</a>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4" >
                        <Link to={"/cover&id=3"} className="text-decoration-none">
                            <div className="card mb-4">
                                <img src={coverthird} width="120" height="75" className="card-img-left" alt="cover-example" />
                                <div className="card-body">
                                    <h3 className="card-title" >Shape of you</h3>
                                    <p className="card-genre">Pop</p>
                                    <a className="card-artist">Oswaldo</a>
                                </div>
                            </div>
                        </Link>
                    </div>
            </div>
            </div>

        </div >
    );
};