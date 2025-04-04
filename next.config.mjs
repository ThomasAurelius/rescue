/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "rescue-94ae4.firebasestorage.app",
			},
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
			},
		],
	},
};

export default nextConfig;
