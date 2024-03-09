import { Users } from "../models/users.js";
import { createToken } from "../utils/jwt.js";

export async function ProvideUsers({ email }) {
    try {
        console.log(email, "aus provide service");
    const foundUsers = await Users.find();
    console.log("1: ", foundUsers);
    if (!foundUsers) throw new Error("Keine Nutzer angelegt");
    const updatedUserlist = foundUsers.filter((user) => user.email !== email);
    console.log(updatedUserlist, "updated list aus service");
    const toFrontend = updatedUserlist.map((user) => ({
        email: user.email,
        status: user.status,
    }));
    console.log(toFrontend[0].email + " log aus service");
    return toFrontend;
    } catch (error) {
    console.error("Error providing users:", error);
    throw new Error("Error providing users");
    }
}
