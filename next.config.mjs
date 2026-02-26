const deploymentMode = process.env.DEPLOYMENT_MODE ?? 'local'

if (deploymentMode === 'cloudflare') {
  const { initOpenNextCloudflareForDev } =
    await import('@opennextjs/cloudflare')
  initOpenNextCloudflareForDev()
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // enablePrerenderSourceMaps: false,
  // experimental: {
  //   prerenderEarlyExit: false
  // }
}

// export default withSerwist(nextConfig);
export default nextConfig
