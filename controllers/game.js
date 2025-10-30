import gameModel from "../models/game.js";

export const getAllGames = async (req, res) => {
  try {
    const games = await gameModel.find();
    res.json({
      success: true,
      allGames: games,
      total: games.length
    });
  } catch (error) {
    res.json({
      success: false,
      err: "error fetching games"
    });
  }
};



export const createGame = async (req, res) => {
  try {
    const { game_title, release_year } = req.body;
    
    const newGame = new gameModel({
      game_title,
      release_year
    });

    await newGame.save();

    res.json({
      success: true,
      message: "Game created successfully"
    });
  } catch (err) {
    res.json({
      success: false,
      message: "error creating game"
    });
  }
};

// delete
