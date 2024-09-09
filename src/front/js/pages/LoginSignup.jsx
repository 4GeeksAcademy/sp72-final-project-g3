import React, {useContext, useState} from "react";
import logo from '../../img/Soundex_Isotipo_SVG.png';
import size_img from '../../img/imagen-login.jpg';

export const LoginSignup = () => {


const handleSubmit = async (event) => {
    event.preventDefault();
};

const [action,setAction] = useState('Sign Up');

return (
    <div className='Container-fluid'>
        <div className="row">
            <div className="col-md-6">
            <img src={size_img} style={{ width: '85vh', height: '100vh' }}></img>
            </div>
                <div className="col-md-6 right-side">
                    <div className="card-login" style={{ width: '25rem', display: 'flex', justifyContent: 'center', alignItems: 'center',height: '50vh', marginTop: '50px', borderRadius:'15px'}}>
                        <div className="card-body">
                            <div className="" style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                            <img src={logo} alt="" style={{width: '80px', marginRight: '50px'}}/>
                            <h2 className="card-title text-center">{action}</h2>
                            </div>
                            <div className="underline"></div>
                            <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email" className="mb-1">email</label>
                                <input type="email" className="form-control" id="email" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="mb-1">Password</label>
                                <input type="password" className="form-control" id="password" required/> 
                            </div>
                            <div className="form-group">
                            {action === 'Login'?<div></div>:<div><label htmlFor="inputRol" className="form-label">Rol</label>
                                <select id="inputRol" className="form-select">  
                                <option defaultValue>Here you can choose your rol</option>
                                <option value="1">Artist</option>
                                <option value="2">Fan</option>
                                </select>
                                </div>}
                            </div>
                            <div className="submit-container text-center">
                                <button type="button" className={action === 'Login'?'btn-secondary':'submit'} onClick={()=>{setAction('Sign Up')}}/* "btn btn-primary mt-5" */>Sign Up</button>
                                <button type="button" className={action === 'Sign Up'?'btn-secondary':'submit'} onClick={()=>{setAction('Login')}}/* "btn btn-primary mt-5" */>Log In</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    </div>

    );
};
