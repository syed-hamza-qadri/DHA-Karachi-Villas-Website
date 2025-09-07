/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'gvitckactendhzpjezgu.supabase.co',
      },
    ],
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'dhakv.com'],
  },
}

export default nextConfig
