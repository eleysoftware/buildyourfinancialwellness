# Responsive testimonial carousel arrows

## Changes

- Keep the previous and next testimonial arrows available at desktop, tablet, and phone widths instead of hiding them below the current large-screen breakpoint.
- Position the arrows within the carousel area so they remain visible without being clipped by the page edges or covering testimonial text.
- Retain the existing behavior:
  - Previous remains inactive until the carousel has moved right.
  - Next becomes inactive at the final testimonial.
  - Each arrow scrolls smoothly in its intended direction.
- Size the controls and scrolling distance appropriately for narrower testimonial cards while preserving the current desktop appearance.
- Preserve touch/swipe and trackpad scrolling as additional ways to navigate the carousel.

## Verification

- Test the carousel at wide desktop, the current 1022px view, tablet, and narrow phone widths.
- Confirm the next arrow is visible initially, the previous arrow appears after moving forward, all four testimonials are reachable, and neither arrow overlaps card content.
- Confirm there are no build or browser errors.
