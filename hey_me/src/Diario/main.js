import App from "./App.js";
import './main.css';

export const callApi = ()=>{
    const root = document.getElementById("app");
    const app = new App(root);
}