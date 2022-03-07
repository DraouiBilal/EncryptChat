import * as api from "../utils/api.js";
window.addEventListener("load", () => {
    const data = localStorage.getItem("user");
    if (data)
        window.location.href = "https://localhost:5000/";
});
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const form = document.querySelector("#loginForm");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const credentials = {
        username: username.value,
        email: email.value,
        password: password.value
    };
    try {
        const res = await api.post("/api/v1/register", credentials);
        localStorage.setItem("user", JSON.stringify(res));
        window.location.href = "https://localhost:5000/";
    }
    catch (err) {
        if (typeof e === "string") {
            console.log(`${e}`.toUpperCase());
        }
        else if (e instanceof Error) {
            console.log(e.message);
        }
    }
});
