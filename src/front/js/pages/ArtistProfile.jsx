import React, { useContext, useState } from "react";
import { Context } from '../store/appContext.js';
import { useNavigate } from 'react-router-dom';
import { ArtistProfile } from "../component/ArtistProfile.jsx";

export const ArtistProfile = () => {

    const { store, actions } = useContext(Context);

    return(
        <div className="text-center mt-5">
            <ArtistProfile />
        </div>
    );
};