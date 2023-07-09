
import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

export const AddNote = (props) => {
    const context = useContext(noteContext)
    // eslint-disable-next-line
    const { addNote } = context
    const [notep, setnote] = useState({ title: "", description: "", tag: "" })
    const handleclick = (e) => {
        e.preventDefault();
        addNote(notep.title, notep.description, notep.tag);
        setnote({ title: "", description: "", tag: "", color: "" });
        props.showalert("Note Added Successfully", "success")


    }
    const onchange = (e) => {
        setnote({ ...notep, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h1 className="my-5">Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Note Title</label>
                    <input type="text" name="title" className="form-control" id="title" onChange={onchange} minLength={5} value={notep.title} />

                </div>
                <div className="mb-3">
                    <label htmlFor="notedescription" className="form-label">Note Description</label>
                    <textarea className="form-control" id="description" rows="3" name="description" onChange={onchange} minLength={5} value={notep.description}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Note Status</label>
                    <select class="form-select" name='tag' id='tag' onChange={onchange} >
                        <option value="" selected>Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>

                </div>
               



                <button disabled={notep.title.length < 5 || notep.description.length < 5 || notep.tag.length < 3} type="submit" className="btn btn-primary my-2" onClick={handleclick}>Add Note</button>
            </form>

        </div>
    )
}
