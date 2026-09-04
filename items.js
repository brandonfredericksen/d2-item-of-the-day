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
   safe. Universal fields stay plain: slug, quality, sprite, rarityTier,
   obscurity. Optional `title` overrides the on-page H1 shown
   under the header; use it when the in-game tooltip name would mislead
   (the Occy Ring displays in game as a Stone of Jordan). It defaults to
   `name`. The `alias` renders as a small subtitle beneath the title.
   Socketed items: `sockets` (a count) draws that many empty socket holes over
   the sprite by default. Optional `grid` is the item's inventory size in cells,
   [columns, rows]. The socket holes are laid out in that many columns and fill
   row by row, matching the game: a single-column base (an orb, a wand) stacks
   its sockets vertically, a two-wide base fills two per row. A leftover socket
   on its own row is centered, not pushed to one side. Only the column count
   changes the layout; the row value is recorded for reference. Omit `grid`
   and the layout falls back to two columns. Optional `fill` is an array of socketable sprite
   paths (img/socketables/*); when present, a button fills the holes with them,
   and any `fillTip` lines (the stats those socketables add) appear in the
   tooltip. `fillLabel` sets the button text. If `fill` is set its length is
   the socket count, so `sockets` is only needed when an item has sockets but
   no defined fill. Set `filled: true` for a COMPLETE item that came with its
   runes/gems already in (e.g. a rare with Lo Lo socketed): the socketables show
   by default and there is no fill button. The socketables' stats are part of the
   base tooltip in that case, so do NOT also add `fillTip` (it would double up).
   Optional `era` (e.g. "Classic") renders a tag beside the tiers marking
   the game the item mattered in; leave it off for current Expansion items
   so the tag stays meaningful. Optional `lastPatch` (e.g. "1.09") marks an item
   whose shown version no longer drops; it renders as a "Last seen" tag
   beside the tiers. Use it for legacy / pre-nerf entries.
   Optional `labels` is the free slot: an array of extra tags for whatever is
   worth calling out about this one item, rendered after the fixed tags. Two
   forms, and both `v` and any prose in them localize like everything else:
     { k: "source", v: "Uber quest" }   a known kind. `k` supplies the label
                                        text and the hover note.
     { k: "eth" }                       a flag kind. It is the whole tag, so it
                                        takes no value at all.
     { l: "Console", v: "PS2 only",     a one-off. `l` is the label, `note` the
       note: "..." }                    hover text and may be left off.
   Kinds live in LABEL_KINDS in app.js:
     source   where it comes from, when it is not an ordinary drop
     added    the patch the ITEM entered the game. Never put this on an entry
              that has `lastPatch`. That field is scoped to the version on the
              card, this one is scoped to the item, and side by side they read
              as a lifespan. The legacy Torch is the trap: added 1.11, its 25%
              version last seen 1.12, and the Torch still drops today.
     roll     how close this one is to the best its affixes can roll, for the
              common bases where the numbers are the entire item
     eth      ethereal, flag only. Use it when ethereal is the point of the
              entry, not when the item merely happens to be ethereal.
   A `roll` value should restate what the prose already claims. If the why does
   not say the item is maxed, do not put "Perfect" on it.
   Add a kind only when the same call-out keeps recurring; one-offs stay inline.
   Leave `labels` off entirely when the item has nothing extra to say.
   Optional `illicit` marks contraband that cannot legitimately exist. Set it to
   "Hacked" (an external item-editing hack, renders a red tag) or "Bugged" (an
   in-game glitch like the ethereal-socket defense bug, renders an amber tag).
   The why/history carry the story; the tag flags that it is not a real drop.
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
    grid: [2, 3],
    name: "Jeweler's Monarch of Deflecting",
    alias: "JMOD",
    quality: "magic",
    type: "",
    sprite: "img/monarch.png",
    proof: "research/reference-screenshots/jewelers-monarch-of-deflecting.png",
    fill: ["img/rainbow-facet.png", "img/rainbow-facet.png", "img/rainbow-facet.png", "img/rainbow-facet.png"],
    fillLabel: "socket 4 lightning facets",
    fillTip: ["-20% to Enemy Lightning Resistance", "+20% to Lightning Skill Damage"],
    tooltip: [
      { t: "Defense: 134", c: "white" },
      { t: "Chance to Block: 67%", c: "white" },
      { t: "Durability: 77 of 86", c: "white" },
      { t: "Required Strength: 166", c: "white" },
      { t: "Required Level: 64", c: "white" },
      "+30% Faster Block Rate",
      "20% Increased Chance of Blocking",
      "Socketed (4)"
    ],
    rarityTier: "Very Rare",
    obscurity: 3,
    why: "A blue shield that trades for a dozen high runes. It is not a runeword base, it is better than one. Four sockets, thirty faster block, twenty increased block, all on a light shield anyone can carry. You fill the sockets yourself, usually with Rainbow Facets, and get a max-block shield tuned to your build that no plain runeword can match. Lightning javazons in particular hunt these. It looks like vendor trash and gambles for a fortune.",
    history: null,
    ifYouFind: "The empty shell is the item. What a JMOD is worth is the shield you build inside it, never what it dropped with."
  },
  {
    slug: "tyraels-might",
    name: "Tyrael's Might",
    alias: "TM",
    quality: "unique",
    type: "Sacred Armor",
    sprite: "img/uniques/tyraels-might.png",
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
    rarityTier: "Mythic",
    obscurity: 2,
    why: "The rarest item in the game. Not one of the rarest. By the drop numbers, the single hardest thing to see. It is a good armor too, with no strength requirement and a wall of resistances, but it is not Enigma and never was. People want it because almost nobody has one.",
    history: "For years Tyrael's Might was the item you heard about and never saw. Its drop rate is the lowest in the game, low enough that plenty of thousand-hour players have never held one. The stats are good. They are not the best in the slot. The price is the rarity, and nothing else.",
    ifYouFind: "The only unique that trades on scarcity alone. Nobody wears a Tyrael's to fight in it. They own it because almost no one else can."
  },
  {
    slug: "stone-of-jordan",
    name: "Stone of Jordan",
    alias: "SOJ",
    quality: "unique",
    type: "Ring",
    sprite: "img/uniques/stone-of-jordan.webp",
    tooltip: [
      { t: "Required Level: 29", c: "white" },
      "+1 to All Skills",
      "Adds 1-12 lightning damage",
      "+20 to Mana",
      "Increase Maximum Mana 25%"
    ],
    rarityTier: "Common",
    obscurity: 2,
    why: "A ring with plus one to all skills and some mana. Common, and cheap on a mature ladder. New characters still run one for the early skill boost.",
    ifYouFind: "The ring still earns its slot. Plus one to all skills and a mana boost is hard to beat for the cost, and plenty of characters wear one well into the late game. What makes a Stone of Jordan worth knowing is what it did to the game, not what it does on your finger.",
    history: "The Stone of Jordan was the currency of Diablo 2 for years. Not a figure of speech. People priced gear in SOJs the way you would price it in dollars. Gold never had a chance at the job. The game capped how much you could hold and gave you almost nothing worth buying, so it sat nearly worthless while the SoJ turned out to be rare enough to hold value and light enough to carry by the dozen. Then duping flooded the realm with them and the currency collapsed, dragging every other price up with it. Blizzard's fix is still in the game. A hidden counter tracks Stones of Jordan sold to town vendors, and when enough get sold, Diablo Clone spawns and comes looking. One ring created a permanent boss and the sink that eats the ring. Twenty years later, when Blizzard rebuilt the game as Resurrected, design director Rob Gallerani still pointed to the SoJ by name when explaining why they retuned the online economy: it got duped that hard because the playerbase had turned it into money. Nothing else in the game has a story like it."
  },
  {
    slug: "wraith-crack",
    name: "Wraith Crack",
    alias: "the six-figure rare",
    quality: "rare",
    type: "Legendary Mallet",
    sprite: "img/legendary-mallet.png",
    proof: "research/reference-screenshots/wraith-crack.jpg",
    grid: [2, 3],
    fill: ["img/socketables/rune-lo.png", "img/socketables/rune-lo.png"],
    filled: true,
    tooltip: [
      { t: "'LoLo'", c: "gold" },
      { t: "One-Hand Damage: 293 to 404", c: "white" },
      { t: "Durability: 65 of 65", c: "white" },
      { t: "Required Strength: 179", c: "white" },
      { t: "Required Level: 73", c: "white" },
      { t: "Mace Class - Very Fast Attack Speed", c: "white" },
      "+40% Increased Attack Speed",
      "+291% Enhanced Damage",
      "+49 to Maximum Damage (Based on Character Level)",
      "+1633 to Attack Rating (Based on Character Level)",
      "+1 cold damage",
      "+40% Deadly Strike",
      "Repairs 1 durability in 20 seconds",
      "+50% Damage to Undead",
      "Ethereal (Cannot be Repaired), Socketed (2)"
    ],
    rarityTier: "Mythic",
    obscurity: 4,
    why: "Every line here is legitimate, and that is the point. A rare that rolled near the ceiling on everything at once: two hundred ninety one enhanced damage just under the cap, forty attack speed, forty deadly strike from the two Lo runes, all on an ethereal fast mace. Nothing unique or runeword beats it for a straight melee build. The odds of the game rolling one item this well are almost none, which is why it became the most famous rare in the game.",
    history: "Wraith Crack is the rare people tell stories about. The legend has it selling for a six-figure sum, somewhere near a hundred and twenty thousand dollars, though no record of the sale survives and the figure has the ring of folklore. What is real is why the story stuck. A perfect legitimate roll on the best melee base, one of one, is exactly the kind of item a community turns into a myth.",
    ifYouFind: "There is no second one to roll. Every affix landed near its ceiling on the same legitimate item, which is a coincidence the game has essentially never repeated."
  },
  {
    slug: "deaths-web",
    name: "Death's Web",
    alias: "Web",
    quality: "unique",
    type: "Unearthed Wand",
    sprite: "img/uniques/deaths-web.webp",
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
    rarityTier: "Very Rare",
    obscurity: 3,
    why: "The poison necromancer's endgame wand, and the reason the build works at the top level. Minus enemy poison resistance is the whole point, and this rolls to minus fifty. Add two skills and two to poison and bone on top. There is no substitute. If you play poison necro seriously, you own one or you are working toward it.",
    history: null,
    ifYouFind: "The whole build rides one line. Minus fifty enemy poison resistance is what separates a poison necromancer that melts Hell from one that stalls in it."
  },
  {
    slug: "armageddon-fletch",
    name: "Armageddon Fletch",
    alias: "2/20 caster amulet",
    quality: "rare",
    type: "Amulet",
    sprite: "img/amulet-gold.png",
    proof: "research/reference-screenshots/armageddon-fletch.png",
    tooltip: [
      { t: "Required Level: 41", c: "white" },
      "+2 to Sorceress Skill Levels",
      "+20% Faster Cast Rate",
      "+18 to Strength",
      "+66 to Life",
      "+69 to Mana",
      "All Resistances +23"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "A rare amulet that quietly beats the famous unique ones. Two sorceress skills and twenty faster cast rate, then life, strength and all resistances piled on top. Mara's gets the attention. An amulet like this does more for a caster, and it comes with no gold name to tip you off. The random title is doing a lot of work to hide how good it is.",
    history: null,
    ifYouFind: "Mara's gets the name. A rare like this quietly outdoes it for a caster and costs less, because the market never learned to read a yellow amulet's skill line."
  },
  {
    slug: "shadow-claw",
    grid: [1, 3],
    sockets: 2,
    name: "Shadow Claw",
    alias: "godly rare trapsin claw",
    quality: "rare",
    type: "Greater Talons",
    sprite: "img/greater-talons.png",
    tooltip: [
      { t: "One-Hand Damage: 21 to 36", c: "white" },
      { t: "Durability: 60 of 69", c: "white" },
      { t: "(Assassin Only)", c: "red" },
      { t: "Required Dexterity: 79", c: "white" },
      { t: "Required Strength: 79", c: "white" },
      { t: "Required Level: 52", c: "white" },
      { t: "Claw Class - Very Fast Attack Speed", c: "white" },
      "+2 to Assassin Skills",
      "+40% Increased Attack Speed",
      "+14% Faster Hit Recovery",
      "+3 to Mind Blast (Assassin Only)",
      "+3 to Lightning Sentry (Assassin Only)",
      "+3 to Weapon Block (Assassin Only)",
      "+15 to Strength",
      "Replenish Life +13",
      "+30 to Mana",
      "Lightning Resist +40%",
      "Socketed (2)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "A rare claw that out-stacks anything a trapsin can build. Two to all assassin skills, then three more each to Lightning Sentry, Mind Blast and Weapon Block, plus forty attack speed, maxed lightning resist, and two open sockets. No unique claw and no runeword gives that combination. The game has to land every one of those lines at once, which almost never happens. It reads as a yellow drop and outclasses the gold ones beside it.",
    history: null,
    ifYouFind: "Count the skills. Two to all, plus three each to three separate assassin skills on one claw, is the jackpot. Add the two sockets and the resistance and it is a top trapsin weapon."
  },
  {
    slug: "white-ring",
    name: "Ring",
    title: "White Ring",
    alias: "hacked absorb ring",
    quality: "normal",
    type: "",
    sprite: "img/ring.png",
    proof: "research/reference-screenshots/white-ring.png",
    illicit: "Hacked",
    tooltip: [
      "100% Faster Run/Walk",
      "100% Increased Attack Speed",
      "Adds 63-127 Damage",
      "20% Life stolen per hit",
      "Fire Absorb 96%",
      "Lightning Absorb 96%",
      "Cold Absorb 96%"
    ],
    rarityTier: "Mythic",
    obscurity: 5,
    why: "A plain white ring with no name and no requirements, carrying the best absorb in the game three times over. Ninety six percent taken off fire, lightning and cold at once, with a hundred faster run and a hundred attack speed alongside. No legitimate ring rolls any of this. On the old realms a White Ring made a dueler nearly immune to elements, which is exactly why it was contraband gold.",
    history: "The White Ring came off open Battle.net, where the client could build items with impossible stats. Import and dupe bugs carried it onto the closed realms where real trading happened, and for years it was one of the most coveted duel items nobody could legally own. In 2003 Blizzard's great purge caught up with it, closing tens of thousands of accounts and disabling their CD keys, wiping almost all of the bugged and hacked stock in a single sweep. The few White Rings still shown off are the ones that slipped the net. It has no place in the loot table and never did.",
    ifYouFind: "You cannot, not honestly. A no-requirement ring with triple absorb is a hacked item. Using one now gets an account banned, not rich."
  },
  {
    slug: "ith",
    grid: [2, 3],
    sockets: 6,
    fill: ["img/rainbow-facet.png", "img/rainbow-facet.png", "img/socketables/rune-ohm.png", "img/socketables/rune-ohm.png", "img/socketables/rune-ohm.png", "img/socketables/rune-ohm.png"],
    filled: true,
    fillName: "Ith",
    name: "Beserker Axe",
    title: "Ith",
    alias: "the item hack's signature",
    quality: "normal",
    type: "",
    sprite: "img/berserker-axe.png",
    proof: "research/reference-screenshots/ith-berserker-axe.png",
    illicit: "Hacked",
    tooltip: [
      { t: "'OhmOhmOhmOhm'", c: "gold" },
      { t: "One-Hand Damage: 211 to 617", c: "white" },
      { t: "Required Dexterity: 49", c: "white" },
      { t: "Required Strength: 128", c: "white" },
      { t: "Required Level: 64", c: "white" },
      { t: "Axe Class - Very Fast Attack Speed", c: "white" },
      "Indestructible",
      "+2 to All Skills",
      "50% Increased Attack Speed",
      "20% Faster Hit Recovery",
      "+480% Enhanced Damage",
      "4% Mana stolen per hit",
      "Hit Blinds Target +33",
      "All Resistances +76",
      "Ethereal (Cannot be Repaired), Socketed (6)"
    ],
    rarityTier: "Mythic",
    obscurity: 5,
    why: "Count how many of these lines cannot exist. Two to all skills, four hundred eighty enhanced damage, seventy six to all resistance, ethereal and indestructible together, and six sockets carrying four Ohm runes and two rainbow facets, all on a plain axe. No legitimate item rolls half of it. Ith is the fingerprint of the old item hack, one impossible stat block stamped onto whatever base the editor felt like.",
    history: "In the early years, open Battle.net let the client edit items freely, and import bugs ferried those edited items onto the closed realms where they traded as real. A whole wave of them shared one giveaway name, Ith, and one impossible stat block, pasted onto swords, bows, axes, anything. They were the loudest proof that part of the closed-realm economy was never legitimate. Purges removed them, and they cannot exist in the modern game.",
    ifYouFind: "You will only see one in an old screenshot. Ith is a hacked item, not a drop, and it is the same template on every base it was stamped onto."
  },
  {
    slug: "ogre-gauntlets",
    name: "Ogre Gauntlets",
    alias: "hacked god gloves",
    quality: "normal",
    type: "Gloves",
    sprite: "img/ogre-gauntlets.png",
    proof: "research/reference-screenshots/ogre-gauntlets.png",
    illicit: "Hacked",
    grid: [2, 2],
    tooltip: [
      { t: "Defense: 62", c: "white" },
      { t: "Durability: 23 of 24", c: "white" },
      { t: "Required Strength: 186", c: "white" },
      { t: "Required Level: 64", c: "white" },
      "100% Increased Attack Speed",
      "100% Faster Hit Recovery",
      "Adds 63-127 Damage",
      "15% Life stolen per hit",
      "+90 to Dexterity",
      "+90 to Vitality",
      "All Resistances +100"
    ],
    rarityTier: "Mythic",
    obscurity: 5,
    why: "A plain white pair of gloves, no name, no prefix, wearing stats the slot cannot hold. A hundred attack speed and a hundred hit recovery, ninety dexterity, ninety vitality, a full hundred to every resistance, and a weapon's damage roll bolted on. Hold each line against what gloves actually roll and every one is over the ceiling. It is the White Ring's edit on a different slot.",
    history: "Same origin as the White Ring. Open Battle.net let the client build items with any values it liked, and import bugs carried them onto the closed realms to trade as legitimate. The hack was never subtle. It pasted maxed and impossible stats onto whatever base it wanted, gloves included. The 2003 purge that wiped most of the bugged stock caught these too, and the modern game cannot make one.",
    ifYouFind: "You cannot, and the numbers say so at a glance. A white glove with a hundred all-resistance and weapon damage was typed in, not dropped. Wearing one now ends in a ban, not a fortune."
  },
  {
    slug: "hex-charm",
    name: "Hexing Small Charm of Immolating Arrow",
    title: "Hex Charm",
    alias: "hacked +90 stat charm",
    quality: "magic",
    type: "",
    sprite: "img/small-charm.png",
    proof: "research/reference-screenshots/hex-charm.png",
    illicit: "Hacked",
    tooltip: [
      { t: "Keep in Inventory to Gain Bonus", c: "white" },
      { t: "Required Level: 42", c: "white" },
      "+90 to Strength",
      "+90 to Dexterity",
      "+90 to Vitality"
    ],
    rarityTier: "Mythic",
    obscurity: 5,
    why: "A small charm gives one small bonus. This one gives ninety strength, ninety dexterity and ninety vitality out of a single inventory square. The name is a real magic charm's, with numbers no charm can roll bolted underneath. A row of these turned any character into something the game was never built to allow.",
    history: "Hex charms came from the same item-editing era as the White Ring and the Ith weapons. On open Battle.net the client could write any value into an item, and bugs ferried them onto the closed realms. A charm was the perfect smuggler: tiny, stackable, and easy to hide in an inventory full of legitimate ones. They were purged, and no charm rolls like this.",
    ifYouFind: "Ninety to a stat on a small charm is a hacked value, full stop. It is contraband, not a lucky roll."
  },
  {
    slug: "guid-needle",
    grid: [2, 4],
    fill: ["img/jewel.png", "img/jewel.png"],
    filled: true,
    name: "Grim Needle",
    alias: "the bow nobody has seen in years",
    quality: "rare",
    type: "Matriarchal Bow",
    sprite: "img/matriarchal-bow.png",
    proof: "research/reference-screenshots/guid-needle-bow.png",
    tooltip: [
      { t: "(Amazon Only)", c: "white" },
      { t: "Required Strength: 70", c: "white" },
      { t: "Required Level: 66", c: "white" },
      { t: "Bow Class - Very Fast Attack Speed", c: "white" },
      "+1 to Bow and Crossbow Skills (Amazon Only)",
      "+50% Increased Attack Speed",
      "+600% Enhanced Damage",
      "+3 to Maximum Damage",
      "+172 to Attack Rating",
      "Requirements -20%",
      "Socketed (2)"
    ],
    rarityTier: "Mythic",
    obscurity: 5,
    why: "The bow people still ask about. A rare Matriarchal Bow, self found and self upped from an Ashwood, socketed with two forty-fifteen jewels, the best jewels in the game. A bow skill, fifty attack speed, and an enhanced-damage number that reads like a typo, all under a yellow name. Its owner sold it to a private buyer off-site years ago and has not seen it since. Faith, the runeword everyone points to, is a newspawn's eyecandy next to it.",
    history: "The story comes from the owner. Self found, self upped, which is why the level requirement sits so high for a bow, since it dropped as an Ashwood and was cubed up. The two sockets hold forty-fifteen Jewels of Fervor, so the displayed stats are the bow and the jewels together. It changed hands once, to a private buyer off the trade forums, and dropped out of sight. People still ask who has it, and even the owner only assumes it is the man who bought it.",
    ifYouFind: "Do the math backward. Strip the two forty-fifteen jewels and what remains is the base rare, which is the part collectors argue over. The legend is the whole package: the roll, the self-found claim, and a bow nobody has laid eyes on in years."
  },
  {
    slug: "carrion-song",
    name: "Carrion Song",
    alias: "classic rare bow",
    quality: "rare",
    type: "Gothic Bow",
    era: "Classic",
    sprite: "img/rare-bow.png",
    proof: "research/reference-screenshots/carrion-song.png",
    tooltip: [
      { t: "Two-Hand Damage: 30 to 163", c: "white" },
      { t: "Required Dexterity: 96", c: "white" },
      { t: "Required Strength: 76", c: "white" },
      { t: "Required Level: 26", c: "white" },
      { t: "Bow Class - Very Fast Attack Speed", c: "white" },
      "Requirements -20%",
      "+1 to Amazon Skill Levels",
      "+132 to Attack Rating",
      "+18 to Maximum Damage",
      "Increased Attack Speed"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "A yellow bow with a random name, and in classic Diablo 2 that was the dream. Before runewords, before Windforce, a rolled rare like this was the bowazon endgame. A class skill on a bow you can hold at level 26, very fast attack speed, a stack of attack rating and max damage. The name means nothing. The game bolts two words together at random. The rolls are everything, and rolls like these almost never landed.",
    history: null,
    ifYouFind: "Before runewords and before Windforce, a rolled rare like this was the bowazon endgame. The name is two random words. The lines under it are the whole item, and in classic they almost never landed together."
  },
  {
    slug: "phoenix-hybrid",
    grid: [2, 3],
    sockets: 4,
    fill: ["img/socketables/rune-vex.png", "img/socketables/rune-vex.png", "img/socketables/rune-lo.png", "img/socketables/rune-jah.png"],
    filled: true,
    name: "Phoenix",
    alias: "hacked hybrid runeword",
    quality: "runeword",
    type: "Monarch",
    sprite: "img/monarch.png",
    proof: "research/reference-screenshots/phoenix-hybrid-hacked.png",
    illicit: "Hacked",
    tooltip: [
      { t: "'VexVexLoJah'", c: "gold" },
      { t: "Defense: 171", c: "white" },
      { t: "Chance to Block: 62%", c: "white" },
      { t: "Smite Damage: 12 to 34", c: "white" },
      { t: "Durability: 98 of 98", c: "white" },
      { t: "Required Strength: 166", c: "red" },
      { t: "Required Level: 66", c: "red" },
      "+2 to All Skills",
      "36% Faster Cast Rate",
      "65% Faster Hit Recovery",
      "15% Enhanced Defense",
      "+260 Defense vs. Missile",
      "+22 to Vitality",
      "+60 to Life",
      "+112 to Mana",
      "+6% to Maximum Lightning Resist",
      "+10% to Maximum Fire Resist",
      "+8 Magic Absorb",
      "Increase Maximum Durability 16%",
      "Socketed (4)"
    ],
    rarityTier: "Mythic",
    obscurity: 5,
    why: "It borrows a real runeword's name and none of its stats. Phoenix is Vex Vex Lo Jah, and a real one carries a Redemption aura, minus enemy fire resistance and a wall of fire damage. This one has two to all skills, thirty six faster cast and sixty five faster hit recovery instead, a blend no runeword produces. It is a hacked item hiding behind a legitimate name, built to pass as the real thing.",
    history: "Hybrid runewords were among the sneakiest hacks. Take a valid runeword name, swap the stat block for a better mix, and it slips through trades that check the runes but not the numbers. They came from the same open-realm editing that made the White Ring and Ith. The tell is the stats: hold them against the real recipe and they never line up.",
    ifYouFind: "Look up the runeword. If the runes read Phoenix but the stats are not Phoenix, it is a hybrid hack. The name is real, the item is not."
  },
  {
    slug: "imp-shank",
    name: "Imp Shank",
    alias: "1.06 tri-res boots",
    quality: "rare",
    type: "Chain Boots",
    sprite: "img/rare-boots.png",
    proof: "research/reference-screenshots/imp-shank.png",
    era: "Classic",
    lastPatch: "1.06",
    grid: [2, 2],
    tooltip: [
      { t: "Defense: 8", c: "white" },
      { t: "Durability: 79 of 80", c: "white" },
      { t: "Required Strength: 30", c: "white" },
      { t: "Required Level: 41", c: "white" },
      "+30% Faster Run/Walk",
      "+20% Faster Hit Recovery",
      "+18 to Strength",
      "Lightning Resist +49%",
      "Fire Resist +35%",
      "Poison Resist +22%"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "Boots are a run-speed slot. This pair, off patch 1.06, also carries faster hit recovery, a mod that lives on armor and helms and never rolls on feet today. Stack eighteen strength and three resistances on top and it is doing four jobs at once. The faster hit recovery is the tell. It dates the boots to early Classic, where the affix tables let a roll like this through.",
    history: null,
    ifYouFind: "The faster hit recovery is what makes it more than a good rare. No boot the game builds now can carry it, so a pair that does was made a very long time ago."
  },
  {
    slug: "iceblink",
    name: "Iceblink",
    alias: "the freeze-lock armor",
    quality: "unique",
    type: "Splint Mail",
    sprite: "img/uniques/iceblink.webp",
    proof: "research/reference-screenshots/iceblink.png",
    tooltip: [
      { t: "Defense: 172", c: "white" },
      { t: "Durability: 30 of 30", c: "white" },
      { t: "Required Strength: 51", c: "white" },
      { t: "Required Level: 22", c: "white" },
      "Freezes target",
      "+80% Enhanced Defense",
      "Cold Resist +30%",
      "Magic Damage Reduced by 1",
      "+4 to Light Radius"
    ],
    rarityTier: "Uncommon",
    obscurity: 4,
    why: "A level twenty-two unique nobody stops for, and one of the only body armors in the game that freezes what you hit. A frozen enemy cannot attack, so a melee twink or an Act 2 merc wearing this walks through Normal untouched. Anything killed while frozen shatters and leaves no corpse, which quietly denies the other side every corpse it wanted. It costs a chipped gem and does something almost nothing else can.",
    history: null,
    ifYouFind: "Nobody chases the numbers. It is wanted for a single line that freezes half of Normal in place, and the roll barely matters to that."
  },
  {
    slug: "grim-fist",
    name: "Grim Fist",
    alias: "+2 skill javazon gloves",
    quality: "rare",
    type: "Light Gauntlets",
    sprite: "img/light-gauntlets.png",
    proof: "research/reference-screenshots/grim-fist.png",
    tooltip: [
      { t: "Defense: 13", c: "white" },
      { t: "Durability: 16 of 18", c: "white" },
      { t: "Required Strength: 45", c: "white" },
      { t: "Required Level: 36", c: "white" },
      "+2 to Javelin and Spear Skills (Amazon Only)",
      "+20% Increased Attack Speed",
      "3% Mana stolen per hit",
      "3% Life stolen per hit",
      "+13% Enhanced Defense"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "Gloves are an afterthought slot, which is exactly why this pair hides. Two to the whole javelin and spear tree, then twenty attack speed and a maxed three and three life and mana leech on top. A javazon gets a skill level here that no unique glove can offer, the leech to stay alive, and the speed to throw faster. It reads as a junk yellow. It is a build-defining glove for the right amazon.",
    history: null,
    ifYouFind: "Class skills on gloves only ever come from a rare. That one line is how a throwaway slot ends up outranking every orange option a javazon could wear."
  },
  {
    slug: "glitched-arreats",
    grid: [2, 2],
    sockets: 1,
    name: "Arreat's Face",
    title: "Glitched Arreat's Face",
    alias: "the Zod-bug antique",
    quality: "unique",
    type: "Slayer Guard",
    sprite: "img/arreats-face.png",
    proof: "research/reference-screenshots/glitched-arreats-face.png",
    illicit: "Bugged",
    tooltip: [
      { t: "Defense: 641", c: "white" },
      { t: "(Barbarian Only)", c: "red" },
      { t: "Required Strength: 108", c: "white" },
      { t: "Required Level: 42", c: "white" },
      "Indestructible",
      "+2 to Combat Skills (Barbarian Only)",
      "+2 to Barbarian Skill Levels",
      "+30% Faster Hit Recovery",
      "+30% Enhanced Damage",
      "20% Bonus to Attack Rating",
      "+60 to Attack Rating",
      "5% Life stolen per hit",
      "+199% Enhanced Defense",
      "+29 to Strength",
      "+29 to Dexterity",
      "All Resistances +30",
      "Ethereal (Cannot be Repaired), Socketed (1)"
    ],
    rarityTier: "Mythic",
    obscurity: 5,
    why: "A normal Arreat's Face cannot be indestructible, and cannot show six hundred defense. This one is both. It is an ethereal Arreat's that a Zod rune locked permanently indestructible, keeping the ethereal defense bonus with no durability left to lose, and the defense was doubled again by the old ethereal socketing bug. The current game cannot produce it: eternal, ethereal, and armored past its own ceiling.",
    history: "In patch 1.09, socketing a Zod rune into an ethereal item without bonus durability locked it indestructible while keeping the ethereal bonus, an interaction later patches changed. Pair it with the ethereal socketing bug that doubled defense, and you get pieces like this, eternal and stronger than the item was ever meant to be. Collectors call them antiques. They were made in a version of the game that no longer exists and cannot be remade.",
    ifYouFind: "An indestructible ethereal unique with defense above its own cap is a relic of the old patches. A collector's antique, not something you drop or build today."
  },
  {
    slug: "windforce-08",
    name: "Windforce",
    title: "1.08 Windforce",
    alias: "+35 Dexterity, pre-nerf",
    quality: "unique",
    type: "Hydra Bow",
    sprite: "img/hydra-bow.png",
    lastPatch: "1.08",
    tooltip: [
      { t: "Two-Hand Damage: 35 to 547", c: "white" },
      { t: "Required Level: 73", c: "white" },
      { t: "Required Strength: 134", c: "white" },
      { t: "Required Dexterity: 167", c: "white" },
      "+250% Enhanced Damage",
      "+309 to Maximum Damage (Based on Character Level)",
      "20% Increased Attack Speed",
      "7% Mana stolen per hit",
      "Heal Stamina Plus 30%",
      "+35 to Dexterity",
      "Knockback"
    ],
    rarityTier: "Mythic",
    obscurity: 4,
    why: "Windforce is the bow every bowazon wanted, the two-hander with the highest maximum damage in the game and a knockback that kept everything off you. This is the version that stopped dropping in 2001. Today's Windforce rolls five dexterity. This one rolls thirty five. Thirty extra dexterity is free attack rating and block that no modern copy can reach, on the best bow base there is.",
    history: "For years the Windforce was the endgame bowazon weapon, the drop that made the build. In its first year it carried plus thirty five dexterity. Patch 1.09 cut that to plus five and handed it strength instead. Because an item's stats freeze the moment it is created, every Windforce made before the patch kept its thirty five, and none made since can match it. Collectors trade these as their own tier and call them 08 Windforces.",
    ifYouFind: "The dexterity line is the whole tell. Thirty five means it was born before patch 1.09; five means it dropped any time in the two decades since."
  },
  {
    slug: "arkaines-valor",
    sockets: 1,
    name: "Arkaine's Valor",
    alias: "legacy Arkaine's",
    quality: "unique",
    type: "Balrog Skin",
    sprite: "img/arkaines-valor.png",
    proof: "research/reference-screenshots/arkaines-valor.png",
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
      "Fire Resist +60%",
      "Socketed (1)"
    ],
    rarityTier: "Mythic",
    lastPatch: "1.09",
    obscurity: 4,
    why: "This is not the Arkaine's Valor that drops today. This is the old one. Before the nerf it gave two and a half vitality and two life for every character level, plus two to all skills, indestructible, and fire resist, all on one body armor. At level ninety-nine that is hundreds of free vitality and life. The current version was cut down hard, so a copy like this can no longer drop.",
    history: "Arkaine's Valor was so strong before the 1.10 patch that it became one of the most duped armors in the game. Blizzard gutted the life and vitality bonus and left the weaker version dropping in its place. The old copies were never deleted, only frozen out of the loot table. The ones still around are relics from a version of Diablo 2 that no longer exists, and they thin out every year as old accounts expire.",
    ifYouFind: "Every copy in the game is older than the 1.10 patch. Nothing has minted a new one in over twenty years, so the supply only shrinks as old accounts die off."
  },
  {
    slug: "legacy-hellfire-torch",
    name: "Hellfire Torch",
    alias: "legacy Torch (25% Firestorm)",
    quality: "unique",
    type: "Large Charm",
    sprite: "img/uniques/legacy-hellfire-torch.webp",
    tooltip: [
      { t: "Required Level: 75", c: "white" },
      "25% Chance to Cast Level 10 Firestorm on Striking",
      "+3 to Sorceress Skills",
      "+20 to All Attributes",
      "All Resistances +20",
      "+8 to Light Radius",
      "Level 30 Hydra (10 Charges)"
    ],
    rarityTier: "Mythic",
    lastPatch: "1.12",
    labels: [
      { k: "source", v: "Uber quest" }
    ],
    obscurity: 4,
    why: "Everyone knows the Hellfire Torch. Almost nobody has seen this one. The current Torch casts Firestorm five percent of the time. The old one cast it twenty-five. Five times the fire, on a charm that was already an endgame staple. It stopped dropping in this form, so every 25 percent Torch is a survivor from before the nerf.",
    history: "The Torch came from the Pandemonium Event added in patch 1.11, and for its first years it cast Firestorm on a quarter of your hits. That was a wall of free fire on a charm people fought the Ubers to earn. Patch 1.13 cut it to five percent. The old copies kept their twenty-five, so the legacy Torch became a collector's version of an item almost everyone already owns.",
    ifYouFind: "The Firestorm line dates it. Twenty five percent is the pre-1.13 version, sitting in the same stash tab as its five-percent descendant and looking almost identical."
  },
  {
    slug: "highlords-08",
    name: "Highlord's Wrath",
    title: "1.08 Highlord's Wrath",
    alias: "faster run, no deadly strike",
    quality: "unique",
    type: "Amulet",
    sprite: "img/amulet.png",
    lastPatch: "1.08",
    tooltip: [
      { t: "Required Level: 65", c: "white" },
      "+30% Faster Run/Walk",
      "+1 to All Skills",
      "Lightning Resist +35%",
      "Adds 5-20 lightning damage"
    ],
    rarityTier: "Mythic",
    obscurity: 5,
    why: "The Highlord's Wrath everyone runs is a plus one skills, twenty attack speed, deadly strike amulet. This one keeps the skill and trades the rest for thirty percent faster run and walk. It is the only Highlord's in the game with run speed on it. Weaker by every practical measure, which is exactly why the 08 version is a collector's oddity rather than a chase.",
    history: "Patch 1.09 rebuilt Highlord's Wrath into the amulet it is now, stripping the faster run and adding the attack speed and the signature deadly strike. The pre-patch copies kept the run speed and never gained the rest. It is the only Highlord's in the game with faster run and walk, and the absence of deadly strike dates it on sight.",
    ifYouFind: "A rare case where the old version is worse, and collectors want it anyway. The value is the fingerprint, a Highlord's from before the mods that made it famous."
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
      "7% Life stolen per hit",
      "Slows Target by 10%",
      "+2 to Mana after each Kill",
      "+15 to Strength",
      "-3 to Light Radius"
    ],
    rarityTier: "Very Rare",
    lastPatch: "1.09",
    obscurity: 5,
    why: "Look at the name. That belt does not exist anymore. The stats are an ordinary Nosferatu's Coil, attack speed and life steal, nothing a current player would chase. What makes it a collector piece is the name itself. Nothing has dropped with it in over twenty years.",
    history: "In the 1.10 patch Blizzard reshuffled the unique item files. The belt that had been Nosferatu's Coil was renamed Siggard's Stealth, and a new Nosferatu's Coil started dropping in its place with the same stats. Every existing copy changed its name on the spot. So a Siggard's Stealth is proof of age. It is a Nosferatu's Coil from before the patch, wearing a name the game no longer hands out.",
    ifYouFind: "The stats are an ordinary Nosferatu's Coil. The name is the artifact, a label the game stopped printing the day the 1.10 files shipped."
  },
  {
    slug: "crown-of-ages",
    name: "Crown of Ages",
    alias: "perfect CoA",
    quality: "unique",
    type: "Corona",
    sprite: "img/uniques/crown-of-ages.webp",
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
    rarityTier: "Very Rare",
    obscurity: 2,
    why: "Everyone knows the helm. Almost nobody prices the roll. A plain Crown of Ages is a fine helmet. This one has two sockets, fifteen percent physical damage reduction, and thirty all resistance, the top of every line it can roll. That stack is worth many times a low one. Same gold name, a completely different item, and the difference is invisible unless you read the numbers.",
    history: null,
    ifYouFind: "Two helms wear one gold name. The distance between a two-socket, fifteen-reduction roll and a plain one is far wider than the shared title lets on."
  },
  {
    slug: "brimstone-barb",
    name: "Brimstone Barb",
    alias: "460 ED eth thrower",
    quality: "rare",
    type: "Stygian Pilum",
    sprite: "img/stygian-pilum.png",
    proof: "research/reference-screenshots/brimstone-barb.png",
    tooltip: [
      { t: "Throw Damage: 190 to 616", c: "white" },
      { t: "One-Hand Damage: 136 to 528", c: "white" },
      { t: "Quantity: 90", c: "white" },
      { t: "Required Dexterity: 102", c: "white" },
      { t: "Required Strength: 108", c: "white" },
      { t: "Required Level: 68", c: "white" },
      { t: "Javelin Class - Very Fast Attack Speed", c: "white" },
      "+40% Increased Attack Speed",
      "+460% Enhanced Damage",
      "+20 to Minimum Damage",
      "+206 to Attack Rating",
      "Adds 112-133 fire damage",
      "Replenishes quantity",
      "Ethereal (Cannot be Repaired)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "Throwing builds live and die on their weapon, and this rare beats the uniques. Four hundred sixty enhanced damage on a javelin is more raw damage than the named throwers carry. It is ethereal, so the base climbs again, and that would normally kill a throwing weapon because you cannot repair it. This one replenishes its own stack, refilling to full on its own, so it never runs dry. A yellow javelin that outdamages everything gold in the slot, and nothing on the name warns you.",
    history: null,
    ifYouFind: "Throw it, never melee it. Ethereal cannot be repaired, and only the thrown stack refills. The enhanced damage roll is what makes it."
  },
  {
    slug: "viper-casque",
    name: "Viper Casque",
    alias: "socketed rare helm",
    quality: "rare",
    type: "Bone Helm",
    sprite: "img/viper-casque.png",
    proof: "research/reference-screenshots/viper-casque-bone-helm.png",
    era: "Classic",
    tooltip: [
      { t: "Defense: 34", c: "white" },
      { t: "Durability: 39 of 40", c: "white" },
      { t: "Required Strength: 25", c: "white" },
      { t: "Required Level: 46", c: "white" },
      "+20% Faster Hit Recovery",
      "+12 to Dexterity",
      "+88 to Life",
      "+38 to Mana",
      "Cold Resist +28%",
      "Lightning Resist +32%",
      "Socketed (1)"
    ],
    rarityTier: "Very Rare",
    obscurity: 3,
    why: "A rare helm that quietly covers four needs at once. Twenty faster hit recovery, eighty eight life, two resistances, and an open socket, all on a Bone Helm a caster or hybrid can wear. No single line screams, which is why it gets scrolled past, but the sum holds its own against the uniques in the slot, and the socket lets you tune it further.",
    history: null,
    ifYouFind: "The socket is doing the extra work here, a perfect ruby dropped in for the life. A modest yellow helm plus one gem becomes a build piece the tooltip never advertised."
  },
  {
    slug: "fiend-casque",
    grid: [2, 2],
    sockets: 2,
    name: "Fiend Casque",
    alias: "godly assassin circlet",
    quality: "rare",
    type: "Diadem",
    sprite: "img/diadem.png",
    proof: "research/reference-screenshots/fiend-casque-diadem.png",
    tooltip: [
      { t: "Defense: 51", c: "white" },
      { t: "Durability: 20 of 20", c: "white" },
      { t: "Required Level: 79", c: "white" },
      "+2 to Assassin Skill Levels",
      "+30% Faster Run/Walk",
      "+30% Increased Attack Speed",
      "+20% Faster Cast Rate",
      "+80% Enhanced Damage",
      "99% Bonus to Attack Rating (Based on Character Level)",
      "Poison Length Reduced by 75%",
      "Socketed (2)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "The assassin's dream circlet. Two to all assassin skills, thirty faster run, thirty attack speed, twenty faster cast, and two open sockets, all on the best caster-helm base in the game. A rare circlet is the only helm that stacks a class-skill bonus with three separate kinds of speed and sockets to spare, and no unique assassin helm comes near it.",
    history: null,
    ifYouFind: "Count the speed lines. Run, attack and cast all maxed on one circlet, plus two class skills and two sockets, is a spread the game almost never rolls together on a helm."
  },
  {
    slug: "pain-hood",
    name: "Pain Hood",
    alias: "2/20 druid circlet",
    quality: "rare",
    type: "Tiara",
    sprite: "img/tiara.png",
    proof: "research/reference-screenshots/pain-hood-tiara.png",
    tooltip: [
      { t: "Defense: 49", c: "white" },
      { t: "Durability: 25 of 25", c: "white" },
      { t: "Required Level: 67", c: "white" },
      "+2 to Druid Skill Levels",
      "+20% Faster Run/Walk",
      "+20% Faster Cast Rate",
      "+16 to Dexterity",
      "Cold Resist +17%",
      "Lightning Resist +55%",
      "Fire Resist +17%",
      "Poison Resist +17%"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "The best caster helm for a druid is often not a unique but a rare circlet like this. Two to all druid skills and twenty faster cast are the two lines every caster hunts, and here they arrive with run speed, dexterity and all four resistances on one Tiara. No unique druid helm matches the spread. A random yellow name hiding one of the best helms a storm or fire druid can wear.",
    history: null,
    ifYouFind: "A rare circlet is the only place a druid gets two skills and cast rate on one helm. No unique in the slot competes, and the yellow name is why nobody expects it."
  },
  {
    slug: "bul-kathos-08",
    name: "Bul-Kathos' Wedding Band",
    title: "1.08 Bul-Kathos' Wedding Band",
    alias: "fixed 4% leech, no life line",
    quality: "unique",
    type: "Ring",
    sprite: "img/ring.png",
    lastPatch: "1.08",
    tooltip: [
      { t: "Required Level: 58", c: "white" },
      "+1 to All Skills",
      "4% Life stolen per hit",
      "+50 Maximum Stamina"
    ],
    rarityTier: "Mythic",
    obscurity: 5,
    why: "The Bul-Kathos ring is famous for one line, plus one to all skills. The leech underneath it is what changed. Today it rolls three to five percent, and the ring also carries life that scales with your level. In patch 1.08 the leech was a fixed four percent and there was no life line at all. A modern ring that rolls three percent is worse at leeching than every 08 copy ever made.",
    history: "Almost nothing rolled before 1.09. Uniques spawned with the same stats every time, so finding one was finding the only version of it. Patch 1.09 went through the list and gave most uniques a range to roll in, which is where Bul-Kathos picked up its three to five percent leech and its per-level life. The plus one skills is identical on both, so the whole difference hides in the lines nobody reads.",
    ifYouFind: "The leech line dates it. Four percent flat, with no life underneath, is the 08 ring. Anything showing life based on character level is the modern one."
  },
  {
    slug: "eagle-loop",
    name: "Eagle Loop",
    alias: "the best melee ring",
    quality: "crafted",
    type: "Ring",
    sprite: "img/ring.png",
    proof: "research/reference-screenshots/eagle-loop-ring.png",
    tooltip: [
      { t: "Required Level: 88", c: "white" },
      "+115 to Attack Rating",
      "3% Life stolen per hit",
      "+23 to Strength",
      "+15 to Dexterity",
      "+59 to Life"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "The melee answer to the caster's dream ring. It rolls the exact five lines a physical build wants, attack rating, life steal, strength, dexterity and life, all high, on one ring. The famous unique rings give a skill or an aura. For a pure melee character this stat block does more, and it wears no gold name to tip anyone off.",
    history: null,
    ifYouFind: "This is what people mean by the best melee ring in the game. Every line feeds a physical build, and the game has to land all five high at once, which is why a clean one is a genuine chase."
  },
  {
    slug: "havoc-circle",
    name: "Havoc Circle",
    alias: "10 FCR caster ring",
    quality: "rare",
    type: "Ring",
    sprite: "img/ring.png",
    proof: "research/reference-screenshots/havoc-circle-ring.png",
    tooltip: [
      { t: "Required Level: 66", c: "white" },
      "+10% Faster Cast Rate",
      "+16 to Strength",
      "+40 to Life",
      "Cold Resist +26%",
      "Lightning Resist +16%",
      "Fire Resist +30%"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "The caster's rare ring. Ten faster cast is the ceiling a ring can roll, and casters build their whole gear around cast breakpoints, so a ring that maxes it while also handing over forty life, sixteen strength and three resistances is a quiet endgame piece. The famous caster rings give a skill. This gives the breakpoint and the survivability a skill ring cannot.",
    history: null,
    ifYouFind: "Ten faster cast is the cap on a ring, so that line is as good as it gets. The tri-res and the life are what separate a chase caster ring from a plain one that only hits the breakpoint."
  },
  {
    slug: "raven-spiral",
    name: "Raven Spiral",
    alias: "LLD twink ring",
    quality: "rare",
    type: "Ring",
    sprite: "img/ring.png",
    proof: "research/reference-screenshots/raven-spiral-ring.png",
    tooltip: [
      { t: "Required Level: 14", c: "white" },
      "+148 to Attack Rating",
      "7% Mana stolen per hit",
      "6% Life stolen per hit",
      "+13 to Dexterity",
      "All Resistances +16",
      "+1 to Mana after each Kill"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "A level fourteen ring that stacks what a low-level dueler cannot get anywhere else. Dual leech, a hundred and forty eight attack rating, thirteen dexterity and all resistances, all under a requirement a twink can wear. No unique ring at that level comes close, and the low-level dueling market pays for exactly this spread.",
    history: null,
    ifYouFind: "The value is the bracket, not the raw numbers. At level fourteen this covers leech, accuracy and resistance in one slot, a big chunk of a twink's shopping list on a single ring."
  },
  {
    slug: "dread-grip",
    name: "Dread Grip",
    alias: "tri-res leech ring",
    quality: "rare",
    type: "Ring",
    sprite: "img/ring.png",
    proof: "research/reference-screenshots/dread-grip-ring.png",
    tooltip: [
      { t: "Required Level: 18", c: "red" },
      "7% Mana stolen per hit",
      "6% Life stolen per hit",
      "Cold Resist +34%",
      "Lightning Resist +29%",
      "Fire Resist +32%",
      "18% Better Chance of Getting Magic Items"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "A rare ring that solves resistances and leech in one slot at a low requirement. Dual leech, thirty-plus in all three big resistances, and a slice of magic find, at level eighteen. Tri-res on a ring is a hard roll by itself, and pairing it with leech and magic find is a combination the game almost never hands out.",
    history: null,
    ifYouFind: "Tri-res is the hard part on any ring. Dual leech and magic find riding along at a level eighteen requirement is what pushes it into the dueling and magic-find twink markets."
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
    rarityTier: "Rare",
    obscurity: 4,
    why: "Nobody looks twice at Wisp Projector. It reads like a novelty ring with a pile of charges. Then you notice the two lines that matter: lightning absorb up to twenty percent, and magic find up to twenty percent. Lightning is the deadliest damage in the game at the high end, so that absorb is worth real money, and the magic find rides along for free. The charges are a footnote. The two rolls are the item.",
    history: null,
    ifYouFind: "The charges are a decoy. Two lines carry the whole price, lightning absorb and magic find, and lightning is the damage that actually kills you at the high end."
  },
  {
    slug: "doom-stalker",
    name: "Doom Stalker",
    alias: "rare leech boots",
    quality: "crafted",
    type: "Battle Boots",
    sprite: "img/battle-boots.png",
    proof: "research/reference-screenshots/doom-stalker.png",
    tooltip: [
      { t: "Defense: 46", c: "white" },
      { t: "Durability: 11 of 18", c: "white" },
      { t: "Required Strength: 96", c: "white" },
      { t: "Required Level: 61", c: "white" },
      "+30% Faster Run/Walk",
      "+10% Faster Hit Recovery",
      "1% Life stolen per hit",
      "+20 to Life",
      "Replenish Life +10",
      "Lightning Resist +40%",
      "Fire Resist +40%"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "The slot most players fill with a unique and forget. This rare does more. Thirty faster run and walk, forty lightning and forty fire, twenty life with a little replenish, and the part people forget boots can even roll: life steal. Speed, two big resists, life and leech in one slot almost never land together. The leech here is one percent. A perfect roll pushes it higher.",
    history: null,
    ifYouFind: "Most players do not know boots can leech at all. That line is the surprise, riding on a speed-and-resist roll that would already be worth keeping without it."
  },
  {
    slug: "blackoak-shield",
    name: "Blackoak Shield",
    alias: "the patch-notes bug",
    quality: "unique",
    type: "Luna",
    sprite: "img/blackoak-shield.png",
    tooltip: [
      { t: "Defense: 372", c: "white" },
      { t: "Chance to Block: 45%", c: "white" },
      { t: "Required Strength: 100", c: "white" },
      { t: "Required Level: 61", c: "white" },
      "+200% Enhanced Defense (Based on Character Level)",
      "+50% Faster Block Rate",
      "4% Chance to Cast Level 5 Weaken when Struck",
      "Cold Absorb (Based on Character Level)",
      "+Life (Based on Character Level)",
      "Half Freeze Duration"
    ],
    rarityTier: "Uncommon",
    obscurity: 4,
    why: "Blackoak Shield is a solid block-rate shield, but its claim to fame is a line in a patch note. Its enhanced defense scales with your level, and for a while the game calculated that wrong. A copy from before patch 1.09 did not compute its own defense the way a modern one does, which makes it one of the few items whose bug is documented in Blizzard's own words.",
    history: "The official 1.09 notes read: fixed a bug where the enhanced defense for items that gained it on a per level basis was improperly calculated, such as Blackoak Shield. The same note names Hellslayer and Magewrath for their own miscalculations. It is a rare thing, an item quirk you can trace straight to a primary source instead of forum memory.",
    ifYouFind: "Most old-item stories live on hearsay. This one is printed in the patch notes, which is what makes a plain block shield worth a second look."
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
    rarityTier: "Very Rare",
    obscurity: 3,
    why: "A Herald of Zakarum is a paladin staple, so people assume they are all the same. They are not. The enhanced defense rolls from a hundred and fifty to two hundred percent, and only a two hundred is worth chasing. Punch four sockets into that one and you have one of the best shields a paladin can hold. A low roll is a leveling shield. The gap between the two is enormous, and the tooltip barely hints at it.",
    history: null,
    ifYouFind: "Two identical gold names, wildly different shields. The enhanced defense swings by fifty percent, and only the top of that range is the one paladins fight over."
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
      "Repairs 1 durability in 20 seconds"
    ],
    rarityTier: "Rare",
    labels: [
      { k: "eth" }
    ],
    obscurity: 3,
    why: "Treks are cheap. Everyone has a pair, which is exactly why the good ones hide in plain sight. The chase is an ethereal pair with maxed strength and vitality. Ethereal usually means an item wears out and dies, but Sandstorm Trek repairs itself, so the ethereal version keeps its boosted defense forever and never breaks. The same boots most players vendor, except this one is worth a pile of runes.",
    history: null,
    ifYouFind: "Ethereal is the twist. It normally dooms an item to break, but Treks repair themselves, so the ethereal pair keeps its boosted defense forever and the boots most players vendor become a chase."
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
      "9% Life stolen per hit",
      "+30% Faster Run/Walk",
      "+20 to Strength",
      "+20 to Dexterity",
      "Replenishes quantity (1 in 3 seconds)",
      "+2 to Javelin and Spear Skills (Amazon Only)"
    ],
    rarityTier: "Rare",
    labels: [
      { k: "eth" }
    ],
    obscurity: 3,
    why: "A throwing javelin most people never think about twice. The trick is what happens when it is ethereal. Ethereal boosts the damage, and for a throwing weapon that depletes that would normally be a death sentence. Titan's Revenge replenishes its own stack, so an ethereal pair throws forever at boosted damage. Two amazon skills and thirty faster run ride along. It is the javazon's quiet grail, hiding as a common gold javelin.",
    history: null,
    ifYouFind: "A throwing weapon that improves when ethereal is a contradiction, since ethereal means it depletes and cannot be repaired. This one refills its own stack, so the boost costs nothing and the plain version most people keep is the wrong one."
  },
  {
    slug: "valkyrie-wing-08",
    grid: [2, 2],
    sockets: 1,
    name: "Valkyrie Wing",
    title: "1.08 Valkyrie Wing",
    alias: "four 30% speed mods",
    quality: "unique",
    type: "Winged Helm",
    sprite: "img/winged-helm.png",
    proof: "research/reference-screenshots/valkyrie-wing-108.png",
    lastPatch: "1.08",
    tooltip: [
      { t: "Defense: 127", c: "white" },
      { t: "Durability: 34 of 40", c: "white" },
      { t: "Required Strength: 118", c: "white" },
      { t: "Required Level: 44", c: "white" },
      "+30% Faster Run/Walk",
      "+30% Increased Attack Speed",
      "+30% Faster Cast Rate",
      "+30% Faster Hit Recovery",
      "+36 Defense",
      "Socketed (1)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "The Valkyrie Wing that drops today gives run speed and amazon skills. This one, from patch 1.08, gave every speed bonus in the game at once. Thirty faster run, thirty attack speed, thirty faster cast, thirty faster hit recovery, all on one helm any class could wear. Nothing since has stacked four speed mods on a single item. It was too good, so it was rewritten.",
    history: "Patch 1.09 reworked Valkyrie Wing into the amazon helm it is now, trading the universal speed for class skills. The old 1.08 copies kept the four thirties. Like every legacy piece they live only on non-ladder, and they thin out every year. A speed stacker's relic from a version of the game that no longer exists.",
    ifYouFind: "Four separate thirty percent speed mods is the tell. That is the 1.08 helm, not the amazon one that drops now."
  },
  {
    slug: "grandfather-08",
    name: "The Grandfather",
    title: "1.08 Grandfather",
    alias: "the max-life, max-mana version",
    quality: "unique",
    type: "Colossus Blade",
    sprite: "img/colossus-blade.png",
    lastPatch: "1.08",
    tooltip: [
      { t: "Two-Hand Damage: 145 to 287", c: "white" },
      { t: "Required Level: 81", c: "white" },
      { t: "Required Strength: 189", c: "white" },
      { t: "Required Dexterity: 110", c: "white" },
      "+150% Enhanced Damage",
      "+150% Bonus to Attack Rating",
      "+175 to Life",
      "Increase Maximum Life 25%",
      "Increase Maximum Mana 25%",
      "+20 to Strength",
      "+20 to Dexterity",
      "Indestructible"
    ],
    rarityTier: "Mythic",
    obscurity: 4,
    why: "The Grandfather is a pure damage sword today. This one, from patch 1.08, was a fortress. It carried a hundred and seventy five flat life and raised your maximum life and mana by a quarter each, on top of the damage. No Grandfather made after 2001 has the maximum-life or maximum-mana lines at all. Same gold name, a completely different weapon underneath.",
    history: "Before the 1.09 rebalance the Grandfather stacked flat life, twenty five percent maximum life, and twenty five percent maximum mana. The patch stripped all three and replaced them with the per-level scaling the sword uses now. The old copies kept the survivability block, and because item stats never change after creation, that version cannot be made again. It is one of the most prized relics of the early game.",
    ifYouFind: "Look for the maximum-life and maximum-mana lines. The modern Grandfather has neither, so their presence dates the sword to before patch 1.09."
  },  {
    slug: "vampire-gaze-08",
    name: "Vampire Gaze",
    title: "1.08 Vampire Gaze",
    alias: "flat 25% damage reduced",
    quality: "unique",
    type: "Grim Helm",
    sprite: "img/uniques/vampire-gaze-08.webp",
    fill: ["img/socketables/rune-ber.png"],
    filled: true,
    tooltip: [
      { t: "'Ber'", c: "gold" },
      { t: "Defense: 252", c: "white" },
      { t: "Durability: 40 of 40", c: "white" },
      { t: "Required Strength: 58", c: "white" },
      { t: "Required Level: 63", c: "white" },
      "8% Mana stolen per hit",
      "8% Life stolen per hit",
      "+100% Enhanced Defense",
      "15% Slower Stamina Drain",
      "Damage Reduced by 33%",
      "Magic Damage Reduced by 15",
      "Socketed (1)"
    ],
    rarityTier: "Very Rare",
    lastPatch: "1.08",
    obscurity: 4,
    why: "The Vampire Gaze that drops today cuts physical damage by fifteen to twenty percent. This one, from patch 1.08, does a flat twenty five, with no cold damage cluttering the stat line. Five extra points of reduction does not sound like much until you stack it against everything else. Hardcore players chased these for years. It stopped dropping in this form long ago.",
    history: "Damage reduction was rebalanced after 1.08, and Vampire Gaze lost its fixed twenty five percent. The old copies kept it. Like every legacy item, they live only on non-ladder, and they get scarcer every year.",
    ifYouFind: "The damage-reduced line dates it. A flat twenty five percent is the 1.08 helm, five points above anything the modern version rolls, on a slot where five points is a lot. The copy above has a Ber in it, which is where the extra eight comes from."
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
    rarityTier: "Very Rare",
    labels: [
      { k: "roll", v: "Perfect" }
    ],
    obscurity: 3,
    why: "A small charm takes one inventory square. This one gives five all resistance and twenty life for that square, both maxed. It is the best defensive small charm in the game, and players hoard whole rows of them. A perfect one costs more than plenty of uniques. Most people who find a near miss never notice how far off max it is.",
    history: null,
    ifYouFind: "A four-and-eighteen looks identical at a glance and trades for a fraction. The last point on each line is where nearly all the value hides, which is the cruelty of a perfect charm."
  },
  {
    slug: "small-charm-3-20-20",
    name: "Fine Small Charm of Vita",
    alias: "3/20/20 small charm",
    quality: "magic",
    type: "",
    sprite: "img/small-charm.png",
    proof: "research/reference-screenshots/fine-small-charm-of-vita.png",
    tooltip: [
      { t: "Keep in Inventory to Gain Bonus", c: "grey" },
      { t: "Required Level: 39", c: "white" },
      "+3 to Maximum Damage",
      "+20 to Attack Rating",
      "+20 to Life"
    ],
    rarityTier: "Very Rare",
    labels: [
      { k: "roll", v: "Perfect" }
    ],
    obscurity: 2,
    why: "The melee version of the perfect small charm. Three maximum damage, twenty attack rating, twenty life, all maxed, in one square. Physical builds fill their inventory with these. The roll has to hit all three ceilings at once, which almost never happens, and that is what you pay for.",
    history: null,
    ifYouFind: "Three ceilings on one square, and the game has to hit all three at once. Miss any by a point and it falls from a small fortune to filler, which is why perfect ones get hoarded."
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
    rarityTier: "Very Rare",
    labels: [
      { k: "roll", v: "Near-perfect" }
    ],
    obscurity: 3,
    why: "A grand charm that adds a whole skill level to one of your trees is already worth keeping. One that also rolls near-max life is an endgame item. Javazons, casters and warcry barbarians build their whole inventory out of these. The skill is the base value. The life roll on top is what turns a common skiller into an expensive one.",
    history: null,
    ifYouFind: "The skill is the floor and the life is the ceiling. A whole inventory of these is how javazons, casters and warcry barbarians are actually built, one square at a time."
  },
  {
    slug: "ber-rune",
    name: "Ber Rune",
    alias: "the currency after SoJ",
    quality: "rune",
    type: "",
    sprite: "img/socketables/rune-ber.png",
    tooltip: [
      { t: "Required Level: 63", c: "white" },
      "Weapons: 20% Chance of Crushing Blow",
      "Armor, Helms, Shields: Damage Reduced by 8%"
    ],
    rarityTier: "Mythic",
    obscurity: 3,
    why: "When duping crashed the Stone of Jordan, the economy needed a unit that was harder to inflate, and it landed on high runes. The Ber became the standard. It is rare, it is needed for the best runewords, and it is small enough to price anything against. For years gear was quoted in Bers and Jahs the way it was once quoted in SoJs.",
    history: "Diablo 2's money kept dying and reincarnating. Gold was worthless, so players adopted the Stone of Jordan. Duping broke it, so the standard moved to high runes like Ber and Jah, compact and demanded by runewords. When those were duped too, trust in in-game items collapsed and the community moved its unit of account off the game entirely, into forum gold. Each currency fled to wherever the dupers could not reach. The pattern outlived the old game. When Diablo 2 Resurrected opened a fresh ladder in 2022, a duplication exploit flooded it with Bers, Jahs and Enigmas within weeks, and players filmed duped gear poofing out of their hands in real time. Twenty years apart, the same lesson: the money is only worth what the dupers have not yet reached.",
    ifYouFind: "The eight percent damage reduction is why it goes in armor, but that was never the point. For a long stretch the Ber was simply money, and the runeword use was the reason it held its worth."
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
    rarityTier: "Very Rare",
    labels: [
      { k: "roll", v: "Perfect" }
    ],
    obscurity: 3,
    why: "One jewel. Forty percent enhanced damage and fifteen percent increased attack speed, both maxed. It is the single most valuable jewel in the game, and it trades in the high rune range, Ber to Jah. A whole endgame rune for one socketable. Almost every jewel is filler. This exact roll is a small fortune, and two lines are all that separate them.",
    history: null,
    ifYouFind: "Two maxed lines separate a small fortune from a vendor jewel. There is no near-miss market here. It is forty and fifteen, or it is filler."
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
      "Adds 24-38 cold damage",
      "+5% to Cold Skill Damage",
      "-5% to Enemy Cold Resistance"
    ],
    rarityTier: "Rare",
    obscurity: 3,
    why: "A unique jewel that cuts enemy resistance and boosts your own elemental damage. There are eight versions, four elements times two triggers, and they are not equal. A perfect five-five of the right element on the level-up trigger is a caster chase. The poison ones and the death-trigger ones go for far less. Same gold name, eight very different price tags.",
    history: null,
    ifYouFind: "One gold name, eight very different price tags. Element, trigger and roll all move it, and a perfect cold level-up facet and a poison death facet share nothing but the title."
  },
  {
    slug: "iratha-finery",
    name: "Iratha's Finery",
    alias: "classic resist set",
    quality: "set",
    type: "4-Piece Set",
    era: "Classic",
    sprite: "img/crown.png",
    tooltip: [
      { t: "Required Level: 15", c: "white" },
      "+15 to Dexterity",
      "+50 Defense",
      "All Resistances +20",
      "+20% Faster Run/Walk",
      "Half Freeze Duration",
      "Poison Length Reduced by 75%"
    ],
    rarityTier: "Uncommon",
    obscurity: 4,
    why: "Four cheap set pieces, a crown, an amulet, a belt and a pair of gloves, all usable at level fifteen. In classic Diablo 2 that combination was a staple, because resistances were scarce and this stacked twenty all resistance, run speed, dexterity and freeze protection onto low-requirement gear anyone could wear. It looks like leveling filler and was a genuine resist answer for a whole era.",
    history: "Before the expansion there were almost no charms and few resist items, so a full Iratha's carried real weight in Hell, where resistance penalties bite hardest. It was common on classic characters patching resistances on a budget. Lord of Destruction buried it under runewords, charms and better uniques, and it became the leveling set people blow through without a thought.",
    ifYouFind: "The green set that mattered when the game had no better way to stack resistances. A clean marker of how far the expansion moved what even counts as filler."
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
    rarityTier: "Uncommon",
    obscurity: 2,
    why: "A seasoned player sees a set ring and amulet and moves on. That is the mistake. Worn together, the ring grants twelve attack rating for every character level. At level thirty that is hundreds of attack rating, more than a low-level character could ever get another way, and it makes a twink hit things it has no business hitting. The pieces are cheap. Knowing to pair them is the whole value.",
    history: null,
    ifYouFind: "The value lives entirely in the pairing. Worn together the ring hands a low-level character attack rating nothing else at that level can reach, the twink secret hiding inside a set most people skip."
  },
  {
    slug: "plague-bolt",
    grid: [2, 4],
    sockets: 1,
    name: "Plague Bolt",
    alias: "level-30 LLD bow",
    quality: "rare",
    type: "Gothic Bow",
    sprite: "img/rare-bow.png",
    proof: "research/reference-screenshots/plague-bolt-bow.png",
    era: "Classic",
    tooltip: [
      { t: "Two-Hand Damage: 25 to 148", c: "white" },
      { t: "Required Dexterity: 118", c: "white" },
      { t: "Required Strength: 95", c: "white" },
      { t: "Required Level: 30", c: "white" },
      { t: "Bow Class - Very Fast Attack Speed", c: "white" },
      "+2 to Amazon Skill Levels",
      "+20% Increased Attack Speed",
      "+159% Enhanced Damage",
      "+18 to Maximum Damage",
      "+104 to Attack Rating",
      "Adds 10-14 cold damage",
      "6% Mana stolen per hit",
      "Socketed (1)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "The required level thirty is the whole point. This is a level thirty dueling bow, and in that bracket a rare like this is a bowazon's endgame. Two amazon skills, twenty attack speed, a hundred and fifty nine enhanced damage and a socket, all under the level cap that defines the market. PvM players never see this economy. Inside it, a bow like this trades for real currency.",
    history: null,
    ifYouFind: "The level thirty requirement is the value, not a limit. It fits a popular dueling bracket, where two amazon skills and this much damage on one bow is a genuine chase."
  },
  {
    slug: "bloodfist",
    name: "Bloodfist",
    alias: "perfect Bloodfist",
    quality: "unique",
    type: "Heavy Gloves",
    sprite: "img/uniques/bloodfist.webp",
    tooltip: [
      { t: "Defense: 18", c: "white" },
      { t: "Required Level: 9", c: "white" },
      "+20% Enhanced Defense",
      "+10% Increased Attack Speed",
      "+30% Faster Hit Recovery",
      "+40 to Life",
      "+5 to Minimum Damage"
    ],
    rarityTier: "Rare",
    obscurity: 3,
    why: "Level nine gloves. A player rushing to endgame vendors them without a glance. In the low-level dueling bracket they are a staple, because forty life, ten attack speed and thirty faster hit recovery at that level requirement is enormous. A perfect pair with max enhanced defense trades for real currency inside that market.",
    history: null,
    ifYouFind: "The stats never vary, so the roll is not the story. The market is. Level nine gloves with forty life and speed are a cornerstone of a dueling bracket most players never touch."
  },
  {
    slug: "cruel-matriarchal-bow",
    grid: [2, 4],
    sockets: 2,
    name: "Cruel Matriarchal Bow of Amplify Damage",
    alias: "hacked amp bow",
    quality: "magic",
    type: "",
    sprite: "img/matriarchal-bow.png",
    proof: "research/reference-screenshots/cruel-matriarchal-bow-amp.png",
    illicit: "Hacked",
    tooltip: [
      { t: "Two-Hand Damage: 95 to 223", c: "white" },
      { t: "(Amazon Only)", c: "red" },
      { t: "Required Dexterity: 187", c: "red" },
      { t: "Required Strength: 87", c: "white" },
      { t: "Required Level: 68", c: "white" },
      { t: "Bow Class - Very Fast Attack Speed", c: "white" },
      "5% Chance to Cast Level 1 Amplify Damage on Striking",
      "+1 to Bow and Crossbow Skills (Amazon Only)",
      "+30% Increased Attack Speed",
      "+376% Enhanced Damage",
      "Socketed (2)"
    ],
    rarityTier: "Mythic",
    obscurity: 5,
    why: "It calls itself a magic bow, but a magic item gets one prefix and one suffix, two lines at most. This has a curse on striking, a class skill, thirty attack speed and three hundred seventy six enhanced damage all at once. That is several affixes too many. It is a hacked bow wearing a legal-looking blue name, which is what made this kind so hard to catch in a trade window.",
    history: "The dangerous hacks were not the loud ones. A bow like this reads almost like a real magic drop, so it passed through trades a triple-absorb ring never would. It came from the same open-realm editing that produced the White Ring and Ith, tuned to look plausible. The tell is the affix count: no legitimate magic item can carry this many lines.",
    ifYouFind: "Count the blue lines. More than two on a magic item means it was edited, not dropped. This one has twice that."
  },
  {
    slug: "storm-circlet",
    name: "Storm Circlet",
    alias: "two-class hacked amulet",
    quality: "crafted",
    type: "Amulet",
    sprite: "img/amulet-pentagram.png",
    proof: "research/reference-screenshots/storm-circlet-amulet.png",
    illicit: "Hacked",
    tooltip: [
      { t: "Required Level: 34", c: "white" },
      "+2 to Necromancer Skill Levels",
      "+2 to Sorceress Skill Levels",
      "+20% Faster Cast Rate",
      "+18 to Strength",
      "+56 to Life",
      "+69 to Mana",
      "Cold Resist +23%",
      "Lightning Resist +23%",
      "Fire Resist +23%"
    ],
    rarityTier: "Mythic",
    obscurity: 5,
    why: "An amulet can grant skills to one class. This one grants two, plus two necromancer and plus two sorceress on the same neck, with cast rate and resists piled on. No random roll produces class bonuses for two classes at once. It reads as an ordinary godly rare until you notice it is helping two characters who could never both wear it.",
    history: "A subtle hack: a rare amulet edited to hold a second class's skills. Like the fake magic weapons of the era, it was built to survive a trade by looking almost right. It came from open-realm editing and the import bugs that leaked those items onto the ladder realms before the purges cleared them.",
    ifYouFind: "Two different class-skill lines on one amulet is the giveaway. The game only ever grants one."
  },
  {
    slug: "storm-needle",
    name: "Storm Needle",
    alias: "hacked 435 ED bow",
    quality: "rare",
    type: "Gothic Bow",
    sprite: "img/rare-bow.png",
    illicit: "Hacked",
    tooltip: [
      { t: "Two-Hand Damage: 58 to 267", c: "white" },
      { t: "Required Dexterity: 118", c: "white" },
      { t: "Required Strength: 95", c: "white" },
      { t: "Required Level: 48", c: "white" },
      { t: "Bow Class - Very Fast Attack Speed", c: "white" },
      "+20% Increased Attack Speed",
      "+435% Enhanced Damage",
      "+5 to Minimum Damage",
      "5% Bonus to Attack Rating",
      "+203 to Attack Rating",
      "Adds 48-75 fire damage",
      "+5 to Light Radius"
    ],
    rarityTier: "Mythic",
    obscurity: 5,
    why: "Four hundred thirty five percent enhanced damage on a bow that calls itself rare. The highest a single legitimate roll reaches is three hundred, and it cannot pair that with this many other lines. The numbers sit just past what the game allows, which is the signature of an item edited to look like a lucky drop instead of an obvious fake.",
    history: "Bows like this were built to slip past traders who knew the obvious hacks. Push the enhanced damage a little beyond the legal ceiling, add a few plausible lines, and it looks like the rare of a lifetime. It traces to the same open-realm editing era, and the same purges that cleared the White Ring took it too.",
    ifYouFind: "Know the ceilings. One enhanced-damage roll tops out near three hundred, and a rare holds six affixes at most. This clears both. Edited, not dropped."
  },
  {
    slug: "bugged-shaftstop",
    grid: [2, 3],
    sockets: 1,
    name: "Shaftstop",
    title: "Bugged Shaftstop",
    alias: "the ebug 2400 defense armor",
    quality: "unique",
    type: "Boneweave",
    sprite: "img/shaftstop.png",
    proof: "research/reference-screenshots/bugged-shaftstop.png",
    illicit: "Bugged",
    tooltip: [
      { t: "Defense: 2422", c: "white" },
      { t: "Durability: 33 of 46", c: "white" },
      { t: "Required Strength: 148", c: "white" },
      { t: "Required Level: 64", c: "white" },
      "+220% Enhanced Defense",
      "+250 Defense vs. Missile",
      "+60 to Life",
      "Damage Reduced by 30%",
      "Ethereal (Cannot be Repaired), Socketed (1)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "Shaftstop is a beginner's armor. This one shows two thousand four hundred defense, roughly triple what the item can legitimately reach. It is the ethereal socketing bug: cube a socket into an ethereal armor and the game applies the ethereal defense bonus a second time, stacking a number the math never allows. Same gold name, an armor from a different reality.",
    history: "For a stretch of the game's life, adding a socket to an ethereal armor in the Horadric Cube doubled the ethereal defense bonus instead of applying it once. Players ran good bases through it on purpose, and ebugged armors became a quiet class of their own, worth far more than the clean version for the raw defense. Later patches fixed the recipe. The armors made before the fix kept their impossible numbers.",
    ifYouFind: "Compare the defense to the enhanced defense. If it is far higher than the math allows, it was ebugged before the fix, and it cannot be made now."
  },
  {
    slug: "soul-spawn",
    name: "Soul Spawn",
    alias: "classic rare mace",
    quality: "rare",
    type: "Martel de Fer",
    era: "Classic",
    sprite: "img/martel-de-fer.png",
    proof: "research/reference-screenshots/soul-spawn-mace.png",
    tooltip: [
      { t: "Two-Hand Damage: 181 to 314", c: "white" },
      { t: "Durability: 34 of 60", c: "white" },
      { t: "Required Strength: 169", c: "red" },
      { t: "Required Level: 48", c: "white" },
      { t: "Mace Class - Normal Attack Speed", c: "white" },
      "+197% Enhanced Damage",
      "+20 to Maximum Damage",
      "+203 to Attack Rating",
      "Adds 3-14 cold damage",
      "6% Life stolen per hit",
      "+50% Damage to Undead"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "A classic rare mace, and in classic Diablo 2 a rolled rare like this was the melee endgame. Nearly two hundred enhanced damage, twenty maximum damage, two hundred attack rating, life steal and bonus undead damage, all on one Martel de Fer with no runeword or elite unique to outclass it. In hardcore classic, where survivability came from the leech line, this was the mace people built around.",
    history: null,
    ifYouFind: "The best of its base in a bracket the expansion erased. Life steal and the attack rating are what made it a hardcore classic weapon, not the raw damage alone."
  },
  {
    slug: "bonesnap",
    name: "Bonesnap",
    alias: "classic melee chase",
    quality: "unique",
    type: "Maul",
    era: "Classic",
    sprite: "img/maul.png",
    tooltip: [
      { t: "Two-Hand Damage: 120 to 172", c: "white" },
      { t: "Required Strength: 69", c: "white" },
      { t: "Required Level: 24", c: "white" },
      "+300% Enhanced Damage",
      "+100% Damage to Undead",
      "+40% Chance of Crushing Blow",
      "Cold Resist +30%",
      "Fire Resist +30%"
    ],
    rarityTier: "Uncommon",
    obscurity: 4,
    why: "In classic Diablo 2 there were no runewords and no elite uniques, so the top of the melee ladder was a normal-tier unique like this. Bonesnap swings for up to three hundred percent enhanced damage with forty percent crushing blow, which tears a chunk off any target's current life no matter how much it has. At a level twenty four requirement, cubed up for more base damage, it was the weapon a classic barbarian actually wanted.",
    history: "Bonesnap was a classic melee staple, one of the hardest-hitting things a pre-expansion character could hold. Crushing blow made it a boss killer back when everyone's damage was small, and the low requirement let you swing it early. Lord of Destruction buried it under exceptional bases, elite uniques and runeword weapons, and a whole generation of players never learned it was once a chase item.",
    ifYouFind: "A classic answer to a problem the expansion later solved a dozen better ways. The crushing blow is why it mattered, not the raw number."
  },
  {
    slug: "twitchthroe",
    name: "Twitchthroe",
    alias: "Twitch",
    quality: "unique",
    type: "Studded Leather",
    sprite: "img/uniques/twitchthroe.webp",
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
    rarityTier: "Uncommon",
    obscurity: 2,
    why: "Attack speed, faster hit recovery, block and stats, all on a body armor with almost no requirement. A player leveling past it never looks back. In the low brackets it is a cornerstone, the armor that lets a twink hit breakpoints nothing else at that level can reach. Invisible to endgame, foundational to the people who live at level thirty.",
    history: null,
    ifYouFind: "Two players see the same armor and value it a hundred to zero. To a rusher it is nothing. To a low-level dueler it is a breakpoint machine nothing else at that level reaches."
  },
  {
    slug: "dire-carapace",
    name: "Dire Carapace",
    alias: "classic rare armor",
    quality: "rare",
    type: "Ornate Plate",
    era: "Classic",
    sprite: "img/dire-carapace.png",
    proof: "research/reference-screenshots/dire-carapace-ornate-plate.png",
    tooltip: [
      { t: "Defense: 897", c: "white" },
      { t: "Durability: 59 of 60", c: "white" },
      { t: "Required Strength: 102", c: "white" },
      { t: "Required Level: 39", c: "white" },
      "+20% Faster Hit Recovery",
      "+100 to Attack Rating",
      "+99% Enhanced Defense",
      "+49 to Life",
      "+37 to Mana",
      "Lightning Resist +47%",
      "Requirements -40%",
      "Socketed (1)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "In classic Diablo 2, before runewords and before elite armor existed, a rolled rare body like this was the top of the armor ladder. Nearly nine hundred defense, faster hit recovery, life, mana, resistance and a socket, all on one Ornate Plate. Classic rares stacked combinations Lord of Destruction later reined in, and a body armor carrying an attack-rating line is one of them.",
    history: "Classic's affix rules were looser than the game people know now, so classic rares could roll mixes that read as impossible under Lord of Destruction. That is the whole appeal of a piece like this to a collector: it is a snapshot of a ruleset the game left behind. Runewords and elite uniques buried it, and the classic rare armor market faded with them.",
    ifYouFind: "The attack-rating line is the fingerprint. A body armor should not carry it, which is exactly what marks this as a relic of the classic ruleset rather than a modern drop."
  },
  {
    slug: "silks-of-the-victor",
    name: "Silks of the Victor",
    alias: "classic caster armor",
    quality: "unique",
    type: "Ancient Armor",
    era: "Classic",
    sprite: "img/uniques/silks-of-the-victor.webp",
    tooltip: [
      { t: "Defense: 513", c: "white" },
      { t: "Required Strength: 100", c: "white" },
      { t: "Required Level: 28", c: "white" },
      "+120% Enhanced Defense",
      "+1 to All Skills",
      "5% Mana stolen per hit",
      "+2 to Light Radius"
    ],
    rarityTier: "Uncommon",
    obscurity: 4,
    why: "Plus one to all skills on a body armor sounds ordinary now. In classic Diablo 2 it was a grail. There was no Enigma, no Vipermagi, no Spirit Shroud, and almost nothing gave skills. A caster who wanted a skill level on the chest slot had this and little else, which is exactly why a plain unique Ancient Armor was the best caster body in the game for a stretch.",
    history: "Before the expansion, sources of plus skills barely existed. Silks of the Victor put a skill level on the chest when that was nearly impossible, and it sat in most serious classic casters' setups for that one reason. Lord of Destruction added skill armors and runewords that made it irrelevant almost overnight, and it faded into a curiosity.",
    ifYouFind: "The lesson is scarcity, not power. One skill level was worth a whole armor slot when the game had almost no other way to hand you one."
  },
  {
    slug: "spectral-shard",
    name: "Spectral Shard",
    alias: "Spec Shard",
    quality: "unique",
    type: "Blade",
    sprite: "img/uniques/spectral-shard.webp",
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
    rarityTier: "Uncommon",
    obscurity: 3,
    why: "The damage on it is a joke, four to fifteen, so a melee player tosses it. Casters know better. Fifty percent faster cast rate at a level twenty five requirement is a huge breakpoint for the price, and it comes with mana and resistances attached. In the low-level caster bracket it is a default pick, and outside that bracket nobody notices it exists.",
    history: "For years the Spectral Shard was the caster weapon. Fifty faster cast at a level twenty five requirement was a breakpoint nothing cheaper could touch, so nearly every budget sorceress and every low-level caster dueler carried one. In that bracket it was so standard that seeing any other weapon was the surprise. Better cast weapons eventually arrived and pushed it down to a starter pick, but for a long stretch this flimsy little blade was the first thing a caster reached for.",
    ifYouFind: "The four-to-fifteen damage is the joke that hides the item. A caster reads one line, fifty cast rate at a level twenty five requirement, and never looks at the rest."
  },
  {
    slug: "goldskin",
    name: "Goldskin",
    alias: "classic resist armor",
    quality: "unique",
    type: "Full Plate Mail",
    era: "Classic",
    sprite: "img/uniques/goldskin.webp",
    tooltip: [
      { t: "Defense: 402", c: "white" },
      { t: "Required Strength: 80", c: "white" },
      { t: "Required Level: 28", c: "white" },
      "+150% Enhanced Defense",
      "All Resistances +35",
      "100% Extra Gold from Monsters",
      "+2 to Light Radius",
      "Attacker Takes Damage of 10"
    ],
    rarityTier: "Uncommon",
    obscurity: 4,
    why: "Everyone remembers Goldskin as the joke armor that doubles your gold. Read the other line. In classic Diablo 2, before resistance gear was everywhere, a fixed thirty five to all resistances on the chest slot was a real answer to Hell's resistance penalties. The gold even mattered when it funded your gambling and repairs. A novelty today, a tank's staple then.",
    history: "Classic players had few ways to patch resistances, so a guaranteed plus thirty five all on a body armor carried real weight, and the extra gold was a genuine perk in an economy that ran on it. The expansion flooded the game with resist charms, runewords and better uniques, and Goldskin became the punchline it is now.",
    ifYouFind: "The resistances were the point, not the gold. A clean case of a stat's worth swinging entirely with the patch around it."
  },
  {
    slug: "deaths-combo",
    name: "Death's Guard + Death's Hand",
    alias: "cannot-be-frozen combo",
    quality: "set",
    type: "Sash + Leather Gloves",
    sprite: "img/deaths-combo.webp",
    tooltip: [
      { t: "Required Level: 6", c: "white" },
      "Cannot Be Frozen",
      "30% Increased Attack Speed",
      "8% Life stolen per hit",
      "All Resistances +15",
      "Poison Resist +50%"
    ],
    rarityTier: "Uncommon",
    obscurity: 3,
    why: "Two cheap set pieces, a sash and a pair of gloves, both usable at level six. Worn together they give cannot be frozen, thirty percent attack speed, and eight percent life steal. Cannot be frozen with no real level requirement is the prize. It frees an amulet or ring slot a twink would otherwise spend on the same effect. The classic lesson in why junk-looking set pieces matter.",
    history: null,
    ifYouFind: "Cannot be frozen at almost no level requirement is the prize, and the pair frees the ring or amulet slot a twink would otherwise spend to get it. Two junk-looking set pieces buying back a whole slot."
  },
  {
    slug: "wirts-leg",
    name: "Wirt's Leg",
    alias: "the cow-portal key",
    quality: "normal",
    type: "Club",
    sprite: "img/wirts-leg.png",
    tooltip: [
      { t: "One-Hand Damage: 2 to 8", c: "white" },
      { t: "Durability: 8 of 8", c: "white" },
      { t: "Required Level: 0", c: "white" }
    ],
    rarityTier: "Common",
    labels: [
      { k: "source", v: "Wirt's corpse" }
    ],
    obscurity: 3,
    why: "A broken wooden leg that does almost no damage, and one of the most important items a farmer owns. Cube it with a Tome of Town Portal and it opens the Secret Cow Level. But a rule rides along that plenty of people still learn the hard way. If the Cow King dies in a game you created, that character can never open the cow portal again on that difficulty. No reset, no fix.",
    history: "The cow level was a premier experience and item farm, and the game gated it with a quiet, permanent punishment. Kill the King in your own game and the door shuts for good on that character and difficulty, which is why careful players herded the cows and left him standing. The lockout keys off the game's creator, not the killer, so you could still farm in a friend's game freely. Diablo 2 Resurrected removed it, which is itself a change to a twenty-year-old rule.",
    ifYouFind: "The trap is that it is per creator and per character, with no undo. Plenty of veterans have bricked a character's cow access without ever knowing the rule was there."
  },
  {
    slug: "tomb-reaver",
    name: "Tomb Reaver",
    alias: "3os Tomb Reaver",
    quality: "unique",
    type: "Cryptic Axe",
    sprite: "img/tomb-reaver.png",
    tooltip: [
      { t: "Two-Hand Damage: 125 to 570", c: "white" },
      { t: "Required Level: 84", c: "white" },
      { t: "Required Strength: 165", c: "white" },
      { t: "Required Dexterity: 103", c: "white" },
      "+280% Enhanced Damage",
      "+230% Damage to Undead",
      "+60% Increased Attack Speed",
      "All Resistances +50",
      "+80% Better Chance of Getting Magic Items",
      "+14 Life after each Kill",
      "Socketed (3)"
    ],
    rarityTier: "Very Rare",
    obscurity: 3,
    why: "Two Tomb Reavers can be worlds apart. It rolls one to three sockets and an enhanced damage range that swings by eighty percent. Only a three-socket copy at the top of the range is the one people chase. Then it hands you sixty attack speed, fifty all resist, and eighty magic find on top of monster damage. The name is the same on all of them. The roll is everything.",
    history: null,
    ifYouFind: "Sockets and enhanced damage both roll wide, so two Tomb Reavers can be a fortune apart. The gold name is identical on the grail and the vendor axe, and only the numbers separate them."
  },
  {
    slug: "sacred-targe",
    grid: [2, 3],
    name: "Jeweler's Sacred Targe of Deflecting",
    alias: "paladin JMOD",
    quality: "magic",
    type: "",
    sprite: "img/sacred-targe.png",
    proof: "research/reference-screenshots/jewelers-sacred-targe-of-deflecting.png",
    fill: ["img/rainbow-facet.png", "img/rainbow-facet.png", "img/rainbow-facet.png", "img/rainbow-facet.png"],
    fillLabel: "socket 4 lightning facets",
    fillTip: ["-20% to Enemy Lightning Resistance", "+20% to Lightning Skill Damage"],
    tooltip: [
      { t: "Defense: 141", c: "white" },
      { t: "Chance to Block: 76%", c: "white" },
      { t: "Durability: 27 of 46", c: "white" },
      { t: "(Paladin Only)", c: "red" },
      { t: "Required Strength: 86", c: "white" },
      { t: "Required Level: 47", c: "white" },
      "+30% Faster Block Rate",
      "20% Increased Chance of Blocking",
      "All Resistances +45",
      "Socketed (4)"
    ],
    rarityTier: "Very Rare",
    obscurity: 3,
    why: "The paladin's answer to the JMOD. A magic Sacred Targe with four sockets, the block rolls, and the paladin-only all-resistance bonus maxed at forty five. Fill the sockets with facets and you get a max-block shield with resistance already baked in that no runeword can match on this base. Paladins who know, hunt these. It reads as a blue shield and trades like an endgame piece.",
    history: null,
    ifYouFind: "It is the JMOD's paladin cousin, a blue shield that outbuilds the runewords for its slot. The all-resistance line the base grants for free is what a plain Monarch cannot match."
  },
  {
    slug: "manald-heal",
    name: "Manald Heal",
    alias: "the SoJ-fishing ring",
    quality: "unique",
    type: "Ring",
    sprite: "img/ring.png",
    tooltip: [
      { t: "Required Level: 15", c: "white" },
      "4% Mana stolen per hit",
      "+20 to Life",
      "Replenish Life +8",
      "Regenerate Mana 20%"
    ],
    rarityTier: "Uncommon",
    obscurity: 4,
    why: "A modest mana-leech ring, and one half of the game's oldest gold trick. A unique ring will not roll if that same unique already exists in the game, and a ring carried in from your stash counts as existing. Classic shipped only three: Nagelring, Manald Heal, and the Stone of Jordan. Bring a Nagelring and a Manald and the game has nothing left to hand you but an SoJ. Players hauled both junk rings around on purpose to fish for the currency of the realm.",
    history: "It worked because Classic had exactly three unique rings. Empty two out of the pool and the third is forced. Hunting low helped too: a weak monster can only roll the lowest rings, so its slim unique-ring chance landed on the SoJ far more often than in Hell. Lord of Destruction ended the trick quietly by adding Raven Frost, Dwarf Star, Bul-Kathos' and the rest, so two rings no longer emptied the table. There was never a patch note that killed it. The new rings diluted it, and later versions changed the rule from can-exist-once to can-drop-once, which stopped a carried ring from counting at all.",
    ifYouFind: "The ring itself is forgettable. Its place in the drop check is what made it worth carrying, back when a Stone of Jordan was money and there were only three rings to crowd out."
  },
  {
    slug: "constricting-ring",
    illicit: "Bugged",
    name: "Constricting Ring",
    alias: "the ring that never dropped",
    quality: "normal",
    type: "Ring",
    sprite: "img/constricting-ring.png",
    proof: "research/reference-screenshots/constricting-ring.png",
    tooltip: [
      { t: "Required Level: 95", c: "red" },
      "Drain Life -10",
      "+15% to Maximum Fire Resist",
      "+15% to Maximum Cold Resist",
      "+15% to Maximum Lightning Resist",
      "+15% to Maximum Poison Resist",
      "All Resistances +100",
      "100% Better Chance of Getting Magic Items"
    ],
    rarityTier: "Mythic",
    obscurity: 5,
    why: "A ring that raises every one of your resistance caps. Not your resistance, the cap itself, from seventy five to ninety across all four elements. Nothing else in the game does it, and nothing was ever supposed to. It sits in the files complete with stats and a level ninety five requirement, switched off so it can never drop.",
    history: "The Constricting Ring exists in uniqueitems.txt, the file that defines every unique, with its enable flag set to off. The developers built it, decided it was too strong to release, and left it disabled. The only copies that ever reached Battle.net came through an import bug from open and single-player realms. It is the purest case of an item that exists and does not exist at the same time.",
    ifYouFind: "You will not. It cannot drop. Any that exist slipped in through a bug two decades ago."
  },
  {
    slug: "oculus-soj",
    name: "Stone of Jordan",
    title: "Occy Ring",
    alias: "bugged Stone of Jordan",
    quality: "unique",
    illicit: "Bugged",
    type: "Ring",
    sprite: "img/uniques/stone-of-jordan.webp",
    tooltip: [
      { t: "Required Level: 42", c: "white" },
      "+3 to Sorceress Skill Levels",
      "+30% Faster Cast Rate",
      "25% Chance to Cast Level 1 Teleport when Struck",
      "All Resistances +20",
      "+20 to Vitality",
      "+20 to Energy",
      "50% Better Chance of Getting Magic Items"
    ],
    rarityTier: "Mythic",
    obscurity: 4,
    why: "Read the stats, then read the item type. Those are The Oculus's stats, a sorceress orb, sitting on a ring. Three sorceress skills, thirty faster cast, teleport when struck, all in a slot that should never hold them. A sorceress wearing one carried an extra orb's worth of power for free.",
    history: "The Occy Ring came out of the great bugged-item era, roughly 1.08 to 1.10, when a fusing glitch and open-realm imports put item properties onto the wrong bases. It was duped for years. Copies even split by region, the west and east versions carrying slightly different stats. Later purges wiped it out, and it no longer exists in the modern game.",
    ifYouFind: "It cannot exist legitimately. A Stone of Jordan with orb stats is a bugged relic, not a lucky drop."
  },
  {
    slug: "bugged-tals",
    grid: [2, 3],
    sockets: 1,
    name: "Tal Rasha's Guardianship",
    title: "Bugged Tal Rasha's Guardianship",
    alias: "Btal",
    quality: "set",
    illicit: "Bugged",
    type: "Lacquered Plate",
    sprite: "img/bugged-tals.png",
    tooltip: [
      { t: "Defense: 743", c: "white" },
      { t: "Required Level: 71", c: "white" },
      "+2 to All Skills",
      "+25% Faster Run/Walk",
      "Damage Reduced by 25%",
      "Magic Damage Reduced by 15",
      "All Resistances +40",
      "Requirements -60%",
      "Socketed (1)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "The normal Tal Rasha's armor is a tidy magic-find piece. This one is best in slot. Somewhere in the bugged-item era it picked up two skills, twenty five percent faster run, twenty five percent damage reduction and a socket, none of which it is meant to have. For any build that does not run Enigma, a bugged Tal's is the armor to beat.",
    history: "Bugged items are real items that ended up better than the game ever intended, born in the same 1.08 to 1.10 window as the Occy Ring. The Btal is the most useful of them, which is why it still trades briskly on non-ladder. It cannot be made now. Every one in circulation is an old survivor, quietly duped along the way, and that duping leaves a fingerprint. The game stamps every item with a hidden serial and periodically scans the realm for two that match, deleting the older of the pair. Duped copies have a habit of vanishing without warning when the scan catches up, so the one in your stash is only ever borrowed.",
    ifYouFind: "A Tal's armor with two skills and a socket is bugged. The normal one has neither. Non-ladder only."
  },
  {
    slug: "token-of-absolution",
    name: "Token of Absolution",
    alias: "the respec that took a decade",
    quality: "normal",
    type: "",
    sprite: "img/token-of-absolution.png",
    tooltip: [
      { t: "Cube four Essences to create", c: "grey" },
      "Resets all Skill and Stat points"
    ],
    rarityTier: "Uncommon",
    labels: [
      { k: "source", v: "Cube recipe" },
      { k: "added", v: "1.13" }
    ],
    obscurity: 3,
    why: "For most of Diablo 2's life a misplaced skill point was permanent. There was no respec, and after the 1.10 synergy overhaul a single wrong point could quietly ruin a build. Then this arrived. Cube four Essences dropped by the act bosses and you get a full reset of skills and stats. One small item ended a decade of build anxiety.",
    history: "Original Diablo 2 committed you to every point you spent, which made theorycrafting a high-stakes gamble and delete-and-reroll the only real fix. Patch 1.13 added a free Akara respec once per difficulty and the Token of Absolution for unlimited ones. Behavior changed overnight: builds became experiments instead of commitments, and the reroll culture faded.",
    ifYouFind: "It is easy to forget the game ever worked the other way. For ten years this is the item players wished existed every time they misclicked a skill tree."
  },
  {
    slug: "jewelers-archon-plate",
    grid: [2, 3],
    name: "Jeweler's Archon Plate of the Whale",
    alias: "4os Archon Plate",
    quality: "magic",
    type: "",
    sprite: "img/archon-plate.png",
    proof: "research/reference-screenshots/jewelers-archon-plate-of-the-whale.png",
    sockets: 4,
    tooltip: [
      { t: "Defense: 512", c: "white" },
      { t: "Durability: 60 of 60", c: "white" },
      { t: "Required Strength: 103", c: "red" },
      { t: "Required Level: 63", c: "red" },
      "+100 to Life",
      "Socketed (4)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "The Archon Plate is the lightest elite body armor, the lowest strength of the top tier. This one is magic, with four sockets and a hundred life on it. You cannot put Enigma in it, that needs a plain three-socket armor, but you can fill four sockets with resist runes or jewels and build a caster armor tuned to stats Enigma cannot give. Most players see a blue armor and move on. This one is a project piece worth real trade.",
    history: null,
    ifYouFind: "You cannot put Enigma in it, and that is the point. Four sockets on the lightest elite armor build a caster body tuned to stats Enigma cannot give, on a base most people scroll past for being blue."
  },
  {
    slug: "kano-zod",
    name: "Zod Rune",
    alias: "the rune Kano vendored",
    quality: "rune",
    type: "",
    sprite: "img/zod-rune.png",
    tooltip: [
      { t: "Required Level: 69", c: "white" },
      "Weapons: Indestructible",
      "Armor: Indestructible",
      "Helms: Indestructible",
      "Shields: Indestructible"
    ],
    rarityTier: "Mythic",
    obscurity: 3,
    why: "The Zod is the rarest rune in the game and the only thing that saves an ethereal item, because it makes anything indestructible. It is also the punchline to one of the best drop stories Diablo 2 has produced. In 2024 a speedrunner hit a Zod, a one in nearly three million drop, deep into a world-record run, and walked to the nearest vendor to sell it for pocket change on purpose.",
    history: "Kano was hours into a start-to-Ubers record attempt when the Zod fell, the kind of drop most players never see in twenty years. Stopping to use it would have cost time, so he vendored it for thirty five thousand gold, live, entirely for the bit. Gaming press covered it. The moment stuck because it took the single luckiest thing that can happen in Diablo 2 and threw it away for a laugh.",
    ifYouFind: "Its real use is unglamorous. Socket it into an ethereal weapon or armor and the item never breaks, the only way to keep an ethereal piece's boosted stats forever."
  },
  {
    slug: "artisans-diadem",
    grid: [2, 2],
    name: "Artisan's Diadem of Speed",
    alias: "3os caster Diadem",
    quality: "magic",
    type: "",
    sprite: "img/diadem.png",
    proof: "research/reference-screenshots/artisans-diadem-of-speed.png",
    fill: ["img/rainbow-facet.png", "img/rainbow-facet.png", "img/rainbow-facet.png"],
    fillLabel: "socket 3 lightning facets",
    fillTip: ["-15% to Enemy Lightning Resistance", "+15% to Lightning Skill Damage"],
    tooltip: [
      { t: "Defense: 52", c: "white" },
      { t: "Durability: 11 of 20", c: "white" },
      { t: "Required Level: 64", c: "red" },
      "+30% Faster Run/Walk",
      "Socketed (3)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "The Diadem is the best caster-helm base in the game. A magic one with three sockets and run speed is a blank canvas: drop in three facets and you have a helm that cuts enemy resistance and boosts your damage, tuned to your element. It reads as a junk blue circlet. It is one of the better caster helms you can build.",
    history: null,
    ifYouFind: "The Diadem is the best caster-helm base there is, and a three-socket magic one is a blank canvas. The empty sockets are the value, not anything the item came with."
  },
  {
    slug: "cruel-mythical-sword",
    name: "Cruel Mythical Sword",
    alias: "eth Cruel sword",
    quality: "magic",
    type: "",
    sprite: "img/mythical-sword.png",
    proof: "research/reference-screenshots/cruel-mythical-sword.png",
    tooltip: [
      { t: "One-Hand Damage: 224 to 280", c: "white" },
      { t: "Durability: 23 of 23", c: "white" },
      { t: "Required Dexterity: 114", c: "white" },
      { t: "Required Strength: 137", c: "white" },
      { t: "Required Level: 66", c: "white" },
      { t: "Sword Class - Fast Attack Speed", c: "white" },
      "+274% Enhanced Damage",
      "Ethereal (Cannot be Repaired)"
    ],
    rarityTier: "Very Rare",
    labels: [
      { k: "eth" }
    ],
    obscurity: 4,
    why: "A blue sword that reads like a vendor sale and hits like an elite runeword. Cruel is the most damage a magic weapon can roll, and a perfect one lands at three hundred percent; this one rolled two seventy four. Ethereal stacks another fifty on the base. On a Mythical Sword, one of the hardest-hitting one-handers in the game, that is more raw damage than most gold weapons carry, for the price of a blue drop. Nothing on the name warns you.",
    history: null,
    ifYouFind: "Cruel is the most enhanced damage a magic weapon can carry, and three hundred is its ceiling. On an ethereal elite base that is more raw damage than most gold weapons, under a blue name that warns no one."
  },
  {
    slug: "cunning-greater-talons",
    name: "Cunning Greater Talons of Quickness",
    alias: "trapsin claw",
    quality: "magic",
    type: "",
    sprite: "img/greater-talons.png",
    proof: "research/reference-screenshots/cunning-greater-talons-of-quickness.png",
    tooltip: [
      { t: "One-Hand Damage: 21 to 36", c: "white" },
      { t: "Durability: 65 of 69", c: "white" },
      { t: "(Assassin Only)", c: "red" },
      { t: "Required Dexterity: 79", c: "red" },
      { t: "Required Strength: 79", c: "red" },
      { t: "Required Level: 46", c: "red" },
      { t: "Claw Class - Very Slow Attack Speed", c: "white" },
      "+3 to Traps (Assassin Only)",
      "+40% Increased Attack Speed",
      "+3 to Lightning Sentry (Assassin Only)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "A trap assassin's dream claw. Plus three to the whole Traps tree and plus three to Lightning Sentry on top, on one magic claw, with forty attack speed. Dual wield two of these and you are stacking skills a runeword claw cannot touch. A blue weapon most players scroll right past, worth more than the orange ones to the right build.",
    history: null,
    ifYouFind: "Either skill line alone is common. Both stacked on one magic claw is the roll a trapsin chases, and dual-wielding two of them piles on skills no runeword claw can reach."
  },
  {
    slug: "lancers-matriarchal-javelin",
    name: "Lancer's Matriarchal Javelin of Quickness",
    alias: "+6 skill javazon javelin",
    quality: "magic",
    type: "",
    sprite: "img/matriarchal-javelin.png",
    proof: "research/reference-screenshots/lancers-matriarchal-javelin-of-quickness.png",
    tooltip: [
      { t: "Throw Damage: 35 to 66", c: "white" },
      { t: "One-Hand Damage: 30 to 54", c: "white" },
      { t: "Quantity: 76", c: "white" },
      { t: "(Amazon Only)", c: "red" },
      { t: "Required Dexterity: 151", c: "white" },
      { t: "Required Strength: 107", c: "white" },
      { t: "Required Level: 48", c: "white" },
      { t: "Javelin Class - Very Fast Attack Speed", c: "white" },
      "+6 to Javelin and Spear Skills (Amazon Only)",
      "+40% Increased Attack Speed"
    ],
    rarityTier: "Very Rare",
    labels: [
      { k: "roll", v: "Perfect" }
    ],
    obscurity: 4,
    why: "Six skill levels on a throwing weapon. Plus six to javelin and spear skills is more than any javazon gets from a single item anywhere else, and it comes with forty attack speed on a fast base. A blue javelin that outclasses the famous options for a javazon, and most people never think to read the skills line on a magic throwing weapon.",
    history: null,
    ifYouFind: "Six skill levels on a thrown weapon is more than a javazon gets from any other single item. The step from five to six is the difference between good and a small fortune, hiding on a blue name."
  },
  {
    slug: "volcanic-eldritch-orb",
    grid: [1, 3],
    name: "Volcanic Eldritch Orb",
    alias: "fire sorc caster orb",
    quality: "magic",
    type: "",
    sprite: "img/eldritch-orb.png",
    proof: "research/reference-screenshots/volcanic-eldritch-orb.png",
    fill: ["img/rainbow-facet.png", "img/rainbow-facet.png"],
    fillLabel: "socket 2 fire facets",
    fillTip: ["-10% to Enemy Fire Resistance", "+10% to Fire Skill Damage"],
    tooltip: [
      { t: "One-Hand Damage: 18 to 42", c: "white" },
      { t: "(Sorceress Only)", c: "red" },
      { t: "Required Level: 60", c: "white" },
      { t: "Staff Class - Fast Attack Speed", c: "white" },
      "+3 to Fire Skills (Sorceress Only)",
      "+3 to Fire Mastery (Sorceress Only)",
      "+3 to Enchant (Sorceress Only)",
      "Socketed (2)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "A fire sorceress dream stacked onto one blue orb. Three to the whole fire tree, three more to Fire Mastery, three more to Enchant, and two open sockets on top. Sorceress orbs roll hidden skill bonuses, and hitting three useful ones at once is what separates a fortune from a vendor sale. Drop two facets in and the fire damage climbs again.",
    history: null,
    ifYouFind: "Orbs roll hidden skill bonuses, so one plus-three is common and forgettable. Three of them stacked on the same orb is the jackpot the vendor sale is hiding."
  },
  {
    slug: "gaean-falcon-mask",
    grid: [2, 2],
    name: "Gaean Falcon Mask of the Sun",
    alias: "wind druid pelt",
    quality: "magic",
    type: "",
    sprite: "img/falcon-mask.png",
    proof: "research/reference-screenshots/gaean-falcon-mask-of-the-sun.png",
    fill: ["img/rainbow-facet.png", "img/rainbow-facet.png"],
    fillLabel: "socket 2 cold facets",
    fillTip: ["-10% to Enemy Cold Resistance", "+10% to Cold Skill Damage"],
    tooltip: [
      { t: "Defense: 12", c: "white" },
      { t: "Durability: 20 of 20", c: "white" },
      { t: "(Druid Only)", c: "red" },
      { t: "Required Strength: 28", c: "red" },
      { t: "Required Level: 45", c: "red" },
      "+3 to Elemental Skills (Druid Only)",
      "5% Bonus to Attack Rating",
      "+2 to Summon Grizzly (Druid Only)",
      "+3 to Tornado (Druid Only)",
      "+1 to Hunger (Druid Only)",
      "+6 to Light Radius",
      "Socketed (2)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "A wind druid's whole shopping list on one blue pelt. Three to the elemental tree and three more straight to Tornado, plus grizzly and hunger, and two open sockets. Druid pelts roll hidden skill bonuses like weapons do, and landing the wind combo on one is rare. It out-skills the unique pelts for a storm druid and looks like nothing.",
    history: null,
    ifYouFind: "Druid pelts roll hidden skill bonuses like weapons do, and the wind combo landing on one is rare. It out-skills the unique pelts a storm druid could wear, disguised as nothing."
  },
  {
    slug: "artisans-diadem-dr",
    grid: [2, 2],
    name: "Artisan's Diadem of Life Everlasting",
    alias: "26 DR caster Diadem",
    quality: "magic",
    type: "",
    sprite: "img/diadem.png",
    proof: "research/reference-screenshots/artisans-diadem-of-life-everlasting.png",
    fill: ["img/rainbow-facet.png", "img/rainbow-facet.png", "img/rainbow-facet.png"],
    fillLabel: "socket 3 lightning facets",
    fillTip: ["-15% to Enemy Lightning Resistance", "+15% to Lightning Skill Damage"],
    tooltip: [
      { t: "Defense: 53", c: "white" },
      { t: "Durability: 20 of 20", c: "white" },
      { t: "Required Level: 64", c: "red" },
      "Damage Reduced by 26",
      "Socketed (3)"
    ],
    rarityTier: "Very Rare",
    obscurity: 4,
    why: "The other end of the Diadem chase. This one traded run speed for twenty six flat damage reduction, one of the strongest defensive stats in the game, on the best caster-helm base, with three sockets still open for facets. Flat damage reduction that high on a helm you can also stack facets into is a rare and greedy combination.",
    history: null,
    ifYouFind: "Flat damage reduction that high on the best caster-helm base is a greedy combination. The suffix carries the value, and three open sockets for facets are an unreasonable amount to ask on top."
  }
];

if (typeof module !== "undefined" && module.exports) { module.exports = ITEMS; }
