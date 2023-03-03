import { NextFunction, Request, Response } from "express";

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user_type, services, birthdate } = req.body;

    console.log(user_type)

    if (!['Hospital', 'Paciente', 'Medico'].includes(user_type)) {
      return res.status(401).json({ message: "USER_TYPE_INVALID"})
    }

    if (user_type == "Hospital" && !services) {
      return res.status(400).json({ message: "SERVICES_REQUIRED" });
    }

    if ((user_type == "Paciente" || user_type == "Medico") && !birthdate) {
      return res.status(400).json({ message: "BIRTHDATE_REQUIRED" });
    }

    next();
};

export { checkUserType };
