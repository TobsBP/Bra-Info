import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {},
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: '**.auto.dev' },
			{ protocol: 'https', hostname: '**.cdn.auto.dev' },
			{ protocol: 'https', hostname: 'media.auto.dev' },
			// fallback para outros CDNs que o auto.dev possa usar
			{ protocol: 'https', hostname: '**.cloudfront.net' },
			{ protocol: 'https', hostname: '**.s3.amazonaws.com' },
			{ protocol: 'https', hostname: 'images.unsplash.com' },
		],
	},
};

export default nextConfig;
