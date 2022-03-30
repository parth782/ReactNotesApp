
import './App.css';
// eslint-disable-next-line
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar.js'
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NotesState';
import Alert  from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';



function App() {
  const [alert,setalert]=useState(null);
  const showalert=(message,type)=>{
    setalert({            // set alert is used to set state of alerts.
      message:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null);
    },3000)
}
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Switch>
          <Route exact path="/" >
            <Home showalert={showalert} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
           <Login  showalert={showalert}/>
          </Route>
          <Route exact path="/signup">
            <Signup  showalert={showalert}/>
          </Route>
          
        </Switch>
        </div>
      </Router>
      </NoteState>

      
    </>
  );
}

export default App;
