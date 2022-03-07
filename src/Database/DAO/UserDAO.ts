import crypto from 'crypto'
import { Db, ObjectId, Collection, Document} from 'mongodb';
import Connection from '../db.js'
import { TUser } from '../models/User.js';
import UserDAOT from '../../interfaces/DAO/userDAOT.js';
import config from '../../config/config.js'

const UserSchema = async () => {

    let db:Db | null
    let users:Collection<Document>
    
    try{
        db = await Connection.getInstance() as Db
    }catch(e: unknown){

        if (typeof e === "string") {
            console.log(`${e}`.toUpperCase())
        } 
        else if (e instanceof Error) {
            console.log(e.message)
        }
        return null
    }
    try{
        users = db.collection("users")
    }catch(err: unknown) {
        await db.createCollection("users")
        users = db.collection("users")
    }

    const userDAO:UserDAOT  = {
        findById: (_id:string)=> {
            return users.findOne({_id: new ObjectId(_id)}) as Promise<TUser | null>
        },
        findByCredentials: (emailOrUsername:string) => {
            return users.findOne({
                $or:[
                    {email:emailOrUsername},
                    {username: emailOrUsername}
                ]
            }) as Promise<TUser | null>
            
        },
        create: async (user:TUser) => {
            const salt:string = crypto.randomBytes(16).toString('hex')
            user.password = crypto.pbkdf2Sync(user.password,salt,1000,64,'sha512').toString('hex')
            user.salt = salt
            const res = await users.insertOne(user)
            if(res.acknowledged){
                const userWithId:TUser = {
                    ...user,
                    _id: res.insertedId
                }
                return userWithId
            }
            return null
        },
        update: async (_id:string, user: TUser) => {
            const res = await users.updateOne({_id: new ObjectId(_id)},{$set:{...user}})
            if (res.acknowledged) 
                return users.findOne({_id: new ObjectId(_id)}) as Promise<TUser | null>
            else
                return null
        },
        delete: async (_id:string) => {
            const res = await users.deleteOne({_id:new ObjectId(_id)})
            return res.deletedCount>0 
        }
    }

    return userDAO

}

export default await UserSchema()
