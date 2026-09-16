# Build Financial Wellness homepage

Recreate the uploaded Figma design as the site's home page, faithful to the layout and colors, but flowing properly on phones and tablets.

## Page sections (top to bottom)

1. Sticky top bar: logo, links (Overview, Services, Our Story, Testimonials, Support), and the "Book a Free Consultation" button. Blue accent line beneath.
2. Hero: full-width photo, headline "Build a Stronger Financial Future Starting Today", subtext, email box + "Get Started!" button.
3. Overview: notebook photo on the left, "Build Habits. Build Confidence. Build Financial Wellness." with the three checkpoints and the two links, plus the dotted accent patterns.
4. Services: "Support for Every Step of Your Journey" with three cards — The Build Journey (highlighted "Recommended" in rose), The Budget Build, The Budget Mixer — each with photo, description, and button.
5. Contact: contact details with icons on the left, green newsletter card with first name + email and Submit on the right.
6. Testimonials: star-rated quote cards with avatars in a horizontal slider with arrow control.
7. Footer: navy panel with company/services/contact columns and the newsletter email field.

## Navigation behavior

- Overview, Services, Testimonials, and Support > Contact Us scroll to their section on this page.
- Our Story and the remaining Support submenu items link to pages that don't exist yet; they will be placeholder pages so no link is broken.
- Support opens a dropdown menu on hover/tap.

## Forms

Three forms, each posting to your Make.com webhook with a hidden `formTag`:

- Hero: `GetStarted`
- Contact newsletter: `Newsletter`
- Footer: `SubscribeOnly`

Each shows a thank-you confirmation on success and an error message if the send fails. I need the Make.com webhook URL from you — until you provide it, the forms will validate and show the confirmation but not send anywhere.

## Technical notes

- Design tokens (navy blue, sage green, burnt orange, dusty rose, sky blue, greys, Cabin font, shadow) go into `src/styles.css` under `@theme`, matching the uploaded `style.css` values. Cabin loaded via a font `<link>` in the root route.
- Images and the logo are uploaded to CDN asset pointers; a square favicon copy is placed in `public/`.
- The absolutely-positioned Figma export is converted to flex/grid so it reflows; spacing, sizes, and colors follow the export.
- Single route at `/` plus stub routes for Our Story and the Support submenu pages, each with its own title and description for search/social previews.
- Webhook URL stored as a project secret and posted from a small server function so it isn't exposed in the page.
