/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'project-y.s3.amazonaws.com',
          port: '', // No port is needed for HTTPS
          pathname: '/**', // Matches all paths
        },
      ],
    },
  };

  export default nextConfig;
  