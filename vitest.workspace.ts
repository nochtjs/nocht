import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
    'packages/*',
    {
        test: {
            environment: 'jsdom',
            include: ['**/*.{test,spec}.ts'],
        }
    }
])