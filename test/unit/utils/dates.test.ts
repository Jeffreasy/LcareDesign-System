/**
 * Unit Tests for dates.ts
 * Comprehensive tests for date formatting utilities with enhanced edge case coverage
 */

import { describe, it, expect, beforeEach, test } from 'vitest';
import { formatDate, formatDateWithYear, formatTime, getYear } from '@/utils/dates';
import { setConfig } from '@/utils/config';

describe('dates.ts - Date Formatting Utilities', () => {
    beforeEach(() => {
        // Reset to default locale and default formats before each test
        setConfig({
            locale: 'en-US',
            dateFormat: {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            },
            timeFormat: {
                hour: '2-digit',
                minute: '2-digit'
            }
        });
        console.log('🔄 Reset config to default');
    });

    describe('formatDate - Basic date formatting', () => {
        // Test multiple locales using test.each for better organization
        test.each([
            { locale: 'en-US', date: '2024-06-15', expected: 'Saturday, June 15', description: 'US English' },
            { locale: 'nl-NL', date: '2024-06-15', expected: 'zaterdag 15 juni', description: 'Dutch' },
            { locale: 'de-DE', date: '2024-06-15', expected: 'Samstag, 15. Juni', description: 'German' },
            { locale: 'fr-FR', date: '2024-06-15', expected: 'samedi 15 juin', description: 'French' },
        ])('should format date correctly for $description ($locale)', ({ locale, date, expected }) => {
            console.log(`🧪 Testing ${locale} locale formatting`);
            setConfig({ locale });
            const result = formatDate(date);

            console.log(`   📅 Input: ${date}`);
            console.log(`   ✨ Output: ${result}`);
            console.log(`   ✅ Expected: ${expected}`);

            expect(result).toBe(expected);
        });

        it('should handle Date objects correctly', () => {
            console.log('🧪 Testing Date object handling');
            const date = new Date('2024-12-25');
            const result = formatDate(date);

            console.log(`   📅 Input: Date object (Christmas 2024)`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toContain('December');
            expect(result).toContain('25');
            expect(result).toBeDefined();
        });

        it('should return empty string for empty/null date input', () => {
            console.log('🧪 Testing empty input handling');
            const result = formatDate('');

            console.log(`   📅 Input: empty string`);
            console.log(`   ✨ Output: "${result}"`);

            expect(result).toBe('');
        });

        it('should handle ISO 8601 date strings', () => {
            console.log('🧪 Testing ISO 8601 format');
            const result = formatDate('2024-01-01T00:00:00Z');

            console.log(`   📅 Input: 2024-01-01T00:00:00Z`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toContain('January');
            expect(result).toContain('1');
        });

        it('should respect custom dateFormat configuration', () => {
            console.log('🧪 Testing custom date format configuration');
            setConfig({
                locale: 'en-US',
                dateFormat: {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                },
            });

            const result = formatDate('2024-06-15');

            console.log(`   ⚙️  Custom format: day: 2-digit, month: 2-digit, year: numeric`);
            console.log(`   📅 Input: 2024-06-15`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toBe('06/15/2024');
        });

        // NEW: Leap year edge case
        it('should correctly format leap year dates (Feb 29)', () => {
            console.log('🧪 Testing leap year date (February 29, 2024)');
            const result = formatDate('2024-02-29');

            console.log(`   📅 Input: 2024-02-29 (leap day)`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toContain('February');
            expect(result).toContain('29');
        });

        // NEW: Year boundary edge case
        it('should handle year boundaries (Dec 31 → Jan 1)', () => {
            console.log('🧪 Testing year boundary dates');
            const dec31 = formatDate('2023-12-31');
            const jan1 = formatDate('2024-01-01');

            console.log(`   📅 Dec 31, 2023: ${dec31}`);
            console.log(`   📅 Jan 1, 2024: ${jan1}`);

            expect(dec31).toContain('December');
            expect(dec31).toContain('31');
            expect(jan1).toContain('January');
            expect(jan1).toContain('1');
        });
    });

    describe('formatDateWithYear - Date formatting with year included', () => {
        test.each([
            { locale: 'en-US', date: '2024-06-15', yearExpected: '2024', monthExpected: 'June' },
            { locale: 'nl-NL', date: '2024-06-15', yearExpected: '2024', monthExpected: 'juni' },
            { locale: 'de-DE', date: '2024-06-15', yearExpected: '2024', monthExpected: 'Juni' },
        ])('should include year for $locale locale', ({ locale, date, yearExpected, monthExpected }) => {
            console.log(`🧪 Testing formatDateWithYear for ${locale}`);
            setConfig({ locale });
            const result = formatDateWithYear(date);

            console.log(`   📅 Input: ${date}`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toContain(yearExpected);
            expect(result).toContain(monthExpected);
            expect(result).toContain('15');
        });

        it('should return empty string for null date', () => {
            const result = formatDateWithYear('');
            expect(result).toBe('');
        });

        it('should handle Date objects with year', () => {
            console.log('🧪 Testing Date object with year');
            const date = new Date('2024-12-31');
            const result = formatDateWithYear(date);

            console.log(`   📅 Input: New Year's Eve 2024`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toContain('2024');
            expect(result).toContain('December');
            expect(result).toContain('31');
        });

        // NEW: Century boundary test
        it('should correctly handle century boundaries', () => {
            console.log('🧪 Testing century boundaries');
            const y2k = formatDateWithYear('1999-12-31');
            const newCentury = formatDateWithYear('2000-01-01');

            console.log(`   📅 1999-12-31: ${y2k}`);
            console.log(`   📅 2000-01-01: ${newCentury}`);

            expect(y2k).toContain('1999');
            expect(newCentury).toContain('2000');
        });
    });

    describe('formatTime - Time formatting', () => {
        it('should format time with minutes displayed', () => {
            console.log('🧪 Testing basic time formatting');
            const result = formatTime('2024-06-15T14:30:00');

            console.log(`   🕐 Input: 14:30:00`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toContain('30');
            expect(result).toBeDefined();
            expect(result.length).toBeGreaterThan(0);
        });

        it('should handle Date objects for time formatting', () => {
            const date = new Date('2024-06-15T09:45:00');
            const result = formatTime(date);

            expect(result).toContain('45');
            expect(result).toBeDefined();
        });

        it('should return empty string for null time', () => {
            const result = formatTime('');
            expect(result).toBe('');
        });

        it('should work with different locales', () => {
            setConfig({ locale: 'nl-NL' });
            const result = formatTime('2024-06-15T18:00:00');

            expect(result).toBeDefined();
            expect(result.length).toBeGreaterThan(0);
        });

        it('should respect custom timeFormat configuration with seconds', () => {
            console.log('🧪 Testing custom time format with seconds');
            setConfig({
                locale: 'en-US',
                timeFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                },
            });

            const result = formatTime('2024-06-15T14:30:45');

            console.log(`   🕐 Input: 14:30:45`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toContain('30');
            expect(result).toContain('45');
        });

        // NEW: Midnight and noon edge cases
        test.each([
            { time: '2024-01-01T00:00:00', description: 'midnight (00:00)' },
            { time: '2024-01-01T12:00:00', description: 'noon (12:00)' },
            { time: '2024-01-01T23:59:59', description: 'end of day (23:59:59)' },
        ])('should handle $description correctly', ({ time, description }) => {
            console.log(`🧪 Testing ${description}`);
            const result = formatTime(time);

            console.log(`   🕐 Input: ${time}`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toBeDefined();
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('getYear - Year extraction', () => {
        it('should extract year from ISO date string', () => {
            console.log('🧪 Testing year extraction from ISO string');
            const result = getYear('2024-06-15');

            console.log(`   📅 Input: 2024-06-15`);
            console.log(`   ✨ Extracted year: ${result}`);

            expect(result).toBe(2024);
            expect(typeof result).toBe('number');
        });

        it('should extract year from Date object', () => {
            const date = new Date('2025-12-31');
            const result = getYear(date);
            expect(result).toBe(2025);
        });

        it('should return current year for empty date', () => {
            console.log('🧪 Testing current year fallback');
            const result = getYear('');
            const currentYear = new Date().getFullYear();

            console.log(`   📅 Input: empty string`);
            console.log(`   ✨ Returned: ${result} (current year)`);

            expect(result).toBe(currentYear);
        });

        test.each([
            { input: '2023-01-01T00:00:00Z', expected: 2023, format: 'ISO 8601 with timezone' },
            { input: '2022-05-20', expected: 2022, format: 'Short date (YYYY-MM-DD)' },
            { input: '2021-12-25T15:30:45', expected: 2021, format: 'ISO with time' },
        ])('should handle $format format', ({ input, expected, format }) => {
            console.log(`🧪 Testing ${format}`);
            const result = getYear(input);

            console.log(`   📅 Input: ${input}`);
            console.log(`   ✨ Year: ${result}`);

            expect(result).toBe(expected);
        });

        // NEW: Historical dates
        it('should handle historical dates (pre-1900)', () => {
            console.log('🧪 Testing historical date');
            const result = getYear('1776-07-04');

            console.log(`   📅 Input: 1776-07-04 (US Independence)`);
            console.log(`   ✨ Year: ${result}`);

            expect(result).toBe(1776);
        });
    });

    describe('Edge Cases & Error Handling', () => {
        it('should handle invalid date strings gracefully', () => {
            console.log('🧪 Testing invalid date string handling');
            const result = formatDate('not-a-valid-date');

            console.log(`   ❌ Input: "not-a-valid-date"`);
            console.log(`   ✨ Output: "${result}"`);

            // Should return something (either "Invalid Date" or empty string)
            expect(result).toBeDefined();
        });

        test.each([
            { date: '1900-01-01', description: 'Start of 20th century' },
            { date: '1776-07-04', description: 'Historical date' },
            { date: '0001-01-01', description: 'Year 1 AD' },
        ])('should handle very old dates: $description', ({ date, description }) => {
            console.log(`🧪 Testing old date: ${description}`);
            const result = formatDate(date);

            console.log(`   📅 Input: ${date}`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toBeDefined();
            expect(result.length).toBeGreaterThan(0);
        });

        test.each([
            { date: '2100-12-31', description: 'End of 21st century' },
            { date: '2999-12-31', description: 'Far future' },
            { date: '9999-12-31', description: 'Max 4-digit year' },
        ])('should handle future dates: $description', ({ date, description }) => {
            console.log(`🧪 Testing future date: ${description}`);
            const result = formatDate(date);

            console.log(`   📅 Input: ${date}`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toBeDefined();
        });

        // NEW: Leap year February edge cases
        it('should handle non-leap year February 28', () => {
            console.log('🧪 Testing non-leap year Feb 28');
            const result = formatDate('2023-02-28');

            console.log(`   📅 Input: 2023-02-28 (last day of Feb in non-leap year)`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toContain('February');
            expect(result).toContain('28');
        });

        // NEW: Daylight Saving Time boundaries
        it('should handle DST transition dates', () => {
            console.log('🧪 Testing DST transition date');
            // March 10, 2024 - Spring forward in US
            const springForward = formatDate('2024-03-10');

            console.log(`   📅 Input: 2024-03-10 (DST spring forward in US)`);
            console.log(`   ✨ Output: ${springForward}`);

            expect(springForward).toContain('March');
            expect(springForward).toContain('10');
        });
    });
});
