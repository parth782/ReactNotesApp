import React, { useState } from 'react'
import { useHistory } from 'react-router'

export const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let history = useHistory();
    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handlelogin = async (e) => {
        e.preventDefault();
        const response = await fetch(process.env.REACT_APP_BASE_URL+"api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        if (json.status ===0) {
            props.showalert("Invalid Credentials", "danger")
            return;
        }
        if (response.status ===500) {
            props.showalert("Enter valid data in the fields", "danger")
            return;
        }
        localStorage.setItem('token', json.authtoken)
        setcredentials({ email: "", password: "" });
        history.push('/')
        props.showalert("Logged In", "success")
    }
    return (
        <>
         <h2 className="text-center my-3">Login In Inotebook</h2>
            <form onSubmit={handlelogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onchange} required minLength={5} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onchange} required minLength={5} />
                </div>

                <button type="submit" className="btn btn-danger" >Login</button>
            </form>
        </>
    )
}
export default Login
