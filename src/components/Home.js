import React from 'react'
import { useHistory } from 'react-router'
import { AddNote } from './AddNote'
import { Notes } from './Notes'


const Home = (props) => {
    let history=useHistory();
    const {showalert}=props
    if(localStorage.getItem('token')==null){
        history.push('/login')
    }
    return (
        <>
       
       <Notes  showalert={showalert}/>
        </>
    )
}

export default Home
