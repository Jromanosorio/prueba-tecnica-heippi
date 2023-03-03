import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../interfaces/request.interface";

const checkIsMedic = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userData = req.user
  
  if (typeof userData == "string") {
    return res.status(400).json({ message: "INVALID_TOKEN_DATA"})
  }

  if (userData?.data.type != "Hospital"){
    return res.status(403).json({ message: "DENIED_ACCESS"})
  }
  
  next()
};

export {
    checkIsMedic
}
