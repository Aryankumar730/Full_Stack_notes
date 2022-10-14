import React, { useEffect, useState } from 'react'
import notecontext from '../content/notes/noteContext';
import { useContext } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import '../css/Notes.css'

export default function Notes(props) {

    const navigate = useNavigate();

    const [note,setNote] = useState({id: " ", etitle:" ", edescription:" ", etag:" "})

    const context = useContext(notecontext);
    const { notes, getNotes, editNote} = context;

    useEffect(() => {
        if(localStorage.getItem('token')){
            
            getNotes()
        }
        else{
            navigate('/login')
        }
    })

    
    function updateNote(currentnote) {
        console.log("clicked");
        // ref.current.click()
        setNote({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag})
        
    }

    function handleClick(e){
        console.log("Updating", note);
        editNote(note.id, note.etitle, note.edescription, note.etag)
        e.preventDefault();
        props.showAlert("Note has been updated successfully",'success')
        // addNote(note.title, note.description, note.tag)

    }

    function onChange(e){
       
        setNote({...note, [e.target.name]: e.target.value})
    }


    return (
        <>

            <AddNote showAlert={props.showAlert}/>

            <button type="button" style={{display:"none"}} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className=''>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
                                </div>

                            </form>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container_yourNotes my-3'>
                <h2 style={{color:"black"}}>Your Notes</h2>
                    {notes.length === 0 && "No notes to display"}
                <div className='container myNoteitem' style={{ display: "flex" }}>

                    {notes.map((note) => {
                        return <NoteItem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert}></NoteItem>
                    })}

                </div>
            </div>
        </>
    )
}
