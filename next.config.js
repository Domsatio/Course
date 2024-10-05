/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.builder.io",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://ce49-103-114-52-10.ngrok-free.app/:path*',
  //     },
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://localhost:3000/:path*',
  //     }
  //   ]
  // },
};

module.exports = nextConfig;
