import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MealCard } from './MealCard'
import type { Recipe, MealType } from './types'

vi.mock('@/hooks/useRecipeImage', () => ({
  useRecipeImage: () => ({
    imageUrl: 'https://example.com/image.jpg',
    attribution: null,
  }),
}))

vi.mock('@/contexts/user-context', () => ({
  useAuth: () => ({
    isSignedIn: false,
  }),
}))

describe('MealCard', () => {
  const mockRecipe: Recipe = {
    id: '1',
    title: 'Test Recipe',
    mealType: 'breakfast' as MealType,
    description: 'A delicious test recipe',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    calories: 500,
    ingredients: ['ingredient 1', 'ingredient 2'],
    instructions: ['step 1', 'step 2'],
    imageUrl: 'https://example.com/image.jpg',
    tags: ['healthy', 'quick'],
  }

  const defaultProps = {
    dayName: 'Monday',
    recipe: mockRecipe,
    mealType: 'breakfast' as MealType,
    onClick: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders recipe title', () => {
    render(<MealCard {...defaultProps} />)
    expect(screen.getByText('Test Recipe')).toBeInTheDocument()
  })

  it('renders meal type badge', () => {
    render(<MealCard {...defaultProps} />)
    expect(screen.getByText('Breakfast')).toBeInTheDocument()
  })

  it('renders calories', () => {
    render(<MealCard {...defaultProps} />)
    expect(screen.getByText('500 cal')).toBeInTheDocument()
  })

  it('renders prep time and servings', () => {
    render(<MealCard {...defaultProps} />)
    expect(screen.getByText('10 + 20 minutes')).toBeInTheDocument()
    expect(screen.getByText('4 servings')).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<MealCard {...defaultProps} />)
    expect(screen.getByText('healthy')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<MealCard {...defaultProps} onClick={onClick} />)

    const card = screen.getByText('Test Recipe').closest('div')
    card?.click()

    expect(onClick).toHaveBeenCalled()
  })

  it('renders description', () => {
    render(<MealCard {...defaultProps} />)
    expect(screen.getByText('A delicious test recipe')).toBeInTheDocument()
  })
})
