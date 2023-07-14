
import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteSchema from '../utils/validation/NoteSchema'
import { useForm } from 'react-hook-form'

export const AddNote = (props) => {
    const context = useContext(noteContext)
    const { register, handleSubmit, formState: { errors },reset } = useForm();

    // eslint-disable-next-line
    const { addNote } = context
    const handleclick = (data) => {
        addNote(data.title, data.description, data.tag);
        props.showalert("Note Added Successfully", "success");
        reset();
    }


    return (
        <div>
            <h1 className="my-5">Add a Note (To See the notes added Scroll Down)</h1>
            <form onSubmit={handleSubmit(handleclick)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Note Title</label>
                    <input type="text" name="title" className="form-control" id="title" {...register("title", NoteSchema.title)} />
                    {errors.title && <span className="text-danger">{errors.title.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Note Description</label>
                    <textarea className="form-control" id="description" rows="3" name="description" {...register("description", NoteSchema.description)}></textarea>
                    {errors.description && <span className="text-danger">{errors.description.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Note Status</label>
                    <select className="form-select" name='tag' id='tag'  {...register("tag", NoteSchema.tag)} >
                        <option value="" selected>Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                    {errors.tag && <span className="text-danger">{errors.tag.message}</span>}

                </div>
                <button type="submit" className="btn btn-primary my-2">Add Note</button>
            </form>

        </div>
    )
}
