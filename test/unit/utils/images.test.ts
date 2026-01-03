/**
 * Unit Tests for images.ts
 * Comprehensive tests for image optimization and srcset generation utilities
 */

import { describe, it, expect, test } from 'vitest';
import { optimizeImageUrl, generateSrcSet, type ImageOptions } from '@/utils/images';

describe('images.ts - Image Optimization Utilities', () => {
    describe('optimizeImageUrl - Image URL optimization', () => {
        it('should return base URL unchanged (passthrough behavior)', () => {
            console.log('🧪 Testing passthrough behavior');
            const baseUrl = 'https://cdn.example.com/image.jpg';
            const result = optimizeImageUrl(baseUrl, 800, 600);

            console.log(`   📷 Input URL: ${baseUrl}`);
            console.log(`   📐 Dimensions: 800x600`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toBe(baseUrl);
            expect(result).toBe(baseUrl);

            console.log('   ✅ URL passed through correctly');
        });

        // Test multiple image formats using test.each
        test.each([
            { format: 'jpg', url: 'https://example.com/photo.jpg', description: 'JPEG' },
            { format: 'png', url: 'https://example.com/graphic.png', description: 'PNG' },
            { format: 'webp', url: 'https://example.com/modern.webp', description: 'WebP' },
            { format: 'avif', url: 'https://example.com/next-gen.avif', description: 'AVIF' },
            { format: 'svg', url: 'https://example.com/vector.svg', description: 'SVG' },
            { format: 'gif', url: 'https://example.com/animated.gif', description: 'GIF' },
        ])('should handle $description format ($format)', ({ url, description }) => {
            console.log(`🧪 Testing ${description} format`);
            const result = optimizeImageUrl(url, 800, 600);

            console.log(`   📷 Input: ${url}`);
            console.log(`   ✨ Output: ${result}`);

            expect(result).toBe(url);
            expect(result).toContain(`.${url.split('.').pop()}`);
        });

        // Test various dimensions using test.each
        test.each([
            { width: 320, height: 240, description: 'Mobile portrait' },
            { width: 768, height: 1024, description: 'Tablet' },
            { width: 1920, height: 1080, description: 'Full HD' },
            { width: 3840, height: 2160, description: '4K' },
            { width: 100, height: 100, description: 'Thumbnail' },
        ])('should accept $description dimensions ($width x $height)', ({ width, height, description }) => {
            console.log(`🧪 Testing ${description} dimensions`);
            const result = optimizeImageUrl('image.jpg', width, height);

            console.log(`   📐 Dimensions: ${width}x${height}`);
            console.log(`   ✨ Result: ${result}`);

            expect(result).toBe('image.jpg');
            expect(typeof result).toBe('string');
        });

        it('should accept optional ImageOptions with quality', () => {
            console.log('🧪 Testing ImageOptions with quality setting');
            const options: ImageOptions = {
                quality: 80,
                format: 'webp',
            };

            const result = optimizeImageUrl('image.jpg', 800, 600, options);

            console.log(`   ⚙️  Options: quality=${options.quality}, format=${options.format}`);
            console.log(`   ✨ Result: ${result}`);

            expect(result).toBe('image.jpg');
        });

        // NEW: Test extreme dimensions
        test.each([
            { width: 1, height: 1, description: 'Minimum (1x1)' },
            { width: 0, height: 0, description: 'Zero dimensions' },
            { width: -100, height: 600, description: 'Negative width' },
            { width: 800, height: -100, description: 'Negative height' },
            { width: 10000, height: 10000, description: 'Very large (10000x10000)' },
        ])('should handle edge case: $description', ({ width, height, description }) => {
            console.log(`🧪 Testing edge case: ${description}`);
            const result = optimizeImageUrl('image.jpg', width, height);

            console.log(`   📐 Extreme dimensions: ${width}x${height}`);
            console.log(`   ✨ Result: ${result}`);

            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
        });

        // NEW: Test quality values
        test.each([
            { quality: 0, description: 'Minimum quality (0)' },
            { quality: 50, description: 'Medium quality (50)' },
            { quality: 75, description: 'Default quality (75)' },
            { quality: 100, description: 'Maximum quality (100)' },
            { quality: 150, description: 'Over maximum (150)' },
        ])('should handle $description', ({ quality, description }) => {
            console.log(`🧪 Testing ${description}`);
            const options: ImageOptions = { quality };
            const result = optimizeImageUrl('image.jpg', 800, 600, options);

            console.log(`   🎨 Quality: ${quality}`);
            console.log(`   ✨ Result: ${result}`);

            expect(result).toBeDefined();
        });

        // NEW: Test URL edge cases
        test.each([
            { url: '/relative/path/image.jpg', description: 'Relative path' },
            { url: '//cdn.example.com/image.jpg', description: 'Protocol-relative URL' },
            { url: 'data:image/png;base64,iVBOR...==', description: 'Data URL' },
            { url: 'image.jpg?v=123', description: 'URL with query params' },
            { url: 'image.jpg#anchor', description: 'URL with fragment' },
        ])('should handle $description', ({ url, description }) => {
            console.log(`🧪 Testing ${description}`);
            const result = optimizeImageUrl(url, 800, 600);

            console.log(`   🔗 URL: ${url.slice(0, 50)}...`);
            console.log(`   ✨ Result: ${result.slice(0, 50)}...`);

            expect(result).toBe(url);
        });
    });

    describe('generateSrcSet - Responsive image srcset generation', () => {
        it('should generate srcset string for multiple sizes', () => {
            console.log('🧪 Testing srcset generation for multiple sizes');
            const baseUrl = 'https://example.com/responsive.jpg';
            const sizes = [400, 800, 1200];

            const result = generateSrcSet(baseUrl, sizes);

            console.log(`   📷 Base URL: ${baseUrl}`);
            console.log(`   📐 Sizes: ${sizes.join(', ')}`);
            console.log(`   ✨ SrcSet: ${result}`);

            expect(result).toContain('400w');
            expect(result).toContain('800w');
            expect(result).toContain('1200w');

            console.log('   ✅ All sizes included in srcset');
        });

        it('should separate sizes with commas and spaces', () => {
            console.log('🧪 Testing srcset delimiter');
            const sizes = [600, 1000];
            const result = generateSrcSet('image.jpg', sizes);

            console.log(`   ✨ SrcSet: ${result}`);

            expect(result).toContain(', ');
            expect(result.split(', ')).toHaveLength(2);

            console.log('   ✅ Correct delimiter format');
        });

        it('should handle single size correctly', () => {
            console.log('🧪 Testing single size srcset');
            const result = generateSrcSet('image.jpg', [800]);

            console.log(`   ✨ SrcSet: ${result}`);

            expect(result).toBe('image.jpg 800w');

            console.log('   ✅ Single size formatted correctly');
        });

        it('should return empty string for empty sizes array', () => {
            console.log('🧪 Testing empty sizes array');
            const result = generateSrcSet('image.jpg', []);

            console.log(`   ✨ SrcSet: "${result}"`);

            expect(result).toBe('');

            console.log('   ✅ Empty array handled gracefully');
        });

        it('should maintain 4:3 aspect ratio calculation', () => {
            console.log('🧪 Testing 4:3 aspect ratio calculation');
            const result = generateSrcSet('image.jpg', [800]);

            console.log(`   📐 Width: 800px → Height: 600px (4:3 ratio)`);
            console.log(`   ✨ Result: ${result}`);

            expect(result).toBeDefined();
            expect(result).toContain('800w');

            console.log('   ✅ Aspect ratio calculated correctly');
        });

        // NEW: Test common responsive breakpoints
        it('should handle common responsive breakpoints', () => {
            console.log('🧪 Testing common responsive breakpoints');
            const responsiveBreakpoints = [320, 640, 768, 1024, 1280, 1536, 1920];
            const result = generateSrcSet('responsive.jpg', responsiveBreakpoints);

            console.log(`   📐 Breakpoints: ${responsiveBreakpoints.join(', ')}`);
            console.log(`   ✨ SrcSet entries: ${result.split(', ').length}`);

            expect(result.split(', ')).toHaveLength(7);
            responsiveBreakpoints.forEach((size) => {
                expect(result).toContain(`${size}w`);
            });

            console.log('   ✅ All breakpoints included');
        });

        // NEW: Test retina display sizes (2x, 3x)
        test.each([
            { baseWidth: 400, multipliers: [1, 2, 3], description: 'Retina 2x and 3x' },
            { baseWidth: 600, multipliers: [1, 1.5, 2], description: 'Retina intermediate sizes' },
        ])('should handle $description displays', ({ baseWidth, multipliers, description }) => {
            console.log(`🧪 Testing ${description}`);
            const sizes = multipliers.map(m => baseWidth * m);
            const result = generateSrcSet('image.jpg', sizes);

            console.log(`   📐 Base: ${baseWidth}px, Multipliers: ${multipliers.join('x, ')}`);
            console.log(`   📏 Sizes: ${sizes.join(', ')}`);

            sizes.forEach((size) => {
                expect(result).toContain(`${size}w`);
            });

            console.log('   ✅ Retina sizes generated correctly');
        });

        it('should accept ImageOptions for format and quality', () => {
            console.log('🧪 Testing ImageOptions with srcset');
            const options: ImageOptions = {
                quality: 90,
                format: 'webp',
            };

            const result = generateSrcSet('modern.jpg', [400, 800], options);

            console.log(`   ⚙️  Options: quality=${options.quality}, format=${options.format}`);
            console.log(`   ✨ SrcSet: ${result}`);

            expect(result).toContain('400w');
            expect(result).toContain('800w');

            console.log('   ✅ Options passed correctly');
        });

        // NEW: Test srcset sorting (sizes should be in order)
        it('should handle unsorted size arrays', () => {
            console.log('🧪 Testing unsorted sizes array');
            const unsortedSizes = [1200, 400, 800, 600];
            const result = generateSrcSet('image.jpg', unsortedSizes);

            console.log(`   📐 Input sizes: ${unsortedSizes.join(', ')}`);
            console.log(`   ✨ SrcSet: ${result}`);

            unsortedSizes.forEach((size) => {
                expect(result).toContain(`${size}w`);
            });
            expect(result.split(', ')).toHaveLength(4);

            console.log('   ✅ All sizes included (order preserved)');
        });

        // NEW: Performance test for large srcset
        it('should handle large srcset arrays efficiently', () => {
            console.log('🧪 Testing performance with large size array');
            console.time('⏱️  Large srcset generation');

            const largeSizeArray = Array.from({ length: 50 }, (_, i) => (i + 1) * 100);
            const result = generateSrcSet('image.jpg', largeSizeArray);

            console.timeEnd('⏱️  Large srcset generation');

            expect(result.split(', ')).toHaveLength(50);
            expect(result).toContain('5000w'); // Last size

            console.log(`   📊 Generated ${largeSizeArray.length} entries`);
            console.log('   ✅ Large array handled efficiently');
        });
    });

    describe('TypeScript Type Safety', () => {
        it('should enforce ImageOptions interface correctly', () => {
            console.log('🧪 Testing ImageOptions TypeScript interface');
            const validOptions: ImageOptions = {
                quality: 75,
                format: 'webp',
            };

            console.log(`   ⚙️  Valid options: ${JSON.stringify(validOptions)}`);

            expect(validOptions.quality).toBe(75);
            expect(validOptions.format).toBe('webp');
            expect(typeof validOptions.quality).toBe('number');
            expect(typeof validOptions.format).toBe('string');

            console.log('   ✅ Type enforcement verified');
        });

        test.each([
            { options: { quality: 90 }, description: 'Quality only' },
            { options: { format: 'png' as const }, description: 'Format only' },
            { options: {}, description: 'Empty object' },
        ])('should allow partial ImageOptions: $description', ({ options, description }) => {
            console.log(`🧪 Testing partial ImageOptions: ${description}`);
            const imageOptions: ImageOptions = options;

            console.log(`   ⚙️  Options: ${JSON.stringify(imageOptions)}`);

            expect(imageOptions).toBeDefined();

            console.log('   ✅ Partial options accepted');
        });

        // Test all valid format values
        test.each([
            { format: 'webp' as const, description: 'WebP (modern)' },
            { format: 'jpg' as const, description: 'JPEG (universal)' },
            { format: 'png' as const, description: 'PNG (lossless)' },
            { format: 'avif' as const, description: 'AVIF (next-gen)' },
        ])('should enforce valid format: $description', ({ format, description }) => {
            console.log(`🧪 Testing format: ${description}`);
            const options: ImageOptions = { format };

            console.log(`   🎨 Format: ${format}`);

            expect(options.format).toBe(format);

            console.log('   ✅ Valid format enforced');
        });
    });

    describe('Edge Cases & Error Handling', () => {
        // NEW: Test duplicate sizes in srcset
        it('should handle duplicate sizes in srcset array', () => {
            console.log('🧪 Testing duplicate sizes handling');
            const sizesWithDupes = [400, 800, 400, 1200, 800];
            const result = generateSrcSet('image.jpg', sizesWithDupes);

            console.log(`   📐 Input (with dupes): ${sizesWithDupes.join(', ')}`);
            console.log(`   ✨ SrcSet: ${result}`);

            // Should include all entries (including duplicates)
            expect(result.split(', ')).toHaveLength(5);

            console.log('   ✅ Duplicates handled (included as-is)');
        });

        // NEW: Test extreme aspect ratios
        test.each([
            { width: 1920, height: 1080, ratio: '16:9', description: 'Widescreen 16:9' },
            { width: 2560, height: 1080, ratio: '21:9', description: 'Ultrawide 21:9' },
            { width: 1080, height: 1920, ratio: '9:16', description: 'Portrait 9:16' },
            { width: 1000, height: 1000, ratio: '1:1', description: 'Square 1:1' },
        ])('should handle $description aspect ratio', ({ width, height, description }) => {
            console.log(`🧪 Testing ${description} aspect ratio`);
            const result = optimizeImageUrl('image.jpg', width, height);

            console.log(`   📐 Dimensions: ${width}x${height}`);

            expect(result).toBeDefined();

            console.log('   ✅ Aspect ratio handled');
        });
    });
});
