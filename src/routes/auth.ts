import { Request, Response, Router } from "express";
import { registerCtrl, loginCtrl } from "../controller/auth";

const router = Router();
router.post("/register", registerCtrl);
router.post("/login", loginCtrl);

export { router };