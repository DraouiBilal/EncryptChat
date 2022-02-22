import * as api from "../../utils/api.js"
import { ICredentials } from "../../../interfaces/clientInterfaces"

const login = document.querySelector("#login") as HTMLInputElement
const password = document.querySelector("#password") as HTMLInputElement
const form = document.querySelector("#loginForm") as HTMLFormElement

form.addEventListener("submit",async (e:Event)=> {
    e.preventDefault()
    const credentials : ICredentials = {
        login: login.value,
        password: password.value
    }    
    try { 
        const res = await api.post("/api/v1/login",credentials)
        console.log(res);
        
    } catch (err:unknown) {
        console.log(err);
        if (typeof e === "string") {
            console.log(`${e}`.toUpperCase())
        } 
        else if (e instanceof Error) {
            console.log(e.message)
        }
    }
    
})