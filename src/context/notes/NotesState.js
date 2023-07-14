import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {

  const host = process.env.REACT_APP_BASE_URL;
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

  // FETCHING ALL NOTES
  const getallNotes = async () => {
    const response = await fetch(`${host}api/notes/getallnotes`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('token'),

      },


    });
    const json = await response.json();
    if (response.status === 500) {

      props.showalert("Something went wrong.Try After sometime", "danger");
      localStorage.removeItem('token');

      return;
    }
    else if (response.status === 400 || response.status === 404) {

      props.showalert("Invalid Credentials", "danger");
      localStorage.removeItem('token');
      return;
    }
    setnotes(json);
  }

  //ADDING A NOTE
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}api/notes/addnote`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('token'),

      },

      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();
    if (response.status === 500) {

      props.showalert("Something went wrong.Try After sometime", "danger");
      localStorage.removeItem('token');

      return;
    }
    else if (response.status === 400 || response.status === 404) {

      props.showalert("Invalid Credentials", "danger");
      localStorage.removeItem('token');
      return;
    }
    else if (response.status === 422) {
      props.showalert("Invalid Details in " + json.error[0].param, "danger");
      return;
    }
    setnotes(notes.concat(json))

  }

  //DELETING A NOTE USING ID
  const deleteNote = async (id) => {
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('token'),

      },


    });
    if (response.status === 500) {

      props.showalert("Something went wrong.Try After sometime", "danger");
      localStorage.removeItem('token');

      return;
    }
    else if (response.status === 400 || response.status === 404) {

      props.showalert("Invalid Credentials", "danger");
      localStorage.removeItem('token');
      return;
    }
    getallNotes();
  }

  //EDITING NOTE BY ID
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('token'),

      },

      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json()
    if (response.status === 500) {

      props.showalert("Something went wrong.Try After sometime", "danger");
      localStorage.removeItem('token');
      return;
    }
    else if (response.status === 400 || response.status === 404) {

      props.showalert("Invalid Credentials", "danger");
      localStorage.removeItem('token');
      return;
    }
    else if (response.status === 422) {
      props.showalert("Invalid Details in " + json.error[0].param, "danger");
      return;
    }

    getallNotes();

  }
  return (
    <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, getallNotes, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;
//Now it said that make function in which we provide state and use name of context.provider and pass value   //attribute in it