import { NextFunction, Request, Response } from "express";
import { decode, JwtPayload, Secret, verify } from "jsonwebtoken";
import { AuthRequest } from "../interfaces/request.interface";
import { verifyToken } from "../utils/token";

const checkSession = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ").pop();

    if(!token){
      return res.status(401).json({ message: "TOKEN_NOT_FOUND"})
    }

    const isValidJWT = verifyToken(<string>token);

    if (!isValidJWT) {
      return res.status(401).json({ message: "INVALID_TOKEN" });
    }

    const userInfo: JwtPayload | string = verify(token, <Secret>process.env.SECRET)
    req.user = userInfo
    
    next();
    
  } catch (error) {
    return res.status(401).json({ message: "INVALID_SESSION" });
  }
};

export { checkSession };
