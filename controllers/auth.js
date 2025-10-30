import gameUserModel from "../models/user.js";
import bcrypt from "bcryptjs"

export const register = async (req,res) => {
    try{
        const {game_email,password} = req.body;
        const gameUserExists = await gameUserModel.findOne({email});
        if (gameUserExists){
            res.status(401).send({
                message : "user already exists",
             success : "false"
            })
        }else{
            const salt = 10;
            const hashedPassword = await bcrypt.hash(password,salt);
            const newGameUserCredentials = new gameUserModel({game_email,password:hashedPassword});
            await newGameUserCredentials.save();
            res.status(200).send({
                message : "new game user created successfully......",
                success: "true",
                newUserData : newGameUserCredentials
            })
        }   
    }catch(error){
        res.status(400).send({
            message: " Kuch agrbar hogyi ha register krney mein",
            success : false,
            whereFrom : "inside auth.js Controller Catch.....",
            err : error
        })
    }
}