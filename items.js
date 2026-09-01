/* ------------------------------------------------------------------
   items.js

   CALIBRATION ENTRIES. Three real, voice-locked entries, one per
   content type, used to tune the writing voice before the rest are
   written. Stat ranges still get a fact-verification pass before
   these go live.

   Types covered:
     jmod        magic base   | no history | hidden value
     verdungos   unique       | no history | roll-dependent
     stone-of-jordan  unique  | has history | historic significance

   Order in this array is the rotation order. Hand-order it so the site
   does not open on five S tiers in a row. `obscurity` is editorial only
   and never rendered.

   LOCALIZATION
   Any prose field (name, alias, type, why, history, ifYouFind, and each
   tooltip line) can be either:
     "a plain string"                 English only, the normal case
     { en: "...", de: "..." }         per-language, English is the fallback
   A missing language falls back to English, so partial translations are
   safe. Universal fields stay plain: slug, quality, sprite, valueTier,
   rarityTier, obscurity. To turn a language on, add it to AVAILABLE_LANGS
   and its UI block in app.js. The switcher appears automatically.
   Translations are native rewrites only, never machine translation.

   TOOLTIP COLORS (match the game, verified against real screenshots)
   The tooltip replicates the in-game item display. Rules:
     - name + type    take the item quality color automatically (from `quality`):
                      unique gold, set green, rare yellow, magic blue, rune orange,
                      normal white. Do not color these by hand.
     - base stats     Defense, Damage, Durability, Required Strength/Level:
                      white  -> { t: "Defense: 148", c: "white" }
                      Render requirements as WHITE (assume met) for a clean showcase.
     - class restrict "(Druid Only)" and similar standalone restriction lines:
                      red    -> { t: "(Druid Only)", c: "red" }
     - magic props    +skills, +%ED, resists, sockets, "Can be inserted...": the
                      DEFAULT. Plain string -> renders blue. e.g. "+120% Enhanced Defense"
     - grey/gold      also available via c: "grey" / c: "gold" if ever needed.
   So a typical unique tooltip array is: white base-stat lines, then an optional red
   restriction, then plain-string blue property lines. `type` holds the base ("Mithril
   Coil", "Ring"); leave it "" for runes, and "" for magic items whose base is already
   inside the name.
------------------------------------------------------------------ */

const ITEMS = [
  {
    slug: "jmod",
    name: "Jeweler's Monarch of Deflecting",
    alias: "4os Monarch, JMOD",
    quality: "magic",
    type: "",
    sprite: "img/monarch.png",
    tooltip: [
      { t: "Defense: 148", c: "white" },
      { t: "Chance to Block: 67%", c: "white" },
      { t: "Required Strength: 156", c: "white" },
      { t: "Required Level: 54", c: "white" },
      "+20% Increased Chance to Block",
      "Socketed (4)"
    ],
    valueTier: "A",
    rarityTier: "Very Rare",
    obscurity: 3,
    why: "A blue shield with four sockets. Most players read that as vendor fodder. It is not. The Monarch is the only shield outside paladins and necromancers that can roll four sockets, and four sockets is what a Spirit runeword needs. A clean four-socket Monarch is the cheapest large jump in casting power a caster can buy. The base drops all the time. The socket count is the whole value, and a pre-rolled one saves you the socket gamble.",
    history: null,
    ifYouFind: "Count the sockets before you do anything else. Four is a real find. Three is not the same item."
  },
  {
    slug: "tyraels-might",
    name: "Tyrael's Might",
    alias: "TM",
    quality: "unique",
    type: "Sacred Armor",
    sprite: "img/tyraels-might.png",
    tooltip: [
      { t: "Defense: 1502", c: "white" },
      { t: "Required Level: 84", c: "white" },
      "+150% Enhanced Defense",
      "+100% Damage to Demons",
      "+20% Faster Run/Walk",
      "+30 to Strength",
      "All Resistances +30",
      "Cannot Be Frozen",
      "Requirements -100%",
      "Slain Monsters Rest in Peace",
      "Indestructible"
    ],
    valueTier: "B",
    rarityTier: "Mythic",
    obscurity: 2,
    why: "The rarest item in the game. Not one of the rarest. By the drop numbers, the single hardest thing to see. It is a good armor too, with no strength requirement and a wall of resistances, but it is not Enigma and never was. People want it because almost nobody has one.",
    history: "For years Tyrael's Might was the item you heard about and never saw. Its drop rate is the lowest in the game, low enough that plenty of thousand-hour players have never held one. The stats are good. They are not the best in the slot. The price is the rarity, and nothing else.",
    ifYouFind: "Almost nobody does. If you somehow do, it is a trophy first and gear second."
  },
  {
    slug: "stone-of-jordan",
    name: "Stone of Jordan",
    alias: "SOJ",
    quality: "unique",
    type: "Ring",
    sprite: "img/stone-of-jordan.png",
    tooltip: [
      { t: "Required Level: 29", c: "white" },
      "+1 to All Skills",
      "Adds 1-12 Lightning Damage",
      "+20 to Mana",
      "Increase Maximum Mana 25%"
    ],
    valueTier: "D",
    rarityTier: "Common",
    obscurity: 2,
    why: "A ring with plus one to all skills and some mana. Common, and cheap on a mature ladder. New characters still run one for the early skill boost.",
    history: "The Stone of Jordan was the currency of Diablo 2 for years. Not a figure of speech. People priced gear in SOJs the way you would price it in dollars. Then duping flooded the realm with them and the currency collapsed, dragging every other price up with it. Blizzard's fix is still in the game. A hidden counter tracks Stones of Jordan sold to town vendors, and when enough get sold, Diablo Clone spawns and comes looking. One ring created a permanent boss and the sink that eats the ring. Nothing else in the game has a story like it.",
    ifYouFind: null
  },
  {
    slug: "deaths-web",
    name: "Death's Web",
    alias: "Web",
    quality: "unique",
    type: "Unearthed Wand",
    sprite: "img/deaths-web.png",
    tooltip: [
      { t: "One-Hand Damage: 22 to 28", c: "white" },
      { t: "Required Level: 66", c: "white" },
      { t: "Required Strength: 25", c: "white" },
      "+2 to All Skills",
      "+2 to Poison and Bone Spells (Necromancer Only)",
      "-50% to Enemy Poison Resistance",
      "+12 Life after each Kill",
      "+12 Mana after each Kill",
      "+50% Damage to Undead"
    ],
    valueTier: "S",
    rarityTier: "Very Rare",
    obscurity: 3,
    why: "The poison necromancer's endgame wand, and the reason the build works at the top level. Minus enemy poison resistance is the whole point, and this rolls to minus fifty. Add two skills and two to poison and bone on top. There is no substitute. If you play poison necro seriously, you own one or you are working toward it.",
    history: null,
    ifYouFind: "The poison resistance roll is the item. Minus fifty is perfect. Anything in the forties still sells."
  }
];

if (typeof module !== "undefined" && module.exports) { module.exports = ITEMS; }
