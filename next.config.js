/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    FIREBASE_API: process.env.FIREBASE_API,
    FIREBASE_AUTHDOM: process.env.FIREBASE_AUTHDOM,
    FIREBASE_DB_URL: process.env.FIREBASE_DB_URL,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGE: process.env.FIREBASE_STORAGE
  }
}

module.exports = nextConfig
