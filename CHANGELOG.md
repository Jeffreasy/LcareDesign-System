# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.4] - 2026-01-02

### Fixed
- **tsup DTS Build Error**: Resolved persistent TypeScript definition build failures
  - Added `@storyblok/astro` to `devDependencies` to satisfy peer dependency type requirements
  - tsup now successfully generates `.d.ts` files without errors
  - No breaking changes for consumers (Storyblok remains optional via `peerDependenciesMeta`)

## [3.0.3] - 2026-01-02

### Fixed
- **Additional Export Path Corrections**: Fine-tuned subpath exports
  - Verified all export paths resolve correctly in consuming projects
  - Minor adjustments to ensure compatibility across different module resolution strategies

## [3.0.2] - 2026-01-02

### Fixed
- **Robust CSS Inlining**: Implemented professional CSS bundling solution
  - Integrated `postcss-import` to properly inline `@import` statements
  - All CSS files now self-contained without external dependencies
  - Resolved issues with CSS not applying correctly in consuming projects
- **Build Pipeline**: Enhanced CSS build script for production reliability

## [3.0.1] - 2026-01-02

### Fixed
- **Package Scope Migration**: `@jjalaa/astro-ui` → `@laventecare/astro-ui`
  - Migrated to `@laventecare` organization for professional branding
  - All package references updated across documentation
- **Subpath Export Corrections**: Fixed utility and CSS export paths
  - Corrected `./utils` export path resolution
  - Fixed CSS file exports for all variants (`./css`, `./css/base`, etc.)
  - Resolved prose CSS export paths

## [3.0.0] - 2026-01-02

### 🎉 Initial Release - Universal Design System

Complete rewrite and generalization of the design system for universal use.

### Breaking Changes

- **Package Name**: `@laventecare/astro-ui` → `@laventecare/astro-ui`
- **Default Colors**: Changed from Aaltjesdagen teal/coral to universal blue/red
- **Storyblok**: Moved to optional plugin at `@laventecare/astro-ui/utils/storyblok`
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
import { Button } from '@laventecare/astro-ui/components';
import { renderText } from '@laventecare/astro-ui/utils';

// NEW (v3.x)
import { Button, ThemeProvider } from '@laventecare/astro-ui/components';
import { renderText } from '@laventecare/astro-ui/utils/storyblok';

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
