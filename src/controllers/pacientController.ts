import { Request, Response } from "express";
import { AuthRequest } from "../interfaces/request.interface";
import { historialModel } from "../models/historialModel";
import userModel from "../models/userModel";

const getObservations = async (req: AuthRequest, res: Response) => {
    try {
        if (typeof req.user == "string") {
            return res.status(400).json({ message: "INVALID_DATA"})
        }
        
        const observations = await historialModel.find({ patient_id: req.user?.data.userID }).select({medic_id: 1, medic_spec: 1, observation: 1, _id: 0})
        res.status(200).json({ observations })
    
    } catch (error) {
        res.status(401).json({ message: "AN_ERROR_HAS_OCCURRED" })
    }
}

const getRecords = async (req: AuthRequest, res: Response) => {
    try {
        if (typeof req.user == "string") {
            return res.status(401).json({ message: "INVALID_DATA"})
        }
        
        const observations = await historialModel.find({ medic_id: req.user?.data.userID })
        res.status(200).json({ records: observations })
    
    } catch (error) {
        res.status(400).json({ message: "AND_ERROR_HAS_OCCURRED" })
    }
}

const saveObservation = async (req: AuthRequest, res: Response) => {
    try {
        if (typeof req.user == "string") {
            return res.status(401).json({ message: "INVALID_DATA"})
        }

        const { id } = req.params
        const { medic_spec, observation } = req.body

        const patient = await userModel.findOne({ userID: id })

        if (!patient){
            return res.status(404).json({ message: 'PATIENT_NOT_FOUND' })
        }

        if (patient.user_type !== 'Paciente') {
            return res.status(403).json({ message: 'REQUEST_DENIED' })
        }

        const historial = await historialModel.create({
            patient_id: id,
            medic_id: req.user?.data.userID,
            medic_spec,
            observation
        })

        res.status(200).json({ historial_added: historial })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'ERROR_ADDING_OBSERVATION' })
    }
}

export {
    saveObservation,
    getObservations,
    getRecords
}