import React, { useState } from 'react';
import notecontext from '../content/notes/noteContext';
import { useContext } from 'react';
import '../css/AddNote.css';

export default function AddNote(props) {

    const [note, setNote] = useState({ title: " ", description: " ", tag: " " })

    const context = useContext(notecontext);
    const { addNote } = context;

    function handleClick(e) {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: " ", description: " ", tag: " " })
        props.showAlert("Note has been added successfully", 'success')

    }

    function onChange(e) {

        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <h2 className='main_heading'>Add Notes here</h2>
            <div className="addnote_container my-3">
                <form className=' '>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label addnote">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label addnote">Description</label>
                        <textarea type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} rows="4"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label addnote">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                    </div>

                    <button type="submit" disabled={note.title.length < 3 || note.description.length < 5} className="btn btn-light" onClick={handleClick}>Add Note</button>
                </form>
            </div>


        </div>
    )
}
