import * as api from "../utils/api.js"
import { TUser } from '../../../Database/models/User.js';

window.addEventListener("load",():void => {
    const data:string | null = localStorage.getItem("user")
    if(data)
        window.location.href = "https://localhost:5000/"
})

const username = document.querySelector("#username") as HTMLInputElement
const email = document.querySelector("#email") as HTMLInputElement
const password = document.querySelector("#password") as HTMLInputElement
const confirmPassword = document.querySelector("#confirmPassword") as HTMLInputElement
const form = document.querySelector("#loginForm") as HTMLFormElement

form.addEventListener("submit",async (e:Event)=> {
    e.preventDefault()
    const credentials : TUser = {
        username: username.value,
        email: email.value,
        password: password.value
    }    
    
    try { 
        const res:any = await api.post("/api/v1/register",credentials)
        localStorage.setItem("user",JSON.stringify(res))
        window.location.href = "https://localhost:5000/"
        
    } catch (err:unknown) {
        if (typeof e === "string") {
            console.log(`${e}`.toUpperCase())
        } 
        else if (e instanceof Error) {
            console.log(e.message)
        }
    }
    
})