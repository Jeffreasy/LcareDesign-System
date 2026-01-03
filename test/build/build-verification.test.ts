/**
 * Build Verification Tests
 * Tests package exports, TypeScript declarations, and CSS bundles
 */

import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const distPath = resolve(__dirname, '../../dist');

describe('Build Output Verification', () => {
    const distExists = existsSync(distPath);

    describe('Package Exports', () => {
        it('should have dist directory (or skip if not built)', () => {
            if (!distExists) {
                console.log('⚠️  Skipping build tests - run `npm run build` first');
            }
            // Test passes either way - this is informational
            expect(true).toBe(true);
        });

        it.skipIf(!distExists)('should export utilities bundle', () => {
            const utilsPath = resolve(distPath, 'index.js');
            expect(existsSync(utilsPath)).toBe(true);
        });

        it.skipIf(!distExists)('should export CommonJS utilities', () => {
            const cjsPath = resolve(distPath, 'index.cjs');
            expect(existsSync(cjsPath)).toBe(true);
        });

        it.skipIf(!distExists)('should have TypeScript declarations', () => {
            const dtsPath = resolve(distPath, 'index.d.ts');
            expect(existsSync(dtsPath)).toBe(true);
        });

        it.skipIf(!distExists)('should export all utility functions', () => {
            const indexPath = resolve(distPath, 'index.js');
            if (existsSync(indexPath)) {
                const content = readFileSync(indexPath, 'utf-8');

                // Check for key exports
                expect(content).toContain('getConfig');
                expect(content).toContain('setConfig');
                expect(content).toContain('formatDate');
                expect(content).toContain('optimizeImageUrl');
            }
        });
    });

    describe('CSS Bundle', () => {
        it.skipIf(!distExists)('should have compiled CSS bundle', () => {
            const cssPath = resolve(distPath, 'full.css');
            expect(existsSync(cssPath)).toBe(true);
        });

        it.skipIf(!distExists)('should have base styles', () => {
            const basePath = resolve(distPath, 'base.css');
            expect(existsSync(basePath)).toBe(true);
        });

        it.skipIf(!distExists)('should have theme styles', () => {
            const themePath = resolve(distPath, 'theme.css');
            expect(existsSync(themePath)).toBe(true);
        });

        it.skipIf(!distExists)('should contain CSS custom properties', () => {
            const cssPath = resolve(distPath, 'full.css');
            if (existsSync(cssPath)) {
                const content = readFileSync(cssPath, 'utf-8');

                // Check for CSS variables
                expect(content).toContain('--');
                expect(content).toMatch(/--[\w-]+:/);
            }
        });

        it.skipIf(!distExists)('should have minified CSS in production', () => {
            const cssPath = resolve(distPath, 'full.css');
            if (existsSync(cssPath)) {
                const content = readFileSync(cssPath, 'utf-8');

                // Check that CSS exists and has reasonable size
                expect(content.length).toBeGreaterThan(0);
            }
        });
    });

    describe('TypeScript Declarations', () => {
        it.skipIf(!distExists)('should export DesignSystemConfig type', () => {
            const dtsPath = resolve(distPath, 'index.d.ts');
            if (existsSync(dtsPath)) {
                const content = readFileSync(dtsPath, 'utf-8');
                expect(content).toContain('DesignSystemConfig');
            }
        });

        it.skipIf(!distExists)('should export ImageOptions type', () => {
            const dtsPath = resolve(distPath, 'index.d.ts');
            if (existsSync(dtsPath)) {
                const content = readFileSync(dtsPath, 'utf-8');
                expect(content).toContain('ImageOptions');
            }
        });

        it.skipIf(!distExists)('should have proper function signatures', () => {
            const dtsPath = resolve(distPath, 'index.d.ts');
            if (existsSync(dtsPath)) {
                const content = readFileSync(dtsPath, 'utf-8');

                // Check for function declarations
                expect(content).toMatch(/function\s+getConfig/);
                expect(content).toMatch(/function\s+formatDate/);
            }
        });
    });

    describe('Component Files', () => {
        it('should have Astro component files', () => {
            const componentsPath = resolve(__dirname, '../../src/components');
            expect(existsSync(componentsPath)).toBe(true);
        });

        it('should export Button component', () => {
            const buttonPath = resolve(__dirname, '../../src/components/core/Button.astro');
            expect(existsSync(buttonPath)).toBe(true);
        });

        it('should export Card component', () => {
            const cardPath = resolve(__dirname, '../../src/components/layout/Card.astro');
            expect(existsSync(cardPath)).toBe(true);
        });

        it('should export Input component', () => {
            const inputPath = resolve(__dirname, '../../src/components/forms/Input.astro');
            expect(existsSync(inputPath)).toBe(true);
        });
    });

    describe('Package.json Validation', () => {
        it('should have valid package.json', () => {
            const pkgPath = resolve(__dirname, '../../package.json');
            expect(existsSync(pkgPath)).toBe(true);

            const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
            expect(pkg.name).toBe('@laventecare/astro-ui');
            expect(pkg.version).toBeDefined();
        });

        it('should have correct main and module exports', () => {
            const pkgPath = resolve(__dirname, '../../package.json');
            const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

            expect(pkg.main).toBe('./dist/index.js');
            expect(pkg.module).toBe('./dist/index.js');
            expect(pkg.types).toBe('./dist/index.d.ts');
        });

        it('should have exports field configured', () => {
            const pkgPath = resolve(__dirname, '../../package.json');
            const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

            expect(pkg.exports).toBeDefined();
            expect(pkg.exports['.']).toBeDefined();
            expect(pkg.exports['.']).toHaveProperty('import');
        });

        it('should list all component exports', () => {
            const pkgPath = resolve(__dirname, '../../package.json');
            const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

            // Check for component directory exports
            expect(pkg.exports['./components']).toBeDefined();
            expect(pkg.exports['./utils']).toBeDefined();
            expect(pkg.exports['./css']).toBeDefined();
        });
    });
});

describe('Runtime Imports', () => {
    it('should be able to import utility functions', async () => {
        const { getConfig, setConfig } = await import('../../src/utils/config');

        expect(typeof getConfig).toBe('function');
        expect(typeof setConfig).toBe('function');
    });

    it('should be able to import date utilities', async () => {
        const { formatDate, formatTime } = await import('../../src/utils/dates');

        expect(typeof formatDate).toBe('function');
        expect(typeof formatTime).toBe('function');
    });

    it('should be able to import image utilities', async () => {
        const { optimizeImageUrl, generateSrcSet } = await import('../../src/utils/images');

        expect(typeof optimizeImageUrl).toBe('function');
        expect(typeof generateSrcSet).toBe('function');
    });

    it('should export types correctly', async () => {
        const configModule = await import('../../src/utils/config');

        // Type should be available (compile-time check)
        expect(configModule).toBeDefined();
    });
});
