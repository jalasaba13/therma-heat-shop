# THERMA Premium Storefront Upgrade

## Goal
Preserve the existing THERMA storefront, product imagery, copy, pricing, and technical visual identity while adding a lightweight, Apple-inspired interaction system and a complete demo checkout flow.

## Implementation
1. **Motion foundation**
   - Add one reusable reveal observer and shared timing/easing classes.
   - Use transform and opacity only, with reduced effects on mobile and full `prefers-reduced-motion` fallbacks.
   - Add native CSS scroll-linked hero and product effects where supported, with content visible by default everywhere else.

2. **Storefront polish**
   - Refine the sticky header into a minimal top state and a subtly translucent scrolled state without changing its height.
   - Add controlled hero image/text motion, staggered section entrances, product image settling, card/image hover states, button press states, and smooth mobile navigation.
   - Add one dedicated product-led scroll presentation with progressive copy and feature stages while keeping the product visually dominant.

3. **Cart and purchase flow**
   - Preserve the current persistent cart behavior and improve its backdrop, drawer, item, and cart-count transitions.
   - Route the checkout action to `/checkout` while retaining product variant, quantity, and discount information in the existing cart storage.

4. **Checkout page**
   - Build a dedicated responsive checkout with customer, shipping, delivery, payment-placeholder, order-summary, validation, secure indicator, and policy information.
   - Keep payment explicitly in demo mode; submitting validates the form and shows that a payment provider must be connected rather than pretending to charge.
   - Keep all new customer-facing checkout copy and options in the central store data file.

5. **Performance and verification**
   - Add explicit image dimensions/aspect ratios and lazy loading below the fold.
   - Avoid animation packages and continuous JavaScript scroll loops.
   - Test desktop widths 1440 and 1920, tablet, and mobile widths 390 and 430 for scrolling, navigation, cart actions, checkout, validation, overflow, broken images, and console errors.

## Technical details
- TanStack routes remain the page structure; `/checkout` is a new leaf route with unique metadata.
- A small shared cart utility will own storage types and access, avoiding duplicated storage logic between storefront and checkout.
- CSS animation tokens and progressive enhancement live in the existing global design system.
- Existing product and brand content remains unchanged unless wording is required to clearly identify demo checkout behavior.
