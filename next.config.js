/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  experimental: {
    serverActions: {
        bodySizeLimit: '5mb', // Adjust this value as needed
    },
},
};

module.exports = nextConfig;
