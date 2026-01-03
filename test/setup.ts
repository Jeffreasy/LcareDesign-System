/**
 * Global test setup file
 * Runs before all tests
 */

import { beforeEach, afterEach, vi } from 'vitest';

// Mock globalThis for SSR config testing
beforeEach(() => {
    // Reset global config before each test
    if (typeof globalThis !== 'undefined') {
        (globalThis as any).__DESIGN_SYSTEM_CONFIG__ = undefined;
    }
    if (typeof window !== 'undefined') {
        (window as any).__DESIGN_SYSTEM_CONFIG__ = undefined;
    }
});

afterEach(() => {
    // Clean up after tests
    vi.clearAllMocks();
});

// Helper function to set mock config
export function mockDesignSystemConfig(config: any) {
    if (typeof globalThis !== 'undefined') {
        (globalThis as any).__DESIGN_SYSTEM_CONFIG__ = config;
    }
}

// Helper function to set window config (client-side)
export function mockWindowConfig(config: any) {
    if (typeof window !== 'undefined') {
        (window as any).__DESIGN_SYSTEM_CONFIG__ = config;
    }
}

// Helper to create DOM element for testing
export function createTestElement(html: string): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild as HTMLElement;
}

// Type augmentation for testing
declare global {
    var __DESIGN_SYSTEM_CONFIG__: any;
}
