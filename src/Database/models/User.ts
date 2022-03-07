import { Db,ObjectId,WithId,Document } from "mongodb"

export interface TUser {
    _id?: ObjectId,
    nom?:string,
    prenom?:string,
    email:string,
    telephone?:string,
    username:string,
    password:string,
    salt?:string
}