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
   rarityTier, obscurity. Optional `lastPatch` (e.g. "1.09") marks an item
   whose shown version no longer drops; it renders as a "Last seen" tag
   beside the tiers. Use it for legacy / pre-nerf entries.
   To turn a language on, add it to AVAILABLE_LANGS
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
  },
  {
    slug: "armageddon-fletch",
    name: "Armageddon Fletch",
    alias: "2/20 caster amulet",
    quality: "rare",
    type: "Amulet",
    sprite: "img/rare-amulet.png",
    tooltip: [
      { t: "Required Level: 41", c: "white" },
      "+2 to Sorceress Skill Levels",
      "+20% Faster Cast Rate",
      "+18 to Strength",
      "+55 to Life",
      "+59 to Mana",
      "All Resistances +23"
    ],
    valueTier: "A",
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "A rare amulet that quietly beats the famous unique ones. Two sorceress skills and twenty faster cast rate, then life, strength and all resistances piled on top. Mara's gets the attention. An amulet like this does more for a caster, and it comes with no gold name to tip you off. The random title is doing a lot of work to hide how good it is.",
    history: null,
    ifYouFind: "Two class skills and twenty cast rate on one amulet is the jackpot. Everything after that is a bonus most uniques cannot match."
  },
  {
    slug: "carrion-song",
    name: "Carrion Song",
    alias: "classic rare bow",
    quality: "rare",
    type: "Gothic Bow",
    sprite: "img/rare-bow.png",
    tooltip: [
      { t: "Two-Hand Damage: 30 to 163", c: "white" },
      { t: "Required Dexterity: 95", c: "white" },
      { t: "Required Strength: 76", c: "white" },
      { t: "Required Level: 26", c: "white" },
      { t: "Bow Class - Very Fast Attack Speed", c: "white" },
      "Requirements -20%",
      "+1 to Amazon Skill Levels",
      "+132 to Attack Rating",
      "+18 to Maximum Damage",
      "Increased Attack Speed"
    ],
    valueTier: "C",
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "A yellow bow with a random name, and in classic Diablo 2 that was the dream. Before runewords, before Windforce, a rolled rare like this was the bowazon endgame. A class skill on a bow you can hold at level 26, very fast attack speed, a stack of attack rating and max damage. The name means nothing. The game bolts two words together at random. The rolls are everything, and rolls like these almost never landed.",
    history: null,
    ifYouFind: "This is what people mean when they say do not vendor yellows. Read every line first."
  },
  {
    slug: "imp-shank",
    name: "Imp Shank",
    alias: "tri-res rare boots",
    quality: "rare",
    type: "Mesh Boots",
    sprite: "img/rare-boots.png",
    tooltip: [
      { t: "Defense: 39", c: "white" },
      { t: "Durability: 16 of 16", c: "white" },
      { t: "Required Strength: 65", c: "white" },
      { t: "Required Level: 26", c: "white" },
      "+30% Faster Run/Walk",
      "Cold Resist +12%",
      "Lightning Resist +36%",
      "Fire Resist +46%",
      "Half Freeze Duration",
      "34% Better Chance of Getting Magic Items"
    ],
    valueTier: "B",
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "Boots are a slot most people fill with a unique and forget. This rare beats most of them. Thirty faster run and walk, three resistances at once, half freeze duration, and a slice of magic find. A single rare covering that many needs almost never happens. The game has to roll every one of those lines together, and it rarely does.",
    history: null,
    ifYouFind: "Tri-res on boots is the hard part. Everything else here is a bonus."
  },
  {
    slug: "arkaines-valor",
    name: "Arkaine's Valor",
    alias: "legacy Arkaine's",
    quality: "unique",
    type: "Balrog Skin",
    sprite: "img/arkaines-valor.png",
    tooltip: [
      { t: "Defense: 1664", c: "white" },
      { t: "Required Strength: 165", c: "white" },
      { t: "Required Level: 85", c: "white" },
      "Indestructible",
      "+2 to All Skill Levels",
      "30% Faster Hit Recovery",
      "+200% Enhanced Defense",
      "+247 to Vitality (Based on Character Level)",
      "+198 to Life (Based on Character Level)",
      "Fire Resist +50%"
    ],
    valueTier: "B",
    rarityTier: "Mythic",
    lastPatch: "1.09",
    obscurity: 4,
    why: "This is not the Arkaine's Valor that drops today. This is the old one. Before the nerf it gave two and a half vitality and two life for every character level, plus two to all skills, indestructible, and fire resist, all on one body armor. At level ninety-nine that is hundreds of free vitality and life. The current version was cut down hard, so a copy like this can no longer drop.",
    history: "Arkaine's Valor was so strong before the 1.10 patch that it became one of the most duped armors in the game. Blizzard gutted the life and vitality bonus and left the weaker version dropping in its place. The old copies were never deleted, only frozen out of the loot table. The ones still around are relics from a version of Diablo 2 that no longer exists, and they thin out every year as old accounts expire.",
    ifYouFind: "It does not drop anymore. Anyone offering one is trading a survivor from an old patch, not a fresh find."
  },
  {
    slug: "legacy-hellfire-torch",
    name: "Hellfire Torch",
    alias: "legacy Torch (25% Firestorm)",
    quality: "unique",
    type: "Large Charm",
    sprite: "img/hellfire-torch.png",
    tooltip: [
      { t: "Required Level: 75", c: "white" },
      "25% Chance to Cast Level 10 Firestorm on Striking",
      "+3 to Sorceress Skills",
      "+20 to All Attributes",
      "All Resistances +20",
      "+8 to Light Radius",
      "Level 30 Hydra (10 Charges)"
    ],
    valueTier: "A",
    rarityTier: "Mythic",
    lastPatch: "1.12",
    obscurity: 4,
    why: "Everyone knows the Hellfire Torch. Almost nobody has seen this one. The current Torch casts Firestorm five percent of the time. The old one cast it twenty-five. Five times the fire, on a charm that was already an endgame staple. It stopped dropping in this form, so every 25 percent Torch is a survivor from before the nerf.",
    history: "The Torch came from the Pandemonium Event added in patch 1.11, and for its first years it cast Firestorm on a quarter of your hits. That was a wall of free fire on a charm people fought the Ubers to earn. Patch 1.13 cut it to five percent. The old copies kept their twenty-five, so the legacy Torch became a collector's version of an item almost everyone already owns.",
    ifYouFind: "Check the Firestorm line. Twenty-five percent means it is pre-1.13, and worth far more than the Torch in your stash."
  },
  {
    slug: "siggards-stealth",
    name: "Siggard's Stealth",
    alias: "the renamed Nosferatu's Coil",
    quality: "unique",
    type: "Vampirefang Belt",
    sprite: "img/siggards-stealth.png",
    tooltip: [
      { t: "Defense: 63", c: "white" },
      { t: "Required Level: 51", c: "white" },
      { t: "Required Strength: 50", c: "white" },
      "+10% Increased Attack Speed",
      "7% Life Stolen per Hit",
      "Slows Target by 10%",
      "+2 to Mana after each Kill",
      "+15 to Strength",
      "-3 to Light Radius"
    ],
    valueTier: "C",
    rarityTier: "Very Rare",
    lastPatch: "1.09",
    obscurity: 5,
    why: "Look at the name. That belt does not exist anymore. The stats are an ordinary Nosferatu's Coil, attack speed and life steal, nothing a current player would chase. What makes it a collector piece is the name itself. Nothing has dropped with it in over twenty years.",
    history: "In the 1.10 patch Blizzard reshuffled the unique item files. The belt that had been Nosferatu's Coil was renamed Siggard's Stealth, and a new Nosferatu's Coil started dropping in its place with the same stats. Every existing copy changed its name on the spot. So a Siggard's Stealth is proof of age. It is a Nosferatu's Coil from before the patch, wearing a name the game no longer hands out.",
    ifYouFind: "You cannot find one, only inherit one. The name is the whole story. The stats are beside the point."
  }
];

if (typeof module !== "undefined" && module.exports) { module.exports = ITEMS; }
