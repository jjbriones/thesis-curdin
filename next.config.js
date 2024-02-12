/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: '/api/:path*',
			},
		];
	},
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'apps.googleusercontent.com',
			'res.cloudinary.com',
		],
	},
};

module.exports = nextConfig;
