import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String },
    vorname: { type: String },
    nachname: { type: String },
    email: { type: String },
    passwort: { type: String },
    frage: { type: String },
    antwort: { type: String },
    type: { type: String },
    status: { type: String },
  },
  { collection: "registrationData", timestamps: true }
);

export const Users = mongoose.model("Users", userSchema);