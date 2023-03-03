import { Schema, model } from "mongoose";
import { Historial } from "../interfaces/historial.interface";

const historalSchema = new Schema<Historial>({
    patient_id: {
        type: Number,
        required: true
    },
    medic_id: {
        type: Number,
        required: true
    },
    medic_spec: {
        type: String,
        required: true
    },
    observation: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const historialModel = model('historial', historalSchema)

export {
    historialModel
}