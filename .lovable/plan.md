# FAQ and Privacy & Terms pages

Build the two designed pages and wire up every link that should point to them.

## FAQ page (/faq)

Replace the current placeholder with the designed page:

- Heading "Frequently Asked Questions" above the seven questions, in order, using the exact wording from the design.
- First entry ("Who can benefit from financial coaching?") sits on the pale green highlight band, as in the mockup.
- Numbered questions in navy, answers in grey, generous spacing; question 3 keeps its three separate paragraphs.
- Same header and footer as the rest of the site, and it reflows cleanly on phones and tablets.

## Privacy & Terms page (/privacy-terms)

One page holding both documents, matching the design:

- Privacy Policy first, then Terms of Use Policy, each with its title, "Effective Date: August 1, 2025", numbered sections and bulleted lists exactly as written in the supplied text.
- Contact block at the end of each policy (email, phone, address).
- Two jump targets so links can land directly on either policy.
- Same header and footer, readable line length, responsive.

## Shared footer

- The footer as drawn on the FAQ page becomes the single footer used on every page, including the home page.
- The "Build Financial Wellness" logo text in the footer always stays on one line, scaling up and down smoothly with the window width instead of wrapping.
- Footer columns get more room: the gap between them is cut by at least half, giving the first column and the "Stay up to date" column extra width so the email field is noticeably longer.

## Links to the new pages

- Support menu (desktop dropdown and mobile menu): FAQ, Resources, Contact Us, Privacy Policy, Terms of Use Policy — plus Blog kept, since the site already has that page.
- Footer: "Privacy & Terms" points to the Privacy Policy section instead of a dead link; FAQ link stays as is.
- Overview section on the home page: the "Learn More (FAQ)" and "Who can benefit from financial coaching?" links go to the FAQ page, the second one landing on that question.

## Technical notes

- New route `src/routes/privacy-terms.tsx`; rewrite `src/routes/faq.tsx`. Both use the existing `Header`/`Footer` and brand tokens from `src/styles.css` — no new colours or fonts.
- Anchors: `#privacy-policy`, `#terms-of-use`, and per-question ids on FAQ (e.g. `#who-can-benefit`).
- Each route gets its own title/description/og metadata.
- Header submenu and Footer updated with TanStack `Link`s; homepage overview links switched from raw `<a href>` to `Link`.
- Content is transcribed verbatim from the uploaded exports; no legal copy invented.

## Assumptions

- Privacy Policy and Terms of Use live on one page with two sections (as drawn).
- Blog stays in the Support menu even though the mockup omits it.
