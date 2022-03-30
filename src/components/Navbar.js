import React from 'react';
// eslint-disable-next-line
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    useHistory
  } from "react-router-dom";

const Navbar = () => {
    let location=useLocation();
    let history=useHistory();
    const handlelogout=()=>{
        localStorage.removeItem('token')
        history.push('/login')
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Inotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
                        </li>


                    </ul>
                   
                   
                    { localStorage.getItem('token')==null? <div className="d-flex">
                    <Link className="btn btn-primary mx-2" role="button" to="/login">Login</Link>
                    <Link className="btn btn-warning mx-2" role="button" to="/signup">Signup</Link></div>:
                    <button className="btn btn-danger mx-2" onClick={handlelogout} >Logout</button>
                   }
                   
                </div>
            </div>
        </nav>
    )
}

export default Navbar
