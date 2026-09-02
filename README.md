# D2 Item of the Day

One Diablo 2 collector's item a day, with a plain explanation of why it is worth what it is worth.

Live at [d2itemoftheday.com](https://d2itemoftheday.com).

## What it is

Most value guides cover the obvious chase items. This one does not. It shows the pieces even a seasoned player might not know are valuable: magic bases where the roll is the whole value, edge-case uniques where a perfect roll is a different item entirely, bracket-specific dueling gear, and items that changed the game's history. The bar is museum-level, not shopping-list.

Each item shows a rarity tier, eyeballed against a mature ladder season. Rarity means how often you actually see one around, not just its drop rate. Some items are rare because nobody keeps them. The site does not price anything.

Past that, an item only carries a tag when there is something to say. The era it mattered in, the last patch it existed in, whether it is contraband, where it comes from if it does not simply drop.

Miss a day and it is gone until it comes back around. That is the point.

## How it works

No backend, no build step. Three files do the work:

- `index.html` markup and all styling
- `items.js` the content, one object per item
- `app.js` daily rotation, rendering, permalinks

The item shown is a deterministic function of the UTC date, so everyone sees the same item on the same day. Adding items lengthens the rotation on its own.

## Adding an item

Append one object to the `ITEMS` array in `items.js`. The header comment there documents every field, including the tooltip color rules that keep the item display true to the game. Any text field can be a plain string or a `{ en, de, ... }` object for translations.

## Research

The `research/` folder holds the workflow and raw findings used to source items. It is version controlled so it can be re-run to keep finding new pieces.

## Credits

Diablo II is a trademark of Blizzard Entertainment. This is an unaffiliated fan project.
