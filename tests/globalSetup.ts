import { execSync } from "child_process";
import * as dotenv from "dotenv";

export async function setup() {
  dotenv.config({ path: ".env.test" });
  process.env.DATABASE_URL = process.env.DATABASE_URL;
  execSync("npx prisma migrate deploy", {
    env: { ...process.env },
    stdio: "inherit",
  });
}
