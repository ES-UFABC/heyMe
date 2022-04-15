import axios from 'axios';
import React, { useState, useEffect } from "react";

export default class NotesAPI {
    static async getAllNotes() {
        let config = {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              "Origin": localStorage.getItem("api-origin")
            }
        };
        const response = await axios.get(`${localStorage.getItem("api-endpoint")}/diary`, config);
        
        let res = response.data;
        console.log('res', res);

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

    static deleteNote(id) {
        this.state = {open: false};
        var self = this;
        async function removeNote() {
            let config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Origin": localStorage.getItem("api-origin")
                }
            };
            id = parseInt(id);
            await axios.delete(`${localStorage.getItem("api-endpoint")}/diary/${id}`, config);
            self.setState({open: true});
        }
        removeNote();
    }
}