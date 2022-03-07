import crypto from 'crypto';
import UserDAO from '../Database/DAO/UserDAO.js';
import UserValidator from '../validators/User.js';
const UserController = async () => {
    const UserController = {
        login: async (req, res) => {
            try {
                let body = await UserValidator.login(req);
                if (!body) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ msg: "Credentials missing from body" }));
                }
                const { credentials, password } = body;
                const user = await (UserDAO === null || UserDAO === void 0 ? void 0 : UserDAO.findByCredentials(credentials));
                if (user) {
                    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);
                    if (user.password !== hash) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        return res.end(JSON.stringify({ msg: "Invalid Credentials" }));
                    }
                    res.writeHead(200, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ user: user }));
                }
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Invalid Credentials" }));
            }
            catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Server Error" }));
            }
        },
        register: async (req, res) => {
            try {
                let body = await UserValidator.register(req);
                if (!body) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ msg: "Email, Username or password is missing from body" }));
                }
                const user = await (UserDAO === null || UserDAO === void 0 ? void 0 : UserDAO.create(body));
                res.writeHead(200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ user: user }));
            }
            catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Server Error" }));
            }
        },
        update: async (req, res) => {
            var _a;
            try {
                let body = await UserValidator.register(req);
                if (!body) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ msg: "Email, Username or password is missing from body" }));
                }
                const user = await (UserDAO === null || UserDAO === void 0 ? void 0 : UserDAO.update((_a = body._id) === null || _a === void 0 ? void 0 : _a.toString(), body));
                res.writeHead(200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ user: user }));
            }
            catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Server Error" }));
            }
        }
    };
    return UserController;
};
export default await UserController();
