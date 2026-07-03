/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [25, 50, 75, 100], // Explicitly allows quality="100" for your logo
  },
};

export default nextConfig;