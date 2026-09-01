/* Generates .claude/ttest.html: a gallery of diverse tooltips using the REAL
   CSS extracted from index.html, to QA item types and name lengths across
   screen sizes. Not part of the deployed site. */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

let html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
let style = html.slice(html.indexOf("<style>") + 7, html.indexOf("</style>"));
// make the Exocet font path absolute so the test page (in .claude/) can load it
style = style.replace(/url\("fonts\/exocet-heavy\.woff"\)/g,
  'url("file:///' + path.join(ROOT, "fonts/exocet-heavy.woff").replace(/\\/g, "/") + '")');

function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function lineClass(c){return({white:"t-white",grey:"t-grey",gray:"t-grey",red:"t-red",gold:"t-gold"})[c]||"";}
function line(l){
  if(l&&typeof l==="object") return '<div class="t-line '+lineClass(l.c)+'">'+esc(l.t)+"</div>";
  return '<div class="t-line">'+esc(l)+"</div>";
}
function tooltip(it){
  return '<div class="tooltip q-'+it.q+'">'+
    '<div class="t-name">'+esc(it.name)+"</div>"+
    (it.type?'<div class="t-type">'+esc(it.type)+"</div>":"")+
    (it.lines&&it.lines.length?'<div class="t-lines">'+it.lines.map(line).join("")+"</div>":"")+
  "</div>";
}

const ITEMS = [
  {label:"unique · short name · long base + class-red", q:"unique", name:"Homunculus", type:"Hierophant Trophy",
   lines:[{t:"Defense: 186",c:"white"},{t:"Chance to Block: 72%",c:"white"},{t:"Durability: 19 of 20",c:"white"},
   {t:"(Necromancer Only)",c:"red"},{t:"Required Strength: 58",c:"white"},{t:"Required Level: 42",c:"white"},
   "+2 to Curses (Necromancer Only)","+2 to Necromancer Skill Levels","+30% Faster Block Rate","All Resistances +40","+5 to Mana after each Kill"]},

  {label:"unique · 3-word name", q:"unique", name:"Crown of Ages", type:"Corona",
   lines:[{t:"Defense: 393",c:"white"},{t:"Required Strength: 174",c:"white"},{t:"Required Level: 82",c:"white"},
   "Indestructible","+1 to All Skills","+30% Faster Hit Recovery","All Resistances +30","Damage Reduced by 15%","Socketed (2)"]},

  {label:"set · green name + type", q:"set", name:"Trang-Oul's Claws", type:"Heavy Bracers",
   lines:[{t:"Defense: 74",c:"white"},{t:"Required Level: 45",c:"white"},
   "+2 to Curses (Necromancer Only)","+20% Faster Cast Rate","+25% to Poison Skill Damage","Cold Resist +30%"]},

  {label:"runeword · gold name, grey base, rune line, eth grey", q:"runeword", name:"Fortitude", type:"Ogre Maul",
   lines:[{t:"'ElSolDolLo'",c:"gold"},{t:"Two-Hand Damage: 469 to 636",c:"white"},{t:"Required Strength: 103",c:"white"},{t:"Required Level: 59",c:"white"},
   "20% Chance to cast level 15 Chilling Armor when struck","+300% Enhanced Damage","+200% Enhanced Defense","+127 to Life (Based on Character Level)","All Resistances +30",
   {t:"Ethereal (Cannot be Repaired), Socketed (4)",c:"grey"}]},

  {label:"rare · yellow, 2-word name", q:"rare", name:"Corpse Knuckle", type:"Vambraces",
   lines:[{t:"Defense: 61",c:"white"},{t:"Required Level: 42",c:"white"},
   "+2 to Javelin and Spear Skills (Amazon Only)","20% Faster Cast Rate","+30 to Life","All Resistances +21"]},

  {label:"magic · VERY LONG name (wrap test), no base line", q:"magic", name:"Cruel Great Poleaxe of Quickness", type:"",
   lines:[{t:"Two-Hand Damage: 46 to 127",c:"white"},{t:"Required Strength: 179",c:"white"},{t:"Required Level: 39",c:"white"},
   "+200% Enhanced Damage","+40% Increased Attack Speed"]},

  {label:"rune · orange", q:"rune", name:"Zod Rune", type:"",
   lines:[{t:"Can be Inserted into Socketed Items",c:"white"},{t:"Weapons: Indestructible",c:"white"},{t:"Armor: Indestructible",c:"white"},{t:"Required Level: 69",c:"white"}]},

  {label:"normal · white base", q:"normal", name:"Monarch", type:"",
   lines:[{t:"Defense: 133",c:"white"},{t:"Chance to Block: 67%",c:"white"},{t:"Required Strength: 156",c:"white"},{t:"Required Level: 54",c:"white"},"Socketed (4)"]},

  {label:"crafted · orange name", q:"crafted", name:"Hexfire", type:"Shamshir",
   lines:[{t:"One-Hand Damage: 20 to 51",c:"white"},{t:"Required Level: 47",c:"white"},
   "+3 to Fire Skills","50% Chance to cast Level 20 Firewall","+30% Increased Attack Speed"]},

  {label:"unique · very long single-word wrap", q:"unique", name:"Metalgrid", type:"Aegis",
   lines:[{t:"Defense: 594",c:"white"},{t:"Required Strength: 219",c:"white"},{t:"Required Level: 87",c:"white"},
   "+400 Defense vs. Missile","All Resistances +35-55","Attacker Takes Damage of 250-350"]},
];

const cells = ITEMS.map(it =>
  '<div class="cell"><div class="lab">'+esc(it.label)+'</div>'+
  '<div class="item-head"><div class="tip-col">'+tooltip(it)+
     '<div class="tags"><span class="tag tag-a">Value <b>A</b></span><span class="tag rarity">Rarity <b>Very Rare</b></span></div>'+
  '</div></div></div>'
).join("");

const out = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">'+
  '<meta name="viewport" content="width=device-width, initial-scale=1">'+
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'+
  '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">'+
  "<style>"+style+
  ".ttgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:22px;padding:20px 0}"+
  ".cell{background:var(--bg-elev);border:1px solid var(--border);border-radius:12px;padding:6px 10px 16px}"+
  ".lab{font-size:.64rem;letter-spacing:.06em;text-transform:uppercase;color:var(--text-faint);padding:10px 4px;border-bottom:1px solid var(--border);margin-bottom:8px}"+
  ".cell .item-head{margin:6px 0 0}"+
  "</style></head><body><div class='wrap'><div class='ttgrid'>"+cells+"</div></div></body></html>";

fs.writeFileSync(path.join(ROOT, ".claude/ttest.html"), out);
console.log("wrote .claude/ttest.html with "+ITEMS.length+" test items");
