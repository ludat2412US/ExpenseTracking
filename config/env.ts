import dotenv from "dotenv"

dotenv.config();

export const env = {
    port: process.env.PORT ?? 5000,
    isProduction: (process.env.NODE_ENV ?? "development") === "production",
    nodeEnv: process.env.NODE_ENV ?? "development",
    logLevel: process.env.LOG_LEVEL ?? "info",
    accessSecretToken: process.env.ACCESS_SECRET_TOKEN ?? "8bb4c63e453248ebdea742e75b1d95ec",
    refreshSecretToken: process.env.REFRESH_SECRET_TOKEN ?? "442a88524c58fcd3f04a2ee8a9c8eb79"
}