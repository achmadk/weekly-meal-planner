import { defineConfig } from 'vite-plus'

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  fmt: {
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: [
      'package-lock.json',
      'pnpm-lock.yaml',
      'yarn.lock',
      'src/routeTree.gen.ts',
    ],
  },
})
