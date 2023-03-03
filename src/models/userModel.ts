import { Schema, model } from "mongoose";
import { Hospital, Person } from "../interfaces/user.interface";

const userSchema = new Schema<Person | Hospital>({
    userID: {
        type: Number,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        enum: ['Hospital', 'Paciente', 'Medico'],
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    birthdate: {
        type: Date
    },
    services: {
        type: String
    },
    observation: {
        type: String,
    }
}, {
    timestamps: true,
    versionKey: false
})

const userModel = model('users', userSchema)
export default userModel