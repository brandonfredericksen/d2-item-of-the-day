const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const T = "C:/Users/brand/.claude/projects/D--github-d2-item-of-the-day/84798538-eb77-4102-a58f-a3e7893abacb.jsonl";
const OUT = "D:/github/d2-item-of-the-day/research/reference-screenshots";
fs.mkdirSync(OUT, { recursive: true });

const raw = fs.readFileSync(T, "utf8");
const lines = raw.split(/\r?\n/);

// tool_use id -> pasted-image basename (from Read calls)
const idToName = {};
const baseRe = /pasted-image-[0-9T:_-]+Z\.(?:png|jpe?g)/i;

function basenameFromPath(p) {
  if (!p) return null;
  const m = String(p).match(baseRe);
  return m ? m[0] : null;
}

// First pass: map Read tool_use ids to the pasted-image filename they read
for (const line of lines) {
  if (!line.trim() || line.indexOf("tool_use") < 0) continue;
  let obj; try { obj = JSON.parse(line); } catch { continue; }
  const content = obj.message && obj.message.content;
  if (!Array.isArray(content)) continue;
  for (const b of content) {
    if (b && b.type === "tool_use" && b.input && b.input.file_path) {
      const nm = basenameFromPath(b.input.file_path);
      if (nm) idToName[b.id] = nm;
    }
  }
}

const byHash = {};   // hash -> {ext, data}
const nameForHash = {}; // hash -> preferred filename

function considerImage(data, mediaType, name) {
  const hash = crypto.createHash("md5").update(data).digest("hex");
  const ext = /png/i.test(mediaType) ? "png" : "jpg";
  if (!byHash[hash]) byHash[hash] = { ext, data };
  if (name && !nameForHash[hash]) nameForHash[hash] = name;
}

// Second pass: extract every image block, associate a name where possible
for (const line of lines) {
  if (!line.trim() || (line.indexOf('"image"') < 0 && line.indexOf("base64") < 0)) continue;
  let obj; try { obj = JSON.parse(line); } catch { continue; }
  const content = obj.message && obj.message.content;
  if (!Array.isArray(content)) continue;

  // names referenced textually in this line, in order (user paste turns)
  const textNames = [];
  const g = line.match(/pasted-image-[0-9T:_-]+Z\.(?:png|jpe?g)/gi);
  if (g) g.forEach(n => textNames.push(n));
  let ti = 0;

  for (const b of content) {
    // direct image block (user paste)
    if (b && b.type === "image" && b.source && b.source.data) {
      considerImage(b.source.data, b.source.media_type || "image/png", textNames[ti++] || null);
    }
    // tool_result carrying image(s)
    if (b && b.type === "tool_result" && Array.isArray(b.content)) {
      const nm = idToName[b.tool_use_id] || null;
      let ii = 0;
      for (const c of b.content) {
        if (c && c.type === "image" && c.source && c.source.data) {
          considerImage(c.source.data, c.source.media_type || "image/png", ii++ === 0 ? nm : null);
        }
      }
    }
  }
}

let named = 0, gen = 0;
Object.keys(byHash).forEach((hash, i) => {
  const { ext, data } = byHash[hash];
  let name = nameForHash[hash];
  if (!name) { name = "recovered-" + String(++gen).padStart(3, "0") + "." + ext; }
  named += nameForHash[hash] ? 1 : 0;
  fs.writeFileSync(path.join(OUT, name), Buffer.from(data, "base64"));
});

console.log("unique images:", Object.keys(byHash).length, "| named:", named, "| generic:", gen);
