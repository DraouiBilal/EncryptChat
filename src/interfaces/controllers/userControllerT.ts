import { IncomingMessage, ServerResponse }  from 'http'
import { TUser } from '../../Database/models/User.js'

type controller = (req: IncomingMessage,res: ServerResponse) => Promise<ServerResponse>

export default interface UserControllerT {
    login: controller,
    register: controller,
    update: controller
}