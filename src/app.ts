import "dotenv/config";
import express from "express";
import cors from "cors";
import ConnectDB from "./config/connection";

import { routerAuth } from "./routes/auth";
import { routerMedics } from "./routes/medic";
import { routerPatient } from "./routes/patient";

const app = express()

const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

ConnectDB()
    .then(() => console.log("Conectado a la base de datos"))
    .catch((err: Error) => console.log("Ha ocurrido un erro de conexion", err))

// auth route
app.use('/auth', routerAuth)

// api route
app.use('/api/pacientes', routerPatient)
app.use('/api/medicos', routerMedics)

app.listen(PORT, () => console.log("Running on PORT: ", PORT))