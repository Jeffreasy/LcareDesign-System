/**
 * Unit Tests for config.ts
 * Comprehensive tests for design system configuration management
 */

import { describe, it, expect, beforeEach, vi, test } from 'vitest';
import { getConfig, setConfig, type DesignSystemConfig } from '@/utils/config';
import { mockDesignSystemConfig } from '../../setup';

describe('config.ts - Design System Configuration', () => {
    beforeEach(() => {
        console.log('🔄 Clearing all config before test');
        // Clear any existing config
        if (typeof globalThis !== 'undefined') {
            (globalThis as any).__DESIGN_SYSTEM_CONFIG__ = undefined;
        }
        if (typeof window !== 'undefined') {
            (window as any).__DESIGN_SYSTEM_CONFIG__ = undefined;
        }
    });

    describe('getConfig - Configuration retrieval', () => {
        it('should return default config when no config is set', () => {
            console.log('🧪 Testing default config retrieval');
            const config = getConfig();

            console.log('   ⚙️  Retrieved config:', JSON.stringify(config, null, 2));

            expect(config).toBeDefined();
            expect(config.locale).toBe('en-US');
            expect(config.dateFormat).toEqual({
                weekday: 'long',
                day: 'numeric',
                month: 'long',
            });
            expect(config.timeFormat).toEqual({
                hour: '2-digit',
                minute: '2-digit',
            });

            console.log('   ✅ Default config validated');
        });

        it('should read config from globalThis (SSR mode)', () => {
            console.log('🧪 Testing SSR config (globalThis)');
            const mockConfig: DesignSystemConfig = {
                locale: 'nl-NL',
                dateFormat: {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short',
                },
                timeFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                },
            };

            mockDesignSystemConfig(mockConfig);

            const config = getConfig();

            console.log('   📥 Mock config:', mockConfig.locale);
            console.log('   📤 Retrieved:', config.locale);

            expect(config).toEqual(mockConfig);
            expect(config.locale).toBe('nl-NL');
            expect(config.dateFormat.weekday).toBe('short');

            console.log('   ✅ SSR config correctly retrieved');
        });

        it('should read config from window (client-side mode)', () => {
            console.log('🧪 Testing client-side config (window)');
            const mockConfig: DesignSystemConfig = {
                locale: 'de-DE',
                dateFormat: {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                },
                timeFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                },
            };

            if (typeof window !== 'undefined') {
                (window as any).__DESIGN_SYSTEM_CONFIG__ = mockConfig;
            }

            const config = getConfig();

            console.log('   🌐 Window config set for:', mockConfig.locale);
            console.log('   📤 Retrieved locale:', config.locale);

            expect(config.locale).toBe('de-DE');
            expect(config.dateFormat.year).toBe('numeric');

            console.log('   ✅ Client-side config correctly retrieved');
        });

        it('should handle partial config objects gracefully', () => {
            console.log('🧪 Testing partial config handling');
            const partialConfig: any = {
                locale: 'fr-FR',
            };

            (globalThis as any).__DESIGN_SYSTEM_CONFIG__ = partialConfig;

            const config = getConfig();

            console.log('   📥 Partial config (only locale):', partialConfig.locale);
            console.log('   📤 Retrieved config:', config);

            expect(config.locale).toBe('fr-FR');
            expect(config).toEqual(partialConfig);

            console.log('   ✅ Partial config handled correctly');
        });

        // NEW: Test multiple locale configurations
        test.each([
            { locale: 'en-US', description: 'United States English' },
            { locale: 'en-GB', description: 'British English' },
            { locale: 'es-ES', description: 'Spanish (Spain)' },
            { locale: 'ja-JP', description: 'Japanese' },
            { locale: 'ar-SA', description: 'Arabic (Saudi Arabia)' },
        ])('should handle $description locale ($locale)', ({ locale, description }) => {
            console.log(`🧪 Testing locale: ${description}`);

            const config: DesignSystemConfig = {
                locale,
                dateFormat: { day: 'numeric', month: 'long' },
                timeFormat: { hour: '2-digit', minute: '2-digit' },
            };

            mockDesignSystemConfig(config);
            const retrieved = getConfig();

            console.log(`   🌍 Set locale: ${locale}`);
            console.log(`   📤 Retrieved: ${retrieved.locale}`);

            expect(retrieved.locale).toBe(locale);
        });
    });

    describe('setConfig - Configuration updates', () => {
        it('should merge partial config with existing config', () => {
            console.log('🧪 Testing partial config merge');

            setConfig({ locale: 'ja-JP' });
            const config = getConfig();

            console.log('   📝 Updated locale to:', config.locale);
            console.log('   🔍 dateFormat still exists:', !!config.dateFormat);
            console.log('   🔍 timeFormat still exists:', !!config.timeFormat);

            expect(config.locale).toBe('ja-JP');
            expect(config.dateFormat).toBeDefined();
            expect(config.timeFormat).toBeDefined();

            console.log('   ✅ Partial merge successful - defaults preserved');
        });

        it('should override specific properties completely', () => {
            console.log('🧪 Testing property override');

            const newDateFormat = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            };

            setConfig({ dateFormat: newDateFormat });
            const config = getConfig();

            console.log('   📝 New date format:', JSON.stringify(newDateFormat));
            console.log('   📤 Retrieved:', JSON.stringify(config.dateFormat));

            expect(config.dateFormat).toEqual(newDateFormat);
            expect(config.dateFormat.day).toBe('2-digit');
            expect(config.dateFormat.month).toBe('2-digit');

            console.log('   ✅ Property fully overridden');
        });

        it('should allow multiple sequential config updates', () => {
            console.log('🧪 Testing sequential config updates');

            console.log('   1️⃣  Setting locale to it-IT');
            setConfig({ locale: 'it-IT' });

            console.log('   2️⃣  Adding seconds to time format');
            setConfig({ timeFormat: { hour: '2-digit', minute: '2-digit', second: '2-digit' } });

            const config = getConfig();

            console.log('   📤 Final locale:', config.locale);
            console.log('   📤 Final time format:', JSON.stringify(config.timeFormat));

            expect(config.locale).toBe('it-IT');
            expect(config.timeFormat.second).toBe('2-digit');

            console.log('   ✅ Multiple updates applied correctly');
        });

        // NEW: Test config immutability
        it('should not mutate the original config object', () => {
            console.log('🧪 Testing config immutability');

            const originalConfig = getConfig();
            const originalLocale = originalConfig.locale;

            setConfig({ locale: 'zh-CN' });

            console.log('   📊 Original locale was:', originalLocale);
            console.log('   📊 New locale is:', getConfig().locale);
            console.log('   🔒 Original config object unchanged:', originalConfig.locale === originalLocale);

            // Original config reference shouldn't change
            expect(originalConfig.locale).toBe(originalLocale);

            console.log('   ✅ Config immutability verified');
        });

        // NEW: Test extreme config values
        test.each([
            {
                locale: 'en-US',
                dateFormat: { weekday: 'narrow', day: 'numeric' },
                description: 'Minimal date format'
            },
            {
                locale: 'en-US',
                dateFormat: { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', era: 'long' },
                description: 'Maximum date format with era'
            },
            {
                locale: 'en-US',
                timeFormat: { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long' },
                description: 'Extended time format with timezone'
            },
        ])('should handle $description', ({ locale, dateFormat, timeFormat, description }) => {
            console.log(`🧪 Testing: ${description}`);

            const config: Partial<DesignSystemConfig> = { locale };
            if (dateFormat) config.dateFormat = dateFormat;
            if (timeFormat) config.timeFormat = timeFormat;

            setConfig(config);
            const retrieved = getConfig();

            console.log(`   ⚙️  Config applied: ${JSON.stringify(config).slice(0, 60)}...`);

            expect(retrieved.locale).toBe(locale);
            if (dateFormat) expect(retrieved.dateFormat).toEqual(dateFormat);
            if (timeFormat) expect(retrieved.timeFormat).toEqual(timeFormat);
        });
    });

    describe('TypeScript Type Safety', () => {
        it('should enforce DesignSystemConfig interface at compile time', () => {
            console.log('🧪 Testing TypeScript type enforcement');

            const validConfig: DesignSystemConfig = {
                locale: 'en-US',
                dateFormat: {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                },
                timeFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                },
            };

            console.log('   ✅ Valid config compiled successfully');
            expect(validConfig).toBeDefined();
            expect(validConfig.locale).toBe('en-US');

            setConfig(validConfig);

            console.log('   ✅ Type-safe config set successfully');
        });

        // NEW: Test that Partial<DesignSystemConfig> works
        it('should accept partial configuration for setConfig', () => {
            console.log('🧪 Testing Partial<DesignSystemConfig> type');

            const partialConfig: Partial<DesignSystemConfig> = {
                locale: 'pt-BR',
            };

            console.log('   📝 Setting partial config (only locale)');
            setConfig(partialConfig);

            const config = getConfig();
            console.log('   📤 Retrieved locale:', config.locale);

            expect(config.locale).toBe('pt-BR');

            console.log('   ✅ Partial type accepted correctly');
        });
    });

    describe('Edge Cases & Error Handling', () => {
        // NEW: Empty object handling
        it('should handle empty config object', () => {
            console.log('🧪 Testing empty config object');

            setConfig({});
            const config = getConfig();

            console.log('   📤 Config after empty update:', config);

            expect(config).toBeDefined();
            expect(config.locale).toBeDefined();

            console.log('   ✅ Empty config handled gracefully');
        });

        // NEW: Rapid consecutive updates
        it('should handle rapid consecutive config updates', () => {
            console.log('🧪 Testing rapid consecutive updates');
            console.time('⏱️  Rapid updates');

            for (let i = 0; i < 100; i++) {
                setConfig({ locale: `test-${i}` });
            }

            console.timeEnd('⏱️  Rapid updates');

            const finalConfig = getConfig();
            console.log('   📤 Final locale:', finalConfig.locale);

            expect(finalConfig.locale).toBe('test-99');

            console.log('   ✅ Rapid updates handled correctly');
        });
    });
});
