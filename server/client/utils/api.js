const baseURL = "http://127.0.0.1:5000";
const fetchOptions = {
    method: "",
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    },
    body: null
};
export const get = (url) => {
    fetchOptions.method = 'GET';
    return fetch(`${baseURL}${url}`);
};
export const post = (url, data = {}) => {
    fetchOptions.method = 'POST';
    fetchOptions.body = JSON.stringify(data);
    return fetch(`${baseURL}${url}`, fetchOptions);
    // .then(response => {
    //   console.log(response);
    //   // if (!response.ok) {
    //   //   console.log(response)
    //   //   throw new Error(response.statusText)
    //   // }
    //   return response.json()
    // })
};
