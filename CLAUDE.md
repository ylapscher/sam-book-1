# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
- `npm start` - Start development server (ESLint disabled)
- `npm run build` - Build for production (ESLint disabled, CI=false)
- `npm test` - Run tests
- `npm run lint` - Run ESLint on src directory

### Build Notes
- ESLint is disabled via `DISABLE_ESLINT_PLUGIN=true` in both start and build scripts
- Production build uses `CI=false` to prevent treating warnings as errors
- **IMPORTANT**: Always use `--legacy-peer-deps` for npm install due to React 19 compatibility
- If build fails with ajv/schema-utils errors, run: `rm -rf node_modules package-lock.json && npm install --legacy-peer-deps`

### Known Issues
- `react-helmet-async` may cause peer dependency warnings with React 19 - this is expected
- Build may occasionally fail due to ajv version conflicts in webpack toolchain
- Use `npm install --legacy-peer-deps` for all package operations

## Deployment

### Netlify
- **Important**: `.npmrc` file with `legacy-peer-deps=true` is required for Netlify builds
- This resolves React 19 peer dependency conflicts during CI/CD
- Build command: `npm run build` (already configured with proper flags)
- Publish directory: `build`

### Deployment Notes
- The app uses React 19 which requires legacy peer dependency resolution
- ESLint is disabled in build scripts to prevent warnings from blocking deployment
- `CI=false` prevents treating warnings as errors in production builds

## Architecture Overview

### Application Structure
This is a React 19 single-page application for "Sam Story Book" - a personalized children's book service. The app is built with:

- **React 19** with functional components and hooks
- **Styled Components** for all styling (no CSS files except global styles)
- **React Helmet Async** for SEO and meta tags
- **Fillout** integration for form handling
- **React Scroll** for smooth navigation

### Key Components Architecture

**App.js** - Main application container with:
- Global SEO structured data for Google
- Google Analytics integration
- Sticky header layout with MainContent wrapper
- Mobile-first responsive design with 60px mobile padding-top

**Header.js** - Sticky navigation with:
- Mobile hamburger menu with slide-out navigation
- Smooth scroll navigation using react-scroll
- Responsive design (row layout on mobile, not column)

**ProductSection.js** - Main product showcase with:
- CSS Grid layout (60/40 split on desktop, single column on mobile)
- ImageGallery and ProductInfo components

**ImageGallery.js** - Advanced image viewer with:
- Thumbnail navigation with keyboard/touch support
- Zoom functionality (desktop only)
- Lazy loading and preloading strategies
- Touch swipe navigation

**FormSection.js** - Uses Fillout embedded form:
- Fillout ID: `wQgANXSphgus`
- Handles form submission and success states via URL parameters

**Testimonials.js** - Custom carousel component:
- Responsive testimonial display (3/2/1 cards based on screen size)
- Touch swipe navigation with dot indicators
- Complex state management for carousel positioning

### Styling System

**GlobalStyles.js** - Centralized design system:
- CSS custom properties for consistent theming
- Primary color: `#222222`, Accent: `#CB7171`
- Mobile-first responsive breakpoints at 768px
- Form styling with custom select dropdowns
- Utility classes for spacing

**Component Architecture**:
- All components use Styled Components
- Responsive design with `@media (max-width: 768px)` breakpoints
- Consistent padding/margin patterns
- Box-sizing: border-box throughout

### Mobile Responsiveness Strategy
- Sticky header with proper content spacing (60px mobile padding-top)
- Reduced vertical spacing on mobile to prevent excessive whitespace
- Touch-friendly navigation and carousels
- Responsive grid layouts that stack on mobile

### External Integrations
- **Fillout Forms**: Custom form handling with success state management
- **Google Analytics**: Integrated with gtag
- **Fonts**: Uses @fontsource packages for custom fonts
- **SEO**: Structured data for rich snippets

### Development Patterns
- Functional components with hooks throughout
- Styled Components with template literals
- Mobile-first responsive design
- Semantic HTML with proper accessibility attributes
- Performance optimization with image lazy loading

### Build Configuration
- Custom Jest configuration for @fillout/react transforms
- CSS/SCSS module mapping for tests
- Overrides for security patches (svgo, postcss, webpack-dev-server)
- Modern browserslist configuration

## Testing
- Uses React Testing Library and Jest
- Custom transform patterns for @fillout and @fontsource packages
- Identity-obj-proxy for CSS module mocking