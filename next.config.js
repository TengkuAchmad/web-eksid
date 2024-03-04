/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	webpack: (config) => {
		config.resolve.preferRelative = true;
		return config;
	},
	reactStrictMode: true,
	swcMinify: true,
	async rewrites() {
		return [
			{
				source: '/',
				destination: '/login',
			},
		];
	},
};

// module.exports = {
// 	async redirects() {
// 		return [
// 			{
// 				source: '/login',
// 				destination: '/',
// 				permanent: true,
// 			},
// 		];
// 	},
// };

module.exports = nextConfig;

