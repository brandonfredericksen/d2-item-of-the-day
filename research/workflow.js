/* ------------------------------------------------------------------
   research/workflow.js

   Durable, re-runnable research harness for the D2 Item of the Day site.

   Runs a set of research domains, each fact-checked by a separate
   adversarial agent, and returns structured findings. Designed to be
   run in small batches so a crash costs at most one batch.

   Invoke:
     Workflow({ scriptPath: "research/workflow.js",
                args: { domains: ["magic-bases","roll-dependent"],
                        exclude: ["Enigma","Shako", ...] } })

   args.domains   which domain keys to run this batch. Omit = all.
   args.exclude   item names already covered or rejected. Injected into
                  every prompt with an instruction not to return them.
                  This is what makes a second run find NEW items instead
                  of handing back the same first-page results.

   Returns { domain, found, verify } per domain. The caller writes each
   to research/raw/YYYY-MM-DD/ immediately.
------------------------------------------------------------------ */

export const meta = {
  name: 'd2-item-research',
  description: 'Adversarially verified research into obscure and historic D2 items',
  phases: [
    { title: 'Research', detail: 'one agent per domain' },
    { title: 'Verify', detail: 'adversarial fact-check per domain' },
  ],
}

let ARGS = typeof args !== 'undefined' ? args : null
if (typeof ARGS === 'string') { try { ARGS = JSON.parse(ARGS) } catch (e) { ARGS = null } }

const exclude = (ARGS && ARGS.exclude) || []
const wanted = (ARGS && ARGS.domains) || null

const EXCLUDE_BLOCK = exclude.length
  ? `\nALREADY COVERED OR REJECTED, do NOT return any of these, find different items:\n${exclude.join(', ')}\n`
  : ''

const READONLY = `
HARD CONSTRAINT: READ-ONLY research. Do NOT create, edit, or delete any file. Do NOT run any
state-changing command. Research only, then return findings as data.

Load tools first with one call:
ToolSearch with query "select:WebSearch,WebFetch"

Sources: d2jsp.org forums (price check / PC threads and trade sections), reddit r/diablo2 and
r/Diablo2Resurrected, diablo2.io, maxroll.gg, purediablo.com, d2tomb, Blizzard forums, the
Arreat Summit for base stats, YouTube descriptions and transcripts for item showcase videos,
and web.archive.org for dead classic-era forums. If a source blocks you, say so and work
around it. Search aggressively. Follow specific item names you discover into new searches.
`

const CONTEXT = `
PROJECT: "Diablo 2 Item of the Day" site (d2itemoftheday.com). Economy baseline is a MATURE
LADDER SEASON in D2R, not week-one ladder, not dead non-ladder.

AUDIENCE: SEASONED players, not new players. Assume the reader already knows the standard chase
items. Do NOT explain Enigma or Shako. The reader is a veteran who should still be surprised.

THE BAR IS COLLECTOR / MUSEUM LEVEL. This is the single most important filter. An item earns a
slot only if it is a genuine collector's piece: either extraordinarily rare, or highly valuable
in a way a VETERAN would not expect. "Useful" is not enough. "Good early ladder" is not enough.
Think museum exhibit, not shopping guide.

HARD FILTERS, apply ruthlessly:
1. PRICE-CHECK EVERY ITEM. Find its real current demand on trading sources (d2jsp PC threads,
   traderie, diablo2.io, reddit trades). If it is cheap or easily obtained, CUT it, unless it
   has deep documented history or true collector status. Example of a CUT: a 4-socket Crystal
   Sword. Trivially farmed, low value. Out.
2. SURPRISE A VETERAN, not a noob. If an experienced player already knows it is great (a perfect
   Bul-Kathos ring, a Ber rune), CUT it. The gold is what a veteran would DISMISS but is wrong
   about. A good example to emulate: the Angelic Halo + Angelic Wings amulet combo, whose
   per-level attack rating a seasoned player might wave off as junk.
3. REAL SPECIFIC ITEMS, not archetypes. Do NOT return "a rare circlet with +2 skills and 20
   FCR". Find an ACTUAL, documented, named or price-checked example that reached that level and
   return that concrete piece, with its real rolls.
4. PERFECT-ROLL UNIQUES only when the perfect roll causes a SURPRISING value jump. A perfect
   Verdungo's Hearty Cord: YES, the jump is large and non-obvious. A perfect common unique whose
   value everyone already knows: NO.
5. MINIMIZE BASES. Too many white/magic bases is a failure. Keep only the super-rare or genuinely
   lesser-known ones that are highly valuable. When in doubt about a base, cut it.

Two content pillars:
PILLAR 1 HIDDEN COLLECTOR VALUE. Pieces whose worth a veteran would under-rate: roll-dependent
uniques with a shocking perfect-roll premium, ultra-rare affix combos on rares, obscure
bracket-defining items, dismissed-but-strong set combos.
PILLAR 2 HISTORIC SIGNIFICANCE. Items that changed the game, economy, or player behavior. The
bar is IMPACT, not power. The Stone of Jordan qualifies because it was the currency, duping
wrecked it, and Blizzard answered with the counter on SOJs SOLD TO NPC VENDORS that spawns Diablo
Clone. Hacked/illegit legends (the White Ring) count as collector folklore.

NO PRICES ON THE SITE. Tier letters only (S/A/B/C/D/F), openly a guess. You MUST still research
real prices to DECIDE inclusion, but never print a number. Describe relative demand in words.

FACT ACCURACY IS CRITICAL. Players will instantly catch a wrong runeword recipe, socket count,
rune order, required level, or variable stat range. List every checkable claim in factClaims.
If unsure, say so instead of guessing.
${EXCLUDE_BLOCK}`

