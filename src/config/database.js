import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on("error", (err) => console.error("Database connection error:", err));

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });