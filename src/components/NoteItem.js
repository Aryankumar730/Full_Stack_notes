import React from 'react'
// import Notes from './Notes';
import notecontext from '../content/notes/noteContext';
import { useContext } from 'react';

export default function NoteItem(props) {
    
    const context = useContext(notecontext);
    const {deleteNote} = context;
    const {note, updateNote} = props;

    return (
        <div >
            <div className="card my-3" style={{width: "18rem",marginRight:"20px"}}>
                {/* <img src="..." className="card-img-top" alt="Nothing"/> */}
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">{note.tag}</p>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note has been deleted successfully",'success')}} ></i>
                        <i className="fa-sharp fa-solid fa-pen-to-square mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{updateNote(note)}}></i>
                    </div>
            </div>

        </div>
    )
}
