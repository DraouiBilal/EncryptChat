import {IncomingMessage} from 'http'
import { loginT } from '../types';
import { TUser } from '../../Database/models/User';

export default interface userValidatorT {
    login: (req: IncomingMessage) => Promise<loginT | null>,
    register : (req: IncomingMessage) => Promise<TUser | null>,
    update: (req: IncomingMessage) => Promise<TUser | null>
}