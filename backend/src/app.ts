import express from "express";
import cors from "cors";
import userRoutes from "./routes/userroutes";
import cookieParser from "cookie-parser";
import otpRoutes from "./routes/otproutes";

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use(express.json())

app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/otp", otpRoutes)

export default app;