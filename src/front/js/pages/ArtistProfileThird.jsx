import React, { useContext, useState } from "react";
import { Context } from '../store/appContext.js';
import { useNavigate } from 'react-router-dom';
import { ArtistProfileThird } from "../component/ArtistProfileThird.jsx";

export const ArtistProfileThird = () => {

    const { store, actions } = useContext(Context);

    return(
        <div className="text-center mt-5">
            <ArtistProfileThird />
        </div>
    );
};