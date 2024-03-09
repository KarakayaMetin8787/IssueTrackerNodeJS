import {catchAsync} from "../utils/catchAsync.js";
import {LoginUser} from "../services/LoginUser.js";
import {RegisterUser} from "../services/RegisterUser.js"
import { ProvideUsers } from "../services/ProvideUsers.js";

export const postLoginUser = catchAsync (
    async (req, res) => {
        console.log(JSON.stringify(req.body) + " userController log");
        const result = await LoginUser(req.body)
        console.log("log aus controller LoginUser");
        res.status(200).json({ success: true, data: result })
    },
    { message: "Nutzer nicht gefunden"})

export const postRegisterUser = catchAsync (
    async (req, res) => {
        const result = await RegisterUser(req.body.register)
        console.log("log uas controller Register");
        res.status(200).json({ success: true, data: result })
    }
)

export const getUsers = catchAsync (
    async (req, res) => {
        console.log("log aus controller routes get:", req.body);
        const result = await ProvideUsers(req.body)
        res.status(200).json({ success: true, data: result })
    }
)

export const postChangePasswordUser = catchAsync (
    async (req, res) => {
        console.log(JSON.stringify(req.body) + " userController pw change log");
        const result = await ChangePwUser(req.body)
        console.log("log aus controller changePwUser");
        res.status(200).json({ success: true, data: result })
    },
    { message: "Email existiert nicht oder ist falsch"})