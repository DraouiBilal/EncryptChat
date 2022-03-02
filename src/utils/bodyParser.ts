import { IncomingMessage } from "http"




export default async <T>(req:IncomingMessage):Promise<T> => {
    const promise = new Promise<T>((resolve,reject) => {
        let body:string = ""
        req.on("data",chunk => {
            body += chunk
        })
        req.on("end",async ()=>{
            try {
                const data:T = JSON.parse(body)
                resolve(data)
            } catch (err: unknown) {
                reject("The data received is not a JSON")
            }
            
        })
    })
    return promise
}