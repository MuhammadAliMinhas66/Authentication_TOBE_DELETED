import gameUserModel from "../models/user.js";

// Get all game users
export const getAllGameUsers = async (req, res) => {
  try {
    const gameUsers = await gameUserModel.find().populate('game_id'); 
    res.json({
      allGameUsers: gameUsers,
      success: true,
      totalNumberOfUsers: gameUsers.length,
    });
  } catch (error) {
    res.json({
      success: false,
      err: "error fetching users from database",
    });
  }
};

// Create a new game user
export const createGameUser = async (req, res) => {
  try {
    const { user_name, game_email, game_id, game_rank, game_hours,password } = req.body;  

    const newGameUser = new gameUserModel({
      user_name,
      game_email,
      password,
      game_id,  
      game_rank,
      game_hours,
    });

    await newGameUser.save();

    res.json({
      success: true,
      message: "The data have been saved successfully and new Game User is created",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "array error",
    });
  }
};