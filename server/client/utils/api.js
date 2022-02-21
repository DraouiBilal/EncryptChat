const baseURL = "http://127.0.0.1:5000";
const fetchOptions = {
    method: "",
    mode: "no-cors",
    headers: {
        'Content-Type': 'application/json'
    },
    body: ""
};
export const get = (url) => {
    fetchOptions.method = 'GET';
    return fetch(`${baseURL}${url}`)
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error(response.statusText);
            }
            return response.json();
        });
};
export const post = (url, data = {}) => {
    fetchOptions.method = 'POST';
    fetchOptions.body = JSON.stringify(data);
    return fetch(`${baseURL}${url}`, fetchOptions)
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error(response.statusText);
            }
            return response.json();
        });
};
