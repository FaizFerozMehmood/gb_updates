import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Open", "Closed", "Blocked", "Slow", "Warning"],
    default: "Open",
  },

  description: {
    type: String,
    trim: true,
  },
  photoUrl: {
    type: String,
  },
  postedBy: {
    type: String,
    default: "Anonymous",
  },
  coordinates: {
    lat: { type: Number },
    lon: { type: Number },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  verified: {
    type: Boolean,
    default: false,
  },
});

const Update= mongoose.model("Update", updateSchema);
export default Update