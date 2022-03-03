import { IncomingMessage } from "http"
import userValidatorT from "../interfaces/validators/userValidator"
import bodyParser from '../utils/bodyParser.js'
import { loginT } from "../interfaces/types.js" 
import { TUser } from '../Database/models/User';


const UserValidator = async () => {

    const userValidator: userValidatorT = {
        login: async (req: IncomingMessage) => {
            const body: loginT = await bodyParser<loginT>(req)
            
            if(!body.credentials || !(body.password && body.password.length>=8 && body.password.length<=25))
                return null
            return body
        },
        register: async (req: IncomingMessage) => {
            const body: TUser = await bodyParser<TUser>(req)            
            if(!(body.password && body.password.length>=8 && body.password.length<=25) || !body.email || !body.email.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$") || !body.username ) 
                return null
            return body
        },
        update: async (req: IncomingMessage) => {
            const body: TUser = await bodyParser<TUser>(req)            
            if(!(body.password && body.password.length>=8 && body.password.length<=25) || !body.email || !body.email.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$") || !body.username ) 
                return null
            return body
        }
    }

    return userValidator
}

export default await UserValidator()