import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    globalSetup: "./tests/globalSetup.ts",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.ts"],
    env: {
      NODE_ENV: "test",
    },
  },
});
