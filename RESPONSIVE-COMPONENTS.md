# Responsive Components - Implementation Guide

This guide provides ready-to-use responsive component patterns for the Burmese Vihar website.

## 1. Responsive Hero Section

```tsx
export default function ResponsiveHero() {
  return (
    <section className="relative w-full min-h-screen sm:min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-stone-800 z-0" />
      <div
        className="absolute inset-0 bg-cover bg-center z-5"
        style={{ backgroundImage: "url('/bg.png')", opacity: 0.7 }}
      />
      {/* Overlay - stronger on mobile */}
      <div className="absolute inset-0 bg-black/50 sm:bg-black/40 md:bg-black/35 z-10" />

      {/* Content */}
      <div className="container relative z-20 text-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
          Responsive Title
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8">
          Responsive subtitle that scales across devices
        </p>
        
        {/* Responsive buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded">
            Action 1
          </button>
          <button className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded">
            Action 2
          </button>
        </div>
      </div>
    </section>
  )
}
```

## 2. Responsive Card Grid

```tsx
export default function ResponsiveCardGrid({ items }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 md:mb-16">
        Featured Content
      </h2>

      {/* Responsive grid: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 sm:h-56 md:h-64 object-cover"
            />
            <div className="p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
                {item.description}
              </p>
              <button className="w-full px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors text-sm sm:text-base">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 3. Responsive Feature Section

```tsx
export default function ResponsiveFeatures() {
  return (
    <section className="bg-stone-50 py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-3 sm:mb-4">
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-stone-600 max-w-2xl mx-auto">
            Discover what makes us unique and special
          </p>
        </div>

        {/* Features Grid: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {[1, 2, 3, 4, 5, 6].map((feature) => (
            <div key={feature} className="text-center">
              {/* Icon */}
              <div className="mb-4 sm:mb-6 flex justify-center">
                <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl md:text-3xl">✨</span>
                </div>
              </div>
              {/* Content */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-stone-900 mb-2 sm:mb-3">
                Feature {feature}
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Description of this feature and its benefits
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## 4. Responsive Navigation

```tsx
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="/" className="text-lg sm:text-xl md:text-2xl font-bold text-amber-700">
            Logo
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 lg:px-4 py-2 text-sm lg:text-base text-stone-700 hover:text-amber-700 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button className="ml-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-stone-200 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-stone-700 hover:bg-stone-50 hover:text-amber-700 rounded"
              >
                {item.label}
              </a>
            ))}
            <button className="w-full mt-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
```

## 5. Responsive Form

```tsx
export default function ResponsiveForm() {
  return (
    <section className="py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Get In Touch
        </h2>

        <form className="space-y-4 sm:space-y-6">
          {/* Name Field */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
              placeholder="john@example.com"
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition resize-none"
              placeholder="Your message here..."
            />
          </div>

          {/* Submit Button */}
          <button className="w-full px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors text-base sm:text-lg">
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
```

## 6. Responsive Image Gallery

```tsx
export default function ResponsiveGallery({ images }) {
  return (
    <section className="py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 md:mb-16">
          Gallery
        </h2>

        {/* Masonry Grid: Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 auto-rows-max">
          {images.map((image, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-lg cursor-pointer group ${
                index % 3 === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## 7. Responsive Footer

```tsx
export default function ResponsiveFooter() {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        {/* Grid: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-4">About</h3>
            <p className="text-sm text-stone-400">Description of organization</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><a href="#" className="hover:text-amber-400">Home</a></li>
              <li><a href="#" className="hover:text-amber-400">About</a></li>
              <li><a href="#" className="hover:text-amber-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><a href="#" className="hover:text-amber-400">Privacy</a></li>
              <li><a href="#" className="hover:text-amber-400">Terms</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-4">Follow</h3>
            <div className="flex gap-4">
              <a href="#" className="text-stone-400 hover:text-amber-400">Facebook</a>
              <a href="#" className="text-stone-400 hover:text-amber-400">Twitter</a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-stone-800 pt-8 sm:pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-stone-400">
          <p>&copy; 2024 Organization. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-400">Privacy</a>
            <a href="#" className="hover:text-amber-400">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

## Key Responsive Patterns Used

1. **Mobile-First**: All styles start at mobile, enhanced with `sm:`, `md:`, `lg:` prefixes
2. **Full-Width on Mobile**: Buttons and inputs use `w-full` on mobile, `w-auto` or flex on larger screens
3. **Stack to Horizontal**: Flex columns on mobile (`flex-col`), rows on tablet+ (`sm:flex-row`)
4. **Grid Responsiveness**: 1 column → 2 columns → 3+ columns based on screen size
5. **Text Scaling**: Font sizes increase progressively across breakpoints
6. **Spacing**: Padding and gaps increase with screen size for better proportions
7. **Hidden Elements**: Desktop features hidden on mobile, mobile features hidden on desktop

## Testing Checklist

- [ ] Mobile (375px): All content visible, buttons tappable
- [ ] Tablet (768px): 2-column layout functioning
- [ ] Desktop (1024px+): Full multi-column layout working
- [ ] Touch targets: 44×44px minimum on mobile
- [ ] Text readable: Font sizes appropriate for each breakpoint
- [ ] Images: Scale properly without distortion
- [ ] Navigation: Accessible on all devices
- [ ] Forms: Touch-friendly input fields
