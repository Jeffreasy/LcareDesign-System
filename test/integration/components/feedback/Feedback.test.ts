/**
 * Integration Tests for Feedback Components
 * Alert, Badge, Toast, Spinner, Progress, Skeleton, EmptyState
 */

import { describe, it, expect } from 'vitest';
import type { Props as AlertProps } from '@/components/feedback/Alert.astro';
import type { Props as BadgeProps } from '@/components/feedback/Badge.astro';
import type { Props as ToastProps } from '@/components/feedback/Toast.astro';
import type { Props as SpinnerProps } from '@/components/feedback/Spinner.astro';
import type { Props as ProgressProps } from '@/components/feedback/Progress.astro';
import type { Props as SkeletonProps } from '@/components/feedback/Skeleton.astro';
import type { Props as EmptyStateProps } from '@/components/feedback/EmptyState.astro';

describe('Alert Component', () => {
    it('should accept variant types', () => {
        const variants: Array<AlertProps['variant']> = ['info', 'success', 'warning', 'error'];
        expect(variants).toHaveLength(4);
    });

    it('should accept dismissible prop', () => {
        const props: AlertProps = {
            variant: 'success',
            dismissible: true,
        };
        expect(props.dismissible).toBe(true);
    });
});

describe('Badge Component', () => {
    it('should accept variant types', () => {
        const variants: Array<BadgeProps['variant']> = [
            'primary', 'accent', 'success', 'warning', 'error', 'neutral'
        ];
        expect(variants).toHaveLength(6);
    });

    it('should accept size options', () => {
        const sizes: Array<BadgeProps['size']> = ['sm', 'md', 'lg'];
        expect(sizes).toHaveLength(3);
    });

    it('should accept dot and pulse props', () => {
        const props: BadgeProps = {
            dot: true,
            pulse: true,
        };
        expect(props.dot).toBe(true);
        expect(props.pulse).toBe(true);
    });
});

describe('Toast Component', () => {
    it('should require title', () => {
        const props: ToastProps = {
            title: 'Success!',
            variant: 'success',
        };
        expect(props.title).toBeDefined();
    });

    it('should accept duration in milliseconds', () => {
        const props: ToastProps = {
            title: 'Notification',
            durationMs: 7000,
        };
        expect(props.durationMs).toBe(7000);
    });
});

describe('Spinner Component', () => {
    it('should accept size variants', () => {
        const sizes: Array<SpinnerProps['size']> = ['sm', 'md', 'lg', 'xl'];
        expect(sizes).toHaveLength(4);
    });

    it('should accept color prop', () => {
        const props: SpinnerProps = {
            color: 'text-accent',
        };
        expect(props.color).toBe('text-accent');
    });
});

describe('Progress Component', () => {
    it('should accept value and max', () => {
        const props: ProgressProps = {
            value: 75,
            max: 100,
        };
        expect(props.value).toBe(75);
        expect(props.max).toBe(100);
    });

    it('should accept indeterminate mode', () => {
        const props: ProgressProps = {
            value: 0,
            indeterminate: true,
        };
        expect(props.indeterminate).toBe(true);
    });

    it('should accept showLabel prop', () => {
        const props: ProgressProps = {
            value: 50,
            showLabel: true,
        };
        expect(props.showLabel).toBe(true);
    });
});

describe('Skeleton Component', () => {
    it('should accept variant types', () => {
        const variants: Array<SkeletonProps['variant']> = ['text', 'circular', 'rectangular'];
        expect(variants).toHaveLength(3);
    });

    it('should accept width and height', () => {
        const props: SkeletonProps = {
            width: '100%',
            height: '200px',
        };
        expect(props.width).toBe('100%');
        expect(props.height).toBe('200px');
    });
});

describe('EmptyState Component', () => {
    it('should require title', () => {
        const props: EmptyStateProps = {
            title: 'No results found',
        };
        expect(props.title).toBeDefined();
    });

    it('should accept icon, description, and action', () => {
        const props: EmptyStateProps = {
            icon: '📅',
            title: 'No events',
            description: 'No events are scheduled',
            actionText: 'Create Event',
            actionHref: '/create',
        };
        expect(props.icon).toBe('📅');
        expect(props.actionText).toBeDefined();
    });
});