const ITEMS_SCHEMA = {
  type: 'object',
  properties: {
    domain: { type: 'string' },
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          alias: { type: 'string' },
          category: { type: 'string' },
          quality: { type: 'string' },
          obscurity: { type: 'integer', description: '1 everyone knows, 5 veterans do not' },
          valueTierGuess: { type: 'string' },
          rarityTier: { type: 'string' },
          priceSignal: { type: 'string', description: 'REQUIRED. Real current demand you found and where. Say if it is cheap/easily obtained.' },
          collectorCase: { type: 'string', description: 'Why this is museum/collector level for a SEASONED player. If you cannot make this case, do not include the item.' },
          veteranBlindspot: { type: 'string', description: 'What a seasoned player gets wrong about it, or why it is genuinely obscure to them.' },
          isSpecificRealItem: { type: 'boolean', description: 'True only if this is a concrete documented piece, not an archetype/generalization.' },
          whyValuable: { type: 'string' },
          history: { type: 'string' },
          legitimacy: { type: 'string', description: 'For history claims: CONFIRMED, DISPUTED, or MYTH' },
          teachingPoint: { type: 'string' },
          factClaims: { type: 'array', items: { type: 'string' } },
          sources: { type: 'array', items: { type: 'string' } },
        },
        required: ['name', 'category', 'obscurity', 'valueTierGuess', 'rarityTier', 'priceSignal', 'collectorCase', 'whyValuable', 'teachingPoint', 'factClaims'],
      },
    },
    notes: { type: 'string' },
  },
  required: ['domain', 'items'],
}

const VERIFY_SCHEMA = {
  type: 'object',
  properties: {
    checked: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          verdict: { type: 'string', description: 'CONFIRMED, CORRECTED, or REJECTED' },
          corrections: { type: 'string' },
          confidence: { type: 'string' },
          keepForSite: { type: 'boolean' },
        },
        required: ['name', 'verdict', 'keepForSite'],
      },
    },
    notes: { type: 'string' },
  },
  required: ['checked'],
}

