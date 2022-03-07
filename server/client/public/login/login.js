import * as api from "../utils/api.js";
const login = document.querySelector("#login");
const password = document.querySelector("#password");
const form = document.querySelector("#loginForm");
window.addEventListener("load", () => {
    const data = localStorage.getItem("user");
    if (data)
        window.location.href = "https://localhost:5000/";
});
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const credentials = {
        credentials: login.value,
        password: password.value
    };
    try {
        const res = await api.post("/api/v1/login", credentials);
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
