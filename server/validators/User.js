import bodyParser from '../utils/bodyParser.js';
const UserValidator = async () => {
    const userValidator = {
        login: async (req) => {
            const body = await bodyParser(req);
            if (!body.credentials || !(body.password && body.password.length >= 8 && body.password.length <= 25))
                return null;
            return body;
        },
        register: async (req) => {
            const body = await bodyParser(req);
            if (!(body.password && body.password.length >= 8 && body.password.length <= 25) || !body.email || !body.email.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$") || !body.username)
                return null;
            return body;
        }
    };
    return userValidator;
};
export default await UserValidator();
