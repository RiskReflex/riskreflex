import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 100], // Whitelists 100% quality for crisp logos
  },
};

export default nextConfig;