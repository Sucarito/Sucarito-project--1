# Burmese Vihar Bodhgaya - Responsive Design Guide

## Overview

This document outlines the responsive design principles, breakpoints, and implementation patterns used across the Burmese Vihar Bodhgaya website. The design follows a mobile-first approach, ensuring optimal user experience across all devices.

---

## Responsive Design Breakpoints

The website uses Tailwind CSS breakpoints for responsive design:

| Breakpoint | Screen Size | Device Type |
|-----------|------------|------------|
| Mobile (default) | < 640px | Smartphones (small) |
| SM | ≥ 640px | Smartphones (large) |
| MD | ≥ 768px | Tablets (portrait) |
| LG | ≥ 1024px | Tablets (landscape) / Small Desktop |
| XL | ≥ 1280px | Desktop |
| 2XL | ≥ 1536px | Large Desktop |

---

## Mobile-First Approach

All styling begins at the mobile breakpoint, with enhancements applied at larger breakpoints using Tailwind modifiers:

```tsx
// Mobile styles by default
className="text-xl p-4 flex flex-col"

// Enhanced for tablet and up
className="text-xl sm:text-2xl md:text-3xl p-4 md:p-6 lg:p-8 flex flex-col md:flex-row"
```

---

## Key Responsive Patterns

### 1. Navigation
- **Mobile**: Hamburger menu (Sheet component) with full-height sidebar
- **Tablet+ (MD)**: Horizontal navigation bar with dropdown support
- **Desktop**: Full navigation with donate button

### 2. Typography Scaling
- **H1**: 24px (mobile) → 48px (desktop)
- **H2**: 20px (mobile) → 36px (desktop)
- **H3**: 16px (mobile) → 30px (desktop)
- **Body**: 14px (mobile) → 16px (desktop)

Scale typography using responsive classes:
```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  Responsive Heading
</h1>
```

### 3. Layout Grids
- **Mobile (1 column)**: All content stacks vertically
- **Tablet (2 columns)**: Content arranged in 2-column grid
- **Desktop (3-4 columns)**: Full multi-column layouts

Use the `.responsive-grid` utility class:
```tsx
<div className="responsive-grid">
  {/* Automatically adapts: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop) → 4 cols (large) */}
</div>
```

### 4. Button & Interactive Elements
- **Mobile**: Full-width buttons (100% width)
- **Tablet+**: Auto-width with flexbox arrangement
- **Touch Target**: Minimum 44px height on mobile for accessibility

```tsx
<Button className="w-full sm:w-auto min-h-12 sm:min-h-11">
  Action
</Button>
```

### 5. Images & Media
- **Responsive Images**: Use Next.js `Image` component with proper sizing
- **Background Images**: Scale and position appropriately
- **Aspect Ratios**: Maintain consistent proportions across devices

```tsx
<Image
  src="/image.png"
  alt="Description"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover"
/>
```

### 6. Spacing & Padding
- **Mobile**: 1rem (16px) padding / gaps
- **Tablet**: 1.5rem (24px) padding / gaps
- **Desktop**: 2rem (32px) padding / gaps

Use responsive spacing utilities:
```tsx
<div className="p-4 md:p-6 lg:p-8 gap-3 md:gap-4 lg:gap-6">
  Content
</div>
```

---

## Component Responsiveness

### Hero Section
- Full viewport height on desktop, adjusted on mobile
- Text scales dramatically (24px → 72px)
- Buttons stack on mobile, horizontal on tablet+
- Overlay opacity varies by device for readability

### Cards & Features
- Single column on mobile
- 2-3 column grid on tablet
- 3-4 column grid on desktop
- Icon sizing: 24px (mobile) → 32px (desktop)

### Forms & Inputs
- Full width on mobile
- 2-column layout on tablet
- Touch-friendly: 44px minimum tap targets
- Labels above inputs on mobile, can be inline on desktop

### Data Tables
- Stack vertically on mobile (card-based view)
- Horizontal scroll or condensed view on tablet
- Full table layout on desktop

---

## Responsive CSS Classes

### Built-in Utilities

