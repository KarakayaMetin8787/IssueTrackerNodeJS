// import { createToken } from "../utils/jwt.js"
import { Messages } from "../models/messages.js";

export async function NewMessage({ from, to, message, io }) {
    try {
        console.log(from);
        console.log(to);
        console.log(message[0].content);
        console.log(message[0].timestamps);

        const textContent = message[0].content;
        const timestamp = message[0].timestamps;
        console.log("service message",timestamp);
        // Find the existing document or create a new one
        const updatedMessage = await Messages.findOneAndUpdate(
            { from, to },
            {
                $push: {
                    'message': { content: textContent, timestamp: timestamp },
                },
            },
            { upsert: true, new: true }
        );
            console.log(updatedMessage);
        // Emit 'newMessage' event to notify connected clients
        // io.emit('newMessage', {
        //     from: updatedMessage.from,
        //     to: updatedMessage.to,
        //     message: updatedMessage.message,
        // });

        // Return the updated or created message
        return {
            from: updatedMessage.from,
            to: updatedMessage.to,
            message: updatedMessage.message,
        };
    } catch (error) {
        console.error('Error updating or creating message:', error);
        throw new Error('Failed to update or create message.');
    }
}



// const accessToken = createToken(foundMessages, "access");
// const refreshToken = createToken(foundMessages, "refresh");