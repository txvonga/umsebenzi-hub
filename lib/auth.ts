import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 30000,
});

export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
  },
  // This tells Better Auth to save the 'role' field we send from the signup form
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "freelancer",
      },
    },
  },
});