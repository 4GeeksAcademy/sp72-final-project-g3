import React from 'react';
import "../../styles/infocover.css";
import logo from "../../img/banda.jpg";

export const InfoCover = () => {
  return (
    <div className="info-cover">
    <img 
      src={logo} 
      alt="Descripción de la imagen" 
      className="info-image" 
    />
    <div className="info-content">
      <h4 className="info-heading">Artistas Emergentes</h4>
      <h4 className="info-subheading">Nuevas Voces, Nuevas Ideas</h4>
      <p className="info-text">
      En nuestra plataforma, descubrimos y apoyamos a los artistas emergentes que están redefiniendo el panorama musical.
      Desde sonidos innovadores hasta colaboraciones inesperadas, estos artistas están cambiando las reglas del juego. 
      </p>
      
    </div>
  </div>
);
};


