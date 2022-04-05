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
                <button class="notes__add" type="button">Adicionar Anotação</button>
                <button class="notes__delete" type="button">Remover Anotação</button>
                <div class="notes__list"></div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="${dataAtual}"></input>
                <textarea class="notes__body" placeholder="Querido diário..."></textarea>
            </div>
        `;

        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");
        const btnDeleteNote = this.root.querySelector(".notes__delete");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd({title: inpTitle.value.trim(), content: inpBody.value.trim()});
        });

        btnDeleteNote.addEventListener("click", () => {
            this.onNoteDelete({id: localStorage.getItem("noteID")});
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

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
                <button class="notes__delete" type="button">
                    <img class="trash_can" src=${Image} />
                </button>
            </div>
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
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
                localStorage.setItem("noteID", noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = window.confirm("Deseja excluir a anotação?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}