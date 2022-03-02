import { TUser } from '../../Database/models/User.js'

export default interface UserDAOT {
    findById: (_id: string) => Promise<TUser | null>,
    findByCredentials: (emailOrUsername:string) => Promise<TUser | null>
    create: (user:TUser) => Promise<TUser | null>,
    update: (_id: string, user:TUser) => Promise<TUser | null>,
    delete: (_id: string) => Promise<boolean>
}