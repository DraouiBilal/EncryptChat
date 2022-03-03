import * as api from "../../utils/api.js";
const login = document.querySelector("#login");
const password = document.querySelector("#password");
const form = document.querySelector("#loginForm");
window.addEventListener("load", () => {
    const data = localStorage.getItem("user");
    if (data)
        window.location.href = "http://127.0.0.1:5501/server/client/public/index.html";
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
        window.location.href = "http://127.0.0.1:5501/server/client/public/index.html";
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
