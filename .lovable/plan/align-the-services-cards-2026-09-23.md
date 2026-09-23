# Align the Services cards

## Changes

- Make the three service items use equal-width, equal-height columns with consistent spacing when displayed side by side.
- Keep each white service card—the image, text area, and button—the same dimensions and vertical alignment, including matching image heights and bottom-aligned buttons.
- Restructure the first item so the rose **RECOMMENDED** frame is a true outer wrapper with space on all four sides; the white card will remain fully inside it without crossing the bottom edge.
- Account for the recommendation label inside the wrapper rather than letting the inner card's full height plus the label exceed the shared row height.
- Preserve clear, even gaps at tablet and phone sizes so stacked cards—and the larger recommendation frame—never touch.
- Keep the existing service wording, images, colors, buttons, and destinations unchanged.

## Verification

- Compare the finished section with the published Build Financial Wellness services section.
- Check wide desktop, tablet, and narrow phone layouts for equal dimensions, even spacing, contained borders, and aligned buttons.
- Confirm the page still builds cleanly and the service buttons continue scrolling to Contact.

## Technical details

- Update only the Services markup and layout classes in the existing homepage sections file.
- Use grid stretching and a dedicated full-height inner-card region inside the recommendation wrapper, avoiding fixed overall card heights that could clip text at narrower widths.
