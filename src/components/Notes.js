import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Route, Redirect } from 'react-router-dom';

import noteContext from '../context/notes/noteContext'
import { AddNote } from './AddNote'
import { Noteitem } from './Noteitem'

export const Notes = (props) => {
    let history = useHistory();
    const { showalert } = props;
    // eslint-disable-next-line
    if (localStorage.getItem('token') == null) {
        history.push('/login')
    }

    const context = useContext(noteContext)
    const { notes, getallNotes, editNote } = context
    useEffect(() => {
        getallNotes();
    }, [])
    const ref = useRef(null);
    const [notep, setnote] = useState({ etitle: "", edescription: "", etag: "", eid: "" });
    const updatenote = (currentnote) => {
        console.log("update is clicked");
        setnote({ etag: currentnote.tag, etitle: currentnote.title, edescription: currentnote.description, eid: currentnote._id});
        ref.current.click();



    }
    //const [notep,setnote]=useState({title:"",description:"",tag:""})
    const onchange = (e) => {
        setnote({ ...notep, [e.target.name]: e.target.value })
    }
    const handleclick = (e) => {
        e.preventDefault();
        ref.current.click();
        editNote(notep.eid, notep.etitle, notep.edescription, notep.etag);
        props.showalert("Note Updated Successfully", "success")


    }


    return (
        <Route render={props => {
            if (localStorage.getItem('token') == null) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            return (
                <>

                    <AddNote showalert={showalert} />

                    <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} aria-hidden="true">
                        Update Note Modal
                    </button>


                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="etitle" className="form-label">Note Title</label>
                                            <input type="text" name="etitle" className="form-control" id="etitle" aria-describedby="emailHelp" onChange={onchange} value={notep.etitle} minLength={5} />

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="edescription" className="form-label">Note Description</label>
                                            <textarea className="form-control" id="edescription" rows="3" name="edescription" onChange={onchange} value={notep.edescription} minLength={5}></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="etag" className="form-label">Note Tag</label>
                                            <select class="form-select" name='etag' id='etag' onChange={onchange} >
                                                {notep.etag === "Pending" ? <option value="Pending" selected>Pending</option> : <option value="Pending">Pending</option>}
                                                {notep.etag === "Completed" ? <option value="Completed" selected>Completed</option> : <option value="Completed">Completed</option>}
                                               
                                            </select>

                                        </div>
                                       




                                    </form>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button disabled={notep.etitle.length < 5 || notep.edescription.length < 5 || notep.etag.length < 3} type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container my-3">
                        <h2>Your Notes</h2>
                        <div className="row ">

                            {notes.length === 0 && <div className="card">
                                <div className="card-body">
                                    No notes to display!
                                </div>
                            </div>}

                            {notes.length !== 0 && notes.map((note) =>
                                <Noteitem key={note._id} note={note} updatenote={updatenote} showalert={showalert} />
                            )}
                        </div>
                    </div>
                </>
            )
        }} />
    )
}

