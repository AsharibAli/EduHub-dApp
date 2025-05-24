/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Handle Suspense warnings for useSearchParams
  modularizeImports: {
    'next/router': {
      transform: 'next/router',
    }
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
