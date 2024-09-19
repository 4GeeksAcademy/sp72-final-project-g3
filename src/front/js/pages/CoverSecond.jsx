import React, { useContext, useState } from "react";
import { Context } from '../store/appContext.js';
import { useNavigate } from 'react-router-dom';
import { ExtraInfoSecond } from "../component/ExtraInfoSecond.jsx";
import { MusicInfoSecond } from "../component/MusicInfoSecond.jsx";

export const CoverSecond = () => {

    const { store, actions } = useContext(Context);

    return(
        <div className="text-center mt-5">
            <MusicInfoSecond />
            <ExtraInfoSecond />
        </div>
    );
};