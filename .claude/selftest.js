// Node self-test of the pure logic in app.js. Not part of the site.
const ITEMS = require("../items.js");

// --- replicate the localization + tier logic from app.js ---
const DEFAULT_LANG = "en";
const VALUE_SCALE = ["F","D","C","B","A","S"];
const RARITY_SCALE = ["Common","Uncommon","Rare","Very Rare","Mythic"];
const MISMATCH_THRESHOLD = 2;

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
const vIdx = t2 => VALUE_SCALE.indexOf(String(t2||"").toUpperCase());
const rIdx = t2 => RARITY_SCALE.findIndex(r=>r.toLowerCase()===String(t2||"").toLowerCase());
function mismatchFor(it){
  const v=vIdx(it.valueTier), r=rIdx(it.rarityTier);
  if(v<0||r<0) return null;
  const diff = v - r*((VALUE_SCALE.length-1)/(RARITY_SCALE.length-1));
  if(diff>=MISMATCH_THRESHOLD) return "more";
  if(diff<=-MISMATCH_THRESHOLD) return "rarer";
  return null;
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

console.log("--- mismatch badge ---");
ok("zod (C / Mythic) -> rarer", mismatchFor({valueTier:"C",rarityTier:"Mythic"})==="rarer");
ok("monarch (A / Common) -> more", mismatchFor({valueTier:"A",rarityTier:"Common"})==="more");
ok("gnasher (F / Uncommon) -> none", mismatchFor({valueTier:"F",rarityTier:"Uncommon"})===null);
ok("balanced (B / Rare) -> none", mismatchFor({valueTier:"B",rarityTier:"Rare"})===null);
ok("S / Common -> more", mismatchFor({valueTier:"S",rarityTier:"Common"})==="more");
ok("F / Mythic -> rarer", mismatchFor({valueTier:"F",rarityTier:"Mythic"})==="rarer");

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
  if(vIdx(it.valueTier)<0) badTier=true;
  if(rIdx(it.rarityTier)<0) badTier=true;
}
ok("no duplicate slugs", !dupes);
ok("all value+rarity tiers valid", !badTier);

console.log(fail? `\n${fail} FAILURE(S)` : "\nall passed");
process.exit(fail?1:0);
