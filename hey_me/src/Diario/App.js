import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";
import axios from 'axios';

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());

        this._refreshNotes();
    }

    async _refreshNotes() {
        const notes = await NotesAPI.getAllNotes();

        this._setNotes(notes);

        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
            // localStorage.setItem("noteID", notes[0].id);
        }
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        // console.log("lengrh", notes.length);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers() {
        return {
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: (sendData) => {
                this.state = {open: false};
                var self = this;
                async function addNote() {
                    let config = {
                        headers: { 
                          Authorization: `Bearer ${localStorage.getItem('token')}`,
                          "Origin": "http://localhost:5000"
                        }
                    };
                    await axios.post(`${localStorage.getItem("api-endpoint")}/diary`, sendData, config);
                    self.setState({open: true});
                }
                // axios.post(`${localStorage.getItem("api-endpoint")}/diary`, sendData, config)
                //     .then(function(response){
                //         let res = response.data;
                //         console.log(res['success']);

                //         if (res['success'] == true) {
                //             console.log('Adicionado com sucesso', res['success']);
                //         }
                //     //Perform action based on response
                //     })
                //     .catch(function(error){
                //         console.log(error);
                //     //Perform action based on error
                //     });
                //     self.setState({open: true});
                addNote();
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                // NotesAPI.saveNote({
                //     id: this.activeNote.id,
                //     title,
                //     body
                // });

                this._refreshNotes();
            },
            onNoteDelete: noteId => {
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            },
        };
    }
}