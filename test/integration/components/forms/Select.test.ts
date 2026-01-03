/**
 * Integration Tests for Select Component
 */

import { describe, it, expect } from 'vitest';
import type { Props as SelectProps } from '@/components/forms/Select.astro';

describe('Select Component', () => {
    describe('Props Interface', () => {
        it('should accept options array', () => {
            const options = [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2', disabled: true },
            ];
            const props: SelectProps = {
                name: 'category',
                options,
            };
            expect(props.options).toHaveLength(2);
            expect(props.options[1].disabled).toBe(true);
        });

        it('should accept placeholder', () => {
            const props: SelectProps = {
                name: 'select',
                options: [],
                placeholder: 'Choose an option',
            };
            expect(props.placeholder).toBe('Choose an option');
        });

        it('should accept validation states', () => {
            const props: SelectProps = {
                name: 'field',
                options: [],
                error: true,
            };
            expect(props.error).toBe(true);
        });
    });
});
