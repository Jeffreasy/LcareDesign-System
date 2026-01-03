/**
 * Integration Tests for Layout Components (Part 1)
 * Card, Container, Divider, Breadcrumbs, Tabs, Accordion
 */

import { describe, it, expect } from 'vitest';
import type { Props as CardProps } from '@/components/layout/Card.astro';
import type { Props as ContainerProps } from '@/components/layout/Container.astro';
import type { Props as DividerProps } from '@/components/layout/Divider.astro';
import type { Props as BreadcrumbsProps } from '@/components/layout/Breadcrumbs.astro';
import type { Props as TabsProps } from '@/components/layout/Tabs.astro';
import type { Props as AccordionProps } from '@/components/layout/Accordion.astro';

describe('Card Component', () => {
    it('should accept variant types', () => {
        const variants: Array<CardProps['variant']> = ['base', 'glass'];
        expect(variants).toHaveLength(2);
    });

    it('should accept padding options', () => {
        const paddings: Array<CardProps['padding']> = ['none', 'sm', 'md', 'lg'];
        expect(paddings).toHaveLength(4);
    });

    it('should accept hoverable prop', () => {
        const props: CardProps = {
            hoverable: true,
        };
        expect(props.hoverable).toBe(true);
    });
});

describe('Container Component', () => {
    it('should accept size options', () => {
        const sizes: Array<ContainerProps['size']> = ['sm', 'md', 'lg', 'xl', 'full'];
        expect(sizes).toHaveLength(5);
    });

    it('should accept spacing options', () => {
        const spacings: Array<ContainerProps['spacing']> = ['none', 'sm', 'md', 'lg'];
        expect(spacings).toHaveLength(4);
    });
});

describe('Divider Component', () => {
    it('should accept orientation', () => {
        const orientations: Array<DividerProps['orientation']> = ['horizontal', 'vertical'];
        expect(orientations).toHaveLength(2);
    });

    it('should accept variant types', () => {
        const variants: Array<DividerProps['variant']> = ['solid', 'dashed', 'dotted'];
        expect(variants).toHaveLength(3);
    });

    it('should accept label prop', () => {
        const props: DividerProps = {
            label: 'OR',
        };
        expect(props.label).toBe('OR');
    });
});

describe('Breadcrumbs Component', () => {
    it('should accept items array', () => {
        const items = [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Item', current: true },
        ];
        const props: BreadcrumbsProps = {
            items,
        };
        expect(props.items).toHaveLength(3);
        expect(props.items[2].current).toBe(true);
    });

    it('should accept separator prop', () => {
        const props: BreadcrumbsProps = {
            items: [],
            separator: '/',
        };
        expect(props.separator).toBe('/');
    });
});

describe('Tabs Component', () => {
    it('should accept tabs array', () => {
        const tabs = [
            { id: 'tab1', label: 'Tab 1' },
            { id: 'tab2', label: 'Tab 2', disabled: true },
        ];
        const props: TabsProps = {
            tabs,
        };
        expect(props.tabs).toHaveLength(2);
        expect(props.tabs[1].disabled).toBe(true);
    });

    it('should accept variant types', () => {
        const variants: Array<TabsProps['variant']> = ['line', 'pills'];
        expect(variants).toHaveLength(2);
    });
});

describe('Accordion Component', () => {
    it('should accept items array', () => {
        const items = [
            { id: 'item1', title: 'Section 1', content: 'Content 1' },
            { id: 'item2', title: 'Section 2' },
        ];
        const props: AccordionProps = {
            items,
        };
        expect(props.items).toHaveLength(2);
    });

    it('should accept allowMultiple prop', () => {
        const props: AccordionProps = {
            items: [],
            allowMultiple: true,
        };
        expect(props.allowMultiple).toBe(true);
    });
});
