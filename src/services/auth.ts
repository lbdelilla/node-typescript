import { Auth } from "../interfaces/auth.interface";
import { User } from '../interfaces/user.interface';
import UserModel from "../models/user";
import { encrypt, hashCompare } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async ({email, password, name}: User) => {
    const checkIs = await UserModel.findOne({ email});
    if(checkIs) return "User already exists";
    const passHash = await encrypt(password)
    const registerNewUser = await UserModel.create({
        email,
        password:passHash, 
        name
    });
    return registerNewUser;
};

const loginUser = async ({email, password}: Auth) => {
    const checkIs = await UserModel.findOne({ email});
    if(!checkIs) return "INVALID CREDENTIALS";

    const passwordHash = await checkIs.password;
    const isMatch = await hashCompare(password, passwordHash);
    if(!isMatch) return "User or password incorrect";

    const token = await generateToken(checkIs.email);
    const data = {
        token, 
        user: checkIs
    }
    return data;
};


export { registerNewUser, loginUser }