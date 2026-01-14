/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  domains: ["i.ibb.co", "img.daisyui.com"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // port: "",
        pathname: "/**",
        // search: "",
      },
    ],
  },
};

export default nextConfig;
