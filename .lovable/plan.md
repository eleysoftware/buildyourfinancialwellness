# Replace and lightly shade the hero image

Use the newly uploaded `bfw-hero-image.avif` as the homepage hero image.

## Changes

- Upload the new image to the site’s managed image storage and replace the current hero image reference.
- Preserve the hero’s existing crop and positioning, headline, supporting text, email form, button, spacing, and height.
- Remove the current heavy black gradient and apply only a slight, even darkening treatment so the uploaded sage green and navy blue remain clearly visible.
- Keep enough contrast behind the white text without adding a noticeable color cast.
- Check the finished hero on desktop and phone sizes to confirm the subject remains framed correctly and all text stays readable.

## Technical details

- Update only the hero image asset reference and overlay treatment in the existing homepage hero.
- Store the uploaded AVIF through the project’s CDN asset flow; do not modify the source photo itself.
- Verify the page visually and confirm the site remains error-free.
