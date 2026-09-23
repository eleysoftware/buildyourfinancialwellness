# Testimonials and Support Menu Update

## Testimonials
- Update the homepage carousel to match the four testimonials currently published on `www.buildyourfinancialwellness.com`.
- Correct the existing cards’ displayed names and roles to the published versions:
  - Lavonda K. — Package Handler at UPS
  - Brandon F. — eBayer & Private Music Educator; Lauren F. — Bird Feeding Expert at WBU
  - Dustin W. — Vice President at Onxx Tool; Melissa W. — Director of Women's Health at Parkview
- Preserve the published testimonial wording while applying the requested brand spelling **TaMara** everywhere it appears, including correcting “Tamara” in the second and third quotes.
- Add the missing fourth card with the published wording: “TaMara's organized, attention to detail, and well-thought-out plan made for a very pleasant experience collaborating with her. She's A1 and I highly recommend her services!”
- Display its published attribution as K. J. — Technology Consultant and add the matching portrait from the live site through the project’s asset flow.
- Keep the existing carousel layout, star treatment, horizontal scrolling, and next control.

## Support menu caret
- Replace the static caret presentation with a state-driven caret that animates smoothly through 180 degrees.
- Show the caret facing up while the submenu is closed and facing down while it is open, for both hover and click interactions.
- Preserve the existing Support submenu links and behavior.
- Respect reduced-motion preferences.

## Verification
- Check the homepage at desktop and mobile widths to confirm all four cards are reachable, text does not overflow, portraits render, and TaMara is consistently capitalized.
- Verify the Support caret orientation follows the submenu state and animates without changing the navigation layout.
- Confirm the preview builds without errors and has no new browser console errors.

## Technical details
- Primary edits: `src/components/site/Sections.tsx` and `src/components/site/Header.tsx`.
- Add one project-managed image asset for the fourth testimonial portrait.
