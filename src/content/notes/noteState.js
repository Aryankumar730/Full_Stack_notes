import React, { useState } from "react";
import noteContext from './noteContext';

const NoteState = (props)=>{
  const host = 'https://notebookf.herokuapp.com';

    const notesInitial = [ ]
    const [notes, setNotes] = useState(notesInitial)

    //Getting all notes

    async function getNotes(){

      //Making the API call to add note
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')
        },
       

      });
      const jsonall = await response.json();
      // console.log(jsonall);
      setNotes(jsonall)

    }


    //Add a note
    async function addNote(title, description,tag){

      //Making the API call to add note
      const response = await fetch(`${host}/api/notes/addnote`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})

      });
      console.log("adding a new node");
      const note = await response.json();
      setNotes(notes.concat(note))     
      
    }

    //Delete a note
    async function deleteNote(id){

      //Making the API call to delete

      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')
        },
        

      });
      const json = await response.json();
      console.log(json);

      console.log("deleting"+ id);
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)


    }

    //Edit a note
    async function editNote(id, title, description, tag){

      //Making the API call to edit
      
      const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})

      });
      const json1 = await response.json();
      console.log(json1);


      // Logic to edit in the client
      let newNotes = JSON.parse(JSON.stringify(notes))
      // let newNotes = json1;

        newNotes.forEach((element)=>{
        if(element._id === id){

          element.title = title;
          element.description= description;
          element.tag = tag;
          
        }
      
      })
      console.log(notes);
      setNotes(newNotes)
    
    }
  
    return(
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>

    )


}

export default NoteState;