const DOMAINS = {
  'magic-bases': `Research MAGIC and WHITE/GREY BASE items whose value is the affix roll or socket
count, not the item. Canonical example: a "JMOD", a Jeweler's Monarch of Deflecting.
Cover which prefixes and suffixes make a magic base premium (Jeweler's for sockets, of
Deflecting, of Fortune, Cruel and others), which bases are sought-after runeword bases and
exactly which runeword each serves, the socket counts that matter and why, and superior white
bases with enhanced defense or damage. Be precise about which runeword goes in which base and
how many sockets each needs. Highest-value domain for this project. Return at least 12 items.`,

  'roll-dependent': `Research EDGE CASE UNIQUES where value comes almost entirely from the ROLL,
not the item. The name is common but a perfect roll is rare and worth vastly more.
Cover a perfect Verdungo's Hearty Cord in detail including exact variable stat ranges and what
"perfect" means. Then find every comparable case: uniques with wide variable ranges where the
top roll is economically a different item from an average roll. Cover which single stat traders
care about on each, the shorthand used to quote rolls, why one percent can multiply value, how
socket count on a unique changes things, uniques valuable only in ethereal form, and uniques
whose value collapsed when a patch changed their ranges. Return at least 12 items.`,

  'ethereal': `Research ETHEREAL items. Cover ethereal bases sought for runewords, ethereal
uniques dramatically better than non-ethereal versions, the self-repair problem and how players
solve it, and the "eth bug" if it applies in D2R. Explain clearly why ethereal is sometimes a
massive bonus and sometimes makes an item worthless. Cover ethereal unique boots and armor well,
including Sandstorm Trek. Identify which specific ethereal bases are the expensive ones and why.
Return at least 10 items.`,

  'lld': `Research LOW LEVEL DUELING (LLD) items, classic brackets level 9, 18, and 30. Find
items genuinely expensive in the LLD economy that look worthless to a PvM player. Cover perfect
low-level rare and magic jewelry, twink gear, low-level uniques and sets commanding real prices,
the affix rolls that matter at low level, why a level requirement cap makes certain items
irreplaceable, and how "perfect" is defined here. Explain WHY the LLD economy exists and why its
prices look insane out of context. Return at least 8 items.`,

  'mld': `Research MID LEVEL DUELING (MLD) items and other niche PvP bracket economies beyond
LLD, typically level 30, 45 or similar. Find items valuable because of a level requirement
ceiling, gear that is best-in-slot only within a bracket, and items PvM players routinely vendor.
Cover how the MLD meta differs from LLD and any bracket-specific runewords or bases. Return at
least 6 items.`,

  'rares': `Research RARE items hitting exact valuable affix combinations, heavy focus on RARE
CIRCLETS and rare jewelry. Cover what makes a rare circlet expensive (class skills, faster cast
rate, life, resists), the difference between Circlet, Coronet, Tiara and Diadem and why the base
matters, rare amulets and rings that beat their unique counterparts, rare gloves and boots, and
rare jewels. Explain the shorthand traders use, for example what "2/20" means on a circlet.
Explain why a rare can beat a unique. Return at least 10 items.`,

  'jsp-economy': `Research the d2jsp forum economy and D2R trading conventions to find items that
sell high but are non-obvious. Try to read d2jsp.org price check (PC) threads and trade forums.
If blocked, use reddit trade subreddits, diablo2.io listings, Discord trade community summaries,
and YouTube trading guides. Report which sources you reached. Look for items experienced traders
hunt but casual players ignore, the gap between how an item looks and what it sells for, collector
items with value beyond their stats, and trading shorthand that signals value. Return at least 8
items.`,

  'small-items': `Research small, easily-overlooked high-value items: CHARMS, JEWELS, CRAFTED
items, and CORRUPTED items in D2R. Cover grand charm skillers and which combinations are
valuable, small charms with valuable affix combos and their shorthand, rare jewels and which
combos matter, Rainbow Facets including die versus level-up variants and each element, crafted
recipes producing genuinely top-tier gear (caster, blood, safety and others), and D2R corruption
outcomes that make an item jump in value. Return at least 10 items.`,

  'history-economy': `Research D2 items with genuine HISTORIC SIGNIFICANCE: items that changed
how the game was played or how its economy worked. THE BAR: not just powerful or iconic. "Shako
is historic because it is good" FAILS.
Worked example, verify precisely: the Stone of Jordan served as the de facto CURRENCY of D2 for
years before runes displaced it in LoD; rampant duping wrecked its scarcity; Blizzard responded
with a counter on SOJs SOLD TO NPC VENDORS on a realm that spawns Diablo Clone / Uber Diablo when
the threshold is hit, which doubles as a currency sink. Determine which patch added it, Blizzard's
stated intent, whether the anti-dupe/sink motivation is confirmed or community inference, what
killing Diablo Clone drops, and how D2R changed it.
Then find every comparable case: items that were currency in an era and what displaced them,
mechanics or systems introduced BECAUSE of an item, items whose meta role shifted across patches,
items nerfed or reworked and the economic aftermath, and classic pre-LoD economy items. Every
explanation must be about IMPACT not power. Return at least 10 items.`,

  'history-illicit': `Research HACKED, DUPED, and ILLEGAL D2 items that reached Battle.net and
became folklore. PRIORITY: the "White Ring". Determine what it actually is, whether it was
hacked or otherwise illegitimate, how it circulated, and why it is remembered. If you cannot
confirm it, say so plainly rather than inventing a story.
Also cover other known hacked or impossible items (stats no legit drop could roll, zero required
level, impossible affix counts), major duping eras and the items involved, how players and
Blizzard identified illegitimate items, item-based bugs and exploits and whether each was
legitimate or patched out, and items removed or rolled back by Blizzard. Label every claim
CONFIRMED, DISPUTED, or MYTH in the legitimacy field. Do NOT provide any instructions for duping,
hacking, or item editing. Documented history only. Return at least 8 items.`,
}

