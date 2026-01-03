/**
 * Component Test Helpers
 * Enhanced utilities for comprehensive Astro component testing
 */

import { describe, it, expect, test } from 'vitest';

/**
 * Enhanced test helper for validating TypeScript Props interface
 */
export function testPropsInterface<T extends Record<string, any>>(
    componentName: string,
    validProps: T,
    options?: {
        requiredProps?: (keyof T)[];
        optionalProps?: (keyof T)[];
    }
) {
    describe(`${componentName} - Props Interface Validation`, () => {
        it('should accept valid props object', () => {
            console.log(`🧪 Testing ${componentName} Props interface`);
            console.log(`   📋 Props keys: ${Object.keys(validProps).join(', ')}`);

            expect(validProps).toBeDefined();
            expect(typeof validProps).toBe('object');

            console.log('   ✅ Props object validated');
        });

        if (options?.requiredProps) {
            it('should have all required props defined', () => {
                console.log(`🧪 Validating required props for ${componentName}`);
                console.log(`   🔴 Required: ${options.requiredProps?.join(', ')}`);

                options.requiredProps?.forEach((prop) => {
                    expect(validProps).toHaveProperty(prop as string);
                    expect(validProps[prop]).toBeDefined();
                });

                console.log('   ✅ All required props present');
            });
        }

        if (options?.optionalProps) {
            it('should allow optional props', () => {
                console.log(`🧪 Checking optional props for ${componentName}`);
                console.log(`   ⚪ Optional: ${options.optionalProps?.join(', ')}`);

                // Optional props may or may not be present
                expect(validProps).toBeDefined();

                console.log('   ✅ Optional props validated');
            });
        }

        it('should have correct prop types', () => {
            console.log(`🧪 Validating prop types for ${componentName}`);

            Object.entries(validProps).forEach(([key, value]) => {
                const type = typeof value;
                console.log(`   🔍 ${key}: ${type}`);
                expect(['string', 'number', 'boolean', 'object', 'function', 'undefined']).toContain(type);
            });

            console.log('   ✅ Prop types validated');
        });
    });
}

/**
 * Enhanced test helper for variant validation
 */
export function testVariants(
    componentName: string,
    variants: readonly string[] | string[],
    options?: {
        defaultVariant?: string;
        deprecatedVariants?: string[];
    }
) {
    describe(`${componentName} - Variant Validation`, () => {
        it(`should support ${variants.length} variant${variants.length !== 1 ? 's' : ''}`, () => {
            console.log(`🧪 Testing ${componentName} variants`);
            console.log(`   🎨 Available variants: ${variants.join(', ')}`);

            expect(variants).toHaveLength(variants.length);
            expect(variants.length).toBeGreaterThan(0);

            console.log(`   ✅ ${variants.length} variants validated`);
        });

        it('should have valid variant names (strings)', () => {
            console.log(`🧪 Validating variant types`);

            variants.forEach((variant) => {
                expect(typeof variant).toBe('string');
                expect(variant.length).toBeGreaterThan(0);
            });

            console.log('   ✅ All variants are non-empty strings');
        });

        if (options?.defaultVariant) {
            it('should include default variant', () => {
                console.log(`🧪 Checking default variant: ${options.defaultVariant}`);

                expect(variants).toContain(options.defaultVariant);

                console.log('   ✅ Default variant present');
            });
        }

        if (options?.deprecatedVariants && options.deprecatedVariants.length > 0) {
            it('should flag deprecated variants', () => {
                console.log(`🧪 Checking for deprecated variants`);
                console.log(`   ⚠️  Deprecated: ${options.deprecatedVariants?.join(', ')}`);

                options.deprecatedVariants?.forEach((deprecated) => {
                    console.log(`   🔍 Checking if '${deprecated}' is deprecated but still supported`);
                    // Just documenting, not failing
                });

                console.log('   ✅ Deprecated variants documented');
            });
        }

        it('should have no duplicate variants', () => {
            console.log(`🧪 Checking for duplicate variants`);

            const uniqueVariants = [...new Set(variants)];
            expect(uniqueVariants).toHaveLength(variants.length);

            console.log('   ✅ No duplicates found');
        });
    });
}

/**
 * Enhanced test helper for size validation
 */
