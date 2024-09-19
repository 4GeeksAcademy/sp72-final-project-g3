import React, { useContext, useState } from "react";
import { Context } from '../store/appContext.js';
import { useNavigate } from 'react-router-dom';
import { ArtistProfileSecond } from "../component/ArtistProfileSecond.jsx";

export const ArtistProfileSecond = () => {

    const { store, actions } = useContext(Context);

    return(
        <div className="text-center mt-5">
            <ArtistProfileSecond />
        </div>
    );
};