import "dotenv/config"
import { sign, verify, Secret } from "jsonwebtoken"

const generateToken = async (data: any) => {
    const token = sign({data}, <Secret>process.env.SECRET, {expiresIn: 60*60*24})
    return token
}

const verifyToken = (token:string) => {
    try {
        verify(token, <Secret>process.env.SECRET)
        return true
    } catch (error) {
        return false
    }
}

export {
    generateToken,
    verifyToken
}