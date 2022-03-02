import { createServer, IncomingMessage, ServerResponse }  from 'http'
import bodyParser from './utils/bodyParser.js'
import UserController from './controllers/User.js'

const PORT:number = 5000
const HOST:string = "localhost"

// methods
const POST:string = "POST" 
const OPTIONS:string = "OPTIONS"

// links 
const LOGIN_LINK:string = "/api/v1/login"
const REGISTER_LINK:string = "/api/v1/register"

const server = createServer(async (req: IncomingMessage,res: ServerResponse)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    switch(req.url){
        case LOGIN_LINK:
            switch(req.method)
            {
                case POST: 
                    return UserController.login(req,res)
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
        case REGISTER_LINK:
            switch(req.method)
            {
                case POST: 
                    return UserController.register(req,res)
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

server.listen(PORT,HOST,async ()=>{
    console.log(`listening on port ${PORT}`)        
})