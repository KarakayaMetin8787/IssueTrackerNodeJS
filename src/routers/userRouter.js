import  { getUsers, postChangePasswordUser, postLoginUser }  from "../controllers/userController.js"
import { postRegisterUser } from "../controllers/userController.js"
import express from "express"
import { doJwtAuth } from  "../middleware/doJwtAuth.js"

export const userRouter = express
    .Router()
    .post("/get", getUsers)
    .post("/login", postLoginUser)
    .post("/register", postRegisterUser)
    .post("/changePassword", postChangePasswordUser)

