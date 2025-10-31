import gameUserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

export const register = async (req, res) => {
    try {
        // Body se data nikal rhey hn (role optional ha)
        const { user_name, game_email, password, role } = req.body;
        
        // Check kr rhey hn k user pehle se exist to nhi krta
        const gameUserExists = await gameUserModel.findOne({ game_email });
        
        if (gameUserExists) {
            return res.status(401).send({
                message: "user already exists",
                success: false
            });
        }
        
        // Password ko hash kr rhey hn bcrypt se
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Naya user bna rhey hn (role default 'user' hoga agar provide nhi kia)
        const newGameUserCredentials = new gameUserModel({
            user_name,
            game_email,
            password: hashedPassword,
            role: role || 'user' // Agar role nhi diya to 'user' assign hoga
        });
        
        // Database mein save kr rhey hn
        await newGameUserCredentials.save();
        
        // JWT token generate kr rhey hn (userId, email aur role include kia)
        const token = jwt.sign(
            // payload ha jani
            {
                userId: newGameUserCredentials._id,
                email: newGameUserCredentials.game_email,
                role: newGameUserCredentials.role
            },
            // second argument ha SECRET KEY KA
            process.env.JWT_SECRET, 
            { expiresIn: '24h' } // Token 24 ghante baad expire hoga
        );
        
        // Response bhej rhey hn token k sath
        res.status(200).send({
            message: "new game user created successfully",
            success: true,
            token: token, // Yahan token bhej rhey hn
            newUserData: {
                id: newGameUserCredentials._id,
                user_name: newGameUserCredentials.user_name,
                game_email: newGameUserCredentials.game_email,
                role: newGameUserCredentials.role, // Role bhi bhej diya
                createdAt: newGameUserCredentials.createdAt
            }
        });
        
    } catch (error) {
        res.status(400).send({
            message: "Error in registration",
            success: false,
            err: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        // Email aur password body se le rhey hn
        const { game_email, password } = req.body;
        
        // User ko email se dhond rhey hn database mein
        const user = await gameUserModel.findOne({ game_email });
        
        // Agar user nhi mila to error
        if (!user) {
            return res.status(404).send({
                message: "User not found with this email",
                success: false
            });
        }
        
        // Password compare kr rhey hn bcrypt se
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        // Agar password galat ha to error
        if (!isPasswordValid) {
            return res.status(401).send({
                message: "Invalid password",
                success: false
            });
        }
        
        // JWT token generate kr rhey hn (userId, email aur role k sath)
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.game_email,
                role: user.role // User ka role token mein store kia
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Token 24 ghante k liye valid
        );
        
        // Login success response token k sath
        res.status(200).send({
            message: "Login successful",
            success: true,
            token: token, // Token yahan bhej rhey hn
            userData: {
                id: user._id,
                user_name: user.user_name,
                game_email: user.game_email,
                role: user.role, // Role bhi include kia response mein
                game_id: user.game_id,
                game_rank: user.game_rank,
                game_hours: user.game_hours
            }
        });
        
    } catch (error) {
        res.status(400).send({
            message: "Error in login",
            success: false,
            err: error.message
        });
    }
};