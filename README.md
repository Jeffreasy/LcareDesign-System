# @laventecare/astro-ui

> **Universal Design System for Astro projects** - Production-ready components, utilities, and theming.

[![npm version](https://img.shields.io/npm/v/@laventecare/astro-ui.svg)](https://www.npmjs.com/package/@laventecare/astro-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@laventecare/astro-ui)](https://bundlephobia.com/package/@laventecare/astro-ui)
[![Tests](https://img.shields.io/badge/tests-268%20passing-brightgreen)](docs/testing.md)
[![Coverage](https://img.shields.io/badge/coverage-96.96%25-brightgreen)](docs/testing.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](docs/testing.md)

---

## ✨ Features

- 🎨 **48 Production-Ready Components** - Forms, navigation, layouts, overlays, and more
- 🎭 **Brand Preset System** - Switch themes with one attribute (`data-brand`)
- 🌐 **Universal by Default** - System fonts, neutral colors, no vendor lock-in
- 📦 **Build Distribution** - ESM + CJS + TypeScript definitions
- 🎯 **Optional Integrations** - Storyblok CMS plugin available separately
- ♿ **WCAG 2.1 AA Compliant** - Accessibility built-in
- 🎬 **Motion Design System** - Professional animations with reduced-motion support
- 🌙 **Dark Mode Built-in** - Seamless theme switching
- 📱 **Fully Responsive** - Mobile-first approach

---

## 🚀 Quick Start

### Installation

```bash
npm install @laventecare/astro-ui
```

### Basic Usage

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

### With Tailwind CSS

```javascript
// tailwind.config.mjs
import { default as preset } from '@laventecare/astro-ui/preset';

export default {
  presets: [preset],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
};
```

---

## 🎨 Brand Theming

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

---

## 📦 Package Exports

```typescript
// Components (raw .astro files)
import { Button, Modal } from '@laventecare/astro-ui/components';

// Core utilities (compiled)
import { formatDate } from '@laventecare/astro-ui/utils';

// Optional: Storyblok plugin
import { renderText } from '@laventecare/astro-ui/utils/storyblok';

// Styles
import '@laventecare/astro-ui/css';              // Full bundle
import '@laventecare/astro-ui/css/base';         // Theme + animations only
import '@laventecare/astro-ui/css/theme';        // Theme tokens only
import '@laventecare/astro-ui/css/animations';   // Animations only

// Tailwind
import preset from '@laventecare/astro-ui/preset';
import plugin from '@laventecare/astro-ui/plugin';
import themes from '@laventecare/astro-ui/themes';
```

---

## 🧩 Component Categories

### Forms (8)
`Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Toggle`, `Label`, `FormField`

### Feedback (7)
`Alert`, `Badge`, `Toast`, `Spinner`, `Progress`, `Skeleton`, `EmptyState`

### Layout (12)
`Tabs`, `Accordion`, `Divider`, `Breadcrumbs`, `Card`, `Container`, `Grid`, `Stack`, `Table`, `Carousel`, `Footer`, `Hero`

### Overlay (4)
`Modal`, `Tooltip`, `Dropdown`, `Popover`

### Navigation (4)
`Link`, `Pagination`, `Navbar`, `Drawer`

### Media (3)
`Icon`, `Avatar`, `Image`

### Core (5)
`Button`, `ThemeToggle`, `ThemeProvider`, `VisuallyHidden`, `SkipLink`

### Specialized (5)
`FilterBar`, `ContentCard`, `IconBadge`, `DecorativeUnderline`, `ProgramModal`

---

## 🎯 Configuration

### ThemeProvider

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

### Locale Configuration

The design system respects your locale for date/time formatting:

```astro
<ThemeProvider locale="nl-NL">
  <!-- formatDate() will use Dutch locale -->
</ThemeProvider>
```

---

## 🔌 Optional Integrations

### Storyblok CMS

```bash
npm install @storyblok/astro
```

```typescript
// Import Storyblok utilities separately
import { renderText, storyblokImage } from '@laventecare/astro-ui/utils/storyblok';

const html = renderText(blok.content);
const imageUrl = storyblokImage(blok.image.filename, 800, 600);
```

**Note**: Storyblok is optional. Core utilities work without it.

---

## 🧪 Testing

### Test Suite Overview

The design system includes a **world-class, production-grade test suite** with comprehensive coverage:

| Category | Tests | Coverage | Status |
|----------|-------|----------|--------|
| **Utility Tests** | 151 | 96.96% | ✅ Passing |
| **Component Tests** | 117 | - | ✅ Passing |
| **E2E Accessibility** | 27 | WCAG AA | ✅ Passing |
| **Build Verification** | 25 | - | ✅ Passing |
| **TOTAL** | **268+** | **96.96%** | **✅ 100%** |

### Quick Start

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E accessibility tests
npm run test:e2e

# Run tests with UI
npm run test:ui

# Run everything
npm run test:all
```

### Test Features

- ✅ **268+ Automated Tests** - Comprehensive coverage of all functionality
- ✅ **96.96% Code Coverage** - Exceeding 90% threshold
- ✅ **WCAG 2.1 AA Compliant** - Automated accessibility testing with axe-core
- ✅ **Performance Testing** - Stress tests with 10,000+ operations
- ✅ **Edge Case Coverage** - Historical dates, extreme values, invalid inputs
- ✅ **Professional Logging** - Emoji-based developer-friendly output
- ✅ **CI/CD Ready** - Configured for GitHub Actions and other CI systems

**[📖 Full Testing Documentation](./docs/testing.md)** - Detailed guide with examples and best practices

---

## 📚 Documentation

- **[Components](./docs/components.md)** - All 48 components with props & examples
- **[Theming](./docs/theming.md)** - Brand presets & customization
- **[Fonts](./docs/fonts.md)** - Font configuration & loading strategies
- **[Utilities](./docs/utilities.md)** - Helper functions & date formatting
- **[Testing](./docs/testing.md)** - Comprehensive test suite documentation (268+ tests)
- **[Accessibility](./docs/accessibility.md)** - WCAG compliance & guidelines
- **[Migration Guide](./docs/migration-guide.md)** - Upgrading from v2.x

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev
```

**Build outputs:**
- `dist/` - Compiled utilities (ESM + CJS + TypeScript definitions)
- `dist/*.css` - Minified CSS bundles

---

## 📄 License

MIT © [Jeffrey Aalbers](https://github.com/Jeffreasy)

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](./docs/contributing.md) first.

---

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@laventecare/astro-ui)
- [GitHub Repository](https://github.com/Jeffreasy/LcareDesign-System)
- [Documentation](./docs/)
- [Changelog](./CHANGELOG.md)

---

**Built with ❤️ for the Astro community**
