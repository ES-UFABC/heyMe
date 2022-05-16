import Image from "../assets/trash-solid.svg";

export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        var dataAtual = new Date().toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" });
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">
                <table>
                    <thead>
                        <tr>
                        <td>
                        &nbsp;&nbsp;<i class="fa-solid fa-plus fa-2x"></i>
                        </td>
                        <td>
                            &nbsp;&nbsp;Nova
                        </td>
                        </tr>
                    </thead>
                </table>
                </button>
                <button class="notes__save" type="button">
                <table>
                    <thead>
                        <tr>
                        <td>
                            &nbsp;&nbsp;<i class="fa-solid fa-floppy-disk fa-2x"></i>
                        </td>
                        <td>
                            &nbsp;&nbsp;Salvar
                        </td>
                        </tr>
                    </thead>
                </table>
                </button>
                <div class="notes__list"></div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" value="${dataAtual}"></input>
                <textarea class="notes__body">Querido diário...</textarea>
            </div>
        `;
        // <button class="notes__delete" type="button">Remover Anotação</button>
                
        // console.log("loaded!");

        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");
        const btnSaveNote = this.root.querySelector(".notes__save");
        // const btnDeleteNote = this.root.querySelector(".notes__delete");
        // const btnDeleteNoteID = this.root.querySelector("");


        btnAddNote.addEventListener("click", () => {
            inpTitle.value = dataAtual;
            inpBody.value = "Querido diario...";
        //     this.root.innerHTML = `
        //     <div class="notes__sidebar">
        //         <button class="notes__add" type="button">Adicionar Anotação</button>
        //         <div class="notes__list"></div>
        //     </div>
        //     <div class="notes__preview">
        //         <button class="notes__save" type="button" onclick="saveNote('${context}')">
        //             <i class="fa-solid fa-floppy-disk"></i>
        //         </button>
        //         <input class="notes__title" type="text" value="${dataAtual}"></input>
        //         <textarea class="notes__body">Querido diário...</textarea>
        //     </div>
        // `;
        // this.state = {open: true};
            // Function for deleting the parent row of a clicked image
        });

        btnSaveNote.addEventListener("click", () => {
            // window.saveNote = function(context) {
            onNoteAdd({title: inpTitle.value.trim(), content: inpBody.value});
            // }
            // this.onNoteDelete({id: localStorage.getItem("noteID")});
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value;

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        this.updateNotePreviewVisibility(false);
    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
                <div class="delete__note">
                    <button type="button" id=${id}>
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            <br/>
        `;
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");

        // Empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.content, new Date(note.created_date));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select/delete events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.getElementsByTagName("button")[0].addEventListener("click", () => {
                this.onNoteDelete(Number(noteListItem.getElementsByTagName("button")[0].id));
            });
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            // noteListItem.addEventListener("dblclick", () => {
            //     const doDelete = window.confirm("Deseja excluir a anotação?");

            //     if (doDelete) {
            //         this.onNoteDelete(noteListItem.dataset.noteId);
            //     }
            // });
        });
    }

    updateActiveNote(note) {
        console.log("note", note);
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.content;
        console.log("note body", note.content);

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}