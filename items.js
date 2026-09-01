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
  },
  {
    slug: "crown-of-ages",
    name: "Crown of Ages",
    alias: "perfect CoA",
    quality: "unique",
    type: "Corona",
    sprite: "img/crown-of-ages.png",
    tooltip: [
      { t: "Defense: 399", c: "white" },
      { t: "Required Level: 82", c: "white" },
      { t: "Required Strength: 174", c: "white" },
      "+1 to All Skills",
      "+50% Enhanced Defense",
      "Physical Damage Received Reduced by 15%",
      "All Resistances +30",
      "+30% Faster Hit Recovery",
      "Socketed (2)",
      "Indestructible"
    ],
    valueTier: "A",
    rarityTier: "Very Rare",
    obscurity: 2,
    why: "Everyone knows the helm. Almost nobody prices the roll. A plain Crown of Ages is a fine helmet. This one has two sockets, fifteen percent physical damage reduction, and thirty all resistance, the top of every line it can roll. That stack is worth many times a low one. Same gold name, a completely different item, and the difference is invisible unless you read the numbers.",
    history: null,
    ifYouFind: "Two sockets and fifteen damage reduction is the jackpot. One socket and ten reduction is a cheaper helm wearing the same name."
  },
  {
    slug: "wisp-projector",
    name: "Wisp Projector",
    alias: "20/20 Wisp",
    quality: "unique",
    type: "Ring",
    sprite: "img/wisp-projector.png",
    tooltip: [
      { t: "Required Level: 76", c: "white" },
      "10% Chance to Cast Level 16 Lightning on Striking",
      "Lightning Absorb 20%",
      "20% Better Chance of Getting Magic Items",
      "Level 7 Spirit of Barbs (11 Charges)",
      "Level 5 Heart of Wolverine (13 Charges)",
      "Level 2 Oak Sage (15 Charges)"
    ],
    valueTier: "A",
    rarityTier: "Rare",
    obscurity: 4,
    why: "Nobody looks twice at Wisp Projector. It reads like a novelty ring with a pile of charges. Then you notice the two lines that matter: lightning absorb up to twenty percent, and magic find up to twenty percent. Lightning is the deadliest damage in the game at the high end, so that absorb is worth real money, and the magic find rides along for free. The charges are a footnote. The two rolls are the item.",
    history: null,
    ifYouFind: "Read the absorb and the magic find. Twenty and twenty is the one people pay for."
  },
  {
    slug: "herald-of-zakarum",
    name: "Herald of Zakarum",
    alias: "200 ED HoZ",
    quality: "unique",
    type: "Gilded Shield",
    sprite: "img/herald-of-zakarum.png",
    tooltip: [
      { t: "Defense: 507", c: "white" },
      { t: "Required Level: 42", c: "white" },
      { t: "Required Strength: 89", c: "white" },
      { t: "Chance to Block: 82%", c: "white" },
      "+200% Enhanced Defense",
      "30% Increased Chance of Blocking",
      "30% Faster Block Rate",
      "20% Bonus to Attack Rating",
      "+20 to Strength",
      "+20 to Vitality",
      "All Resistances +50",
      "+2 to Paladin Skill Levels",
      "+2 to Combat Skills (Paladin Only)"
    ],
    valueTier: "A",
    rarityTier: "Very Rare",
    obscurity: 3,
    why: "A Herald of Zakarum is a paladin staple, so people assume they are all the same. They are not. The enhanced defense rolls from a hundred and fifty to two hundred percent, and only a two hundred is worth chasing. Punch four sockets into that one and you have one of the best shields a paladin can hold. A low roll is a leveling shield. The gap between the two is enormous, and the tooltip barely hints at it.",
    history: null,
    ifYouFind: "Two hundred enhanced defense is the number. Anything lower is just a shield. Max roll, socket it and keep it."
  },
  {
    slug: "eth-sandstorm-trek",
    name: "Sandstorm Trek",
    alias: "eth Treks",
    quality: "unique",
    type: "Scarabshell Boots",
    sprite: "img/sandstorm-trek.png",
    tooltip: [
      { t: "Defense: 178", c: "white" },
      { t: "Required Level: 64", c: "white" },
      { t: "Required Strength: 91", c: "white" },
      "+170% Enhanced Defense",
      "+20% Faster Run/Walk",
      "+20% Faster Hit Recovery",
      "+15 to Strength",
      "+15 to Vitality",
      "Poison Resist +70%",
      "50% Slower Stamina Drain",
      "Repairs 1 Durability in 20 Seconds"
    ],
    valueTier: "B",
    rarityTier: "Rare",
    obscurity: 3,
    why: "Treks are cheap. Everyone has a pair, which is exactly why the good ones hide in plain sight. The chase is an ethereal pair with maxed strength and vitality. Ethereal usually means an item wears out and dies, but Sandstorm Trek repairs itself, so the ethereal version keeps its boosted defense forever and never breaks. The same boots most players vendor, except this one is worth a pile of runes.",
    history: null,
    ifYouFind: "Check for ethereal first, then the strength and vitality. Ethereal and 15/15 is the pair people hunt."
  },
  {
    slug: "eth-titans-revenge",
    name: "Titan's Revenge",
    alias: "eth Titan's",
    quality: "unique",
    type: "Ceremonial Javelin",
    sprite: "img/titans-revenge.png",
    tooltip: [
      { t: "Throw Damage: 79 to 212", c: "white" },
      { t: "Required Level: 42", c: "white" },
      { t: "Required Strength: 25", c: "white" },
      { t: "Required Dexterity: 109", c: "white" },
      "+200% Enhanced Damage",
      "Adds 25-50 Damage",
      "+2 to Amazon Skill Levels",
      "9% Life Stolen per Hit",
      "+30% Faster Run/Walk",
      "+20 to Strength",
      "+20 to Dexterity",
      "Replenishes Quantity (1 in 3 Seconds)",
      "+2 to Javelin and Spear Skills (Amazon Only)"
    ],
    valueTier: "A",
    rarityTier: "Rare",
    obscurity: 3,
    why: "A throwing javelin most people never think about twice. The trick is what happens when it is ethereal. Ethereal boosts the damage, and for a throwing weapon that depletes that would normally be a death sentence. Titan's Revenge replenishes its own stack, so an ethereal pair throws forever at boosted damage. Two amazon skills and thirty faster run ride along. It is the javazon's quiet grail, hiding as a common gold javelin.",
    history: null,
    ifYouFind: "Ethereal is the whole game here. An ethereal Titan's that replenishes is worth far more than the plain one you throw away."
  },
  {
    slug: "vampire-gaze-08",
    name: "Vampire Gaze",
    alias: "1.08 Vamp Gaze",
    quality: "unique",
    type: "Grim Helm",
    sprite: "img/vampire-gaze-08.png",
    tooltip: [
      { t: "Defense: 252", c: "white" },
      { t: "Required Level: 41", c: "white" },
      "Physical Damage Reduced by 25%",
      "Magic Damage Reduced by 15",
      "8% Life Stolen per Hit",
      "8% Mana Stolen per Hit",
      "15% Slower Stamina Drain"
    ],
    valueTier: "B",
    rarityTier: "Very Rare",
    lastPatch: "1.08",
    obscurity: 4,
    why: "The Vampire Gaze that drops today cuts physical damage by fifteen to twenty percent. This one, from patch 1.08, does a flat twenty five, with no cold damage cluttering the stat line. Five extra points of reduction does not sound like much until you stack it against everything else. Hardcore players chased these for years. It stopped dropping in this form long ago.",
    history: "Damage reduction was rebalanced after 1.08, and Vampire Gaze lost its fixed twenty five percent. The old copies kept it. Like every legacy item, they live only on non-ladder, and they get scarcer every year.",
    ifYouFind: "Check the damage reduced line. Twenty five percent flat means it is a 1.08 relic, not a modern drop."
  },
  {
    slug: "small-charm-5-20",
    name: "Shimmering Small Charm of Vita",
    alias: "5/20 small charm",
    quality: "magic",
    type: "",
    sprite: "img/small-charm.png",
    tooltip: [
      { t: "Required Level: 47", c: "white" },
      "+5 to All Resistances",
      "+20 to Life"
    ],
    valueTier: "A",
    rarityTier: "Very Rare",
    obscurity: 3,
    why: "A small charm takes one inventory square. This one gives five all resistance and twenty life for that square, both maxed. It is the best defensive small charm in the game, and players hoard whole rows of them. A perfect one costs more than plenty of uniques. Most people who find a near miss never notice how far off max it is.",
    history: null,
    ifYouFind: "Five and twenty is perfect. A four and eighteen looks almost identical and is worth a fraction. Read the numbers."
  },
  {
    slug: "small-charm-3-20-20",
    name: "Fine Small Charm of Vita",
    alias: "3/20/20 small charm",
    quality: "magic",
    type: "",
    sprite: "img/small-charm.png",
    tooltip: [
      { t: "Required Level: 47", c: "white" },
      "+3 to Maximum Damage",
      "+20 to Attack Rating",
      "+20 to Life"
    ],
    valueTier: "A",
    rarityTier: "Very Rare",
    obscurity: 2,
    why: "The melee version of the perfect small charm. Three maximum damage, twenty attack rating, twenty life, all maxed, in one square. Physical builds fill their inventory with these. The roll has to hit all three ceilings at once, which almost never happens, and that is what you pay for.",
    history: null,
    ifYouFind: "All three lines have to be maxed. Close does not count and is not worth much."
  },
  {
    slug: "grand-charm-skiller",
    name: "Harpoonist's Grand Charm of Vita",
    alias: "45-life skiller",
    quality: "magic",
    type: "",
    sprite: "img/grand-charm.png",
    tooltip: [
      { t: "Required Level: 48", c: "white" },
      "+1 to Javelin and Spear Skills (Amazon Only)",
      "+45 to Life"
    ],
    valueTier: "A",
    rarityTier: "Very Rare",
    obscurity: 3,
    why: "A grand charm that adds a whole skill level to one of your trees is already worth keeping. One that also rolls near-max life is an endgame item. Javazons, casters and warcry barbarians build their whole inventory out of these. The skill is the base value. The life roll on top is what turns a common skiller into an expensive one.",
    history: null,
    ifYouFind: "Any plus-skill grand charm is worth holding. One with forty plus life is worth real trade."
  },
  {
    slug: "jewel-40-15",
    name: "Jewel of Fervor",
    alias: "40/15 jewel",
    quality: "magic",
    type: "",
    sprite: "img/jewel.png",
    tooltip: [
      "+40% Enhanced Damage",
      "+15% Increased Attack Speed"
    ],
    valueTier: "S",
    rarityTier: "Very Rare",
    obscurity: 3,
    why: "One jewel. Forty percent enhanced damage and fifteen percent increased attack speed, both maxed. It is the single most valuable jewel in the game, and it trades in the high rune range, Ber to Jah. A whole endgame rune for one socketable. Almost every jewel is filler. This exact roll is a small fortune, and two lines are all that separate them.",
    history: null,
    ifYouFind: "Forty and fifteen, both maxed, or it is just another jewel. There is no close second on this one."
  },
  {
    slug: "rainbow-facet",
    name: "Rainbow Facet",
    alias: "5/5 Cold Facet",
    quality: "unique",
    type: "Jewel",
    sprite: "img/rainbow-facet.png",
    tooltip: [
      { t: "Required Level: 49", c: "white" },
      "100% Chance to Cast Level 43 Frost Nova when you Level-Up",
      "Adds 24-38 Cold Damage",
      "+5% to Cold Skill Damage",
      "-5% to Enemy Cold Resistance"
    ],
    valueTier: "A",
    rarityTier: "Rare",
    obscurity: 3,
    why: "A unique jewel that cuts enemy resistance and boosts your own elemental damage. There are eight versions, four elements times two triggers, and they are not equal. A perfect five-five of the right element on the level-up trigger is a caster chase. The poison ones and the death-trigger ones go for far less. Same gold name, eight very different price tags.",
    history: null,
    ifYouFind: "Match the element to your build, want the level-up trigger, and check for the five and five. Off-element or death-trigger is a different market."
  },
  {
    slug: "angelic-combo",
    name: "Angelic Halo + Wings",
    alias: "Angelics",
    quality: "set",
    type: "Ring + Amulet",
    sprite: "img/angelic-combo.png",
    tooltip: [
      { t: "Required Level: 12", c: "white" },
      "+12 to Attack Rating per Character Level",
      "+20 to Life",
      "Replenish Life +6"
    ],
    valueTier: "A",
    rarityTier: "Uncommon",
    obscurity: 2,
    why: "A seasoned player sees a set ring and amulet and moves on. That is the mistake. Worn together, the ring grants twelve attack rating for every character level. At level thirty that is hundreds of attack rating, more than a low-level character could ever get another way, and it makes a twink hit things it has no business hitting. The pieces are cheap. Knowing to pair them is the whole value.",
    history: null,
    ifYouFind: "Only worth it as the pair, ring and amulet together. One without the other is just a set piece."
  },
  {
    slug: "bloodfist",
    name: "Bloodfist",
    alias: "perfect Bloodfist",
    quality: "unique",
    type: "Heavy Gloves",
    sprite: "img/bloodfist.png",
    tooltip: [
      { t: "Defense: 18", c: "white" },
      { t: "Required Level: 9", c: "white" },
      "+20% Enhanced Defense",
      "+10% Increased Attack Speed",
      "+30% Faster Hit Recovery",
      "+40 to Life",
      "+5 to Minimum Damage"
    ],
    valueTier: "A",
    rarityTier: "Rare",
    obscurity: 3,
    why: "Level nine gloves. A player rushing to endgame vendors them without a glance. In the low-level dueling bracket they are a staple, because forty life, ten attack speed and thirty faster hit recovery at that level requirement is enormous. A perfect pair with max enhanced defense trades for real currency inside that market.",
    history: null,
    ifYouFind: "The forty life and the speed are fixed. It is the market that makes them valuable, not the roll, so do not vendor a clean pair."
  },
  {
    slug: "twitchthroe",
    name: "Twitchthroe",
    alias: "Twitch",
    quality: "unique",
    type: "Studded Leather",
    sprite: "img/twitchthroe.png",
    tooltip: [
      { t: "Defense: 60", c: "white" },
      { t: "Required Level: 16", c: "white" },
      { t: "Required Strength: 27", c: "white" },
      "20% Increased Attack Speed",
      "20% Faster Hit Recovery",
      "25% Increased Chance of Blocking",
      "+10 to Strength",
      "+10 to Dexterity"
    ],
    valueTier: "B",
    rarityTier: "Uncommon",
    obscurity: 2,
    why: "Attack speed, faster hit recovery, block and stats, all on a body armor with almost no requirement. A player leveling past it never looks back. In the low brackets it is a cornerstone, the armor that lets a twink hit breakpoints nothing else at that level can reach. Invisible to endgame, foundational to the people who live at level thirty.",
    history: null,
    ifYouFind: "Worthless to a rusher, a building block to a twink. Know which one you are before you sell it."
  },
  {
    slug: "spectral-shard",
    name: "Spectral Shard",
    alias: "Spec Shard",
    quality: "unique",
    type: "Blade",
    sprite: "img/spectral-shard.png",
    tooltip: [
      { t: "One-Hand Damage: 4 to 15", c: "white" },
      { t: "Required Level: 25", c: "white" },
      { t: "Required Strength: 35", c: "white" },
      { t: "Required Dexterity: 51", c: "white" },
      "50% Faster Cast Rate",
      "+55 to Attack Rating",
      "All Resistances +10",
      "+50 to Mana"
    ],
    valueTier: "B",
    rarityTier: "Uncommon",
    obscurity: 3,
    why: "The damage on it is a joke, four to fifteen, so a melee player tosses it. Casters know better. Fifty percent faster cast rate at a level twenty five requirement is a huge breakpoint for the price, and it comes with mana and resistances attached. In the low-level caster bracket it is a default pick, and outside that bracket nobody notices it exists.",
    history: null,
    ifYouFind: "Ignore the weapon damage. The fifty cast rate at a low level is the point."
  },
  {
    slug: "deaths-combo",
    name: "Death's Guard + Death's Hand",
    alias: "cannot-be-frozen combo",
    quality: "set",
    type: "Sash + Leather Gloves",
    sprite: "img/deaths-combo.png",
    tooltip: [
      { t: "Required Level: 6", c: "white" },
      "Cannot Be Frozen",
      "30% Increased Attack Speed",
      "8% Life Stolen per Hit",
      "All Resistances +15",
      "Poison Resist +50%"
    ],
    valueTier: "B",
    rarityTier: "Uncommon",
    obscurity: 3,
    why: "Two cheap set pieces, a sash and a pair of gloves, both usable at level six. Worn together they give cannot be frozen, thirty percent attack speed, and eight percent life steal. Cannot be frozen with no real level requirement is the prize. It frees an amulet or ring slot a twink would otherwise spend on the same effect. The classic lesson in why junk-looking set pieces matter.",
    history: null,
    ifYouFind: "Only the pair matters. Together they hand a low-level character stats that normally cost a whole gear slot."
  }
];

if (typeof module !== "undefined" && module.exports) { module.exports = ITEMS; }