```css
/* Responsive visibility */
.show-mobile          /* Display block on mobile, none on larger screens */
.hide-mobile          /* Display none on mobile, block on larger screens */

/* Touch targets */
.touch-target         /* Min 44x44px on mobile */

/* Typography */
.responsive-h1 to .responsive-h5
.responsive-body
.responsive-small

/* Layout */
.responsive-container /* Responsive padding: 1rem, 1.5rem, 2rem */
.responsive-grid      /* Auto-responsive grid: 1→2→3→4 columns */

/* Utilities */
.hide-scrollbar       /* Hide scrollbars across all browsers */
```

---

## Testing Responsive Design

### Browser DevTools Testing
1. Open Chrome/Firefox DevTools
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Test at key breakpoints:
   - 375px (mobile)
   - 768px (tablet)
   - 1024px (desktop)
   - 1440px (large desktop)

### Real Device Testing
- Test on actual phones, tablets, and computers
- Test with various network speeds
- Test touch interactions on mobile
- Test landscape/portrait orientation changes

### Performance Metrics
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

---

## Accessibility in Responsive Design

### Mobile Accessibility
- Touch targets: minimum 44×44 pixels
- Proper heading hierarchy (h1 → h2 → h3)
- Color contrast: WCAG AA (4.5:1 for text)
- Font sizes: No smaller than 12px without zoom

### Touch Interactions
- Adequate spacing between clickable elements
- Avoid hover-only interactions
- Use clear, obvious buttons and links
- Provide visual feedback on interaction

### Screen Readers
- Use semantic HTML: `<header>`, `<nav>`, `<main>`, `<footer>`
- Include proper ARIA labels and roles
- Alt text for all images
- Logical tab order

---

## Common Responsive Patterns in This Project

### Pattern 1: Hero with Responsive Text
```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  Responsive Title
</h1>
<p className="text-sm sm:text-base md:text-lg lg:text-xl">
  Responsive description
</p>
```

### Pattern 2: Feature Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {features.map(feature => (
    <Card key={feature.id}>{feature.content}</Card>
  ))}
</div>
```

### Pattern 3: Flex Layout (Mobile → Desktop)
```tsx
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
  <Button className="w-full sm:w-auto">Button 1</Button>
  <Button className="w-full sm:w-auto">Button 2</Button>
</div>
```

### Pattern 4: Conditional Display
```tsx
<div className="hidden md:block">
  {/* Only visible on tablet and up */}
</div>
<div className="md:hidden">
  {/* Only visible on mobile and small */}
</div>
```

---

## Performance Optimization

### Images
- Use Next.js `Image` component (automatic optimization)
- Provide multiple sizes with `srcSet`
- Use WebP format with fallbacks
- Lazy load off-screen images

### CSS
- Use Tailwind's PurgeCSS (auto-removes unused styles)
- Avoid inline styles; use Tailwind classes
- Critical CSS is automatically inlined

### JavaScript
- Code split at route level (Next.js automatic)
- Lazy load heavy components
- Defer non-critical JavaScript

### Fonts
- System fonts as default for fast loading
- Font-serif only for headings (Crimson Text)
- Limit font weights (normal, medium, bold)

---

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers**: iOS Safari 12+, Chrome Android 90+
- **Progressive Enhancement**: Works without JavaScript

---

## Responsive Design Checklist

Before deploying, verify:

- [ ] Mobile: 375px - All text readable, buttons tappable
- [ ] Tablet: 768px - Content properly arranged in 2-column layout
- [ ] Desktop: 1024px+ - Full multi-column layout functional
- [ ] Navigation: Works on all breakpoints, menu accessible
- [ ] Images: Scale properly, load efficiently
- [ ] Forms: Touch-friendly on mobile, aligned on desktop
- [ ] Spacing: Consistent padding/margins across breakpoints
- [ ] Typography: Readable at all sizes, proper hierarchy
- [ ] Accessibility: Keyboard navigation works, color contrast meets WCAG AA
- [ ] Performance: LCP < 2.5s, CLS < 0.1

---

## Resources & Tools

- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev: Responsive Web Design Basics](https://web.dev/responsive-web-design-basics/)
- [A List Apart: Mobile First](https://alistapart.com/article/mobilefirst/)
