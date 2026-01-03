/**
 * Integration Tests for Overlay, Navigation, Media, and Core Components
 */

import { describe, it, expect } from 'vitest';

// Overlay components
import type { Props as ModalProps } from '@/components/overlay/Modal.astro';
import type { Props as TooltipProps } from '@/components/overlay/Tooltip.astro';
import type { Props as DropdownProps } from '@/components/overlay/Dropdown.astro';
import type { Props as PopoverProps } from '@/components/overlay/Popover.astro';

// Navigation components
import type { Props as LinkProps } from '@/components/navigation/Link.astro';
import type { Props as PaginationProps } from '@/components/navigation/Pagination.astro';
import type { Props as NavbarProps } from '@/components/navigation/Navbar.astro';
import type { Props as DrawerProps } from '@/components/navigation/Drawer.astro';

// Media components
import type { Props as IconProps } from '@/components/media/Icon.astro';
import type { Props as AvatarProps } from '@/components/media/Avatar.astro';
import type { Props as ImageProps } from '@/components/media/Image.astro';

// Core components
import type { Props as ButtonProps } from '@/components/core/Button.astro';
import type { Props as ThemeToggleProps } from '@/components/core/ThemeToggle.astro';
import type { Props as VisuallyHiddenProps } from '@/components/core/VisuallyHidden.astro';
import type { Props as SkipLinkProps } from '@/components/core/SkipLink.astro';
import type { Props as ThemeProviderProps } from '@/components/ThemeProvider.astro';

// OVERLAY COMPONENTS
describe('Modal Component', () => {
    it('should accept Props', () => {
        const props: ModalProps = {
            class: 'modal',
        };
        expect(props).toBeDefined();
    });
});

describe('Tooltip Component', () => {
    it('should accept Props', () => {
        const props: TooltipProps = {
            class: 'tooltip',
        };
        expect(props).toBeDefined();
    });
});

describe('Dropdown Component', () => {
    it('should accept Props', () => {
        const props: DropdownProps = {
            class: 'dropdown',
        };
        expect(props).toBeDefined();
    });
});

describe('Popover Component', () => {
    it('should accept Props', () => {
        const props: PopoverProps = {
            class: 'popover',
        };
        expect(props).toBeDefined();
    });
});

// NAVIGATION COMPONENTS
describe('Link Component', () => {
    it('should accept Props', () => {
        const props: LinkProps = {
            class: 'link',
        };
        expect(props).toBeDefined();
    });
});

describe('Pagination Component', () => {
    it('should accept Props', () => {
        const props: PaginationProps = {
            class: 'pagination',
        };
        expect(props).toBeDefined();
    });
});

describe('Navbar Component', () => {
    it('should accept Props', () => {
        const props: NavbarProps = {
            class: 'navbar',
        };
        expect(props).toBeDefined();
    });
});

describe('Drawer Component', () => {
    it('should accept Props', () => {
        const props: DrawerProps = {
            class: 'drawer',
        };
        expect(props).toBeDefined();
    });
});

// MEDIA COMPONENTS
describe('Icon Component', () => {
    it('should accept Props', () => {
        const props: IconProps = {
            class: 'icon',
        };
        expect(props).toBeDefined();
    });
});

describe('Avatar Component', () => {
    it('should accept Props', () => {
        const props: AvatarProps = {
            class: 'avatar',
        };
        expect(props).toBeDefined();
    });
});

describe('Image Component', () => {
    it('should accept Props', () => {
        const props: ImageProps = {
            class: 'image',
        };
        expect(props).toBeDefined();
    });
});

// CORE COMPONENTS
describe('Button Component', () => {
    it('should accept variant types', () => {
        const variants: Array<ButtonProps['variant']> = ['primary', 'accent', 'secondary', 'ghost', 'danger'];
        expect(variants).toHaveLength(5);
    });

    it('should accept size options', () => {
        const sizes: Array<ButtonProps['size']> = ['sm', 'md', 'lg'];
        expect(sizes).toHaveLength(3);
    });

    it('should accept loading and disabled states', () => {
        const props: ButtonProps = {
            loading: true,
            disabled: true,
        };
        expect(props.loading).toBe(true);
        expect(props.disabled).toBe(true);
    });

    it('should accept href for link buttons', () => {
        const props: ButtonProps = {
            href: '/path',
            external: true,
        };
        expect(props.href).toBe('/path');
        expect(props.external).toBe(true);
    });
});

describe('ThemeToggle Component', () => {
    it('should accept Props', () => {
        const props: ThemeToggleProps = {
            class: 'theme-toggle',
        };
        expect(props).toBeDefined();
    });
});

describe('VisuallyHidden Component', () => {
    it('should accept Props', () => {
        const props: VisuallyHiddenProps = {
            class: 'sr-only',
        };
        expect(props).toBeDefined();
    });
});

describe('SkipLink Component', () => {
    it('should accept Props', () => {
        const props: SkipLinkProps = {
            class: 'skip-link',
        };
        expect(props).toBeDefined();
    });
});

describe('ThemeProvider Component', () => {
    it('should accept locale prop', () => {
        const props: ThemeProviderProps = {
            locale: 'nl-NL',
        };
        expect(props.locale).toBe('nl-NL');
    });

    it('should accept brand prop', () => {
        const props: ThemeProviderProps = {
            brand: 'aaltjesdagen',
        };
        expect(props.brand).toBe('aaltjesdagen');
    });

    it('should accept dateFormat and timeFormat', () => {
        const props: ThemeProviderProps = {
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
        expect(props.dateFormat).toBeDefined();
        expect(props.timeFormat).toBeDefined();
    });
});
