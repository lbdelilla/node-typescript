import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth";

const registerCtrl = async ({ body }: Request, res: Response) => {
    const responseUser = await registerNewUser(body);
    res.send(responseUser);
};

const loginCtrl = async ({ body }: Request, res: Response) => {
    const { email, password } = body;
    const responseUser = await loginUser({ email, password });
    if (responseUser === "INVALID CREDENTIALS") {
        return res.status(400).send({ message: responseUser });
    }
    if (responseUser === "User or password incorrect") {
        return res.status(403).send({ message: responseUser });
    }
    res.send(responseUser);
    console.log(email);
};

export { loginCtrl, registerCtrl };