// Node self-test of the pure logic in app.js. Not part of the site.
const ITEMS = require("../items.js");

// --- replicate the localization + tier logic from app.js ---
const DEFAULT_LANG = "en";
const RARITY_SCALE = ["Common","Uncommon","Rare","Very Rare","Mythic"];
const LABEL_KINDS = { source:{}, added:{}, roll:{}, eth:{flag:true} };

function t(val, lang){
  if(val==null) return "";
  if(typeof val==="string") return val;
  if(typeof val==="object"){
    if(val[lang]!=null) return val[lang];
    if(val[DEFAULT_LANG]!=null) return val[DEFAULT_LANG];
    for(const k in val){ if(val[k]!=null) return val[k]; }
  }
  return "";
}
const rIdx = t2 => RARITY_SCALE.findIndex(r=>r.toLowerCase()===String(t2||"").toLowerCase());
function rarityClass(tier){
  const i=rIdx(tier);
  return i<0 ? "" : " rar-"+RARITY_SCALE[i].toLowerCase().replace(/ /g,"-");
}
function todayIndex(len, utcDay){
  const ANCHOR = Math.floor(Date.UTC(2026,0,1)/86400000);
  return (((utcDay-ANCHOR)%len)+len)%len;
}

let fail=0;
const ok=(n,c)=>{ console.log((c?"  ok  ":"FAIL  ")+n); if(!c) fail++; };

console.log("--- localization ---");
ok("plain string returns as-is", t("hello","de")==="hello");
ok("object returns requested lang", t({en:"The Gnasher",de:"Der Nörgler"},"de")==="Der Nörgler");
ok("object falls back to en", t({en:"The Gnasher"},"de")==="The Gnasher");
ok("object falls back to first when no en", t({fr:"X"},"de")==="X");
ok("null -> empty", t(null,"en")==="");
ok("every shipped item resolves a non-empty name", ITEMS.every(i=>t(i.name,"en").length>0));

console.log("--- rarity ramp ---");
ok("mythic -> hot end", rarityClass("Mythic")===" rar-mythic");
ok("two-word tier hyphenates", rarityClass("Very Rare")===" rar-very-rare");
ok("case insensitive", rarityClass("common")===" rar-common");
ok("unknown tier -> no class", rarityClass("Legendary")==="");
ok("missing tier -> no class", rarityClass(undefined)==="");

console.log("--- rotation wraps at boundaries ---");
const L=ITEMS.length;
ok("index in range for day 0", todayIndex(L,Math.floor(Date.UTC(2026,0,1)/86400000))===0);
let allInRange=true;
for(let d=-5; d<L*3+5; d++){ const i=todayIndex(L, Math.floor(Date.UTC(2026,0,1)/86400000)+d); if(i<0||i>=L) allInRange=false; }
ok("all indices within [0,len) across 3 cycles", allInRange);
ok("negative day wraps positive", todayIndex(L, Math.floor(Date.UTC(2026,0,1)/86400000)-1)===L-1);

console.log("--- data integrity ---");
const slugs=new Set();
let dupes=false, badTier=false;
for(const it of ITEMS){
  if(slugs.has(it.slug)) dupes=true; slugs.add(it.slug);
  if(rIdx(it.rarityTier)<0) badTier=true;
}
ok("no duplicate slugs", !dupes);
ok("all rarity tiers valid", !badTier);

// Labels are free-form on purpose, so the test guards the shape, not the wording.
let badLabel=null;
for(const it of ITEMS){
  if(it.labels===undefined) continue;
  if(!Array.isArray(it.labels)){ badLabel=it.slug+": labels is not an array"; break; }
  for(const l of it.labels){
    if(!l || typeof l!=="object"){ badLabel=it.slug+": label is not an object"; break; }
    if(l.k && !LABEL_KINDS[l.k]){ badLabel=it.slug+": unknown kind "+l.k; break; }
    const flag = !!(LABEL_KINDS[l.k] && LABEL_KINDS[l.k].flag);
    if(!flag && !t(l.v,"en")){ badLabel=it.slug+": label has no value"; break; }
    if(!l.k && !t(l.l,"en")){ badLabel=it.slug+": one-off label needs l"; break; }
  }
  if(badLabel) break;
}
ok("every label is a known kind or a complete one-off"+(badLabel?" -> "+badLabel:""), !badLabel);
ok("no item carries an empty labels array", ITEMS.every(i=>i.labels===undefined||i.labels.length>0));

// `added` is scoped to the item, `lastPatch` to the version on the card.
// Together they read as a lifespan and imply the item is gone. Never both.
const scopeClash = ITEMS.filter(i=>i.lastPatch && (i.labels||[]).some(l=>l.k==="added")).map(i=>i.slug);
ok("no entry pairs an added label with lastPatch"+(scopeClash.length?" -> "+scopeClash.join(", "):""), !scopeClash.length);
ok("value tier is fully retired", ITEMS.every(i=>i.valueTier===undefined));

console.log(fail? `\n${fail} FAILURE(S)` : "\nall passed");
process.exit(fail?1:0);
