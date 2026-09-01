/* ------------------------------------------------------------------
   items.js

   PLACEHOLDER CONTENT. These three entries exist to exercise every
   rendering path while the shell is built. They get replaced by the
   verified research pass.

   Paths covered:
     zod-rune      rune colour  | badge: rarer than valuable | has history
     4os-monarch   normal       | badge: more valuable       | no history
     the-gnasher   unique       | no badge | has history | localized name

   Order in this array is the rotation order. Hand-order it so the site
   does not open on five S tiers in a row. `obscurity` is editorial only
   and never rendered.

   LOCALIZATION
   Any prose field (name, alias, type, why, history, ifYouFind, and each
   tooltip line) can be either:
     "a plain string"                 English only, the normal case
     { en: "...", es: "...", de: "" } per-language, English is the fallback
   A missing language falls back to English, so partial translations are
   safe. Universal fields stay plain: slug, quality, sprite, valueTier,
   rarityTier, obscurity. To turn a language on, add it to AVAILABLE_LANGS
   and its UI block in app.js. The switcher appears automatically.
   The Gnasher below has a localized `name` to demonstrate the object form.

   TOOLTIP COLORS (match the game, verified against real screenshots)
   The tooltip replicates the in-game item display. Rules:
     - name + type    take the item quality color automatically (from `quality`):
                      unique gold, set green, rare yellow, magic blue, rune orange,
                      normal white. Do not color these by hand.
     - base stats     Defense, Damage, Durability, Required Strength/Level:
                      white  -> { t: "Defense: 363", c: "white" }
                      Render requirements as WHITE (assume met) for a clean showcase.
     - class restrict "(Druid Only)" and similar standalone restriction lines:
                      red    -> { t: "(Druid Only)", c: "red" }
     - magic props    +skills, +%ED, resists, sockets, "Can be inserted...": the
                      DEFAULT. Plain string -> renders blue. e.g. "+133% Enhanced Defense"
     - grey/gold      also available via c: "grey" / c: "gold" if ever needed.
   So a typical unique tooltip array is: white base-stat lines, then an optional red
   restriction, then plain-string blue property lines. `type` holds the base ("Sky
   Spirit", "Corona"); leave it "" for runes and plain bases with no sub-type line.
------------------------------------------------------------------ */

const ITEMS = [
  {
    slug: "zod-rune",
    name: "Zod Rune",
    alias: "",
    quality: "rune",
    type: "",
    sprite: "img/zod-rune.png",
    tooltip: [
      { t: "Can be Inserted into Socketed Items", c: "white" },
      { t: "Weapons: Indestructible", c: "white" },
      { t: "Armor: Indestructible", c: "white" },
      { t: "Helms: Indestructible", c: "white" },
      { t: "Shields: Indestructible", c: "white" },
      { t: "Required Level: 69", c: "white" }
    ],
    valueTier: "C",
    rarityTier: "Mythic",
    obscurity: 4,
    why: "Zod is the last rune in the game and the hardest one to see drop. It is also worth a fraction of what Ber or Jah trade for. Rarity sets how often something appears. Demand sets what it costs, and almost nothing wants Indestructible badly enough to pay for it.",
    history: "Zod's whole job is repairing ethereal gear permanently. That sounds useful until you notice most ethereal items people actually use are either already indestructible or cheap enough to replace.",
    ifYouFind: "Keep it, but do not expect a Ber for it. Price check before you trade."
  },
  {
    slug: "4os-monarch",
    name: "Monarch",
    alias: "4os Monarch",
    quality: "normal",
    type: "",
    sprite: "img/monarch.png",
    tooltip: [
      { t: "Defense: 133", c: "white" },
      { t: "Chance to Block: 67%", c: "white" },
      { t: "Required Strength: 156", c: "white" },
      { t: "Required Level: 54", c: "white" },
      "Socketed (4)"
    ],
    valueTier: "A",
    rarityTier: "Common",
    obscurity: 3,
    why: "A plain white shield with four sockets. It looks like vendor fodder and it is the base for Spirit, which is the cheapest large jump in casting power a new character can get. The item is common. Four sockets on it is not.",
    history: null,
    ifYouFind: "Do not sell it to a vendor. Check the socket count first, every time."
  },
  {
    slug: "the-gnasher",
    name: { en: "The Gnasher", de: "Der Nörgler" },
    alias: "",
    quality: "unique",
    type: "Hand Axe",
    sprite: "img/the-gnasher.png",
    tooltip: [
      { t: "One-Hand Damage: 4 to 8", c: "white" },
      { t: "Required Level: 5", c: "white" },
      "+50% Enhanced Damage",
      "20% Increased Attack Speed",
      "Knockback"
    ],
    valueTier: "F",
    rarityTier: "Uncommon",
    obscurity: 1,
    why: "Gold text on a low level axe. New players stash these because unique feels like it should mean something. It does not. Most normal-tier uniques are worse than a decent magic item of the same level and nobody is buying them.",
    history: "Worth featuring precisely because it is worthless. If every entry is a jackpot the tiers stop meaning anything.",
    ifYouFind: "Vendor it. Genuinely."
  }
];

if (typeof module !== "undefined" && module.exports) { module.exports = ITEMS; }
