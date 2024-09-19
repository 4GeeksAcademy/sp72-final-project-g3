import React from "react";
import "../../styles/footer.css";
import { Link } from "react-router-dom";
import logo from "../../img/Soundes.png";

export const Footer = () => {
  return (

    <footer className="footer">
      {/* Sección de Logo */}
      <div className="footer-logo">
        <img src={logo} alt="Logo pequeño" className="footer-logo-img" />
      </div>

      {/* Columnas de Enlaces Centradas */}
      <div className="footer-columns">
        <div className="footer-column">
          <h4>Políticas</h4>
          <ul>
            <li><Link to={"/politicasdecookies"}>Política de Cookies</Link></li>
            <li>Politica de Privacidad</li>
            <li>Legal</li>
            <li>Contacto</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Dev Team</h4>
          <ul>
            <li><a href="https://github.com/Marci25" target="_blank" rel="noopener noreferrer">Marcel Rivero</a></li>
            <li><a href="https://github.com/mecrophagus" target="_blank" rel="noopener noreferrer">Jaime Alvarez</a></li>
            <li><a href="https://github.com/00000Esteban1111" target="_blank" rel="noopener noreferrer">Oswaldo Briceño</a></li>
          </ul>
        </div>
      </div>

      {/* Redes Sociales Debajo de las Columnas */}
      <div className="footer-socials">
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <button className="social-btn"><i className="fab fa-linkedin"></i> LinkedIn</button>
        </a>
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <button className="social-btn"><i className="fab fa-twitter"></i> Twitter</button>
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <button className="social-btn"><i className="fab fa-facebook"></i> Facebook</button>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <button className="social-btn"><i className="fab fa-instagram"></i> Instagram</button>
        </a>
      </div>

      {/* Derechos de Autor */}
      <div className="footer-copyright">
        <p>Soundex Corporation © 2024</p>
      </div>
    </footer>
  );
};

