/// <reference types="vitest" />
import { defineProject } from 'vitest/config';

export default defineProject({
    test: {
        name: 'plugin',
        environment: 'jsdom',
    }
})