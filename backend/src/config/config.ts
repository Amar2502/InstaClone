import dotenv from "dotenv";

dotenv.config()

const config = {
    PORT: process.env.PORT || 5000,
    DB_HOST: process.env.DB_HOST || "",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
    JWT_SECRET: process.env.JWT_SECRET || "q"
}

export default config;