/* ------------------------------------------------------------------
   research/curate.js

   Curation workflow. Runs AFTER the per-domain research batches land.
   Takes the full candidate pool (assembled from research/raw/*.json by the
   caller and passed as args.candidates) and applies the quality patterns:

     Phase 1 JUDGE   - each candidate faces a 3-vote adversarial panel, each
                       juror a distinct lens (price reality, veteran-surprise,
                       collector/fact legitimacy). Majority keep survives.
     Phase 2 CRITIC  - completeness critics look at the survivors per pillar
                       and name what deep/obscure items are still missing, to
                       seed a targeted follow-up research run.

   Invoke:
     Workflow({ scriptPath: "research/curate.js",
                args: { candidates: [ ...pool... ] } })

   Returns { kept, cut, gaps }. The caller writes kept -> candidates.json,
   cut -> rejected.json, and uses gaps to drive the next research run.
------------------------------------------------------------------ */

export const meta = {
  name: 'd2-curate',
  description: 'Adversarially re-judge D2 item candidates against the collector bar, then find gaps',
  phases: [
    { title: 'Judge', detail: '3-vote adversarial panel per candidate' },
    { title: 'Critic', detail: 'completeness critics name what is missing' },
  ],
}

const candidates = (args && args.candidates) || []

const READONLY = `
READ-ONLY research. Do NOT create/edit/delete files or run state-changing commands.
Load tools first with one call:
ToolSearch with query "select:WebSearch,WebFetch"
Use d2jsp.org PC threads, traderie, diablo2.io, reddit trades, maxroll, the Arreat Summit,
YouTube showcase videos, web.archive.org. If a source blocks you, say so and route around it.
`

const BAR = `
PROJECT: "Diablo 2 Item of the Day" (d2itemoftheday.com). Audience: SEASONED players.
THE BAR IS COLLECTOR / MUSEUM LEVEL. An item earns a slot only if it is a genuine collector's
piece: extraordinarily rare, or highly valuable in a way a VETERAN would NOT expect.
Reject: cheap/easily-obtained items with no deep history (e.g. a 4os Crystal Sword); items a
veteran already knows are great (a perfect Bul-Kathos ring, a Ber rune); archetypes rather than
real documented pieces; anything whose real price/demand is low without an exceptional reason.
Keep: pieces a veteran would wrongly dismiss (Angelic Halo+Wings AR combo); roll-dependent
uniques whose perfect roll is a SURPRISING value jump (a perfect Verdungo's); real, price-checked,
documented pieces. Economy baseline: mature D2R ladder season. No printed prices, tiers only.
`

const VERDICT = {
  type: 'object',
  properties: {
    keep: { type: 'boolean' },
    reason: { type: 'string', description: 'One tight sentence for the decision.' },
    corrections: { type: 'string', description: 'Any factual fix (recipe, socket count, req level, stat range) or empty.' },
    priceReality: { type: 'string', description: 'Real current demand you found and where.' },
  },
  required: ['keep', 'reason'],
}

const LENSES = [
  {
    key: 'price',
    ask: `LENS: PRICE REALITY. Price-check this item on real trading sources right now. If it is
cheap or easily obtained and has no deep-history/collector reason, keep=false. Only keep if the
real demand is genuinely high OR it is a true collector/historic piece.`,
  },
  {
    key: 'surprise',
    ask: `LENS: VETERAN SURPRISE. Would an experienced D2 player already know this is valuable? If
yes (it is common knowledge among veterans), keep=false. Keep only if a seasoned player would be
surprised, or would wrongly dismiss it.`,
  },
  {
    key: 'legitimacy',
    ask: `LENS: COLLECTOR LEGITIMACY + FACTS. Is this a REAL, specific, documented piece (not an
archetype)? Verify every factual claim: runeword recipe rune-by-rune, socket count, required
level, variable stat ranges. If it is a generalization, or a claim is wrong or unverifiable,
keep=false and put the fix in corrections.`,
  },
]

