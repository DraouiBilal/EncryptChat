var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as api from "../../utils/api.js";
const login = document.querySelector("#login");
const password = document.querySelector("#password");
const form = document.querySelector("#loginForm");
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const credentials = {
        login: login.value,
        password: password.value
    };
    try {
        const res = yield api.post("/api/v1/login", credentials);
        console.log(res);
    }
    catch (err) {
        console.log(err);
        if (typeof e === "string") {
            console.log(`${e}`.toUpperCase());
        }
        else if (e instanceof Error) {
            console.log(e.message);
        }
    }
}));
