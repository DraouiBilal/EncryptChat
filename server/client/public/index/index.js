const localStorageUser = localStorage.getItem("user");
if (!localStorageUser)
    window.location.href = "https://localhost:5000/login/index.html";
const user = JSON.parse(localStorageUser).user;
const form = document.querySelector("#form");
const message = document.querySelector("#message");
const chat = document.querySelector("#chat");
const identifier = document.querySelector("#identifier");
const messages = {};
const publicKeys = {};
const getMessageEncoding = (msg) => {
    let enc = new TextEncoder();
    return enc.encode(msg);
};
const getMessageDecoding = (encodedMessage) => {
    let dec = new TextDecoder();
    return dec.decode(encodedMessage);
};
const hashArrayBuffer = (arrBuf) => {
    const hashArray = Array.from(new Uint8Array(arrBuf)); // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
};
const getArrayBuffer = (arrBuf) => {
    return new Uint8Array(arrBuf.match(/../g).map(h => parseInt(h, 16))).buffer;
};
let keyPair = await window.crypto.subtle.generateKey({
    name: "RSA-OAEP",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256"
}, true, ["encrypt", "decrypt"]);
const loadUsers = () => {
    const friend = document.querySelectorAll(".friend");
    friend.forEach((frd) => {
        frd.addEventListener("click", (e) => {
            identifier.innerHTML = `Chat with ${frd.getAttribute("name")}`;
        });
    });
};
const ws = new WebSocket("wss://localhost:5000");
ws.addEventListener("open", async () => {
    console.log('ws opened on browser');
    const publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey);
    ws.send(JSON.stringify({ type: "connection", data: { _id: user._id, publicKey: hashArrayBuffer(publicKey) } }));
});
identifier.addEventListener("change", (e) => {
    console.log("sfu");
});
ws.addEventListener("message", async (e) => {
    const data = JSON.parse(e.data);
    if (data.type === "users") {
        const users = data.data;
        const ul = document.querySelector("#friends");
        ul.innerHTML = "";
        for (let i = 0; i < users.length; i++) {
            let li = document.createElement("li");
            li.innerHTML = `<li class="friend" name="${users[i]}">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="">
                                <div>
                                    <h2>${users[i]}</h2>
                                    <h3>
                                        <span class="status green"></span>
                                        online
                                    </h3>
                                </div>
                            </li>`;
            ul.appendChild(li);
            messages[users[i]] = [];
        }
        loadUsers();
    }
    else if (data.type === "keys") {
        const dt = data.data;
        publicKeys[dt.username] = getArrayBuffer(dt.publicKey);
    }
    // else if(data.type==="getAllKeys"){
    //     const dt:{publicKeys: string} = data.data
    //     console.log(dt.publicKeys);
    //     Object.keys(dt.publicKeys).forEach((el:string) => {
    //         publicKeys[el] = hashArrayBuffer(dt.publicKeys[el])
    //     })
    //     console.log(publicKeys);
    // }
    else {
        const li = document.createElement("li");
        const dt = data.data;
        const arrbuf = getArrayBuffer(dt.msg);
        const decrypted = await window.crypto.subtle.decrypt({ name: "RSA-OAEP" }, keyPair.privateKey, arrbuf);
        li.innerHTML = `<li class="you">
                            <div class="entete">
                                <span class="status green"></span>
                                <h2>${dt.from}</h2>
                                <h3>${new Date()}</h3>
                            </div>
                            <div class="cercle"></div>
                            <div class="message">
                                ${getMessageDecoding(decrypted)}
                            </div>
                        </li>`;
        chat.appendChild(li);
        messages[identifier.innerText.substring(10)].push({ byMe: false, message: dt.msg });
    }
});
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const publicKey = await crypto.subtle.importKey("spki", publicKeys[identifier.innerText.substring(10)], {
        name: "RSA-OAEP",
        hash: "SHA-256"
    }, true, ["encrypt"]);
    const encrypted = await window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, getMessageEncoding(message.value));
    ws.send(JSON.stringify({
        type: "message",
        data: {
            from: user._id,
            to: identifier.innerText.substring(10),
            message: hashArrayBuffer(encrypted)
        }
    }));
    const li = document.createElement("li");
    li.innerHTML = `<li class="me">
                        <div class="entete">
                            <span class="status green"></span>
                            <h2>${user.username}</h2>
                            <h3>${new Date()}</h3>
                        </div>
                        <div class="cercle"></div>
                        <div class="message">
                            ${message.value}
                        </div>
                    </li>`;
    chat.appendChild(li);
    message.value = "";
    messages[identifier.innerText.substring(10)].push({ byMe: true, message: message.value });
});
export {};
