import React, { useContext, useState } from "react";
import { Context } from '../store/appContext.js';
import { useNavigate } from 'react-router-dom';
import { ExtraInfoThird } from "../component/ExtraInfoThird.jsx";
import { MusicInfoThird } from "../component/MusicInfoThird.jsx";

export const CoverThird = () => {

    const { store, actions } = useContext(Context);

    return(
        <div className="text-center mt-5">
            <MusicInfoThird />
            <ExtraInfoThird />
        </div>
    );
};