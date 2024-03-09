import { createToken } from "../utils/jwt.js"
import { Messages } from "../models/messages.js";

export async function getMessages ({ from, to }) {
    const foundMessages = await Messages.findOne({ from: from, to: to });
    if (!foundMessages) return { emptyConversation: true}
    const toFrontend = { from: foundMessages.from, to: foundMessages.to, message: foundMessages.message }
    const accessToken = createToken(foundMessages, "access");
    const refreshToken = createToken(foundMessages, "refresh");
    return toFrontend
    }
