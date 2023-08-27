/** @type {import("next").NextConfig} */
const nextConfig = {
    output: "export",
    webpack: (config) => {
        // Fallbacks for tensorflow.js
        config.resolve.fallback = {
            fs: false,
            path: false,
            os: false,
            util: false
        };
        return config;
    },
};

module.exports = nextConfig;