const keys = (wanted || Object.keys(DOMAINS)).filter((k) => DOMAINS[k])

log(`Batch: ${keys.length} domain(s) -> ${keys.join(', ')}  |  exclude list: ${exclude.length} item(s)`)

phase('Research')

const results = await pipeline(
  keys,
  (key) => agent(`${READONLY}\n${CONTEXT}\n\n${DOMAINS[key]}`, {
    label: `research:${key}`,
    phase: 'Research',
    schema: ITEMS_SCHEMA,
  }),
  (found, key) => {
    if (!found || !found.items || !found.items.length) return { domain: key, found: found || null, verify: null }
    const list = found.items.map((i, n) =>
      `${n + 1}. ${i.name}${i.alias ? ` (aka ${i.alias})` : ''} [${i.category}] tier=${i.valueTierGuess} rarity=${i.rarityTier} obscurity=${i.obscurity}\n   WHY: ${i.whyValuable}\n   HISTORY: ${i.history || 'n/a'} ${i.legitimacy ? '[' + i.legitimacy + ']' : ''}\n   CLAIMS: ${(i.factClaims || []).join(' | ')}`
    ).join('\n\n')
    return agent(
      `${READONLY}\n${CONTEXT}\n\nYou are an ADVERSARIAL FACT CHECKER for D2 item research.
Another researcher produced the findings below for domain "${key}". Your job is to REFUTE them,
not agree. Verify every claim with web sources. Check runeword recipes rune by rune and in order,
socket counts, required levels, base stats, affix spelling, and variable stat RANGES precisely,
since this project depends on knowing what a "perfect" roll actually is.
For HISTORICAL claims, separate documented fact from folklore. D2 history is full of confidently
repeated myths. If a claim traces only to forum hearsay, mark it DISPUTED. Verify patch numbers
and dates specifically.
Judge each item against the COLLECTOR / MUSEUM bar for a SEASONED audience. Set keepForSite
false, aggressively, when:
- it is common knowledge to a veteran (Enigma, Shako, Ber, Griffon's, Infinity),
- it is cheap or easily obtained and lacks deep history (e.g. a 4os Crystal Sword, an eth Great
  Poleaxe that a better boring base outclasses),
- it is an ARCHETYPE not a real documented piece (isSpecificRealItem false),
- the priceSignal shows low demand with no exceptional collector or historic reason,
- a seasoned player would already expect the value (a perfect Bul-Kathos ring).
Keep an item only if a veteran would be genuinely surprised or if it is a true collector/historic
piece. When you reject, put the reason in corrections. Prefer REJECTED over keeping a weak item.
Default to CORRECTED or REJECTED when uncertain. A wrong fact is worse than a missing item.

FINDINGS:\n\n${list}`,
      { label: `verify:${key}`, phase: 'Verify', schema: VERIFY_SCHEMA }
    ).then((v) => ({ domain: key, found, verify: v }))
  }
)

return { batch: keys, results: results.filter(Boolean) }
