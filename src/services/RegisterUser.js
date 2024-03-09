import { Users } from "../models/users.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const RegisterUser = async ({ vorname, nachname, email, passwort, frage, antwort }) => {
    const foundUser = await Users.findOne({ email: email });
    if (foundUser !== null) throw new Error ("Nutzer mit dieser Email existiert bereits")
    const trimAllWhitespace = (str) => str.replace(/^\s+|\s+$/g, '');
    const saltRounds = 10;
    const passwordNoWhiteSpace = trimAllWhitespace(passwort)
    const hashedPassword = await bcrypt.hash(passwordNoWhiteSpace, saltRounds);
    const currentDate = new Date();
    const newRegistration = await Users.create({ 
        _id: currentDate.getTime(), 
        vorname: trimAllWhitespace(vorname), 
        nachname: trimAllWhitespace(nachname), 
        email: trimAllWhitespace(email), 
        passwort:hashedPassword, 
        frage: trimAllWhitespace(frage), 
        antwort: trimAllWhitespace(antwort), 
        type: "developer",
        status: "online",
    })
    await newRegistration.save();
    return newRegistration
}

// const accessToken = createToken(foundUser, "access");
// const refreshToken = createToken(foundUser, "refresh");
// return { userInfo: foundUser.toProfileInfo(), accessToken, refreshToken };



