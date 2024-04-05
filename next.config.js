/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 1699377891,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "ede071c7dc7e17df9193866c6c5aba3b",
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
