import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/req-ext.interface";
import { verifyToken } from "../utils/jwt.handle";

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop(); // 11111
    const isUser = verifyToken(`${jwt}`) as { id: string };
    if (!isUser) {
      res.status(401);
      res.send("INVALID_JWT");
    } else {
      req.user = isUser;
      next();
    }
  } catch (e) {
    console.log({ e });
    res.status(400);
    res.send("INVALID_SESSION_");
  }
};

export { checkJwt };