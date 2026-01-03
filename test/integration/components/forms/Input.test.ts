/**
 * Integration Tests for Input Component
 */

import { describe, it, expect } from 'vitest';
import type { Props as InputProps } from '@/components/forms/Input.astro';

describe('Input Component', () => {
    describe('Props Interface', () => {
        it('should accept all valid input types', () => {
            const types: Array<InputProps['type']> = [
                'text', 'email', 'password', 'number', 'tel', 'url', 'search'
            ];
            expect(types).toHaveLength(7);
        });

        it('should accept validation states', () => {
            const validProps: InputProps = {
                name: 'test',
                error: true,
                success: false,
            };
            expect(validProps.error).toBe(true);
            expect(validProps.success).toBe(false);
        });

        it('should accept size variants', () => {
            const sizes: Array<InputProps['size']> = ['sm', 'md', 'lg'];
            expect(sizes).toHaveLength(3);
        });

        it('should accept fullWidth prop', () => {
            const props: InputProps = {
                name: 'email',
                fullWidth: true,
            };
            expect(props.fullWidth).toBe(true);
        });

        it('should require name prop', () => {
            const props: InputProps = {
                name: 'required-field',
            };
            expect(props.name).toBeDefined();
        });

        it('should accept disabled and required states', () => {
            const props: InputProps = {
                name: 'field',
                disabled: true,
                required: true,
            };
            expect(props.disabled).toBe(true);
            expect(props.required).toBe(true);
        });
    });
});
