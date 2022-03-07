import crypto from 'crypto';
import { ObjectId } from 'mongodb';
import Connection from '../db.js';
const UserSchema = async () => {
    let db;
    let users;
    try {
        db = await Connection.getInstance();
    }
    catch (e) {
        if (typeof e === "string") {
            console.log(`${e}`.toUpperCase());
        }
        else if (e instanceof Error) {
            console.log(e.message);
        }
        return null;
    }
    users = db.collection("users");
    const userDAO = {
        findById: (_id) => {
            return users.findOne({ _id: new ObjectId(_id) });
        },
        findByCredentials: (emailOrUsername) => {
            return users.findOne({
                $or: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ]
            });
        },
        create: async (user) => {
            const salt = crypto.randomBytes(16).toString('hex');
            user.password = crypto.pbkdf2Sync(user.password, salt, 1000, 64, 'sha512').toString('hex');
            user.salt = salt;
            const res = await users.insertOne(user);
            if (res.acknowledged) {
                const userWithId = Object.assign(Object.assign({}, user), { _id: res.insertedId });
                return userWithId;
            }
            return null;
        },
        update: async (_id, user) => {
            const res = await users.updateOne({ _id: new ObjectId(_id) }, { $set: Object.assign({}, user) });
            if (res.acknowledged)
                return users.findOne({ _id: new ObjectId(_id) });
            else
                return null;
        },
        delete: async (_id) => {
            const res = await users.deleteOne({ _id: new ObjectId(_id) });
            return res.deletedCount > 0;
        }
    };
    return userDAO;
};
export default await UserSchema();
