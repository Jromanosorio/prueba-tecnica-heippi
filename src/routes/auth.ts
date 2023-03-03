import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { checkUserType } from "../middlewares/checkUserType";

const routerAuth = Router()

routerAuth.post('/login', loginUser)

routerAuth.post('/register', checkUserType, registerUser)

export { routerAuth }