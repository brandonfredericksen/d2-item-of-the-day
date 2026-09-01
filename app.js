/* ------------------------------------------------------------------
   app.js  -  day selection, rendering, archive, permalinks, i18n

   URL parameters:
     ?item=<slug>   pin one item (permalink), for sharing and the gallery
     ?lang=<code>   force a language (must be in AVAILABLE_LANGS)
     ?day=<n>       debug. step directly to rotation index n

   Localization:
     Any item prose field may be a plain string (treated as the default
     language) or an object like { en: "...", es: "..." }. t() resolves
     the active language and falls back to the default, then to whatever
     exists. Authoring an English-only entry needs no objects at all.
------------------------------------------------------------------ */

(function () {
  "use strict";

  var MS_PER_DAY = 86400000;
  var ANCHOR = Math.floor(Date.UTC(2026, 0, 1) / MS_PER_DAY);

  var VALUE_SCALE = ["F", "D", "C", "B", "A", "S"];
  var RARITY_SCALE = ["Common", "Uncommon", "Rare", "Very Rare", "Mythic"];
  var MISMATCH_THRESHOLD = 2;

  /* ---------- languages ----------
     Add a language by appending here and adding a UI block below.
     The switcher only appears when more than one is available, so the
     site stays clean while it is English-only. */
  var DEFAULT_LANG = "en";
  var AVAILABLE_LANGS = [
    { code: "en", label: "English" }
  ];

  var UI = {
    en: {
      whyTitle: "Why it is worth something",
      historyTitle: "History",
      findTitle: "If you find one",
      valueLabel: "Value",
      rarityLabel: "Rarity",
      rarityMeaning: "How often you actually see one available, not just its drop rate. Some items are rare because nobody keeps them.",
      lastPatchLabel: "Last seen",
      lastPatchMeaning: "This version no longer drops. It last existed in this patch, before a later patch changed or removed it.",
      eraLabel: "Era",
      eraMeaning: "The game this item mattered in. Classic is Diablo II before the Lord of Destruction expansion. Shown only when it is not the current game.",
      illicitMeaning: "This item cannot exist legitimately. It was hacked or bugged into being, and circulated on Battle.net as contraband. Shown as history, not a drop you can chase.",
      aliasPrefix: "traders call it: ",
      archiveSummary: "Every item so far",
      nextItem: "Next item in {h}h {m}m {s}s",
      noSprite: "no sprite",
      mismatchMore: "More valuable than it is rare.",
      mismatchRarer: "Rarer than it is valuable.",
      footerDisclaimer: "Value and rarity are rough guesses against a mature ladder season, not a price check. Rarity means how often you see one around, not just drop rate.",
      footerLegal: "Not affiliated with Blizzard Entertainment.",
      rarity: {
        "Common": "Common", "Uncommon": "Uncommon", "Rare": "Rare",
        "Very Rare": "Very Rare", "Mythic": "Mythic"
      }
    }
  };

  var app = document.getElementById("app");
  var langbarEl = document.getElementById("langbar");

  /* Toggle a socketed item between empty and filled (bound once). */
  if (app) app.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest ? e.target.closest(".sprite-toggle") : null;
    if (!btn) return;
    var col = btn.closest(".tip-col");
    if (!col) return;
    var on = col.classList.toggle("show-fill");
    btn.textContent = on ? "show empty" : (btn.getAttribute("data-label") || "socket it");
  });

  var state = { item: null, pinned: false, lang: DEFAULT_LANG };

  /* ---------- i18n helpers ---------- */

  function resolveLang() {
    var params = new URLSearchParams(window.location.search);
    var candidates = [
      params.get("lang"),
      (function () { try { return localStorage.getItem("d2iotd_lang"); } catch (e) { return null; } })(),
      (navigator.language || "").slice(0, 2)
    ];
    for (var i = 0; i < candidates.length; i++) {
      var c = candidates[i];
      if (c && hasLang(c)) return c;
    }
    return DEFAULT_LANG;
  }

  function hasLang(code) {
    for (var i = 0; i < AVAILABLE_LANGS.length; i++) {
      if (AVAILABLE_LANGS[i].code === code) return true;
    }
    return false;
  }

  /* Resolve a possibly-localized value to a plain string. */
  function t(val, lang) {
    if (val == null) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object") {
      if (val[lang] != null) return val[lang];
      if (val[DEFAULT_LANG] != null) return val[DEFAULT_LANG];
      for (var k in val) { if (val[k] != null) return val[k]; }
    }
    return "";
  }

  /* Look up a UI string for the active language, falling back to default. */
  function ui(key, lang) {
    var block = UI[lang] || UI[DEFAULT_LANG];
    if (block && block[key] != null) return block[key];
    return UI[DEFAULT_LANG][key] != null ? UI[DEFAULT_LANG][key] : key;
  }

  function rarityLabel(canonical, lang) {
    var block = (UI[lang] || UI[DEFAULT_LANG]).rarity || UI[DEFAULT_LANG].rarity;
    return block && block[canonical] != null ? block[canonical] : canonical;
  }

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function todayIndex(len) {
    var utcDay = Math.floor(Date.now() / MS_PER_DAY);
    return (((utcDay - ANCHOR) % len) + len) % len;
  }

  function valueIndex(tier) {
    return VALUE_SCALE.indexOf(String(tier || "").toUpperCase());
  }

  function rarityIndex(tier) {
    var t2 = String(tier || "").toLowerCase();
    for (var i = 0; i < RARITY_SCALE.length; i++) {
      if (RARITY_SCALE[i].toLowerCase() === t2) return i;
    }
    return -1;
  }

  /* Rarity has 5 steps, value has 6. Scale rarity onto the value axis
     before comparing, so "two steps apart" means the same on both.
     Returns a key so the message can be localized. */
  function mismatchFor(item) {
    var v = valueIndex(item.valueTier);
    var r = rarityIndex(item.rarityTier);
    if (v < 0 || r < 0) return null;

    var diff = v - r * ((VALUE_SCALE.length - 1) / (RARITY_SCALE.length - 1));
    if (diff >= MISMATCH_THRESHOLD) return "more";
    if (diff <= -MISMATCH_THRESHOLD) return "rarer";
    return null;
  }

  function tierClass(tier) {
    var t2 = String(tier || "").toLowerCase();
    return t2.length === 1 && VALUE_SCALE.join("").toLowerCase().indexOf(t2) >= 0 ? t2 : "f";
  }

  /* ---------- rendering ---------- */

  /* The tooltip mimics the in-game item display. It must contain ONLY what
     the game shows: name, base type, properties, required level, sockets.
     No meta text (the alias lives outside, see akaHtml).

     A tooltip line is either a plain string (default: the blue magic-property
     color) or an object { t: "...", c: "white" } to set the in-game color.
     Colors: white (base text, runes, required level), blue (default, magic
     properties), grey, red (unmet requirement), gold. The text field itself
     may be localized like any other prose. */
  function tLineClass(c) {
    switch (c) {
      case "white": return "t-white";
      case "grey": case "gray": return "t-grey";
      case "red": return "t-red";
      case "gold": return "t-gold";
      default: return "";
    }
  }

  function tooltipLineHtml(line, lang) {
    var text, cls = "";
    if (line && typeof line === "object" && (("t" in line) || ("text" in line))) {
      text = t("t" in line ? line.t : line.text, lang);
      cls = tLineClass(line.c || line.color);
    } else {
      text = t(line, lang);
    }
    return '<div class="t-line ' + cls + '">' + esc(text) + "</div>";
  }

  function tooltipHtml(item, lang) {
    var lines = (item.tooltip || []).map(function (l) {
      return tooltipLineHtml(l, lang);
    }).join("");

    // Stats the socketables add, shown only in the filled state.
    var fillLines = "";
    if (Array.isArray(item.fillTip) && item.fillTip.length) {
      fillLines = item.fillTip.map(function (l) {
        return tooltipLineHtml(l, lang).replace('class="t-line', 'class="t-line t-fill');
      }).join("");
    }

    var typeVal = t(item.type, lang);

    return '' +
      '<div class="tooltip q-' + esc(item.quality || "normal") + '">' +
        (t(item.fillName, lang) ? '<div class="t-name t-name-fill">' + esc(t(item.fillName, lang)) + "</div>" : "") +
        '<div class="t-name">' + esc(t(item.name, lang)) + "</div>" +
        (typeVal ? '<div class="t-type">' + esc(typeVal) + "</div>" : "") +
        ((lines || fillLines) ? '<div class="t-lines">' + lines + fillLines + "</div>" : "") +
      "</div>";
  }

  /* Item title under the header: the plain-language identity of the day's
     item, so there is never confusion about what you are looking at.
     `title` overrides when the in-game name in the tooltip would mislead
     (the Occy Ring displays in game as a Stone of Jordan, for instance).
     `alias`, the trader nickname, becomes a small subtitle. */
  function titleHtml(item, lang) {
    var title = t(item.title, lang) || t(item.name, lang);
    var sub = t(item.alias, lang);
    return '<div class="item-title reveal r1"><h1>' + esc(title) + "</h1>" +
      (sub ? '<div class="item-sub">' + esc(sub) + "</div>" : "") +
      "</div>";
  }

  /* Small secondary detail, not the hero. Collapses entirely when there is
     no sprite or the image fails, so there is never an empty box. */
  function spriteHtml(item, lang) {
    if (!item.sprite) return "";
    var fill = Array.isArray(item.fill) ? item.fill : null;
    var count = item.sockets || (fill ? fill.length : 0);

    var socketsOverlay = "";
    if (count > 0) {
      // Columns follow the item's real inventory width. A single-column base
      // (an orb, a wand) stacks its sockets vertically; a two-wide base fills
      // row by row. Each row is centered, so a lone leftover socket sits in the
      // middle rather than off to one side, matching how the game draws them.
      var invW = (item.grid && item.grid[0]) ? item.grid[0] : Math.min(count, 2);
      var cols = Math.min(invW, count);
      var rows = "";
      for (var i = 0; i < count; i += cols) {
        var rowCells = "";
        for (var j = i; j < Math.min(i + cols, count); j++) {
          var gem = fill && fill[j] ? '<img class="socket-gem" src="' + esc(fill[j]) + '" alt="">' : "";
          rowCells += '<span class="socket">' + gem + "</span>";
        }
        rows += '<div class="socket-row">' + rowCells + "</div>";
      }
      socketsOverlay = '<div class="sockets" aria-hidden="true">' + rows + "</div>";
    }

    var label = t(item.fillLabel, lang) || "socket it";
    return '<div class="sprite">' +
      '<div class="sprite-stage">' +
        '<img class="sprite-base" src="' + esc(item.sprite) + '" alt="' + esc(t(item.name, lang)) + ' sprite" ' +
        'onerror="var s=this.closest(&quot;.sprite&quot;);if(s){s.remove()}">' +
        socketsOverlay +
      "</div>" +
      (fill && fill.length ? '<button type="button" class="sprite-toggle" data-label="' + esc(label) + '">' + esc(label) + "</button>" : "") +
      "</div>";
  }

  function tagsHtml(item, lang) {
    var vc = tierClass(item.valueTier);
    return '' +
      '<div class="tags">' +
        '<span class="tag tag-' + vc + '">' +
          esc(ui("valueLabel", lang)) + " <b>" + esc(item.valueTier) + "</b>" +
        "</span>" +
        '<span class="tag rarity" title="' + esc(ui("rarityMeaning", lang)) + '">' +
          esc(ui("rarityLabel", lang)) + " <b>" + esc(rarityLabel(item.rarityTier, lang)) + "</b>" +
        "</span>" +
        (item.era
          ? '<span class="tag era era-' + esc(String(t(item.era, lang)).toLowerCase().replace(/[^a-z0-9]+/g, "-")) + '" title="' + esc(ui("eraMeaning", lang)) + '">' +
              esc(ui("eraLabel", lang)) + " <b>" + esc(t(item.era, lang)) + "</b>" +
            "</span>"
          : "") +
        (item.lastPatch
          ? '<span class="tag legacy" title="' + esc(ui("lastPatchMeaning", lang)) + '">' +
              esc(ui("lastPatchLabel", lang)) + " <b>" + esc(t(item.lastPatch, lang)) + "</b>" +
            "</span>"
          : "") +
        (item.illicit
          ? '<span class="tag illicit illicit-' + esc(String(t(item.illicit, lang)).toLowerCase().replace(/[^a-z0-9]+/g, "-")) + '" title="' + esc(ui("illicitMeaning", lang)) + '">' +
              "<b>" + esc(t(item.illicit, lang)) + "</b>" +
            "</span>"
          : "") +
      "</div>";
  }

  function sectionHtml(title, body, cls) {
    if (!body) return "";
    return "<section" + (cls ? ' class="' + cls + '"' : "") +
      "><h2>" + esc(title) + "</h2><p>" + esc(body) + "</p></section>";
  }

  /* Headingless italic flavor text, like an in-game lore tooltip. Used for
     the "why" and "history" prose so they read as description, not sections. */
  function flavorHtml(body, cls) {
    if (!body) return "";
    return '<p class="flavor ' + cls + '">' + esc(body) + "</p>";
  }

  function render() {
    var item = state.item;
    var lang = state.lang;
    var mismatchKey = mismatchFor(item);
    var mismatchText = mismatchKey === "more" ? ui("mismatchMore", lang)
      : mismatchKey === "rarer" ? ui("mismatchRarer", lang) : "";

    app.innerHTML =
      titleHtml(item, lang) +
      '<div class="item-head reveal r2">' +
        '<div class="tip-col">' +
          tooltipHtml(item, lang) +
          spriteHtml(item, lang) +
          tagsHtml(item, lang) +
          (mismatchText ? '<div class="mismatch-note">' + esc(mismatchText) + "</div>" : "") +
        "</div>" +
      "</div>" +

      flavorHtml(t(item.why, lang), "reveal r3") +
      flavorHtml(t(item.history, lang), "reveal r4") +

      (t(item.ifYouFind, lang)
        ? '<section class="reveal r5"><h2>' + esc(ui("findTitle", lang)) + "</h2>" +
            '<div class="find"><p>' + esc(t(item.ifYouFind, lang)) + "</p></div>" +
          "</section>"
        : "") +
      (t(item.uncertain, lang)
        ? '<section class="reveal r5"><p class="uncertain">' + esc(t(item.uncertain, lang)) + "</p></section>"
        : "");

    renderFooter(lang);
    updateRollover();
    fitTooltip();
  }

  function renderFooter(lang) {
    var d = document.getElementById("footerDisclaimer");
    var l = document.getElementById("footerLegal");
    if (d) d.textContent = ui("footerDisclaimer", lang);
    if (l) l.textContent = ui("footerLegal", lang);
  }

  /* ---------- language switcher ---------- */

  function renderLangbar() {
    if (!langbarEl || AVAILABLE_LANGS.length < 2) return;
    langbarEl.innerHTML = AVAILABLE_LANGS.map(function (l) {
      var on = l.code === state.lang ? " on" : "";
      return '<button type="button" class="langbtn' + on + '" data-lang="' + l.code + '">' +
        esc(l.label) + "</button>";
    }).join("");

    langbarEl.querySelectorAll(".langbtn").forEach(function (b) {
      b.addEventListener("click", function () {
        var code = b.getAttribute("data-lang");
        if (!hasLang(code) || code === state.lang) return;
        state.lang = code;
        try { localStorage.setItem("d2iotd_lang", code); } catch (e) {}
        document.documentElement.setAttribute("lang", code);
        renderLangbar();
        render();
      });
    });
  }

  /* ---------- rollover countdown ---------- */

  /* D2 tooltip rows never wrap; the tooltip sizes to its longest line. On a
     narrow screen that line can be wider than the viewport, so scale the whole
     tooltip down to fit, like zooming out on a screenshot. */
  function fitTooltip() {
    var tip = app.querySelector(".tooltip");
    if (!tip) return;
    tip.style.transform = "none";
    tip.style.marginBottom = "";
    var avail = tip.parentNode ? tip.parentNode.clientWidth : 0;
    var natural = tip.offsetWidth;
    if (avail && natural > avail) {
      var scale = avail / natural;
      tip.style.transformOrigin = "top center";
      tip.style.transform = "scale(" + scale + ")";
      tip.style.marginBottom = (-(tip.offsetHeight * (1 - scale))) + "px";
    }
  }

  function updateRollover() {
    var el = document.getElementById("rollover");
    if (!el) return;
    var now = Date.now();
    var nextMidnight = (Math.floor(now / MS_PER_DAY) + 1) * MS_PER_DAY;
    var left = nextMidnight - now;

    var h = Math.floor(left / 3600000);
    var m = Math.floor((left % 3600000) / 60000);
    var s = Math.floor((left % 60000) / 1000);

    el.textContent = ui("nextItem", state.lang)
      .replace("{h}", h).replace("{m}", m).replace("{s}", s);
  }

  /* ---------- boot ---------- */

  function init() {
    if (typeof ITEMS === "undefined" || !ITEMS.length) {
      app.innerHTML = "<p>No items loaded.</p>";
      return;
    }

    state.lang = resolveLang();
    document.documentElement.setAttribute("lang", state.lang);

    var params = new URLSearchParams(window.location.search);
    var slug = params.get("item");
    var dayParam = params.get("day");

    var item = null;
    var pinned = false;

    if (slug) {
      for (var i = 0; i < ITEMS.length; i++) {
        if (ITEMS[i].slug === slug) { item = ITEMS[i]; pinned = true; break; }
      }
    }

    if (!item && dayParam !== null && dayParam !== "") {
      var n = parseInt(dayParam, 10);
      if (!isNaN(n)) {
        item = ITEMS[((n % ITEMS.length) + ITEMS.length) % ITEMS.length];
        pinned = true;
      }
    }

    if (!item) item = ITEMS[todayIndex(ITEMS.length)];

    state.item = item;
    state.pinned = pinned;

    renderLangbar();
    render();
    setInterval(updateRollover, 1000);
    window.addEventListener("resize", fitTooltip);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTooltip);
  }

  /* Exposed for the node self-test in research/tools. Harmless in browser. */
  if (typeof window !== "undefined") {
    window.__d2 = { t: t, ui: ui, mismatchFor: mismatchFor, todayIndex: todayIndex, tierClass: tierClass };
  }

  init();
})();
