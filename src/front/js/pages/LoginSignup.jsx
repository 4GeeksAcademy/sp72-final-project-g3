import React, {useContext, useState} from "react";

export const LoginSignup = () => {


const handleSubmit = async (event) => {
    event.preventDefault();
};

const [action,setAction] = useState('Sign Up');

return (
    <div className='Container-fluid'>
        <div className="row">
            <div className="col-md-6">{/* image */}</div>
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                    <h2 className="card-title text-center mb-3 display-5">{action}</h2>
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
                        <button type="button" className={action === 'Login'?'btn-secondary':'submit'} onClick={()=>{setAction('Sign Up')}}/* "btn btn-primary mt-5" */ >Sign Up</button>
                        <button type="button" className={action === 'Sign Up'?'btn-secondary':'submit'} onClick={()=>{setAction('Login')}}/* "btn btn-primary mt-5" */ >Log In</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

);
};
