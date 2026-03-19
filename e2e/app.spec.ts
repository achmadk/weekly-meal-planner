import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Weekly Meal Planner/i)
  })

  test('should display hero section with generate button', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', { name: /Weekly Meal/i }),
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: /Generate Plan/i }),
    ).toBeVisible()
  })

  test('should display stats section', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('Meals', { exact: true })).toBeVisible()
    await expect(page.getByText('Recipes', { exact: true })).toBeVisible()
    await expect(page.getByText('Combos')).toBeVisible()
  })

  test('should show generation count', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText(/generation left/i)).toBeVisible()
  })

  test('should have sign in and sign up buttons', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Sign Up/i })).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('should have sign in and sign up buttons visible on homepage', async ({
    page,
  }) => {
    await page.goto('/')

    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Sign Up/i })).toBeVisible()
  })

  test('should display navigation menu', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('navigation')).toBeVisible()
  })
})

test.describe('Dashboard', () => {
  test('should redirect unauthenticated users from dashboard to sign in', async ({
    page,
  }) => {
    await page.goto('/dashboard')

    await expect(page).toHaveURL(/sign-in/)
  })
})

test.describe('Saved Pages', () => {
  test('should redirect unauthenticated users from saved plans', async ({
    page,
  }) => {
    await page.goto('/saved/plans')

    await expect(page).toHaveURL(/sign-in/)
  })

  test('should redirect unauthenticated users from saved recipes', async ({
    page,
  }) => {
    await page.goto('/saved/recipes')

    await expect(page).toHaveURL(/sign-in/)
  })
})
