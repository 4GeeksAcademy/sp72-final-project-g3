import React, { useContext, useState } from "react";
import { Context } from '../store/appContext.js';
import { useNavigate } from 'react-router-dom';
import { MusicInfoFirst } from "../component/MusicInfoFirst.jsx";
import { ExtraInfo } from "../component/ExtraInfo.jsx";

export const CoverFirst = () => {

    const { store, actions } = useContext(Context);

    return(
        <div className="text-center mt-5">
            <MusicInfoFirst />
            <ExtraInfo />
        </div>
    );
};