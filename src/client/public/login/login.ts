import * as api from "../../utils/api.js"
import { ICredentials } from "../../../interfaces/clientInterfaces"
import { TUser } from '../../../Database/models/User';

const login = document.querySelector("#login") as HTMLInputElement
const password = document.querySelector("#password") as HTMLInputElement
const form = document.querySelector("#loginForm") as HTMLFormElement

window.addEventListener("load",():void => {
    const data:string | null = localStorage.getItem("user")
    if(data)
        window.location.href = "http://127.0.0.1:5501/server/client/public/login/index.html"
})

form.addEventListener("submit",async (e:Event)=> {
    e.preventDefault()
    const credentials : ICredentials = {
        credentials: login.value,
        password: password.value
    }    
    try { 
        const res:any = await api.post("/api/v1/login",credentials)
        localStorage.setItem("user",JSON.stringify(res))
        
        
    } catch (err:unknown) {
        if (typeof e === "string") {
            console.log(`${e}`.toUpperCase())
        } 
        else if (e instanceof Error) {
            console.log(e.message)
        }
    }
    
})