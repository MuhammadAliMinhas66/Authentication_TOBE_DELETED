import mongoose, { Schema } from "mongoose";

const gameUserSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      unique: true,
    },
    game_email: {
      type: String,
      required: true,
      unique: true,
    },
    password : {
      type : String,
      required : true,
    },
    game_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: false 
    },
    game_rank: {
      type: String,
    },
    game_hours: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const gameUserModel = mongoose.model("gameUsers", gameUserSchema);
export default gameUserModel;