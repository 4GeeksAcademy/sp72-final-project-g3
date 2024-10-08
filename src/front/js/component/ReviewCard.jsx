import React, { useContext } from "react";
import { FaStar, FaRegStar } from 'react-icons/fa';
import rigo from '../../img/rigo-baby.jpg';
import '../../styles/index.css';
import { Context } from '../store/appContext.js';



export const ReviewCard = () => {

    const { store, actions } = useContext(Context)


    const VotesRating = ({ votes }) => {
        const totalStars = 5;
        const starsArray = [];

        for (let i = 1; i <= totalStars; i++) {
            if (i <= votes) {
                starsArray.push(<FaStar key={i} className="text-white" />);
            } else {
                starsArray.push(<FaRegStar key={i} className="text-white" />);
            }
        }

        return <div className="mb-2">{starsArray}</div>;
    };



    return (
        <div className="review-card-container" >
                <div className="card-body">
                    {store.mostcomments.map((item) =>
                        <div key={item.id} className="card card-review" >
                            <div className="card-body" >
                            <VotesRating rating='5' />
                            <h5 className="card-title-review text-white">{item.title}</h5>
                            <p className="card-text-review">{item.body}</p>
                            <div className="d-flex align-items-center mb-4 mt-4">
                                <img
                                    src={rigo}
                                    alt="Profile"
                                    className="rounded-circle"
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                                <div className="ms-3">
                                    <h6 className="text-white mb-0">{item.user_id}</h6>
                                    <small className="text-secondary">{item.created_at}</small>
                                </div>
                            </div>
                            </div>
                        </div>
                    )}
                </div>
        </div>
    );
};