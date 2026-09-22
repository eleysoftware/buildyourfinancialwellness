# Our Story page

Build the "The BFW Story" page from the new design and make sure every link that points to it works.

## What the page will show

- The usual header and the shared footer, same as the FAQ and Privacy & Terms pages.
- A heading "The BFW Story" with "BFW" in the lighter blue, matching the design.
- TaMara West's full story text in seven paragraphs, exactly as supplied, on the pale background.
- The photo of TaMara on the right, with the soft faded edge blending into the page background, as shown in the mockup.
- On narrow screens the photo moves above the text so everything stays readable.

## Links to the page

- Header "Our Story" (desktop and mobile menus) — already points here, will be verified.
- Footer "Our Story" under Company — already points here, will be verified.
- Any other place on the site that mentions our story will be checked and pointed at this page.

## Technical notes

- Replace the placeholder `src/routes/our-story.tsx` with the real page; keep `createFileRoute("/our-story")` and give it its own `head()` title/description/og tags.
- Upload `our-story-image.png` and the faded overlay `group-64.png` through `lovable-assets` and import the resulting `.asset.json` pointers.
- Reuse `Header` and `Footer` directly rather than `PageShell`, since this page has its own layout.
- Use existing brand tokens (`navy-blue`, `sky-blue`, `color-white`) and the Cabin font; body copy in `#6d7d8b` at `leading-[1.9]`, heading at the design's 48px scale, content column max-width ~651px inside the same 1440px page frame with the site's standard side padding.
- Translate the Figma absolute positioning into a responsive two-column grid (text left, image right) that collapses to one column below `lg`.
