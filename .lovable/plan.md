# THERMA single-product storefront

## Build
- Replace the blank home page with a premium, mobile-first THERMA storefront using the supplied balaclava photo as the primary product image.
- Follow the requested shopping flow: announcement bar, navigation, product-first opening, problem/solution, product details and gallery, how it works, benefits, demonstration, clearly labeled review placeholders, FAQ, closing purchase prompt, and footer.
- Add a responsive menu, image gallery, variant and quantity controls, persistent cart drawer, discount field, cart totals, purchase controls, and sticky mobile add-to-cart.

## Content and design
- Use a technical monochrome visual system with an icy thermochromic accent, strong condensed typography, generous spacing, compact rounded corners, and restrained motion.
- Keep claims factual and avoid invented reviews, scarcity, customer counts, or unsupported safety/performance language.
- Put brand copy, product details, price, variants, shipping, benefits, reviews, FAQs, and policy text in one central configuration file.

## Technical details
- Store the uploaded product photo through the project asset pipeline and reference its optimized CDN URL.
- Build reusable React sections and keep cart persistence browser-safe for server rendering.
- Add page-specific search/social metadata and preserve the existing TanStack Start structure.
- Verify the complete shopping flow and layouts at desktop and mobile sizes, then fix any overflow, interaction, or accessibility issues found.
