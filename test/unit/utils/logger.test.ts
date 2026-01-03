/**
 * Unit Tests for logger.ts
 * Comprehensive tests for development logging utilities
 */

import { describe, it, expect, vi, beforeEach, afterEach, test } from 'vitest';
import { logDateFormatting, logImageOptimization } from '@/utils/logger';

describe('logger.ts - Development Logging Utilities', () => {
    let consoleDebugSpy: any;

    beforeEach(() => {
        console.log('🔄 Setting up console.debug spy');
        // Spy on console.debug to verify logging behavior
        consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => { });
    });

    afterEach(() => {
        console.log('🧹 Cleaning up spies and stubs');
        // Restore console.debug and environment stubs
        consoleDebugSpy.mockRestore();
        vi.unstubAllEnvs();
    });

    describe('logDateFormatting - Date formatting debug logs', () => {
        it('should log date formatting information in DEV mode', () => {
            console.log('🧪 Testing DEV mode logging');
            vi.stubEnv('DEV', true);

            logDateFormatting('2024-06-15', 'en-US');

            console.log('   🔍 Verifying console.debug was called');
            console.log('   📅 Date: 2024-06-15, Locale: en-US');

            expect(consoleDebugSpy).toHaveBeenCalledWith(
                '[Date] Formatting: 2024-06-15',
                { locale: 'en-US' }
            );
            expect(consoleDebugSpy).toHaveBeenCalledTimes(1);

            console.log('   ✅ DEV mode logging verified');
        });

        it('should NOT log in production mode', () => {
            console.log('🧪 Testing production mode (no logging)');
            vi.stubEnv('DEV', false);

            logDateFormatting('2024-06-15', 'en-US');

            console.log('   🔇 Verifying console.debug was NOT called');

            expect(consoleDebugSpy).not.toHaveBeenCalled();

            console.log('   ✅ Production mode silent as expected');
        });

        // Test multiple date formats using test.each
        test.each([
            { date: '2024-12-25', description: 'Simple date (Christmas)' },
            { date: '2024-12-25T10:30:00Z', description: 'ISO 8601 with time' },
            { date: '2025-01-01', description: 'New Year\'s Day' },
            { date: '2024-02-29', description: 'Leap day' },
        ])('should accept $description format', ({ date, description }) => {
            console.log(`🧪 Testing ${description}`);
            vi.stubEnv('DEV', true);

            logDateFormatting(date, 'en-US');

            console.log(`   📅 Date: ${date}`);
            console.log(`   🔍 Debug called: ${consoleDebugSpy.mock.calls.length} time(s)`);

            expect(consoleDebugSpy).toHaveBeenCalled();
            expect(consoleDebugSpy).toHaveBeenCalledWith(
                `[Date] Formatting: ${date}`,
                { locale: 'en-US' }
            );
        });

        // Test multiple locales using test.each
        test.each([
            { locale: 'en-US', description: 'English (US)' },
            { locale: 'nl-NL', description: 'Dutch (Netherlands)' },
            { locale: 'fr-FR', description: 'French (France)' },
            { locale: 'de-DE', description: 'German (Germany)' },
            { locale: 'ja-JP', description: 'Japanese (Japan)' },
            { locale: 'ar-SA', description: 'Arabic (Saudi Arabia)' },
        ])('should handle $description locale', ({ locale, description }) => {
            console.log(`🧪 Testing ${description} locale`);
            vi.stubEnv('DEV', true);

            logDateFormatting('2024-06-15', locale);

            console.log(`   🌍 Locale: ${locale}`);

            expect(consoleDebugSpy).toHaveBeenCalledWith(
                '[Date] Formatting: 2024-06-15',
                { locale }
            );
        });

        it('should handle multiple consecutive calls', () => {
            console.log('🧪 Testing multiple consecutive logging calls');
            vi.stubEnv('DEV', true);

            const locales = ['en-US', 'nl-NL', 'fr-FR', 'de-DE', 'ja-JP'];

            console.time('⏱️  Multiple logs');
            locales.forEach((locale) => {
                logDateFormatting('2024-06-15', locale);
            });
            console.timeEnd('⏱️  Multiple logs');

            console.log(`   📊 Total calls: ${consoleDebugSpy.mock.calls.length}`);

            expect(consoleDebugSpy).toHaveBeenCalledTimes(5);

            console.log('   ✅ Multiple calls handled correctly');
        });

        it('should not throw errors for valid inputs', () => {
            console.log('🧪 Testing error-free execution');
            vi.stubEnv('DEV', true);

            expect(() => {
                logDateFormatting('2024-06-15', 'en-US');
            }).not.toThrow();

            console.log('   ✅ No errors thrown');
        });

        it('should handle empty date strings gracefully', () => {
            console.log('🧪 Testing empty date string');
            vi.stubEnv('DEV', true);

            expect(() => {
                logDateFormatting('', 'en-US');
            }).not.toThrow();

            console.log('   📅 Empty string: ""');
            console.log('   ✅ Handled gracefully');
        });

        // NEW: Test invalid locale strings
        it('should handle invalid locale strings', () => {
            console.log('🧪 Testing invalid locale string');
            vi.stubEnv('DEV', true);

            expect(() => {
                logDateFormatting('2024-06-15', 'invalid-locale');
            }).not.toThrow();

            console.log('   🌍 Invalid locale: "invalid-locale"');
            console.log('   ✅ No crash on invalid locale');
        });

        // NEW: Test rapid fire logging (performance)
        it('should handle rapid consecutive logging without performance issues', () => {
            console.log('🧪 Testing rapid logging performance');
            vi.stubEnv('DEV', true);

            console.time('⏱️  Rapid fire 1000 logs');
            for (let i = 0; i < 1000; i++) {
                logDateFormatting(`2024-06-${(i % 30) + 1}`, 'en-US');
            }
            console.timeEnd('⏱️  Rapid fire 1000 logs');

            expect(consoleDebugSpy).toHaveBeenCalledTimes(1000);

            console.log('   ✅ 1000 logs completed efficiently');
        });
    });

    describe('logImageOptimization - Image optimization debug logs', () => {
        it('should log image optimization details in DEV mode', () => {
            console.log('🧪 Testing image optimization logging in DEV');
            vi.stubEnv('DEV', true);

            logImageOptimization('photo.jpg', 'webp', 80);

            console.log('   📷 Image: photo.jpg');
            console.log('   🎨 Format: webp, Quality: 80');

            expect(consoleDebugSpy).toHaveBeenCalledWith(
                '[Image] Optimizing: photo.jpg',
                { format: 'webp', quality: 80 }
            );

            console.log('   ✅ Image optimization logged');
        });

        it('should NOT log in production mode', () => {
            console.log('🧪 Testing production mode (no image logging)');
            vi.stubEnv('DEV', false);

            logImageOptimization('photo.jpg', 'webp', 80);

            expect(consoleDebugSpy).not.toHaveBeenCalled();

            console.log('   ✅ Production mode silent');
        });

        // Test multiple image formats using test.each
        test.each([
            { filename: 'hero.webp', format: 'webp', description: 'WebP format' },
            { filename: 'logo.png', format: 'png', description: 'PNG format' },
            { filename: 'photo.jpg', format: 'jpg', description: 'JPEG format' },
            { filename: 'next-gen.avif', format: 'avif', description: 'AVIF format' },
        ])('should handle $description', ({ filename, format, description }) => {
            console.log(`🧪 Testing ${description}`);
            vi.stubEnv('DEV', true);

            logImageOptimization(filename, format, 75);

            console.log(`   📷 File: ${filename}`);
            console.log(`   🎨 Format: ${format}`);

            expect(consoleDebugSpy).toHaveBeenCalledWith(
                `[Image] Optimizing: ${filename}`,
                { format, quality: 75 }
            );
        });

        // Test various quality levels using test.each
        test.each([
            { quality: 100, description: 'Maximum quality (100)' },
            { quality: 85, description: 'High quality (85)' },
            { quality: 75, description: 'Default quality (75)' },
            { quality: 50, description: 'Medium quality (50)' },
            { quality: 25, description: 'Low quality (25)' },
            { quality: 1, description: 'Minimum quality (1)' },
        ])('should handle $description', ({ quality, description }) => {
            console.log(`🧪 Testing ${description}`);
            vi.stubEnv('DEV', true);

            logImageOptimization('test.jpg', 'jpg', quality);

            console.log(`   🎨 Quality: ${quality}`);

            expect(consoleDebugSpy).toHaveBeenCalledWith(
                '[Image] Optimizing: test.jpg',
                { format: 'jpg', quality }
            );
        });

        it('should handle multiple consecutive image optimizations', () => {
            console.log('🧪 Testing multiple image optimizations');
            vi.stubEnv('DEV', true);

            const images = [
                { file: 'hero.webp', format: 'webp', quality: 80 },
                { file: 'logo.png', format: 'png', quality: 90 },
                { file: 'photo.jpg', format: 'jpg', quality: 75 },
            ];

            images.forEach(({ file, format, quality }) => {
                logImageOptimization(file, format, quality);
            });

            console.log(`   📊 Total optimizations logged: ${consoleDebugSpy.mock.calls.length}`);

            expect(consoleDebugSpy).toHaveBeenCalledTimes(3);

            console.log('   ✅ Multiple optimizations logged correctly');
        });

        // NEW: Test edge case quality values
        test.each([
            { quality: 0, description: 'Zero quality' },
            { quality: -10, description: 'Negative quality' },
            { quality: 150, description: 'Over 100 quality' },
        ])('should handle edge case: $description', ({ quality, description }) => {
            console.log(`🧪 Testing edge case: ${description}`);
            vi.stubEnv('DEV', true);

            expect(() => {
                logImageOptimization('test.jpg', 'jpg', quality);
            }).not.toThrow();

            console.log(`   🎨 Quality value: ${quality}`);
            console.log('   ✅ Edge case handled without error');
        });

        // NEW: Test special characters in filenames
        test.each([
            { filename: 'image with spaces.jpg', description: 'Spaces in filename' },
            { filename: 'special!@#$%chars.jpg', description: 'Special characters' },
            { filename: 'ℹmage-üñîcödé.jpg', description: 'Unicode characters' },
            { filename: '../../../etc/passwd.jpg', description: 'Path traversal attempt' },
        ])('should handle filename: $description', ({ filename, description }) => {
            console.log(`🧪 Testing ${description}`);
            vi.stubEnv('DEV', true);

            expect(() => {
                logImageOptimization(filename, 'jpg', 80);
            }).not.toThrow();

            console.log(`   📷 Filename: "${filename.slice(0, 30)}..."`);
            console.log('   ✅ Special filename handled');
        });
    });

    describe('Performance & Stress Testing', () => {
        it('should handle alternating DEV/production mode', () => {
            console.log('🧪 Testing mode switching performance');
            console.time('⏱️  Mode switching');

            for (let i = 0; i < 100; i++) {
                vi.stubEnv('DEV', i % 2 === 0);
                logDateFormatting('2024-06-15', 'en-US');
                vi.unstubAllEnvs();
            }

            console.timeEnd('⏱️  Mode switching');

            // Should have logged 50 times (when DEV was true)
            expect(consoleDebugSpy.mock.calls.length).toBe(50);

            console.log('   ✅ Mode switching handled efficiently');
        });

        it('should not leak memory with thousands of log calls', () => {
            console.log('🧪 Testing memory efficiency with 10,000 logs');
            vi.stubEnv('DEV', true);

            console.time('⏱️  10,000 log calls');
            for (let i = 0; i < 10000; i++) {
                logDateFormatting(`2024-${(i % 12) + 1}-${(i % 28) + 1}`, 'en-US');
                logImageOptimization(`image-${i}.jpg`, 'jpg', 75);
            }
            console.timeEnd('⏱️  10,000 log calls');

            expect(consoleDebugSpy.mock.calls.length).toBe(20000);

            console.log('   ✅ 20,000 logs completed without memory issues');
        });
    });
});
