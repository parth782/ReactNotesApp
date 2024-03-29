import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


export const Noteitem = (props) => {
    const { note, updatenote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const handledelete = () => {
        deleteNote(note._id)
        props.showalert("Note deleted Successfully", "success")
        console.log(note._id)
    }
    return (


        <div className="card mx-4 my-3" style={{ "width": "18rem", "backgroundColor": note.tag !== "Pending" ? "green" : "red", "color": note.tag !== "" ? "white" : "black" }}>

            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fas fa-trash mx-2" onClick={handledelete}></i>

                    <i className="far fa-edit mx-2" onClick={() => { updatenote(note) }}></i>
                </div>
                <p className="card-text">{note.description}</p>
                <br /><br />
                <footer>Tag: <cite title="Source Title">{note.tag}</cite></footer>

            </div>
        </div>

    )
}
