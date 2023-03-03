import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces/request.interface";

const checkIsPatient = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userData = req.user
  
  if (typeof userData == "string") {
    return res.status(400).json({ message: "INVALID_TOKEN_DATA"})
  }

  if (userData?.data.type != "Paciente"){
    return res.status(403).json({ message: "DENIED_ACCESS"})
  }
  
  next()
};

export {
    checkIsPatient
}
