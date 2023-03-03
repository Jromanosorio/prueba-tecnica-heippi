import { Request, Response } from "express";
import userModel from "../models/userModel";
import { Encrypt, Verify } from "../utils/bcrypt";
import { generateToken } from "../utils/token";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { userID, password } = req.body;

    const user = await userModel.findOne({
      userID
    });

    if (user == null){
      return res.status(401).json({ message: "USER_NOT_FOUND" })
    }

    const isCorrect = await Verify(password, user.password)

    if (!isCorrect){
      throw new Error
    }

    const token = await generateToken({userID: user.userID , username: user.email, type: user.user_type })

    res.status(200).json({ user, token });

  } catch (error) {
    res.status(500).json({ message: "WRONG_USER_OR_PASSWORD" });
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { userID, name, phone, user_type, email, password, address, services, birthdate } = req.body;

    const existingUserID = await userModel.findOne({ userID })

    if(existingUserID){
      return res.status(409).json({ message: "ID_ALREADY_REGISTERED"})
    }

    const existingEmail = await userModel.findOne({ email })

    if(existingEmail){
      return res.status(409).json({ message: "EMAIL_ALREADY_REGISTERED"})
    }

    const hashPassword = await Encrypt(password);

    const user = await userModel.create({
      userID,
      name,
      phone,
      user_type,
      email,
      password: hashPassword,
      address,
      birthdate,
      services
    });

    res.status(200).json({ user });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "ERROR_CREATING_ACCOUNT" });
  }
};

export { loginUser, registerUser };
