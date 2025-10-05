import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Route, Redirect } from 'react-router-dom';

import noteContext from '../context/notes/noteContext'
import { AddNote } from './AddNote'
import { Noteitem } from './Noteitem'
import NoteSchema from '../utils/validation/NoteSchema';
import { useForm } from 'react-hook-form'

export const Notes = (props) => {
    let history = useHistory();
    const { showalert } = props;
    // eslint-disable-next-line
    if (localStorage.getItem('token') == null) {
        history.push('/login')
    }

    const context = useContext(noteContext)
    const { notes, getallNotes, editNote } = context
    const [notep, setnote] = useState({ etitle: "", edescription: "", etag: "", eid: "" });
    const form = useForm();
    const { register, handleSubmit, formState: { errors }, reset } = form;
     
    useEffect(() => {
        getallNotes();
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);

    const updatenote = (currentnote) => {
        setnote({ etag: currentnote.tag, etitle: currentnote.title, edescription: currentnote.description, eid: currentnote._id });
        form.setValue("title", currentnote.title);
        form.setValue("description", currentnote.description);
        form.setValue("tag", currentnote.tag);
        ref.current.click();
    }

    const handleclick = (data) => {
        ref.current.click();
        editNote(notep.eid, data.title, data.description, data.tag);
        props.showalert("Note Updated Successfully", "success")
        reset();



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
                                    <form onSubmit={handleSubmit(handleclick)}>
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Note Title</label>
                                            <input type="text" name="title" className="form-control" id="title"  {...register("title", NoteSchema.title)} />
                                            {errors.title && <span className="text-danger">{errors.title.message}</span>}

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Note Description</label>
                                            <textarea className="form-control" id="description" rows="3" name="description"  {...register("description", NoteSchema.description)} ></textarea>
                                            {errors.description && <span className="text-danger">{errors.description.message}</span>}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="tag" className="form-label">Note Tag</label>
                                            <select className="form-select" name='tag' id='tag' {...register("tag", NoteSchema.tag)} >
                                                {notep.etag === "Pending" ? <option value="Pending" selected>Pending</option> : <option value="Pending">Pending</option>}
                                                {notep.etag === "Completed" ? <option value="Completed" selected>Completed</option> : <option value="Completed">Completed</option>}

                                            </select>
                                            {errors.tag && <span className="text-danger">{errors.tag.message}</span>}

                                        </div>
                                        <button type="submit" className="btn btn-primary">Update Note</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container my-3">
                        <h2>Your Notes</h2>
                        <div className="row ">

                            {(!Array.isArray(notes) || notes.length === 0) && <div className="card">
                                <div className="card-body">
                                    No notes to display!
                                </div>
                            </div>}

                            {Array.isArray(notes) && notes.length !== 0 && notes.map((note) =>
                                <Noteitem key={note._id} note={note} updatenote={updatenote} showalert={showalert} />
                            )}
                        </div>
                    </div>
                </>
            )
        }} />
    )
}

