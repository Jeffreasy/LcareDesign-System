/**
 * Screen Reader Compatibility Tests
 * Tests ARIA attributes and semantic HTML
 */

import { test, expect } from '@playwright/test';

test.describe('Screen Reader Compatibility', () => {
    test('should have proper landmark roles', async ({ page }) => {
        const html = `
            <header role="banner">Header</header>
            <nav role="navigation" aria-label="Main navigation">Nav</nav>
            <main role="main">Main Content</main>
            <footer role="contentinfo">Footer</footer>
        `;
        await page.setContent(html);

        await expect(page.locator('[role="banner"]')).toBeVisible();
        await expect(page.locator('[role="navigation"]')).toBeVisible();
        await expect(page.locator('[role="main"]')).toBeVisible();
        await expect(page.locator('[role="contentinfo"]')).toBeVisible();
    });

    test('should have aria-label for icon buttons', async ({ page }) => {
        const html = `
            <button aria-label="Close dialog">
                <svg><use href="#icon-close"></use></svg>
            </button>
        `;
        await page.setContent(html);

        const button = page.locator('button');
        await expect(button).toHaveAttribute('aria-label', 'Close dialog');
    });

    test('should announce form errors with aria-describedby', async ({ page }) => {
        const html = `
            <label for="email">Email:</label>
            <input id="email" type="email" aria-describedby="email-error" aria-invalid="true" />
            <span id="email-error" role="alert">Please enter a valid email</span>
        `;
        await page.setContent(html);

        const input = page.locator('#email');
        await expect(input).toHaveAttribute('aria-describedby', 'email-error');
        await expect(input).toHaveAttribute('aria-invalid', 'true');

        const error = page.locator('#email-error');
        await expect(error).toHaveAttribute('role', 'alert');
    });

    test('should have aria-expanded for toggleable content', async ({ page }) => {
        const html = `
            <button aria-expanded="false" aria-controls="panel">
                Toggle Panel
            </button>
            <div id="panel" hidden>Panel Content</div>
        `;
        await page.setContent(html);

        const button = page.locator('button');
        await expect(button).toHaveAttribute('aria-expanded', 'false');
        await expect(button).toHaveAttribute('aria-controls', 'panel');
    });

    test('should use aria-live for dynamic updates', async ({ page }) => {
        const html = `
            <div aria-live="polite" aria-atomic="true" id="status">
                Status: Loading...
            </div>
        `;
        await page.setContent(html);

        const status = page.locator('#status');
        await expect(status).toHaveAttribute('aria-live', 'polite');
    });

    test('should have aria-current for current page/step', async ({ page }) => {
        const html = `
            <nav>
                <a href="/home">Home</a>
                <a href="/about" aria-current="page">About</a>
                <a href="/contact">Contact</a>
            </nav>
        `;
        await page.setContent(html);

        const currentLink = page.locator('[aria-current="page"]');
        await expect(currentLink).toHaveText('About');
    });
});

test.describe('Color Contrast & Visual Accessibility', () => {
    test('should respect prefers-reduced-motion', async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });

        const html = `
            <style>
                @media (prefers-reduced-motion: reduce) {
                    * { animation-duration: 0.01ms !important; }
                }
                .animated { animation: spin 1s infinite; }
            </style>
            <div class="animated">Content</div>
        `;
        await page.setContent(html);

        // Verify reduced motion is applied
        const animationDuration = await page.evaluate(() => {
            const el = document.querySelector('.animated');
            return window.getComputedStyle(el!).animationDuration;
        });

        expect(animationDuration).toBe('0.01ms');
    });

    test('should have sufficient text size', async ({ page }) => {
        const html = `
            <style>
                body { font-size: 16px; }
                .small { font-size: 14px; }
            </style>
            <p>Regular text</p>
            <p class="small">Small text</p>
        `;
        await page.setContent(html);

        const fontSize = await page.evaluate(() => {
            const p = document.querySelector('p');
            return parseInt(window.getComputedStyle(p!).fontSize);
        });

        // Minimum 16px for body text
        expect(fontSize).toBeGreaterThanOrEqual(16);
    });

    test('should have visible focus indicators', async ({ page }) => {
        const html = `
            <style>
                button:focus { outline: 2px solid blue; }
            </style>
            <button>Click Me</button>
        `;
        await page.setContent(html);

        await page.keyboard.press('Tab');

        const outlineWidth = await page.evaluate(() => {
            const btn = document.querySelector('button');
            return window.getComputedStyle(btn!).outlineWidth;
        });

        expect(outlineWidth).not.toBe('0px');
    });
});
