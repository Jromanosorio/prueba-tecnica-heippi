import { Router } from "express";
import { getObservations } from "../controllers/pacientController";
import { checkIsPatient } from "../middlewares/checkIsPatient";
import { checkSession } from "../middlewares/verifySession";

const routerPatient = Router()

routerPatient.get('/mis-observaciones', checkSession, checkIsPatient, getObservations)

export { routerPatient }