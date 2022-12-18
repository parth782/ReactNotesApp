import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

export const Signup = (props) => {
    const [details,setdetails]=useState({email:"",name:"",password:"",cpassword:""})
    let history=useHistory();

    const handlesubmit= async (e)=>{
       e.preventDefault();
       
        if(details.password!==details.cpassword){
            props.showalert("Password and Confirm Password both must be same","danger")
               return;
        }
        const response=await fetch(process.env.REACT_APP_BASE_URL+"api/auth/createuser",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({name:details.name,email:details.email,password:details.password})
        })
        const json=await response.json();
        if(response.status===400||response.status==500){
            props.showalert("Some Error Occured","danger")
            return;
        }
        if(json.status===0){
            props.showalert("Email already in use!","danger")
            return;
        }
        //console.log(json);
        localStorage.setItem('token',json.authtoken)
        setdetails({email:"",name:"",password:"",cpassword:""});
        history.push('/')
        props.showalert("Account Created Successfully","success")

        
    }
    const onchange=(e)=>{
    setdetails({...details,[e.target.name]:e.target.value})
    }
    return (
        <>
        <h2 className="text-center my-3">Signup In Inotebook</h2>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onchange} value={details.email} required minLength={5}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onchange} value={details.name} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onchange} value={details.password} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onchange} value={details.cpassword} required minLength={5}/>
                </div>
               
                <button type="submit" className="btn btn-danger"  >Signup</button>
            </form>
        </>
    )
}
export default Signup
