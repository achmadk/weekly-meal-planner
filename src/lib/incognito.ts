import { detectIncognito } from 'detectincognitojs'

export type IncognitoResult = {
  browserName: string
  browserVersion: string
  isPrivate: boolean
  osName: string
  osVersion: string
}

let cachedResult: IncognitoResult | null = null

export async function checkIncognito(): Promise<IncognitoResult | null> {
  if (cachedResult) {
    return cachedResult
  }

  try {
    const result = await detectIncognito()
    cachedResult = result as IncognitoResult
    return cachedResult
  } catch (error) {
    console.error('Failed to detect incognito mode:', error)
    return null
  }
}
