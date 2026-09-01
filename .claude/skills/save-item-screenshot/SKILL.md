---
name: save-item-screenshot
description: Save a Diablo 2 item screenshot the user pasted into research/reference-screenshots, named after the item in the shot. Use whenever the user pastes an in-game item tooltip image, or points at one already on disk, and it is worth keeping. Also covers renaming existing screenshots in that folder.
---

# Save an item screenshot

Pasted images land in `.cp-images/` and get copied to `.cp-backup/` by a hook. Both are gitignored and both get pruned or ignored. A screenshot only survives if it is moved into `research/reference-screenshots/` with a real name.

## Is it keep-worthy

Keep it if it shows a real in-game item tooltip. Unique, set, rare, magic, crafted, runeword, charm, jewel. The item screen or the inventory hover, either is fine.

Do not keep our own site renders, design references, header and DNS screenshots, or debug captures. Those stay in `.cp-backup/` and never get committed. The rule is real items go in the repo, everything else stays local.

If the item is already covered by a better shot in the folder, ask before adding a second one.

## Naming

The filename is the item's full name from the tooltip, kebab-case, apostrophes dropped, source extension kept.

- Unique and set items use the item name alone. `Arkaine's Valor` becomes `arkaines-valor.png`.
- Magic and rare items use the whole name, prefix and suffix included. `Jeweler's Archon Plate of the Whale` becomes `jewelers-archon-plate-of-the-whale.png`.
- Runewords use the runeword name. `Spirit` becomes `spirit.png`.
- If the tooltip is cropped and the name is cut off, use the readable part and say so.

Read the image first. Never guess the item from the filename or from the surrounding chat.

## Saving

Copy, do not move, and never delete the source:

```bash
cp .cp-images/<pasted-file> research/reference-screenshots/<item-name>.png
git add research/reference-screenshots/<item-name>.png
```

Stage it. Do not commit unless asked.

If the name is already taken, look at both shots. Keep the clearer one, and only fall back to a `-2` suffix if both are worth having.

## Note

`research/recover-images.js` writes recovered files back under their original `pasted-image-*` names. Re-running it drops duplicates next to the renamed files. Check the folder afterwards.
