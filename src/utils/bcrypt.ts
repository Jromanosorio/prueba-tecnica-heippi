import { hash, compare } from "bcrypt"

const Encrypt = async(password:string) => {
    const hashPassword = await hash(password, 5)
    return hashPassword
}

const Verify = async(password:string, hash:string) => {
    return compare(password, hash)
}

export {
    Encrypt,
    Verify
}