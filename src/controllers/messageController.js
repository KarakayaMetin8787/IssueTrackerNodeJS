import { catchAsync } from "../utils/catchAsync.js";
import { RegisterUser } from "../services/RegisterUser.js"
import { getMessages } from "../services/getMessages.js";
import { NewMessage } from "../services/NewMessage.js"

export const getMessagesController = catchAsync (
    async (req, res) => {
        const result = await getMessages(req.body)
        res.status(200).json({ success: true, data: result })
    }
)

export const postNewMessageController = catchAsync(
    async (req, res) => {
        console.log("NewMessageController", req.body);
        // Pass io to NewMessage function
        const result = await NewMessage(req.body);
        // const result = await NewMessage({ ...req.body, io: req.app.get('io') });
        res.status(200).json({ success: true, data: result });
    }
);

export const editMessageController = catchAsync (
    async (req, res) => {
        const result = await RegisterUser(req.body.register)
        res.status(200).json({ success: true, data: result })
    }
)

export const deleteMessageController = catchAsync (
    async (req, res) => {
        const result = await RegisterUser(req.body.register)
        res.status(200).json({ success: true, data: result })
    }
)