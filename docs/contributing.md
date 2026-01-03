# Contributing Guide

Welcome! This guide explains how to contribute to the `@laventecare/astro-ui` design system.

## Table of Contents

- [Getting Started](#getting-started)
- [Adding New Components](#adding-new-components)
- [Component Template](#component-template)
- [Testing Requirements](#testing-requirements)
- [Documentation Standards](#documentation-standards)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Basic knowledge of Astro, TypeScript, and Tailwind CSS
- Familiarity with accessibility standards (WCAG AA)

### Setup

```bash
# Clone repository
git clone https://github.com/Jeffreasy/LcareDesign-System.git
cd LcareDesign-System

# Install dependencies
npm install

# Start development
npm run dev
```

---

## Adding New Components

### Folder Structure

Place components in the correct category folder:

```
src/components/
├── forms/              # Form inputs
├── feedback/           # Alerts, badges, spinners
├── layout/             # Cards, containers, dividers
├── overlay/            # Modals, tooltips, dropdowns
├── navigation/         # Links, breadcrumbs, navbars
├── media/              # Icons, avatars, images
├── core/               # Theme toggle, utilities
└── specialized/        # Project-specific components
```

### Choosing a Category

| Category | Examples | When to Use |
|----------|----------|-------------|
| `forms/` | Input, Select, Checkbox | User input elements |
| `feedback/` | Alert, Toast, Spinner | Status indicators |
| `layout/` | Card, Container, Tabs | Content organization |
| `overlay/` | Modal, Tooltip | Overlay UI |
| `navigation/` | Link, Breadcrumbs, Navbar | Navigation elements |
| `media/` | Icon, Avatar | Media display |
| `core/` | ThemeToggle, Button | Essential utilities |
| `specialized/` | FilterBar, ProgramModal | Domain-specific needs |

---

## Component Template

### File Structure

```
src/components/[category]/ComponentName.astro
```

### Basic Template

```astro
---
/**
 * ComponentName
 * 
 * Brief description of what this component does
 * 
 * @component
 */

export interface Props {
  // Required props first
  name: string;
  
  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  class?: string;
}

const {
  name,
  variant = 'primary',
  size = 'md',
  disabled = false,
  class: className = '',
} = Astro.props;

// Component logic here
const sizeClasses = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2.5',
  lg: 'text-lg px-5 py-3',
};
---

<div
  class:list={[
    'component-base-classes',
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  ]}
  {...Astro.props}
>
  <slot />
</div>

<style>
  /* Component-specific styles (if needed) */
</style>
```

### Required Elements

Every component must have:

1. **TypeScript Props Interface**
   ```typescript
   export interface Props {
     required: type;
     optional?: type;
   }
   ```

2. **JSDoc Comment**
   ```typescript
   /**
    * ComponentName
    * 
    * Description of component
    * 
    * @component
    */
   ```

3. **Default Props**
   ```typescript
   const {
     prop = 'default',
   } = Astro.props;
   ```

4. **CSS Variables** (not hardcoded colors)
   ```css
   color: var(--text-primary);
   background: var(--bg-elevated);
   ```

5. **Accessibility Attributes**
   ```html
   aria-label="..."
   role="..."
   ```

---

## Testing Requirements

### Manual Testing Checklist

Before submitting, verify:

- [ ] **Light mode** - Component looks good
- [ ] **Dark mode** - Component looks good
- [ ] **Responsive** - Works on mobile, tablet, desktop
- [ ] **Keyboard navigation** - Tab, Enter, Space work
- [ ] **Screen reader** - Content announced correctly
- [ ] **Disabled state** - Properly styled and non-interactive
- [ ] **Error state** - If applicable, displays correctly
- [ ] **Focus visible** - Focus indicator is clear
- [ ] **Reduced motion** - Respects user preference

### Build Verification

```bash
# Build the package
npm run build

# Verify no errors
npm run prepublishOnly
```

---

## Documentation Standards

### Component Documentation

Add to `docs/components.md` or `docs/astro-components.md`:

```markdown
### ComponentName

**Import**: `import { ComponentName } from '@laventecare/astro-ui/components';`

**Description**: Brief description.

**Props**:
\`\`\`typescript
interface Props {
  name: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}
\`\`\`

**Usage**:
\`\`\`astro
<ComponentName
  name="example"
  variant="primary"
  size="md"
/>
\`\`\`

**Features**:
- Feature 1
- Feature 2
```

### Export Registration

Don't forget to export your component in `src/components/index.ts`:

```typescript
// Component export
export { default as ComponentName } from './category/ComponentName.astro';

// Type export
export type { Props as ComponentNameProps } from './category/ComponentName.astro';
```

### Code Comments

```typescript
/**
 * Calculate responsive size classes
 * @param size - Size variant (sm, md, lg)
 * @returns Tailwind CSS classes
 */
function getSizeClasses(size: Props['size']): string {
  // Implementation
}
```

---

## Code Style

### TypeScript

```typescript
// ✅ Good
export interface Props {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// ❌ Bad
export interface Props {
  variant?: string;  // Too vague
  size?: any;        // No type safety
}
```

### Naming Conventions

- **Components**: PascalCase (`ComponentName.astro`)
- **Props**: camelCase (`fontSize`, `isActive`)
- **CSS classes**: kebab-case (`.component-name`)
- **CSS variables**: kebab-case (`--color-primary`)

### Tailwind CSS

```typescript
// ✅ Good - Use class:list with conditionals
<div class:list={[
  'base-classes',
  variant === 'primary' && 'primary-classes',
  size === 'lg' && 'large-classes',
]}>

// ❌ Bad - String concatenation
<div class={`base-classes ${variant === 'primary' ? 'primary-classes' : ''}`}>
```

### CSS Variables

```css
/* ✅ Good - Use design tokens */
.component {
  color: var(--text-primary);
  background: var(--bg-elevated);
  transition: all var(--transition-base);
}

/* ❌ Bad - Hardcoded values */
.component {
  color: #2c3e50;
  background: #ffffff;
  transition: all 200ms;
}
```

---

## Pull Request Process

### 1. Create Feature Branch

```bash
git checkout -b feature/add-component-name
```

**Branch Naming**:
- `feature/add-component-name` - New components
- `fix/component-name-issue` - Bug fixes
- `docs/update-readme` - Documentation
- `refactor/component-name` - Refactoring

### 2. Make Changes

- Add component file
- Update `src/components/index.ts` exports
- Add documentation to `docs/components.md`
- Test thoroughly

### 3. Commit

```bash
git add .
git commit -m "feat: add ComponentName component

- Add new ComponentName component to [category]/ folder
- Supports variants: primary, secondary
- Includes accessibility attributes (ARIA)
- Fully documented in components.md"
```

**Commit Message Format**:
```
type: short description

- Detail 1
- Detail 2
```

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `refactor` - Code refactoring
- `test` - Adding tests
- `style` - Formatting, CSS
- `chore` - Build, dependencies

### 4. Push & Create PR

```bash
git push origin feature/add-component-name
```

Create pull request with:
- **Title**: `feat: Add ComponentName component`
- **Description**:
  - What does this component do?
  - Screenshots (if visual)
  - Testing checklist completed
  - Breaking changes (if any)

### 5. Code Review

Address feedback from reviewers:
- Make requested changes
- Update tests/docs as needed
- Push changes to same branch

### 6. Merge

Once approved:
- Squash and merge
- Delete feature branch
- Update CHANGELOG.md if needed

---

## Component Checklist

Before submitting a new component:

### Code Quality
- [ ] TypeScript Props interface defined
- [ ] Default props set for optional values
- [ ] JSDoc comments added
- [ ] Uses CSS variables (no hardcoded colors)
- [ ] Follows naming conventions
- [ ] Exported in `src/components/index.ts`

### Functionality
- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Handles edge cases (empty, long text)

### Accessibility
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Color contrast passes WCAG AA

### Documentation
- [ ] Added to `docs/components.md`
- [ ] Props documented
- [ ] Usage example provided
- [ ] Features listed

### Build & Distribution
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] Package exports correctly

---

## Publishing Workflow (Maintainers Only)

### Version Bump

```bash
# Patch (bug fixes): 3.0.4 → 3.0.5
npm version patch

# Minor (new features): 3.0.4 → 3.1.0
npm version minor

# Major (breaking changes): 3.0.4 → 4.0.0
npm version major
```

### Update CHANGELOG

Add entry to `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com/) format.

### Publish to NPM

```bash
# Build and publish
npm run build
npm publish
```

---

## Questions?

Need help? Reach out:

- **File an issue**: [GitHub Issues](https://github.com/Jeffreasy/LcareDesign-System/issues)
- **Discussion**: [GitHub Discussions](https://github.com/Jeffreasy/LcareDesign-System/discussions)

---

## Next Steps

- **[Astro Components](./astro-components.md)** - See existing components
- **[Design Tokens](./design-tokens.md)** - Available design tokens
- **[Accessibility](./accessibility.md)** - Accessibility requirements
- **[Getting Started](./getting-started.md)** - Setup guide for consumers
