import { getMessagesController } from "../controllers/messageController.js"
import { postNewMessageController } from "../controllers/messageController.js"
import { editMessageController } from "../controllers/messageController.js"
import { deleteMessageController } from "../controllers/messageController.js"
import express from "express"
import { doJwtAuth } from  "../middleware/doJwtAuth.js"

export const messageRouter = express
    .Router()
    .post("/get", getMessagesController)
    .put("/post", postNewMessageController)
    .patch("/bearbeiten", editMessageController)
    .delete("/entfernen", deleteMessageController)
