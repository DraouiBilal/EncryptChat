import { IncomingMessage, ServerResponse }  from 'http'
import { createServer } from 'https'
import fs from 'fs'
import socket from './socket.js'
import UserController from './controllers/User.js'


const options = {
  key: fs.readFileSync('./server/keys/key.pem'),
  cert: fs.readFileSync('./server/keys/cert.pem')
};

const PORT:number = 5000
const HOST:string = "localhost"

// methods
const GET:string = "GET" 
const POST:string = "POST" 
const OPTIONS:string = "OPTIONS"

// links 
const HOME_PAGE:string = "/"
const LOGIN_LINK:string = "/api/v1/login"
const REGISTER_LINK:string = "/api/v1/register"
const UPDATE_LINK:string = "/api/v1/update"

const server = createServer(options,(req: IncomingMessage,res: ServerResponse)=>{
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
        case UPDATE_LINK:
            switch(req.method)
            {
                case POST: 
                    return UserController.update(req,res)
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
            try {
                if(req.url?.substring(req.url.length-2,req.url.length)==="js")
                    res.writeHead(200,{"Content-Type": "application/javascript"})
                const buff:Buffer = fs.readFileSync(`./server/client/public${req.url==="/"?"/index.html":req.url}`)
                if(req.method===GET)
                    res.end(buff)
            } catch (err) {
                res.writeHead(404, {"Content-Type": "text/html"});
                res.end("404 NOT FOUND")
            }
            
    }
})

server.listen(PORT,HOST,async ()=>{
    console.log(`listening on port ${PORT}`)   
    socket(server)  
})