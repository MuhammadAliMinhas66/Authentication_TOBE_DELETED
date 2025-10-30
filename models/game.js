import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    game_title: {
      type: String,
      required: true,
      unique: true
    },
    release_year: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const gameModel = mongoose.model("Game", gameSchema);
export default gameModel;