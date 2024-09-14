import React, { useContext, useState } from "react";
import { Context } from '../store/appContext.js';
import logo from '../../img/Soundex_Isotipo_SVG.png';
import size_img from '../../img/imagen-login.jpg';
import '../../styles/loginsignup.css';
import { useNavigate } from 'react-router-dom';


export const LoginSignup = () => {

    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("");

    const handleEmail = (event) => { setEmail(event.target.value); }
    const handlePassword = (event) => { setPassword(event.target.value); }
    const handleRol = (event) => { setRol(event.target.value); }
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (action == "Login") {
            actions.login(email, password)
        }
        else {
            actions.signUp(email, password, rol)
        }
        navigate('/')
    };

    const [action, setAction] = useState('Sign Up');

    return (
        <div className='Container-fluid'>
            <div className="row">
                <div className="col-md-6 image-container">
                    <img src={size_img} className="img-fluid"></img>
                </div>
                <div className="col-md-6  col-sm-12 right-side">
                    <div className="card-login">
                        <div className="card-body">
                            <div className="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={logo} alt="" style={{ width: '80px', marginRight: '20px' }} />
                                <h2 className="card-title text-center" style={{ color: '#E3E3E3', fontFamily: 'Roboto, sans-serif' }}>{action}</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="submit-container text-center" style={{ marginTop: '35px' }}>
                                    <ul class="nav nav-tabs nav-fill">
                                        <li class="nav-item">
                                            <span /* class="nav-link" */ className={`nav-link ${action === 'Sign Up' ? 'active-tab' : ''}`} onClick={() => { setAction('Sign Up') }}>Sign Up</span>
                                        </li>
                                        <li class="nav-item">
                                            <span /* class="nav-link" */ className={`nav-link ${action === 'Login' ? 'active-tab' : ''}`} onClick={() => { setAction('Login') }}>Login</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="underline" style={{ height: '2px', background: '#B3B3B3' }}></div>
                                <div className="form-group">
                                    <label htmlFor="email" className="mb-1" style={{ color: '#B3B3B3', marginTop: '20px' }}>email</label>
                                    <input type="email" className="form-control" style={{ borderRadius: '8px' }} placeholder="example@email.com" value={email} onChange={handleEmail} id="email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="mb-1" style={{ color: '#B3B3B3', marginTop: '20px' }}>Password</label>
                                    <input type="password" className="form-control" style={{ borderRadius: '8px' }} placeholder="password" id="password" value={password} onChange={handlePassword} required />
                                </div>
                                <div className="form-group">
                                    {action === 'Login' ? <div></div> : <div><label htmlFor="inputRol" className="form-label" style={{ color: '#B3B3B3', marginTop: '20px' }}>Rol</label>
                                        <select id="inputRol" className="form-select" style={{ borderRadius: '8px' }} value={rol} onChange={handleRol}>
                                            <option defaultValue>Here you can choose your rol</option>
                                            <option value="artist">Artist</option>
                                            <option value="fan">Fan</option>
                                        </select>
                                    </div>}
                                </div>
                                <div className="submit-container text-center" style={{ marginTop: '35px' }}>
                                    <button type="submit" style={{ borderRadius: '8px', border: 'none', padding: '5px', paddingLeft: '15px', paddingRight: '15px', margin: '20px' }}>{action === 'Login' ? 'Login' : 'Sign Up'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};