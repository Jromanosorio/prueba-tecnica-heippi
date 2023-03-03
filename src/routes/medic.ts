import { Router } from "express";
import { getRecords, saveObservation } from "../controllers/pacientController";
import { checkIsMedic } from "../middlewares/checkIsMedic";
import { checkSession } from "../middlewares/verifySession";

const routerMedics = Router()

routerMedics.get('/mis-registros', checkSession, checkIsMedic, getRecords)
routerMedics.post('/paciente/agregar-observacion/:id', checkSession, checkIsMedic, saveObservation)

export { routerMedics }