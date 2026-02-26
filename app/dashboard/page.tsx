'use client'

import { AuthGuard } from '@/components/auth/auth-guard'
import { motion } from 'motion/react'
import {
  UtensilsCrossed,
  ChefHat,
  TrendingUp,
  Clock,
  Calendar,
  Flame,
  Leaf,
  Star,
  ArrowRight,
  Sparkles,
  Target,
  Heart,
  Menu,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'
import { useState } from 'react'

const weeklyData = [
  { day: 'Mon', meals: 3, calories: 2100 },
  { day: 'Tue', meals: 2, calories: 1800 },
  { day: 'Wed', meals: 3, calories: 2300 },
  { day: 'Thu', meals: 3, calories: 1950 },
  { day: 'Fri', meals: 2, calories: 1700 },
  { day: 'Sat', meals: 3, calories: 2500 },
  { day: 'Sun', meals: 3, calories: 2200 },
]

const nutritionData = [
  { name: 'Protein', value: 35, color: '#F97316' },
  { name: 'Carbs', value: 40, color: '#84CC16' },
  { name: 'Fat', value: 25, color: '#8B5CF6' },
]

const mealTypeData = [
  { type: 'Breakfast', count: 12, color: '#FCD34D' },
  { type: 'Lunch', count: 15, color: '#FB923C' },
  { type: 'Dinner', count: 14, color: '#F97316' },
  { type: 'Snacks', count: 8, color: '#84CC16' },
]

const stats = [
  {
    label: 'Meals Planned',
    value: '47',
    icon: UtensilsCrossed,
    change: '+12%',
    trend: 'up',
    color: 'bg-orange-500',
  },
  {
    label: 'Recipes Created',
    value: '23',
    icon: ChefHat,
    change: '+8%',
    trend: 'up',
    color: 'bg-amber-500',
  },
  {
    label: 'Streak Days',
    value: '14',
    icon: Flame,
    change: '+3',
    trend: 'up',
    color: 'bg-red-500',
  },
  {
    label: 'Avg Calories',
    value: '2,050',
    icon: TrendingUp,
    change: '-5%',
    trend: 'down',
    color: 'bg-green-500',
  },
]

const recentMeals = [
  {
    name: 'Grilled Salmon with Quinoa',
    type: 'Dinner',
    calories: 520,
    rating: 4.8,
    time: '35 min',
  },
  {
    name: 'Mediterranean Salad Bowl',
    type: 'Lunch',
    calories: 380,
    rating: 4.5,
    time: '15 min',
  },
  {
    name: 'Avocado Toast Supreme',
    type: 'Breakfast',
    calories: 420,
    rating: 4.9,
    time: '10 min',
  },
  {
    name: 'Chicken Stir-Fry',
    type: 'Dinner',
    calories: 480,
    rating: 4.7,
    time: '25 min',
  },
]

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const Icon = stat.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-4 sm:p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className={`p-2 sm:p-3 rounded-xl ${stat.color} bg-opacity-10`}>
            <Icon
              className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color.replace('bg-', 'text-')}`}
            />
          </div>
          <span
            className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
              stat.trend === 'up'
                ? 'text-green-600 bg-green-100 dark:bg-green-900/30'
                : 'text-green-600 bg-green-100 dark:bg-green-900/30'
            }`}
          >
            {stat.change}
          </span>
        </div>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 font-serif">
          {stat.value}
        </p>
        <p className="text-muted-foreground text-xs sm:text-sm truncate">
          {stat.label}
        </p>
      </div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-2xl" />
    </motion.div>
  )
}

function WeeklyChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-2xl bg-card border border-border/50 p-4 sm:p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold font-serif">
            Weekly Overview
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Your meal planning activity
          </p>
        </div>
        <Calendar className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="h-48 sm:h-64 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={weeklyData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              opacity={0.5}
            />
            <XAxis
              dataKey="day"
              stroke="var(--muted-foreground)"
              fontSize={10}
              tickLine={false}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={10}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="calories"
              stroke="#F97316"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCalories)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

function NutritionPieChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="rounded-2xl bg-card border border-border/50 p-4 sm:p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold font-serif">
            Nutrition Balance
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Daily macro distribution
          </p>
        </div>
        <Leaf className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="h-40 sm:h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={nutritionData}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={55}
              paddingAngle={5}
              dataKey="value"
            >
              {nutritionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                fontSize: '12px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-2 sm:mt-4">
        {nutritionData.map((item) => (
          <div key={item.name} className="flex items-center gap-1 sm:gap-2">
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs sm:text-sm text-muted-foreground">
              {item.name} {item.value}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function MealTypeChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="rounded-2xl bg-card border border-border/50 p-4 sm:p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold font-serif">
            Meal Types
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Distribution this week
          </p>
        </div>
        <ChefHat className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="h-40 sm:h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mealTypeData} layout="vertical" margin={{ left: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              opacity={0.3}
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="var(--muted-foreground)"
              fontSize={10}
              tickLine={false}
            />
            <YAxis
              dataKey="type"
              type="category"
              stroke="var(--muted-foreground)"
              fontSize={10}
              width={50}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {mealTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

function RecentMeals() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="rounded-2xl bg-card border border-border/50 p-4 sm:p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold font-serif">
            Recent Meals
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Your latest planned recipes
          </p>
        </div>
        <button className="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1">
          View all <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {recentMeals.map((meal, index) => (
          <motion.div
            key={meal.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="flex items-center justify-between p-2 sm:p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center flex-shrink-0">
                <UtensilsCrossed className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm sm:text-base truncate group-hover:text-primary transition-colors">
                  {meal.name}
                </p>
                <div className="flex items-center gap-1 sm:gap-3 text-xs text-muted-foreground flex-wrap">
                  <span>{meal.type}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-0.5">
                    <Flame className="w-3 h-3" /> {meal.calories} cal
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3" /> {meal.time}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-500 flex-shrink-0 ml-2">
              <Star className="w-3 sm:w-4 h-3 sm:h-4 fill-current" />
              <span className="text-xs sm:text-sm font-medium">
                {meal.rating}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function QuickActions() {
  const actions = [
    {
      icon: Sparkles,
      label: 'Generate Plan',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Target,
      label: 'Set Goals',
      color: 'from-green-500 to-emerald-500',
    },
    { icon: Heart, label: 'Favorites', color: 'from-pink-500 to-rose-500' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="rounded-2xl bg-card border border-border/50 p-4 sm:p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold font-serif">
            Quick Actions
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Get started quickly
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl transition-all text-sm sm:text-base`}
            >
              <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="font-medium">{action.label}</span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

function StreakCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-4 sm:p-6 text-white shadow-xl"
    >
      <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2 sm:mb-4">
          <Flame className="w-5 sm:w-6 h-5 sm:h-6" />
          <span className="text-xs sm:text-sm font-medium opacity-90">
            Current Streak
          </span>
        </div>
        <p className="text-3xl sm:text-5xl font-bold mb-1 sm:mb-2">14 Days</p>
        <p className="text-xs sm:text-sm opacity-80">
          Keep it up! You're on fire
        </p>
      </div>
    </motion.div>
  )
}

function TodayPlan() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="rounded-2xl bg-card border border-border/50 p-4 sm:p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold font-serif">
            Today's Plan
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Monday, Feb 23
          </p>
        </div>
        <Clock className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200/50 dark:border-amber-800/50">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-amber-400 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
            B
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm sm:text-base truncate">
              Avocado Toast Supreme
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              420 cal • 10 min
            </p>
          </div>
          <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0">
            View
          </button>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
            L
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm sm:text-base truncate">
              Mediterranean Salad Bowl
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              380 cal • 15 min
            </p>
          </div>
          <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0">
            View
          </button>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-200/50 dark:border-orange-800/50">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
            D
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm sm:text-base truncate">
              Grilled Salmon with Quinoa
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              520 cal • 35 min
            </p>
          </div>
          <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0">
            View
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8 pt-12 lg:pt-0"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 font-serif">
              Welcome Back!
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground">
              Here's your meal planning overview
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="lg:col-span-2">
              <WeeklyChart />
            </div>
            <div>
              <StreakCard />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <NutritionPieChart />
            <MealTypeChart />
            <QuickActions />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <RecentMeals />
            <TodayPlan />
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
