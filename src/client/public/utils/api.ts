const baseURL:string = "https://localhost:5000"

const fetchOptions : RequestInit = {
    method:"",
    headers:{
        'Content-Type':'application/json',
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    },
    body:null
}

export const get = (url:string) : Promise<Response> =>{
    fetchOptions.method = 'GET'
    return fetch(`${baseURL}${url}`).then(response => {
        if (!response.ok) {
          console.log(response)
          throw new Error(response.statusText)
        }
        return response.json()
      })
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
      return response.json()
    })
}

