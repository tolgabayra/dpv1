/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === "production" ? "/client" : "",
  publicRuntimeConfig: {
    contextPath: process.env.NODE_ENV === "production" ? "/client" : "", 
  }
}

module.exports = nextConfig
