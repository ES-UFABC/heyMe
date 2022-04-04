import axios from 'axios';

export default class NotesAPI {
    static async getAllNotes() {
        let config = {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            //   "Origin": "https://main.d1w1cxbdfenujy.amplifyapp.com/"
            "Origin": "localhost:3000"
            }
        };
        const response = await axios.get(`${localStorage.getItem("api-endpoint")}/diary`, config);
        
        let res = response.data;
        console.log(res['success']);

        if (res['success'] == true) {
            console.log('Retornado com sucesso', res['success']);
        }
        const notes = res['diaries'];
        const sorted_notes = notes.sort((a, b) => {
            return new Date(a.created_date) > new Date(b.created_date) ? -1 : 1;
        });
        return sorted_notes;
            
    }

    static saveNote(noteToSave) {
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id);

        // Edit/Update
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            // existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static async deleteNote(id) {
        let config = {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            //   "Origin": "https://main.d1w1cxbdfenujy.amplifyapp.com/"
            "Origin": "localhost:3000"
            }
        };
        id = parseInt(id.id);
        console.log("id",typeof id)

        await axios.delete(`${localStorage.getItem("api-endpoint")}/diary/${id}`, config);
        
        
        // const notes = NotesAPI.getAllNotes();
        // const newNotes = notes.filter(note => note.id != id);

        localStorage.removeItem("noteID");
    }
}