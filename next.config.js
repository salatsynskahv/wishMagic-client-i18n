const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
};

module.exports = withNextIntl(nextConfig);