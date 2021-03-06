import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    //----------Sample of context-------------
    // const s1 = {
    //     "name": "harry",
    //     "class": "Sb"
    // }
    // const [state, setState] = useState(s1)
    // const update = () => {
    //     setTimeout(()=>{
    //         setState({
    //             "name": "Parth Gupta",
    //             "class": "Colledge"
    //         })
           
    //     }, 9000)
    // }
    //----------------------THE END--------------
    const host=process.env.REACT_APP_BASE_URL;
    const notesInitial=[];
        const [notes,setnotes]=useState(notesInitial);
        const getallNotes=async ()=>{
          const response = await fetch(`${host}api/notes/getallnotes`, {
            method: 'GET', 
            
            headers: {
              'Content-Type': 'application/json',
              'authtoken':localStorage.getItem('token'),
              
            },
            
           
          });
          const json=await response.json();
          console.log(json)
          setnotes(json);
          }
        //Add A note
        const addNote=async (title,description,tag,color)=>{
          const response = await fetch(`${host}api/notes/addnote`, {
            method: 'POST', 
            
            headers: {
              'Content-Type': 'application/json',
              'authtoken':localStorage.getItem('token'),
              
            },
            
            body: JSON.stringify({title,description,tag,color}) 
          });
         
             const json=await response.json()
              setnotes(notes.concat(json))

        }
        //delete node using id
        const deleteNote= async (id)=>{
          const response = await fetch(`${host}api/notes/deletenote/${id}`, {
            method: 'DELETE', 
            
            headers: {
              'Content-Type': 'application/json',
              'authtoken':localStorage.getItem('token'),
              
            },
            
           
          });
              getallNotes();
        }
        //editNote by id
        const editNote=async (id,title,description,tag,color)=>{
          //API CALL
          const response = await fetch(`${host}api/notes/updatenote/${id}`, {
            method: 'PUT', 
            
            headers: {
              'Content-Type': 'application/json',
              'authtoken':localStorage.getItem('token'),
              
            },
            
            body: JSON.stringify({title,description,tag,color}) 
          });
         
          const json= await response.json()
          console.log(json);
          
          getallNotes();
        
        

          //LOGIC TO EDIT
            
        }
    return (
        <NoteContext.Provider value={{notes,setnotes,addNote,deleteNote,getallNotes,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;
//Now it said that make function in which we provide state and use name of context.provider and pass value   //attribute in it