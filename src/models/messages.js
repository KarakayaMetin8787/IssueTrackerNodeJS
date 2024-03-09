import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        _id: { type: String },
        from: { type: String },
        to: { type: String },
        message: [{
            content: { type: String },
            timestamp: { type: Number },
        }]
    },
    { collection: "directMessageData", timestamps: true }
);

export const Messages = mongoose.model("Messages", messageSchema);