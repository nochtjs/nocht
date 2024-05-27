import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
    'packages/*',
    {
        test: {
            include: ['__tests__/**/*.test.{ts,js}'],
            name: 'jsdom',
            environment: 'jsdom'
        }
    }
])