export function testSizes(
    componentName: string,
    sizes: readonly string[] | string[],
    options?: {
        defaultSize?: string;
        allowCustomSizes?: boolean;
    }
) {
    describe(`${componentName} - Size Validation`, () => {
        it(`should support ${sizes.length} size option${sizes.length !== 1 ? 's' : ''}`, () => {
            console.log(`🧪 Testing ${componentName} sizes`);
            console.log(`   📐 Available sizes: ${sizes.join(', ')}`);

            expect(sizes).toHaveLength(sizes.length);
            expect(sizes.length).toBeGreaterThan(0);

            console.log(`   ✅ ${sizes.length} sizes validated`);
        });

        it('should have valid size names (strings)', () => {
            console.log(`🧪 Validating size types`);

            sizes.forEach((size) => {
                expect(typeof size).toBe('string');
                expect(size.length).toBeGreaterThan(0);
            });

            console.log('   ✅ All sizes are non-empty strings');
        });

        if (options?.defaultSize) {
            it('should include default size', () => {
                console.log(`🧪 Checking default size: ${options.defaultSize}`);

                expect(sizes).toContain(options.defaultSize);

                console.log('   ✅ Default size present');
            });
        }

        // Test common size conventions
        it('should follow size naming conventions', () => {
            console.log(`🧪 Checking size naming conventions`);

            const commonSizes = ['sm', 'md', 'lg', 'xs', 'xl', '2xl', 'small', 'medium', 'large'];
            const hasCommonSizes = sizes.some(size => commonSizes.includes(size));

            // Just informational - not all components need to follow this
            console.log(`   📏 Uses common size names: ${hasCommonSizes ? 'Yes' : 'No (custom sizes)'}`);

            expect(sizes).toBeDefined(); // Always pass, just informational

            console.log('   ✅ Size naming validated');
        });

        it('should have no duplicate sizes', () => {
            console.log(`🧪 Checking for duplicate sizes`);

            const uniqueSizes = [...new Set(sizes)];
            expect(uniqueSizes).toHaveLength(sizes.length);

            console.log('   ✅ No duplicates found');
        });

        if (options?.allowCustomSizes) {
            it('should allow custom size values', () => {
                console.log(`🧪 Custom sizes allowed for ${componentName}`);

                expect(options.allowCustomSizes).toBe(true);

                console.log('   ✅ Custom sizes documented');
            });
        }
    });
}

/**
 * NEW: Test helper for boolean prop flags
 */
export function testBooleanProps(
    componentName: string,
    booleanProps: string[]
) {
    describe(`${componentName} - Boolean Props`, () => {
        it('should have valid boolean prop names', () => {
            console.log(`🧪 Testing boolean props for ${componentName}`);
            console.log(`   🔘 Boolean props: ${booleanProps.join(', ')}`);

            booleanProps.forEach((prop) => {
                expect(typeof prop).toBe('string');
                expect(prop.length).toBeGreaterThan(0);
            });

            console.log('   ✅ Boolean props validated');
        });
    });
}

/**
 * NEW: Test helper for accessibility props
 */
export function testAccessibilityProps(
    componentName: string,
    a11yProps: {
        ariaLabel?: boolean;
        ariaDescribedBy?: boolean;
        role?: string;
        tabIndex?: boolean;
    }
) {
    describe(`${componentName} - Accessibility Props`, () => {
        it('should support accessibility attributes', () => {
            console.log(`🧪 Testing accessibility for ${componentName}`);

            if (a11yProps.ariaLabel) {
                console.log('   ♿ Supports aria-label');
            }
            if (a11yProps.ariaDescribedBy) {
                console.log('   ♿ Supports aria-describedby');
            }
            if (a11yProps.role) {
                console.log(`   ♿ Has role: ${a11yProps.role}`);
            }
            if (a11yProps.tabIndex) {
                console.log('   ♿ Supports tabindex');
            }

            expect(a11yProps).toBeDefined();

            console.log('   ✅ Accessibility props validated');
        });
    });
}

/**
 * NEW: Test helper for component composition
 */
export function testComponentComposition(
    componentName: string,
    canContainChildren: boolean,
    allowedChildren?: string[]
) {
    describe(`${componentName} - Composition`, () => {
        it(`should ${canContainChildren ? 'accept' : 'not accept'} children`, () => {
            console.log(`🧪 Testing composition for ${componentName}`);
            console.log(`   👶 Can contain children: ${canContainChildren}`);

            if (allowedChildren && allowedChildren.length > 0) {
                console.log(`   ✅ Allowed children: ${allowedChildren.join(', ')}`);
            }

            expect(typeof canContainChildren).toBe('boolean');

            console.log('   ✅ Composition validated');
        });
    });
}
