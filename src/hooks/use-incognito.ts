'use client'

import { useState, useEffect } from 'react'
import { checkIncognito, type IncognitoResult } from '@/lib/incognito'

export function useIncognito() {
  const [result, setResult] = useState<IncognitoResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkIncognito().then((data) => {
      setResult(data)
      setIsLoading(false)
    })
  }, [])

  return { result, isLoading, isPrivate: result?.isPrivate ?? false }
}
