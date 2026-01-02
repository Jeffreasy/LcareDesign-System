# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-01-02

### 🎉 Initial Release - Universal Design System

Complete rewrite and generalization of the design system for universal use.

### Breaking Changes

- **Package Name**: `@aaltjesdagen/ui` → `@jjalaa/astro-ui`
- **Default Colors**: Changed from Aaltjesdagen teal/coral to universal blue/red
- **Storyblok**: Moved to optional plugin at `@jjalaa/astro-ui/utils/storyblok`
- **Locale**: No longer hardcoded to `nl-NL`, configurable via ThemeProvider
- **Fonts**: Changed from Outfit/Inter to system fonts by default
- **FilterBar**: Props restructured (`locations` → `categories`, added `filterField`)

### Added

#### Core Features
- **Build Pipeline**: Complete distribution with ESM, CJS, and TypeScript definitions
- **Brand Preset System**: Switch themes via `data-brand` attribute
  - `default` - Blue/Red (universal)
  - `aaltjesdagen` - Teal/Coral + Outfit/Inter
  - `modern-blue` - Blue/Purple + Poppins/Open Sans
  - `forest` - Emerald/Amber + Merriweather/Lato
- **ThemeProvider Component**: SSR-safe configuration component
- **Font Abstraction**: System fonts default with brand-specific presets
- **CSS Bundles**: 4 minified CSS outputs (full, base, theme, animations)

#### New Components
- `ThemeProvider` - Global configuration provider

#### New Utilities
- Config system (SSR-safe with `globalThis`/`window`)
- Generic image utilities (not Storyblok-locked)

#### Documentation
- `docs/fonts.md` - Font configuration guide
- Complete API documentation for all 44 components
- NPM publishing guide
- Migration guide from v2.x

### Changed

- **Default Colors**: Blue (#2563eb) and Red (#dc2626) for universal appeal
- **Default Fonts**: System font stack for zero latency
- **FilterBar**: Fully generalized with configurable field names and labels
- **Modal**: Added `close-icon` slot for custom icons
- **Link Component**: All hardcoded colors replaced with CSS variables
- **Dates Utility**: Uses config system instead of hardcoded `nl-NL`

### Fixed

- Astro compiler error in ThemeProvider
- All hardcoded Aaltjesdagen brand colors replaced with tokens

### Distribution

- **ESM**: Modern JavaScript modules
- **CJS**: CommonJS for broader compatibility
- **TypeScript**: Complete type definitions (.d.ts)
- **CSS**: Minified bundles (8 KB base, 5 KB theme, 3 KB animations)
- **Package Size**: ~20 KB total

### Migration from v2.x

```astro
// OLD (v2.x)
import { Button } from '@aaltjesdagen/ui/components';
import { renderText } from '@aaltjesdagen/ui/utils';

// NEW (v3.x)
import { Button, ThemeProvider } from '@jjalaa/astro-ui/components';
import { renderText } from '@jjalaa/astro-ui/utils/storyblok';

<html data-brand="aaltjesdagen">
<ThemeProvider locale="nl-NL" brand="aaltjesdagen">
  <!-- Your app -->
</ThemeProvider>
</html>
```

---

## [2.0.0] - 2025-12-31

### Added
- Complete component library (44 components)
- Tailwind preset and plugin
- Comprehensive documentation
- WCAG 2.1 AA compliance

### Previous Versions

See git history for pre-3.0.0 changes.

---

**Legend:**
- 🎉 Major milestone
- ⚠️ Breaking change
- ✨ New feature
- 🐛 Bug fix
- 📚 Documentation
- 🔧 Internal/tooling
