import { IncomingMessage, ServerResponse }  from 'http'
import UserControllerT from '../interfaces/controllers/userControllerT.js'
import UserDAO from '../Database/DAO/UserDAO.js'
import { TUser } from '../Database/models/User'
import UserValidator from '../validators/User.js'
import { loginT } from '../interfaces/types';


const UserController = async (): Promise<UserControllerT> => {
    

    const UserController:UserControllerT = {
        login: async (req:IncomingMessage,res:ServerResponse) => {            
            try {
                let body:loginT | null = await UserValidator.login(req)
                if(!body){
                    res.writeHead(400,{"Content-Type": "application/json"})
                    return res.end(JSON.stringify({msg:"Credentials missing from body"}))
                }
                const {credentials,password} = body
                const user:(TUser | null | undefined) = await UserDAO?.findByCredentials(credentials)
                if(!user || user.password !== password){
                    res.writeHead(400,{"Content-Type": "application/json"})
                    return res.end(JSON.stringify({msg:"Invalid Credentials"}))
                }
                res.writeHead(200,{"Content-Type": "application/json"})
                return res.end(JSON.stringify({user:user!}))
            } catch (err: unknown) {
                res.writeHead(500,{"Content-Type": "application/json"})
                return res.end(JSON.stringify({msg:"Server Error"}))
            }            
        },
        register: async (req:IncomingMessage,res:ServerResponse) => {
            try {
                let body:TUser | null = await UserValidator.register(req)
                console.log(body);
                
                if(!body){
                    res.writeHead(400,{"Content-Type": "application/json"})
                    return res.end(JSON.stringify({msg:"Email, Username or password is missing from body"}))
                }
                const user:(TUser | null | undefined) = await UserDAO?.create(body)
                res.writeHead(200,{"Content-Type": "application/json"})
                return res.end(JSON.stringify({user: user!}))
            } catch (err: unknown){                
                res.writeHead(500,{"Content-Type": "application/json"})
                return res.end(JSON.stringify({msg:"Server Error"}))
            }
        }
    } 
    return UserController
}



export default await UserController()