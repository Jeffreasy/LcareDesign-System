# Getting Started with @laventecare/astro-ui

Welcome to the Universal Design System for Astro! This guide will walk you through installation, setup, and creating your first components.

## Table of Contents

- [Installation](#installation)
- [Basic Setup](#basic-setup)
- [Tailwind Configuration](#tailwind-configuration)
- [Your First Component](#your-first-component)
- [Theme Setup](#theme-setup)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

## Installation

### NPM Package

Install the design system from NPM:

```bash
npm install @laventecare/astro-ui
```

### Peer Dependencies

The design system requires these peer dependencies:

```bash
npm install astro@^5.0.0 tailwindcss@^3.0.0 alpinejs@^3.0.0
```

### Optional Dependencies

For Storyblok CMS integration:

```bash
npm install @storyblok/astro
```

For Swiper carousel functionality:

```bash
npm install swiper
```

---

## Basic Setup

### 1. Import Global Styles

In your main Astro layout (typically `src/layouts/BaseLayout.astro`):

```astro
---
import '@laventecare/astro-ui/css';
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Astro App</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

This single import includes:
- ✅ CSS variables and design tokens
- ✅ Animation keyframes and utilities  
- ✅ Universal brand theme (blue/red by default)
- ✅ Dark mode support

### 2. Modular CSS Imports (Optional)

For more control, import CSS modules separately:

```astro
---
// Option 1: Import only what you need
import '@laventecare/astro-ui/css/base';        // Base styles + theme
import '@laventecare/astro-ui/css/animations';  // Animations only

// Option 2: Just theme tokens
import '@laventecare/astro-ui/css/theme';       // Theme variables only
---
```

### 3. Using Components

Import components from the package:

```astro
---
import { Button, Card, ThemeProvider } from '@laventecare/astro-ui/components';
import '@laventecare/astro-ui/css';
---

<ThemeProvider locale="en-US">
  <Card>
    <h2>Welcome!</h2>
    <p>This is a card from the design system.</p>
    <Button variant="primary">Get Started</Button>
  </Card>
</ThemeProvider>
```

---

## Tailwind Configuration

### Configure Tailwind with the Preset

Update your `tailwind.config.mjs` to use the design system preset:

```javascript
// tailwind.config.mjs
import { default as preset } from '@laventecare/astro-ui/preset';

/** @type {import('tailwindcss').Config} */
export default {
  // Use the design system preset
  presets: [preset],
  
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  
  // You can extend or override preset values here
  theme: {
    extend: {
      // Project-specific customizations
    },
  },
};
```

### What the Preset Includes

The preset automatically configures:

- **Colors**: `primary`, `accent`, `base`, `elevated`, semantic colors
- **Z-Index**: Complete stacking context (`z-header`, `z-modal`, etc.)
- **Fonts**: `font-heading`, `font-body`
- **Shadows**: `shadow-soft-sm` through `shadow-soft-xl`
- **Animations**: `animate-float` and other motion utilities
- **Plugin**: Component classes automatically included

> **Note**: The plugin is automatically included via the preset. You don't need to import it separately.

---

## Your First Component

Let's create a simple page using design system components:

```astro
---
// src/pages/index.astro
import { Button, Card, Container } from '@laventecare/astro-ui/components';
import '@laventecare/astro-ui/css';
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My App</title>
  </head>
  <body>
    <!-- Hero section -->
    <section class="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <Container>
        <div class="text-center max-w-3xl mx-auto">
          <!-- Hero heading -->
          <h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Your App
          </h1>

          <!-- Description -->
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Build amazing experiences with our universal design system.
          </p>

          <!-- CTA Buttons -->
          <div class="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </Container>
    </section>

    <!-- Feature cards -->
    <section class="py-16">
      <Container>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 class="text-2xl font-bold mb-3 text-blue-600">🎨 Beautiful</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Professional designs out of the box
            </p>
          </Card>

          <Card>
            <h3 class="text-2xl font-bold mb-3 text-purple-600">⚡ Fast</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Optimized for performance
            </p>
          </Card>

          <Card variant="glass">
            <h3 class="text-2xl font-bold mb-3 text-pink-600">✨ Accessible</h3>
            <p class="text-gray-600 dark:text-gray-300">
              WCAG 2.1 AA compliant
            </p>
          </Card>
        </div>
      </Container>
    </section>
  </body>
</html>
```

---

## Theme Setup

### Brand Theming

Switch themes instantly with the `data-brand` attribute:

```html
<!-- Default: Blue & Red -->
<html>
  <body><!-- Uses universal defaults --></body>
</html>

<!-- Aaltjesdagen: Teal & Coral -->
<html data-brand="aaltjesdagen">
  <body><!-- Uses Aaltjesdagen brand --></body>
</html>

<!-- Modern Blue: Blue & Purple -->
<html data-brand="modern-blue">
  <body><!-- Uses Modern Blue brand --></body>
</html>
```

**Available Brands:**
- `default` - Blue/Red (universal)
- `aaltjesdagen` - Teal/Coral + Outfit/Inter fonts
- `modern-blue` - Blue/Purple + Poppins/Open Sans
- `forest` - Emerald/Amber + Merriweather/Lato

**Create Your Own:**
```css
[data-brand="your-brand"] {
  --color-primary: #your-color;
  --color-accent: #your-accent;
  --font-heading: 'Your Font', sans-serif;
}
```

### Automatic Dark Mode

The design system automatically detects system color scheme preferences:

```html
<!-- Light mode (default) -->
<html lang="en">

<!-- Dark mode (explicit) -->
<html lang="en" class="dark">

<!-- Respects system preference -->
<html lang="en"> <!-- Will auto-detect -->
```

### Add Theme Toggle

To let users manually switch themes:

```astro
---
import { ThemeToggle } from '@laventecare/astro-ui/components';
---

<header>
  <nav>
    <!-- Your navigation -->
    <ThemeToggle />
  </nav>
</header>
```

The toggle:
- ✅ Persists choice to localStorage
- ✅ Syncs across tabs
- ✅ Shows sun/moon icons
- ✅ Includes keyboard support
- ✅ Accessible with ARIA labels

### ThemeProvider Configuration

Use ThemeProvider for locale and brand configuration:

```astro
---
import { ThemeProvider } from '@laventecare/astro-ui/components';
---

<ThemeProvider 
  locale="nl-NL" 
  brand="aaltjesdagen"
  dateFormat={{
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }}
>
  <slot />
</ThemeProvider>
```

---

## Troubleshooting

### Styles Not Loading

**Problem**: No design system styles are applied.

**Solution**: Make sure you import the CSS:

```astro
---
import '@laventecare/astro-ui/css'; // Add this!
---
```

### Tailwind Classes Not Working

**Problem**: Tailwind utility classes aren't being applied.

**Solution**: Verify your `tailwind.config.mjs`:

```javascript
import { default as preset } from '@laventecare/astro-ui/preset';

export default {
  presets: [preset], // Must use the preset
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}', // Include your source files
  ],
};
```

### Component Import Errors

**Problem**: Cannot find module '@laventecare/astro-ui/components'

**Solution**: 
1. Verify package is installed: `npm list @laventecare/astro-ui`
2. Reinstall if needed: `npm install @laventecare/astro-ui`
3. Restart dev server

### Dark Mode Not Working

**Problem**: Dark mode styles aren't applying.

**Solution**: 
1. Check that the `<html>` element has `class="dark"` attribute
2. Verify CSS variables are being applied (check DevTools)
3. Make sure you imported `@laventecare/astro-ui/css`

### Build Errors with Tailwind

**Problem**: Build fails with Tailwind errors.

**Solution**: Clear the Astro cache:

```bash
rm -rf .astro
npm run build
```

### Peer Dependency Warnings

**Problem**: NPM warns about peer dependencies.

**Solution**: Install required peer dependencies:

```bash
npm install astro@^5.0.0 tailwindcss@^3.0.0 alpinejs@^3.0.0
```

---

## Next Steps

Now that you have the basics set up, explore:

### Learn the Design Tokens
- **[Design Tokens Guide](./design-tokens.md)** - Master colors, typography, spacing, and more

### Explore Components
- **[Components Reference](./components.md)** - All available component classes
- **[Astro Components](./astro-components.md)** - Ready-to-use Astro components

### Add Motion
- **[Animation System](./animations.md)** - Scroll reveals, transitions, and keyframes

### Use Utilities
- **[Utilities Reference](./utilities.md)** - Helper functions for formatting, images, and dates

### Deep Dive
- **[Theming Guide](./theming.md)** - Customize and extend themes
- **[Accessibility](./accessibility.md)** - A11y best practices and testing

### Contribute
- **[Contributing Guide](./contributing.md)** - Help improve the design system

---

**Questions or Issues?** Check the [GitHub Issues](https://github.com/Jeffreasy/LcareDesign-System/issues) or start a [Discussion](https://github.com/Jeffreasy/LcareDesign-System/discussions).