phase('Judge')

const judged = await pipeline(
  candidates,
  (c, item, i) => {
    const desc = `CANDIDATE: ${c.name}${c.alias ? ` (aka ${c.alias})` : ''}
category: ${c.category || '?'} | domain: ${c.domain || '?'} | proposed value ${c.valueTier || c.valueTierGuess || '?'} | rarity ${c.rarityTier || '?'}
why: ${c.why || c.whyValuable || ''}
priceSignal so far: ${c.priceSignal || 'none recorded'}
collectorCase: ${c.collectorCase || 'none recorded'}
factClaims: ${(c.factClaims || []).join(' | ') || 'none'}`
    return parallel(LENSES.map((lens) => () =>
      agent(`${READONLY}\n${BAR}\n\n${lens.ask}\n\nDefault to keep=false when uncertain. A wrong or weak item is worse than a gap.\n\n${desc}`,
        { label: `judge:${lens.key}:${(c.name || i).toString().slice(0, 28)}`, phase: 'Judge', schema: VERDICT })
    )).then((votes) => {
      const v = votes.filter(Boolean)
      const keeps = v.filter((x) => x.keep).length
      const corrections = v.map((x) => x.corrections).filter(Boolean).join(' ; ')
      const price = v.map((x) => x.priceReality).filter(Boolean).join(' ; ')
      return {
        candidate: c,
        keep: keeps >= 2,
        keepVotes: keeps,
        votes: v,
        corrections,
        priceReality: price,
        reasons: v.map((x) => x.reason).filter(Boolean),
      }
    })
  }
)

const results = judged.filter(Boolean)
const kept = results.filter((r) => r.keep)
const cut = results.filter((r) => !r.keep)
log(`Judged ${results.length}: ${kept.length} kept, ${cut.length} cut`)

phase('Critic')

/* Completeness critics, one per category cluster, see the survivors and name
   the deep cuts still missing. Their output seeds the next research run. */
const CLUSTERS = [
  'roll-dependent uniques and edge-case perfect rolls',
  'magic/rare/white collector bases and affix combos',
  'LLD / MLD and other bracket-specific collector gear',
  'ethereal and self-repair edge cases',
  'charms, jewels, facets, corrupted and crafted rarities',
  'historic and illicit/legend items (economy impact, folklore)',
]

const keptList = kept.map((r) => `${r.candidate.name}${r.candidate.alias ? ` (${r.candidate.alias})` : ''}`).join('\n') || '(none yet)'

const GAP_SCHEMA = {
  type: 'object',
  properties: {
    missing: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'A specific real item worth adding, not an archetype.' },
          why: { type: 'string' },
          searchHint: { type: 'string', description: 'Where/how to confirm it.' },
        },
        required: ['name', 'why'],
      },
    },
    notes: { type: 'string' },
  },
  required: ['missing'],
}

const gapResults = await parallel(CLUSTERS.map((cluster) => () =>
  agent(`${READONLY}\n${BAR}\n\nYou are a COMPLETENESS CRITIC for the cluster: ${cluster}.
Here is what already survived curation:\n${keptList}\n\nName the collector/museum-level pieces in
YOUR cluster that are MISSING. Dig deep: think of the pieces even most veterans have never seen
traded, record rolls, dead-patch artifacts, legendary specific items. Real, specific, documented
items only. For each, say why it belongs and how to confirm it.`,
    { label: `critic:${cluster.slice(0, 24)}`, phase: 'Critic', schema: GAP_SCHEMA })
))

const gaps = gapResults.filter(Boolean).flatMap((g) => (g.missing || []).map((m) => ({ ...m, cluster: g.notes ? undefined : undefined })))

return {
  kept: kept.map((r) => ({ ...r.candidate, _keepVotes: r.keepVotes, _corrections: r.corrections, _priceReality: r.priceReality })),
  cut: cut.map((r) => ({ name: r.candidate.name, keepVotes: r.keepVotes, reasons: r.reasons })),
  gaps,
}
