import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

const dbUrl = process.env.NEXT_PUBLIC_DB_CONNECTION_STRING;

if (!dbUrl) {
  throw new Error("DB connection string is required");
}
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/models/schema.ts",
  dbCredentials: {
    url: dbUrl,
  },
});
