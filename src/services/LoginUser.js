import { Users } from "../models/users.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/jwt.js"

export async function LoginUser ({ email, passwort }) {

    const foundUser = await Users.findOne({ email: email });
    if (!foundUser) throw new Error ("Nutzer mit dieser Email existiert nicht")
    const trimAllWhitespace = (str) => str.replace(/^\s+|\s+$/g, '');
    const passwordMatch = await bcrypt.compare(trimAllWhitespace(passwort), foundUser.passwort);;
    if (!passwordMatch) throw new Error ("Passwort ist falsch");
    const toFrontendLoginDetails = { vorname: foundUser.vorname, nachname: foundUser.nachname, email: foundUser.email, type: foundUser.type, status: foundUser.status }
    const accessToken = createToken(foundUser, "access");
    const refreshToken = createToken(foundUser, "refresh");
    return { user: toFrontendLoginDetails, token: { accessToken , refreshToken }};
    }
