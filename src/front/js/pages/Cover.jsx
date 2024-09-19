import React, { useContext, useState } from "react";
import { Context } from '../store/appContext.js';
import { useNavigate } from 'react-router-dom';
import { MusicInfo } from "../component/MusicInfo.jsx";
import { ReviewCard } from "../component/ReviewCard.jsx";
import { ExtraInfo } from "../component/ExtraInfo.jsx";
import { ArtistProfile } from "../component/ArtistProfile.jsx";

export const Cover = () => {

    const { store, actions } = useContext(Context);

    return(
        <div className="text-center mt-5">
            <MusicInfo />
            <ExtraInfo />
        </div>
    );
};