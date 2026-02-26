'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'motion/react'
import { Sparkles, ChefHat, Calendar, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthButtons } from '@/components/auth/auth-buttons'
import Link from 'next/link'
import { NavigationMenu } from '../navigation/Menu'
import { useAuth } from '@/contexts/user-context'

interface HeroProps {
  onGenerate: () => void
  isGenerating: boolean
}

interface LimitInfo {
  allowed: boolean
  remaining: number
  limit: number
  isPublic: boolean
}

export function Hero({ onGenerate, isGenerating }: HeroProps) {
  const { isSignedIn, user, isLoaded } = useAuth()
  const [limitInfo, setLimitInfo] = useState<LimitInfo | null>(null)
  const [isLoadingLimit, setIsLoadingLimit] = useState(true)

  const fetchLimit = useCallback(async () => {
    setIsLoadingLimit(true)
    try {
      const userId = user?.id
      const res = await fetch('/api/v1/generation-limits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action: 'check' }),
      })
      const data = await res.json()
      setLimitInfo(data)
    } catch (error) {
      console.error('Failed to fetch limit:', error)
    } finally {
      setIsLoadingLimit(false)
    }
  }, [user?.id])

  useEffect(() => {
    if (isLoaded) {
      fetchLimit()
    }
  }, [isLoaded, fetchLimit])

  const handleGenerate = useCallback(async () => {
    if (!limitInfo?.allowed) {
      return
    }

    const userId = user?.id

    if (!limitInfo.isPublic) {
      try {
        await fetch('/api/v1/generation-limits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, action: 'decrement' }),
        })
      } catch (error) {
        console.error('Failed to decrement limit:', error)
      }
    }

    onGenerate()
    fetchLimit()
  }, [limitInfo, user?.id, onGenerate, fetchLimit])

  const showLoginPrompt = !limitInfo?.allowed && limitInfo?.isPublic === false
  const isDisabled = isGenerating || isLoadingLimit || !limitInfo?.allowed

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden px-4 sm:px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background/80 pointer-events-none" />

      <motion.div
        className="absolute top-20 -left-20 w-48 h-48 md:w-96 md:h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-40 h-40 md:w-[30rem] md:h-[30rem] rounded-full bg-secondary/15 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="hidden md:block absolute top-32 right-[15%] text-primary/80"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <ChefHat size="15rem" strokeWidth={3} />
      </motion.div>
      <motion.div
        className="hidden md:block absolute bottom-32 left-[12%] text-secondary"
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        <Calendar size="15rem" strokeWidth={3} />
      </motion.div>

      <div className="absolute top-6 right-6 z-20">
        <AuthButtons />
      </div>

      <NavigationMenu />

      <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mt-20 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-6 md:mb-8 border border-primary/20">
            <Sparkles size={14} />
            <span className="hidden sm:inline">
              Your Week of Delicious Meals Awaits
            </span>
            <span className="sm:hidden">Meal Planner</span>
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 md:mb-8 leading-[0.9] tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Weekly Meal <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">
            Planner
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 md:mb-6 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Generate a complete week of breakfast, lunch, and dinner recipes with
          one click.
        </motion.p>

        {!isLoadingLimit && limitInfo && (
          <motion.p
            className="text-sm text-muted-foreground mb-6 md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            {!isSignedIn && (
              <span className="text-amber-600">
                Public user: {limitInfo.remaining} generation left
              </span>
            )}
            {isSignedIn && limitInfo.allowed && (
              <span className="text-green-600">
                Logged in: {limitInfo.remaining}/{limitInfo.limit} generations
                this month
              </span>
            )}
            {showLoginPrompt && (
              <span className="text-red-500">
                No generations left. Please login to get 2 extra generations!
              </span>
            )}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {showLoginPrompt ? (
            <Link href="/sign-in">
              <Button
                size="lg"
                className="group relative px-6 py-5 md:px-10 md:py-8 text-base md:text-xl font-semibold rounded-xl md:rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-2xl shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:-translate-y-1 border-b-4 border-primary/20 active:border-b-0 active:translate-y-1 cursor-pointer"
              >
                <span className="flex items-center gap-2 md:gap-3">
                  <Lock className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="whitespace-nowrap">
                    Login for 2 Extra Generations
                  </span>
                </span>
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={isDisabled}
              size="lg"
              className="group relative px-6 py-5 md:px-10 md:py-8 text-base md:text-xl font-semibold rounded-xl md:rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-2xl shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:-translate-y-1 border-b-4 border-primary/20 active:border-b-0 active:translate-y-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <motion.span
                className="flex items-center gap-2 md:gap-3"
                animate={isGenerating ? { opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                <span className="whitespace-nowrap">
                  {isGenerating ? 'Generating...' : 'Generate Plan'}
                </span>
              </motion.span>
            </Button>
          )}
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12 md:mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { value: '21', label: 'Meals' },
            { value: '24+', label: 'Recipes' },
            { value: '∞', label: 'Combos' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center min-w-[80px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
