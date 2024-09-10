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
                    <div className="card-login" style={{ width: '25rem', display: 'flex', justifyContent: 'center', alignItems: 'center',height: '65vh', marginTop: '50px', borderRadius:'15px'}}>
                        <div className="card-body">
                            <div className="" style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                            <img src={logo} alt="" style={{width: '80px', marginRight: '50px'}}/>
                            <h2 className="card-title text-center">{action}</h2>
                            </div>
                            <div className="underline" style={{height:'2px', background:'#B3B3B3'}}></div>
                            <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email" className="mb-1" style={{color:'#B3B3B3', marginTop:'20px'}}>email</label>
                                <input type="email" className="form-control" style={{borderRadius:'8px'}} placeholder="example@email.com" id="email" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="mb-1" style={{color:'#B3B3B3', marginTop:'20px'}}>Password</label>
                                <input type="password" className="form-control" style={{borderRadius:'8px'}} placeholder="password" id="password" required/> 
                            </div>
                            <div className="form-group">
                            {action === 'Login'?<div></div>:<div><label htmlFor="inputRol" className="form-label" style={{color:'#B3B3B3', marginTop:'20px'}}>Rol</label>
                                <select id="inputRol" className="form-select" style={{borderRadius:'8px'}}>  
                                <option defaultValue>Here you can choose your rol</option>
                                <option value="1">Artist</option>
                                <option value="2">Fan</option>
                                </select>
                                </div>}
                            </div>
                            <div className="submit-container text-center" style={{ marginTop:'35px'}}>
                                <button type="button" className={action === 'Login'?'btn-secondary':'submit'} onClick={()=>{setAction('Sign Up')}} style={{borderRadius:'8px', border: 'none', padding:'5px', paddingLeft:'15px', paddingRight:'15px', margin:'20px'}}>Sign Up</button>
                                <button type="button" className={action === 'Sign Up'?'btn-secondary':'submit'} onClick={()=>{setAction('Login')}} style={{borderRadius:'8px', border: 'none', padding:'5px', paddingLeft:'15px', paddingRight:'15px', margin:'20px'}}>Log In</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    </div>

    );
};
