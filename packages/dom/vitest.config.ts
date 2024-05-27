/// <reference types="vitest" />
import { defineProject } from 'vitest/config';

export default defineProject({
    test: {
        name: 'dom',
        environment: 'jsdom',
    }
})