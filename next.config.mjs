import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import { withPWA } from '@swavoti/next-pwa'

initOpenNextCloudflareForDev()

/** @type {import('next').NextConfig} */
const nextConfig = {

}

export default withPWA(nextConfig)
