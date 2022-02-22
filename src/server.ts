import { createServer, IncomingMessage, ServerResponse }  from 'http'


const PORT:number = 5000
const HOST:string = "localhost"

// methods
const POST:string = "POST" 
const OPTIONS:string = "OPTIONS"

// links 
const LOGIN_LINK:string = "/api/v1/login"

const server = createServer((req: IncomingMessage,res: ServerResponse)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    let body:string = ""
    switch(req.url)
    {
        case LOGIN_LINK:
            switch(req.method)
            {
                case POST: 
                    req.on("data",chunk => {
                        body += chunk
                    })
                    req.on("end",()=>{
                        const {login,password} = JSON.parse(body)
                        console.log(login,password);
                        
                        res.end();
                    })
                    break;
                case OPTIONS:
                    res.writeHead(200,{
                        "Accept": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*",
                        "Access-Control-Allow-Headers": "*"
                    })    
                    res.end()
                break
                default:
                    res.writeHead(405, {"Content-Type": "application/json"})
                    res.write(JSON.stringify({
                        "msg": "METHOD NOT ALLOWED"
                    }))
                    res.end()
            }
            break;
        default:
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("404 NOT FOUND")
    }
})

server.listen(PORT,HOST,()=>{
    console.log(`listening on port ${PORT}`)
})