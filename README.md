# @jjalaa/astro-ui

> **Universal Design System for Astro projects** - Production-ready components, utilities, and theming.

[![npm version](https://img.shields.io/npm/v/@jjalaa/astro-ui.svg)](https://www.npmjs.com/package/@jjalaa/astro-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ Features

- 🎨 **44+ Production-Ready Components** - Forms, navigation, layouts, overlays, and more
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
npm install @jjalaa/astro-ui
```

### Basic Usage

```astro
---
import { Button, Card, ThemeProvider } from '@jjalaa/astro-ui/components';
import '@jjalaa/astro-ui/css';
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
import { default as preset } from '@jjalaa/astro-ui/preset';

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
import { Button, Modal } from '@jjalaa/astro-ui/components';

// Core utilities (compiled)
import { formatDate } from '@jjalaa/astro-ui/utils';

// Optional: Storyblok plugin
import { renderText } from '@jjalaa/astro-ui/utils/storyblok';

// Styles
import '@jjalaa/astro-ui/css';              // Full bundle
import '@jjalaa/astro-ui/css/base';         // Theme + animations only
import '@jjalaa/astro-ui/css/theme';        // Theme tokens only
import '@jjalaa/astro-ui/css/animations';   // Animations only

// Tailwind
import preset from '@jjalaa/astro-ui/preset';
import plugin from '@jjalaa/astro-ui/plugin';
import themes from '@jjalaa/astro-ui/themes';
```

---

## 🧩 Component Categories

### Forms (8)
`Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Toggle`, `Label`, `FormField`

### Feedback (7)
`Alert`, `Badge`, `Toast`, `Spinner`, `Progress`, `Skeleton`, `EmptyState`

### Layout (10)
`Tabs`, `Accordion`, `Divider`, `Breadcrumbs`, `Card`, `Container`, `Grid`, `Stack`, `Table`, `Carousel`

### Overlay (4)
`Modal`, `Tooltip`, `Dropdown`, `Popover`

### Navigation (5)
`Link`, `Pagination`, `Navbar`, `Footer`, `Drawer`

### Media (3)
`Icon`, `Avatar`, `Image`

### Core (5)
`Button`, `ThemeToggle`, `ThemeProvider`, `VisuallyHidden`, `SkipLink`

### Specialized (5)
`FilterBar`, `ContentCard`, `IconBadge`, `DecorativeUnderline`, `Hero`

---

## 🎯 Configuration

### ThemeProvider

```astro
---
import { ThemeProvider } from '@jjalaa/astro-ui/components';
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
import { renderText, storyblokImage } from '@jjalaa/astro-ui/utils/storyblok';

const html = renderText(blok.content);
const imageUrl = storyblokImage(blok.image.filename, 800, 600);
```

**Note**: Storyblok is optional. Core utilities work without it.

---

## 📚 Documentation

- **[Components](./docs/components.md)** - All 44 components with props & examples
- **[Theming](./docs/theming.md)** - Brand presets & customization
- **[Fonts](./docs/fonts.md)** - Font configuration & loading strategies
- **[Utilities](./docs/utilities.md)** - Helper functions & date formatting
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

- [NPM Package](https://www.npmjs.com/package/@jjalaa/astro-ui)
- [GitHub Repository](https://github.com/Jeffreasy/LcareDesign-System)
- [Documentation](./docs/)
- [Changelog](./CHANGELOG.md)

---

**Built with ❤️ for the Astro community**
