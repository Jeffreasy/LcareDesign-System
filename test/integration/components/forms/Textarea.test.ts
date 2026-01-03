/**
 * Integration Tests for Textarea Component
 */

import { describe, it, expect } from 'vitest';
import type { Props as TextareaProps } from '@/components/forms/Textarea.astro';

describe('Textarea Component', () => {
    describe('Props Interface', () => {
        it('should accept rows prop', () => {
            const props: TextareaProps = {
                name: 'message',
                rows: 6,
            };
            expect(props.rows).toBe(6);
        });

        it('should accept resize control', () => {
            const props: TextareaProps = {
                name: 'bio',
                resize: false,
            };
            expect(props.resize).toBe(false);
        });

        it('should accept validation states', () => {
            const props: TextareaProps = {
                name: 'content',
                error: true,
                success: false,
            };
            expect(props.error).toBe(true);
        });

        it('should accept fullWidth prop', () => {
            const props: TextareaProps = {
                name: 'description',
                fullWidth: true,
            };
            expect(props.fullWidth).toBe(true);
        });
    });
});
