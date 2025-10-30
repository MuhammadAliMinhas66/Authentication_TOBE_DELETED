import gameUserModel from "../models/user.js";
import bcrypt from "bcryptjs"

export const register = async (req,res) => {
    try{
        const {game_email,password} = req.body;
        const gameUserExists = await gameUserModel.findOne({game_email});
        if (gameUserExists){
            res.status(401).send({
                message : "user already exists",
             success : false
            })
        }else{
            const salt = 10;
            const hashedPassword = await bcrypt.hash(password,salt);
            const newGameUserCredentials = new gameUserModel({game_email,password:hashedPassword});
            await newGameUserCredentials.save();
            res.status(200).send({
                message : "new game user created successfully......",
                success: true,
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

export const login = async (req,res) => {
    try{
        const {game_email, password} = req.body;
        
        const user = await gameUserModel.findOne({game_email});
        
        if (!user){
            return res.status(404).send({
                message: "User not found with this email",
                success: false
            })
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid){
            return res.status(401).send({
                message: "Invalid password",
                success: false
            })
        }
        
        res.status(200).send({
            message: "Login successful",
            success: true,
            userData: {
                id: user._id,
                user_name: user.user_name,
                game_email: user.game_email,
                game_id: user.game_id,
                game_rank: user.game_rank,
                game_hours: user.game_hours
            }
        })
        
    }catch(error){
        res.status(400).send({
            message: "Kuch agrbar hogyi ha login krney mein",
            success: false,
            whereFrom: "inside auth.js login Controller Catch.....",
            err: error
        })
    }
}