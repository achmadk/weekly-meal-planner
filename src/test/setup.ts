import '@testing-library/jest-dom'

import { cleanup } from '@testing-library/react'
import { afterEach } from 'vite-plus/test'

afterEach(() => {
  cleanup()
})

Object.defineProperty(window, 'CSS', { value: null })
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({ display: 'none', appearance: [] }),
})

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
})

Object.defineProperty(document.body.style, 'transform', {
  value: () => ({ enumerable: true, configurable: true }),
})
