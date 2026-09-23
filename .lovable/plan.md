# Support Menu Caret Timing and Alignment

## Changes
- Replace the text `^` with a small centered caret icon whose geometry is balanced around its own midpoint, so rotating it does not shift visually up or down.
- Keep the caret facing up while closed and rotate it 180 degrees in place when opening.
- Separate the caret’s open state from the submenu’s visibility: start the rotation first, then reveal the submenu immediately when the opening rotation finishes.
- Hide the submenu immediately when closing, while the caret rotates back to its closed position.
- Apply the same timing for both hover and click interactions without changing any submenu links or navigation behavior.
- For visitors who prefer reduced motion, skip the delay and show the submenu immediately.

## Verification
- Confirm the caret remains centered beside “Support” throughout both directions of rotation.
- Confirm the submenu appears only after the downward rotation completes and closes without leaving an unusable gap.
- Test hover, click, rapid enter/leave, and reduced-motion behavior.
- Check the desktop navigation at the current preview width and confirm there are no new console or build errors.

## Technical details
- Update `src/components/site/Header.tsx` only.
- Use the caret transition completion event rather than an independent timer, keeping the reveal synchronized with the actual animation duration.
- Use a fixed-size inline-flex wrapper and a centered SVG/path caret to eliminate the uneven font-character whitespace that causes vertical drift.