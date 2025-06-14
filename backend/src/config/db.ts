import { PrismaClient } from "../generated/prisma";

// Create the Prisma Client instance
const prisma = new PrismaClient(); 

// Optional: Connect immediately to log status
export async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to MySQL database using Prisma");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }
}

export default prisma;
