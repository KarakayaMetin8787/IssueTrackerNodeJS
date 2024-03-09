import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./src/routers/userRouter.js";
import { messageRouter } from "./src/routers/messageRouter.js";
import { Server } from "socket.io";
import { createServer } from "http";
// import multer from "multer";

dotenv.config();

const mongodb_url = process.env.MONGODB_URL;
// const uploadMiddleware = multer({ dest: "./uploads" });

const app = express();
// re-configure cors middleware (for COOKIE-SESSION)
app.use(cors());

//=================== Cookie Stuff ===============================

// const tenDaysInMs = 10 * 24 * 60 * 60 * 1000;
// const isFrontendLocalhost =
//     process.env.FRONTEND_URL.startsWith("http://localhost");
// const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;

// app.set("trust proxy", 1); // trust first proxy
// const cookieSessionOptions = {
//     name: "session",
//     secret: cookieSessionSecret, // frei wählbar
//     httpOnly: true,
//     expires: new Date(Date.now() + tenDaysInMs),
//     sameSite: isFrontendLocalhost ? "lax" : "none",
//     secure: isFrontendLocalhost ? false : true,
// };
// console.log(cookieSessionOptions);
// app.use(cookieSession(cookieSessionOptions)); //* --> COOKIE-PARSER

//===============================================================

async function connectToDb() {
    await mongoose
    .connect(mongodb_url, { dbName: "Users" })
    .then(() => {
        console.log("DB Verbindung erfolgreich");
    })
    .catch((err) => {
        console.log("Error connecting to DB ", err);
    })
}
connectToDb()

app.use(express.json());

//======================== socket.io Server ======================

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// Set 'io' in app
app.set('io', io);

// Socket.IO connection handling
io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});


app.use((req, _, next) => {
    console.log("new request", req.method, req.url);
    next();
});

//======================= Router ==============================

app.use("/api/v1/users", userRouter)
// app.use("/api/v1/projects", projectRouter)
app.use("/api/v1/messages", messageRouter)

app.use((_, res) => {
    res.status(404).json({ success: false, error: "route not found" });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server is ready on Port: " + PORT);
})