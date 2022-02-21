const baseURL:string = "http://127.0.0.1:5000"

const fetchOptions : RequestInit = {
    method:"",
    mode:"no-cors",
    headers:{
        'Content-Type':'application/json'
    },
    body:""
    
}

export const get = (url:string) : Promise<Response> =>{
    fetchOptions.method = 'GET'
    return fetch(`${baseURL}${url}`)
}

export const post = (url:string,data:any={}) : Promise<Response> =>{
    fetchOptions.method = 'POST'
    fetchOptions.body = JSON.stringify(data)
    return fetch(`${baseURL}${url}`,fetchOptions)
    .then(response => {
      if (!response.ok) {
          console.log(response)
        throw new Error(response.statusText)
      }
      return response.json() as Promise<Response>
    })
}

