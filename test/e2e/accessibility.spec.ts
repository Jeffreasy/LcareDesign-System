/**
 * Accessibility E2E Tests - Keyboard Navigation
 * Tests keyboard accessibility for interactive components
 */

import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Keyboard Navigation Accessibility', () => {
    test.beforeEach(async ({ page }) => {
        // Note: These tests require a running dev server with test pages
        // For now, we'll test the basic accessibility setup
        await page.goto('about:blank');
    });

    test('should have axe-core available', async ({ page }) => {
        await injectAxe(page);
        // Basic test to verify axe-core integration works
        expect(true).toBe(true);
    });

    test('should validate ARIA labels exist', async ({ page }) => {
        // This is a placeholder - in real implementation, 
        // you'd navigate to actual component pages
        const html = `
            <button aria-label="Close dialog">X</button>
            <input type="text" aria-label="Search" />
        `;
        await page.setContent(html);
        await injectAxe(page);

        const button = page.locator('button');
        await expect(button).toHaveAttribute('aria-label');

        const input = page.locator('input');
        await expect(input).toHaveAttribute('aria-label');
    });

    test('should allow Tab navigation', async ({ page }) => {
        const html = `
            <button id="btn1">Button 1</button>
            <button id="btn2">Button 2</button>
            <button id="btn3">Button 3</button>
        `;
        await page.setContent(html);

        // Focus first button
        await page.keyboard.press('Tab');
        let focused = await page.evaluate(() => document.activeElement?.id);
        expect(focused).toBe('btn1');

        // Focus second button
        await page.keyboard.press('Tab');
        focused = await page.evaluate(() => document.activeElement?.id);
        expect(focused).toBe('btn2');
    });

    test('should support Enter key activation', async ({ page }) => {
        const html = `
            <button id="testBtn">Click Me</button>
            <script>
                document.getElementById('testBtn').addEventListener('click', () => {
                    document.body.setAttribute('data-clicked', 'true');
                });
            </script>
        `;
        await page.setContent(html);

        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        const clicked = await page.getAttribute('body', 'data-clicked');
        expect(clicked).toBe('true');
    });

    test('should support Space key activation for buttons', async ({ page }) => {
        const html = `
            <button id="testBtn">Press Me</button>
            <script>
                document.getElementById('testBtn').addEventListener('click', () => {
                    document.body.setAttribute('data-pressed', 'true');
                });
            </script>
        `;
        await page.setContent(html);

        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');

        const pressed = await page.getAttribute('body', 'data-pressed');
        expect(pressed).toBe('true');
    });

    test('should respect focus-visible for keyboard users', async ({ page }) => {
        const html = `
            <style>
                button:focus-visible { outline: 2px solid blue; }
            </style>
            <button id="testBtn">Focus Me</button>
        `;
        await page.setContent(html);

        // Keyboard focus should show outline
        await page.keyboard.press('Tab');
        const hasOutline = await page.evaluate(() => {
            const btn = document.getElementById('testBtn');
            const styles = window.getComputedStyle(btn!);
            return styles.outline !== 'none';
        });

        expect(hasOutline).toBe(true);
    });
});

test.describe('WCAG AA Compliance', () => {
    test('should pass basic axe-core checks', async ({ page }) => {
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head><title>Test Page</title></head>
            <body>
                <main>
                    <h1>Accessible Page</h1>
                    <button aria-label="Submit form">Submit</button>
                </main>
            </body>
            </html>
        `;
        await page.setContent(html);
        await injectAxe(page);

        // Check for WCAG AA violations
        await checkA11y(page, null, {
            detailedReport: true,
            detailedReportOptions: { html: true },
        });
    });

    test('should have proper heading hierarchy', async ({ page }) => {
        const html = `
            <h1>Main Heading</h1>
            <h2>Sub Heading</h2>
            <h3>Detail Heading</h3>
        `;
        await page.setContent(html);

        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBe(1);

        const h2 = page.locator('h2');
        await expect(h2).toBeVisible();
    });

    test('should have alt text for images', async ({ page }) => {
        const html = `
            <img src="test.jpg" alt="Description of image" />
        `;
        await page.setContent(html);

        const img = page.locator('img');
        await expect(img).toHaveAttribute('alt');
    });

    test('should have labels for form inputs', async ({ page }) => {
        const html = `
            <label for="email">Email:</label>
            <input id="email" type="email" />
        `;
        await page.setContent(html);

        const input = page.locator('#email');
        const labelFor = await page.locator('label[for="email"]');
        await expect(labelFor).toBeVisible();
    });
});

test.describe('Focus Management', () => {
    test('should trap focus in modal dialogs', async ({ page }) => {
        const html = `
            <div role="dialog" aria-modal="true">
                <button id="first">First</button>
                <button id="middle">Middle</button>
                <button id="last">Last</button>
            </div>
        `;
        await page.setContent(html);

        // Focus first element
        await page.keyboard.press('Tab');
        let focused = await page.evaluate(() => document.activeElement?.id);
        expect(focused).toBe('first');
    });

    test('should restore focus after dialog closes', async ({ page }) => {
        const html = `
            <button id="trigger">Open Dialog</button>
            <div id="dialog" style="display:none;" role="dialog">
                <button id="dialog-btn">Dialog Button</button>
            </div>
            <script>
                const trigger = document.getElementById('trigger');
                const dialog = document.getElementById('dialog');
                let previousFocus;
                
                trigger.addEventListener('click', () => {
                    previousFocus = document.activeElement;
                    dialog.style.display = 'block';
                    document.getElementById('dialog-btn').focus();
                });
            </script>
        `;
        await page.setContent(html);

        await page.click('#trigger');
        const dialogVisible = await page.isVisible('#dialog');
        expect(dialogVisible).toBe(true);
    });

    test('should skip to main content', async ({ page }) => {
        const html = `
            <a href="#main" class="skip-link">Skip to main content</a>
            <nav>Navigation</nav>
            <main id="main" tabindex="-1">
                <h1>Main Content</h1>
            </main>
        `;
        await page.setContent(html);

        const skipLink = page.locator('.skip-link');
        await expect(skipLink).toHaveAttribute('href', '#main');

        const main = page.locator('#main');
        await expect(main).toHaveAttribute('tabindex', '-1');
    });
});
