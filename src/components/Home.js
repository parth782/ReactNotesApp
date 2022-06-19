import React from 'react'
import { useHistory } from 'react-router'
import { Notes } from './Notes'
import {Route,Redirect} from 'react-router-dom';


const Home = (props) => {
    let history = useHistory();
    const { showalert } = props
    if (localStorage.getItem('token') == null) {
        history.push('/login')
    }
    return (
        <Route render={props => {
            if (localStorage.getItem('token') == null) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
            return (
                <>


                    <Notes showalert={showalert} />
                </>
            )
        }} />
    )
}

export default Home
