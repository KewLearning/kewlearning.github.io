/* ============================================================
   GRAMMAR HUB — ENGINE
   ------------------------------------------------------------
   Owns: the matrix selector, the drill loop (with mastery
   rounds, adapted from Holly's "Name that Tense"), scoring, and
   the report. Knows nothing about specific grammar — it dispatches
   every item to TASK_TYPES[item.type].

   Screen flow:   select  ->  task  ->  report
   Mastery loop:  wrong items come back each round until every
                  selected item has been answered correctly once.
   ============================================================ */

(function () {
  const $ = (id) => document.getElementById(id);
  const screens = {};

  // ---- run state ----
  let pool = [];          // every queued entry {uid, skillId, skillName, category, band, item}
  let currentSet = [];    // this round's queue
  let nextSet = [];       // items that missed, for next round
  let idx = 0;
  let round = 1;
  let graded = false;     // current item already checked?
  let attempts = {};      // uid -> number of attempts
  let correctEver = {};   // uid -> bool
  let firstPass = {};     // uid -> bool (correct on first ever attempt)
  let log = [];           // {round, skill, type, stimulus, response, result}
  let selectedSkills = new Set();
  let typeFilter = "all";
  let showAllBands = false; // teacher toggle: reveal script/words (VIC F-2, 3-4) columns

  /* ---------------- JAPANESE-FIRST CHROME ----------------
     The menus default to Japanese; the cycler steps every label through
     kanji -> kana -> romaji -> English (Liam's spec). Static labels (title,
     subtitle, report heading) also cycle individually when tapped. Action
     buttons follow the global mode only, because clicking them has to fire
     the action. Item content (prompts, options, explanations) is not
     touched here — that is a content-lane job (J11).
     Forms: [kanji, kana, romaji, English]. For katakana loanwords the kanji
     and kana forms are identical — katakana IS the phonetic script there. */
  const UI_STRINGS = {
    title:      ["日本語文法ハブ", "にほんごぶんぽうハブ", "Nihongo Bunpō Hub", "Japanese Grammar Hub"],
    subtitle:   ["スキルを選んで、練習して、レポート", "スキルをえらんで、れんしゅうして、レポート",
                 "sukiru o erande, renshū shite, repōto", "pick a skill, practise, get a report"],
    selectAll:  ["全部選ぶ", "ぜんぶえらぶ", "zenbu erabu", "Select all ready"],
    clear:      ["クリア", "クリア", "kuria", "Clear"],
    start:      ["練習スタート", "れんしゅうスタート", "renshū sutāto", "Start practising"],
    exit:       ["やめる", "やめる", "yameru", "Exit"],
    check:      ["チェック", "チェック", "chekku", "Check"],
    next:       ["次へ", "つぎへ", "tsugi e", "Next"],
    done:       ["終わりました！", "おわりました！", "owarimashita!", "Session complete"],
    again:      ["もう一度", "もういちど", "mō ichido", "Run again"],
    newSel:     ["選び直す", "えらびなおす", "erabinaosu", "New selection"],
    allTasks:   ["全部", "ぜんぶ", "zenbu", "All tasks"],
    identify:   ["見分ける", "みわける", "miwakeru", "Identify"],
    gapfill:    ["穴埋め", "あなうめ", "anaume", "Gap fill"],
    transform:  ["変える", "かえる", "kaeru", "Transform"],
    order:      ["並べる", "ならべる", "naraberu", "Order"],
    poolReading:["読む練習", "よむれんしゅう", "yomu renshū", "Reading Practice"],
    poolVocab:  ["トピックの言葉", "トピックのことば", "topikku no kotoba", "Topic Vocabulary"],
  };
  // Stage 1 is ADDITIVE where the label has kanji: furigana appears above it.
  const RUBY = {
    title: "<ruby>\u65e5\u672c\u8a9e<rt>\u306b\u307b\u3093\u3054</rt></ruby><ruby>\u6587\u6cd5<rt>\u3076\u3093\u307d\u3046</rt></ruby>\u30cf\u30d6",
    subtitle: "\u30b9\u30ad\u30eb\u3092<ruby>\u9078<rt>\u3048\u3089</rt></ruby>\u3093\u3067\u3001<ruby>\u7df4\u7fd2<rt>\u308c\u3093\u3057\u3085\u3046</rt></ruby>\u3057\u3066\u3001\u30ec\u30dd\u30fc\u30c8",
    selectAll: "<ruby>\u5168\u90e8<rt>\u305c\u3093\u3076</rt></ruby><ruby>\u9078<rt>\u3048\u3089</rt></ruby>\u3076",
    start: "<ruby>\u7df4\u7fd2<rt>\u308c\u3093\u3057\u3085\u3046</rt></ruby>\u30b9\u30bf\u30fc\u30c8",
    next: "<ruby>\u6b21<rt>\u3064\u304e</rt></ruby>\u3078",
    done: "<ruby>\u7d42<rt>\u304a</rt></ruby>\u308f\u308a\u307e\u3057\u305f\uff01",
    again: "\u3082\u3046<ruby>\u4e00\u5ea6<rt>\u3044\u3061\u3069</rt></ruby>",
    newSel: "<ruby>\u9078<rt>\u3048\u3089</rt></ruby>\u3073<ruby>\u76f4<rt>\u306a\u304a</rt></ruby>\u3059",
    allTasks: "<ruby>\u5168\u90e8<rt>\u305c\u3093\u3076</rt></ruby>",
    identify: "<ruby>\u898b\u5206<rt>\u307f\u308f</rt></ruby>\u3051\u308b",
    gapfill: "<ruby>\u7a74\u57cb<rt>\u3042\u306a\u3046</rt></ruby>\u3081",
    transform: "<ruby>\u5909<rt>\u304b</rt></ruby>\u3048\u308b",
    order: "<ruby>\u4e26<rt>\u306a\u3089</rt></ruby>\u3079\u308b",
    poolReading: "<ruby>\u8aad<rt>\u3088</rt></ruby>\u3080<ruby>\u7df4\u7fd2<rt>\u308c\u3093\u3057\u3085\u3046</rt></ruby>",
    poolVocab: "\u30c8\u30d4\u30c3\u30af\u306e<ruby>\u8a00\u8449<rt>\u3053\u3068\u3070</rt></ruby>",
  };

  /* Metalanguage and action buttons read in English whatever the lever
     says (Liam, Sept 2026: "all metalanguage should be English by default").
     The lever still cycles the title, the report heading and the items'
     own Japanese. The four-form arrays are kept above for the record. */
  ["selectAll", "clear", "start", "exit", "check", "next", "again", "newSel",
   "allTasks", "identify", "gapfill", "transform", "order", "poolReading", "poolVocab"].forEach((k) => {
    const en = UI_STRINGS[k][3];
    UI_STRINGS[k] = [en, en, en, en];
    delete RUBY[k];
  });
  UI_STRINGS.newSel = ["Back to the skills", "Back to the skills", "Back to the skills", "Back to the skills"];

  /* A session is a sample, not the whole bank: up to PER_SKILL questions
     from each chosen skill, one main round, one second go at the misses,
     then the report and back to the matrix with the scores on it. */
  const PER_SKILL = 5;
  let lastScores = {};  // skillId -> {right, total} from the last session, shown on the matrix

  let uiForm = 0; // the page stage, kept in step with the lever

  // pick from a four-form [kanji, kana, romaji, English] array by stage
  function tForm(arr, stage) {
    if (!arr) return null;
    const f = stage === undefined ? uiForm : stage;
    return arr[f] || arr[3];
  }
  function jtText(key, formOverride) {
    const forms = UI_STRINGS[key];
    if (!forms) return null;
    const f = formOverride === undefined ? uiForm : formOverride;
    return forms[f] || forms[3];
  }
  const applyLang = () => window.HubLever.apply();

  function visibleBands() {
    return window.BANDS.filter((b) => showAllBands || (window.BAND_META[b] && window.BAND_META[b].show));
  }
  function bandMeta(b) { return (window.BAND_META && window.BAND_META[b]) || { head: b, long: b, teacher: b, cur: "", show: true }; }
  // First band (in curriculum order) at which a category has any items, for
  // the "this row starts at X" message on cells before that band.
  function firstBandFor(cat) {
    for (const b of window.BANDS) {
      if (window.SKILLS.some((s) => s.category === cat && s.band === b)) return b;
    }
    return null;
  }

  function show(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
  }

  /* ---------------- SELECT SCREEN ---------------- */

  function skillById(id) { return window.SKILLS.find((s) => s.id === id); }
  function itemsFor(skill) {
    if (typeFilter === "all") return skill.items;
    return skill.items.filter((it) => it.type === typeFilter);
  }

  /* ---------------- YEAR TIMELINE (the sequence view) ----------------
     Prep to Year 12 across the top; one row per strand; each chunk is a
     teaching step placed on the years it is taught across. A strand read
     left to right is the same skill getting harder, which is the point of
     the view. Ported from the non-EAL year view in Liam's English hub. */

  function chunkSkills(chunk) {
    return chunk.covers.map(skillById).filter(Boolean);
  }
  function chunkItemCount(chunk) {
    return chunkSkills(chunk).reduce((n, s) => n + itemsFor(s).length, 0);
  }
  function chunkSelected(chunk) {
    const ids = chunk.covers.filter((id) => skillById(id) && itemsFor(skillById(id)).length);
    return ids.length > 0 && ids.every((id) => selectedSkills.has(id));
  }

  function buildMatrix() {
    const wrap = $("matrix");
    wrap.innerHTML = "";
    const years = window.JP_YEARS;

    // the year axis: quiet numbers, then two grouped curriculum bars
    const head = document.createElement("div");
    head.className = "tl-row tl-head";
    head.innerHTML = `<div class="tl-label"></div>` +
      years.map((y, i) => {
        const label = y === "F" ? ["\u30d7\u30ec\u30c3\u30d7", "\u30d7\u30ec\u30c3\u30d7", "pureppu", "Prep"][uiForm] : y;
        const teacher = i <= 10 ? `Victorian Curriculum, Level ${y}` : `VCE Units ${i === 11 ? "1 and 2" : "3 and 4"}`;
        return `<div class="tl-year" title="${escapeHtmlE(teacher)}">${escapeHtmlE(label)}</div>`;
      }).join("");
    wrap.appendChild(head);

    const bars = document.createElement("div");
    bars.className = "tl-row tl-bars";
    bars.innerHTML = `<div class="tl-label"></div>` +
      `<div class="tl-bar" data-cur="VIC" style="grid-column:2 / 13" title="Prep to Year 10 follow the Victorian Curriculum F\u201310 Japanese"><span>${["\u30d3\u30af\u30c8\u30ea\u30a2\u5dde\u30ab\u30ea\u30ad\u30e5\u30e9\u30e0 F\u201310", "\u30d3\u30af\u30c8\u30ea\u30a2\u3057\u3085\u3046\u30ab\u30ea\u30ad\u30e5\u30e9\u30e0 F\u201310", "Bikutoria-sh\u016b karikyuramu F\u201310", "Victorian Curriculum F\u201310"][uiForm]}</span></div>` +
      `<div class="tl-bar" data-cur="VCE" style="grid-column:13 / 15" title="Years 11 and 12 follow the VCE Japanese Second Language study design"><span>VCE</span></div>`;
    wrap.appendChild(bars);

    Object.entries(window.JP_CHUNKS).forEach(([strand, chunks]) => {
      const row = document.createElement("div");
      row.className = "tl-row";
      const meta = (window.CATEGORY_META && window.CATEGORY_META[strand]) || { prescribedBy: "" };
      // row-level fact, shown once on the label instead of on every card
      const chipWords = {
        VCE: ["VCE\u30ea\u30b9\u30c8", "VCE\u30ea\u30b9\u30c8", "VCE risuto", "VCE list"],
        PROGRAM: ["\u5b66\u6821", "\u304c\u3063\u3053\u3046", "gakk\u014d", "school"],
      };
      const chip = meta.prescribedBy === "VCE"
        ? `<span class="row-chip chip-vce" title="On the VCE prescribed grammar list">${chipWords.VCE[uiForm]}</span>`
        : meta.prescribedBy === "PROGRAM"
          ? `<span class="row-chip chip-prog" title="School-designed. Not on the VCE prescribed grammar list.">${chipWords.PROGRAM[uiForm]}</span>`
          : "";
      const strandLabel = tForm(window.JT_STRANDS && window.JT_STRANDS[strand]) || strand;
      row.innerHTML = `<div class="tl-label"><span class="tl-strand" title="${escapeHtmlE((window.JT_STRANDS && window.JT_STRANDS[strand] || [strand])[3] || strand)}">${escapeHtmlE(strandLabel)}</span>${chip}</div>`;

      chunks.forEach((chunk, ci) => {
        const n = chunkItemCount(chunk);
        const el = document.createElement("div");
        el.className = "tl-chunk" + (n ? " has-items" : " no-items");
        el.dataset.chunk = chunk.title;   // lets a deep link find its own step
        // +2: CSS grid is 1-indexed and column 1 is the strand label
        el.style.gridColumn = `${chunk.y0 + 2} / ${chunk.y1 + 3}`;
        const yearsLabel = uiForm <= 1 ? `${chunk.years}\u5e74` : `Year${chunk.years.indexOf("\u2013") > -1 ? "s" : ""} ${chunk.years}`;
        const chunkTitle = tForm(chunk.t) || chunk.title;
        const noneWord = ["\u307e\u3060\u306a\u3057", "\u307e\u3060\u306a\u3057", "mada nashi", "no items yet"][uiForm];
        let score = "";
        const sc = chunk.covers.reduce((a, id) => { const r = lastScores[id]; if (r) { a.right += r.right; a.total += r.total; } return a; }, { right: 0, total: 0 });
        if (sc.total) {
          const pct = sc.right / sc.total;
          score = `<span class="tl-score ${pct === 1 ? "ok" : pct >= 0.5 ? "mid" : "low"}" title="Last session, correct first try">${sc.right}/${sc.total}</span>`;
        }
        el.innerHTML = `<span class="tl-title">${escapeHtmlE(chunkTitle)}</span>` +
          `<span class="tl-meta">${escapeHtmlE(yearsLabel)}${n ? ` \u00b7 ${Math.min(n, PER_SKILL * chunkSkills(chunk).length)}` : ` \u00b7 ${noneWord}`}</span>` + score;

        if (n) {
          const prev = ci > 0 ? chunks[ci - 1] : null;
          el.title = prev
            ? `${yearsLabel}, ${n} items. Builds on: ${prev.title}. Picking this one brings that along as review.`
            : `${yearsLabel}, ${n} items. The first step in this row.`;
          if (chunk.needs && chunk.needs.length) {
            el.title += ` Also builds on ${chunk.needs.join("; ")}.`;
          }
          el.setAttribute("aria-label", `${strand}: ${chunk.title}. ${el.title}`);
          el.addEventListener("click", () => {
            const on = !chunkSelected(chunk);
            const apply = (c) => c.covers.forEach((id) => {
              const s = skillById(id);
              if (!s || !itemsFor(s).length) return;
              if (on) selectedSkills.add(id); else selectedSkills.delete(id);
            });
            apply(chunk);
            // the step before it comes along as review (Liam's English hub rule)
            if (on && prev && chunkItemCount(prev)) apply(prev);
            buildMatrix();
          });
          if (chunkSelected(chunk)) el.classList.add("selected");
        }
        row.appendChild(el);
      });
      wrap.appendChild(row);
    });
    buildLegend();
    refreshCount();
  }

  function buildLegend() {
    const legends = [
      "\u30d6\u30ed\u30c3\u30af\u306f\u3001\u306a\u3089\u3046\u5e74\u306b\u7f6e\u304b\u308c\u305f\u5b66\u7fd2\u30b9\u30c6\u30c3\u30d7\u3067\u3059\u3002\u884c\u3092\u5de6\u304b\u3089\u53f3\u3078\u8aad\u3080\u3068\u3001\u540c\u3058\u30b9\u30ad\u30eb\u304c\u3060\u3093\u3060\u3093\u96e3\u3057\u304f\u306a\u308a\u307e\u3059\u3002\u30b9\u30c6\u30c3\u30d7\u3092\u30af\u30ea\u30c3\u30af\u3059\u308b\u3068\u7df4\u7fd2\u3067\u304d\u307e\u3059\u3002\u524d\u306e\u30b9\u30c6\u30c3\u30d7\u3082\u5fa9\u7fd2\u3068\u3057\u3066\u4e00\u7dd2\u306b\u5165\u308a\u307e\u3059\u3002\u30ed\u30c3\u30af\u306f\u3042\u308a\u307e\u305b\u3093\u3002",
      "\u30d6\u30ed\u30c3\u30af\u306f\u3001\u306a\u3089\u3046\u3068\u3057\u306b\u304a\u304b\u308c\u305f\u304c\u304f\u3057\u3085\u3046\u30b9\u30c6\u30c3\u30d7\u3067\u3059\u3002\u304e\u3087\u3046\u3092\u3072\u3060\u308a\u304b\u3089\u307f\u304e\u3078\u3088\u3080\u3068\u3001\u304a\u306a\u3058\u30b9\u30ad\u30eb\u304c\u3060\u3093\u3060\u3093\u3080\u305a\u304b\u3057\u304f\u306a\u308a\u307e\u3059\u3002\u30b9\u30c6\u30c3\u30d7\u3092\u30af\u30ea\u30c3\u30af\u3059\u308b\u3068\u308c\u3093\u3057\u3085\u3046\u3067\u304d\u307e\u3059\u3002\u307e\u3048\u306e\u30b9\u30c6\u30c3\u30d7\u3082\u3075\u304f\u3057\u3085\u3046\u3068\u3057\u3066\u3044\u3063\u3057\u3087\u306b\u306f\u3044\u308a\u307e\u3059\u3002\u30ed\u30c3\u30af\u306f\u3042\u308a\u307e\u305b\u3093\u3002",
      "Burokku wa, narau toshi ni okareta gakush\u016b suteppu desu. Gy\u014d o hidari kara migi e yomu to, onaji sukiru ga dandan muzukashiku narimasu. Suteppu o kurikku suru to rensh\u016b dekimasu. Mae no suteppu mo fukush\u016b to shite issho ni hairimasu. Rokku wa arimasen.",
      "Each block is a teaching step, placed on the years it is usually taught. Read a row left to right and you are watching one skill get harder. Click a step to practise it \u2014 the step before comes along as review. Nothing is locked.",
    ];
    $("matrixLegend").textContent = legends[uiForm];
    const btn = $("bandToggleBtn");
    if (btn) btn.style.display = "none";
  }

  function buildPools() {
    const section = $("poolsSection");
    const wrap = $("poolsList");
    wrap.innerHTML = "";
    const poolCats = window.POOLS || [];
    const poolSkills = window.SKILLS.filter((s) => poolCats.includes(s.category));
    if (!poolSkills.length) { section.style.display = "none"; return; }
    section.style.display = "";
    poolCats.forEach((cat) => {
      const catSkills = poolSkills.filter((s) => s.category === cat);
      if (!catSkills.length) return;
      const group = document.createElement("div");
      group.className = "pools-group";
      const poolKey = cat === "Reading Practice" ? "poolReading" : cat === "Topic Vocabulary" ? "poolVocab" : "";
      group.innerHTML = `<h3${poolKey ? ` data-jt="${poolKey}"` : ""}>${escapeHtmlE(jtText(poolKey) || cat)}</h3>`;
      const list = document.createElement("div");
      list.className = "pools-list";
      catSkills.forEach((skill) => {
        const n = itemsFor(skill).length;
        const card = document.createElement("div");
        card.className = "pool-card" + (n ? " has-items" : " no-items");
        card.innerHTML = `<span class="pool-name" title="${escapeHtmlE((skill.nameT || [skill.name])[3] || skill.name)}">${escapeHtmlE(tForm(skill.nameT) || skill.name)}</span>` +
          (n ? `<span class="pool-count">${uiForm <= 1 ? `${n}\u554f` : uiForm === 2 ? `mondai ${n}` : `${n} question${n === 1 ? "" : "s"}`}</span>` : `<span class="pool-count zero">0</span>`);
        if (n) {
          card.addEventListener("click", () => {
            if (selectedSkills.has(skill.id)) selectedSkills.delete(skill.id);
            else selectedSkills.add(skill.id);
            card.classList.toggle("selected");
            refreshCount();
          });
          if (selectedSkills.has(skill.id)) card.classList.add("selected");
        }
        list.appendChild(card);
      });
      group.appendChild(list);
      wrap.appendChild(group);
    });
  }

  function refreshCount() {
    let items = 0;
    selectedSkills.forEach((id) => { items += Math.min(PER_SKILL, itemsFor(skillById(id)).length); });
    const k = selectedSkills.size;
    $("selCount").textContent = `${k} skill${k === 1 ? "" : "s"} · ${items} question${items === 1 ? "" : "s"}`;
    $("startBtn").disabled = items === 0;
  }

  function buildTypeFilter() {
    const wrap = $("typeFilter");
    // Derived from the content, so a new task type appears in the filter
    // the moment an item uses it — no engine edit needed (closes the lane
    // leak noted in SPEC §5). Order follows first appearance in the bank.
    const present = [];
    window.SKILLS.forEach((s) => s.items.forEach((it) => {
      if (window.TASK_TYPES[it.type] && !present.includes(it.type)) present.push(it.type);
    }));
    const types = ["all"].concat(present);
    wrap.innerHTML = types.map((t) => {
      const key = t === "all" ? "allTasks" : t;
      const label = jtText(key) || window.TASK_TYPES[t].label;
      return `<button class="filter-btn${t === typeFilter ? " active" : ""}" data-t="${t}" data-jt="${UI_STRINGS[key] ? key : ""}">${escapeHtmlE(label)}</button>`;
    }).join("");
    wrap.querySelectorAll(".filter-btn").forEach((b) => {
      b.addEventListener("click", () => {
        typeFilter = b.dataset.t;
        wrap.querySelectorAll(".filter-btn").forEach((x) => x.classList.toggle("active", x === b));
        // drop selections that now have no items
        [...selectedSkills].forEach((id) => { if (itemsFor(skillById(id)).length === 0) selectedSkills.delete(id); });
        buildMatrix();
        buildPools();
      });
    });
  }

  /* ---------------- DRILL ---------------- */

  function startSession() {
    pool = [];
    selectedSkills.forEach((id) => {
      const skill = skillById(id);
      const all = skill.items.map((item, i) => ({ item, i })).filter((x) => typeFilter === "all" || x.item.type === typeFilter);
      shuffle(all).slice(0, PER_SKILL).forEach(({ item, i }) => {
        pool.push({ uid: id + "#" + i, skillId: id, skillName: skill.name, category: skill.category, band: skill.band, item });
      });
    });
    shuffle(pool);
    attempts = {}; correctEver = {}; firstPass = {}; log = [];
    currentSet = [...pool]; nextSet = []; idx = 0; round = 1;
    show("task");
    showItem();
  }

  function showItem() {
    graded = false;
    const entry = currentSet[idx];
    const type = window.TASK_TYPES[entry.item.type] || window.TASK_TYPES.produce;

    $("promptText").textContent = entry.item.prompt || type.label;
    $("skillTag").textContent = entry.band
      ? `${entry.category} · ${bandMeta(entry.band).head} · ${entry.skillName}`
      : `${entry.category} · ${entry.skillName}`;

    const area = $("taskArea");
    area.innerHTML = type.render(entry.item);
    if (type.wire) type.wire(area);

    $("feedback").className = "feedback";
    $("feedback").textContent = "";
    $("checkBtn").disabled = true;
    $("checkBtn").style.display = "";
    $("nextBtn").style.display = "none";

    // progress
    const done = pool.length - countNotMastered();
    $("remainText").textContent = `${countNotMastered()} left`;
    $("roundText").textContent = round === 1 ? `${idx + 1} of ${currentSet.length}` : `Second go at the misses \u00b7 ${idx + 1} of ${currentSet.length}`;
    $("bar").style.width = Math.round((done / pool.length) * 100) + "%";
  }

  function onCheck() {
    if (graded) return;
    const entry = currentSet[idx];
    const type = window.TASK_TYPES[entry.item.type] || window.TASK_TYPES.produce;
    const response = type.collect($("taskArea"));
    if (response === null) return; // nothing entered yet

    const result = type.check(entry.item, response);
    if (type.mark) type.mark($("taskArea"), entry.item, result);

    attempts[entry.uid] = (attempts[entry.uid] || 0) + 1;
    if (attempts[entry.uid] === 1) firstPass[entry.uid] = result.correct;
    if (result.correct) correctEver[entry.uid] = true;

    log.push({ round, skill: entry.skillName, type: entry.item.type,
               stimulus: stimulusOf(entry.item),
               response, result: result.correct ? "correct" : "incorrect" });

    const fb = $("feedback");
    fb.className = "feedback " + (result.correct ? "good" : "bad");
    fb.innerHTML = (result.correct ? "✓ Correct. " : `✗ Not yet. Answer: <b>${escapeHtmlE(result.expected)}</b>. `) +
                   (entry.item.explain ? escapeHtmlE(entry.item.explain) : "");

    graded = true;
    $("checkBtn").style.display = "none";
    $("nextBtn").style.display = "";
    $("nextBtn").focus();
  }

  function onNext() {
    idx++;
    if (idx >= currentSet.length) {
      // close out the round
      nextSet = pool.filter((e) => !correctEver[e.uid]);
      if (nextSet.length > 0 && round === 1) {
        currentSet = shuffle(nextSet.slice());
        nextSet = [];
        round++;
        idx = 0;
        showItem();
      } else {
        endSession();
      }
    } else {
      showItem();
    }
  }

  function countNotMastered() { return pool.filter((e) => !correctEver[e.uid]).length; }

  /* ---------------- REPORT ---------------- */

  function endSession() {
    show("report");
    const total = pool.length;
    const firstRight = pool.filter((e) => firstPass[e.uid]).length;
    const totalAttempts = Object.values(attempts).reduce((a, b) => a + b, 0);

    const missed = total - firstRight;
    const fixed = pool.filter((e) => !firstPass[e.uid] && correctEver[e.uid]).length;
    $("reportSummary").innerHTML =
      `<div class="big-stat">${firstRight}/${total}</div>` +
      `<div class="stat-label">correct first try</div>` +
      (missed ? `<p class="muted">${fixed} of the ${missed} missed came right on the second go.</p>` : `<p class="muted">Nothing to go back over.</p>`);

    // per-skill breakdown, with per-tag sub-rows where items carry `tags`
    const bySkill = {};
    pool.forEach((e) => {
      const s = bySkill[e.skillId] = bySkill[e.skillId] || { name: e.skillName, cat: e.category, band: e.band, total: 0, right: 0, tags: {} };
      s.total++;
      if (firstPass[e.uid]) s.right++;
      (e.item.tags || []).forEach((tag) => {
        const t = s.tags[tag] = s.tags[tag] || { right: 0, total: 0 };
        t.total++;
        if (firstPass[e.uid]) t.right++;
      });
    });
    lastReport = { bySkill, firstRight, total };
    lastScores = {};
    Object.entries(bySkill).forEach(([id, s]) => { lastScores[id] = { right: s.right, total: s.total }; });
    let rows = Object.values(bySkill).map((s) => {
      const pct = Math.round((s.right / s.total) * 100);
      const cls = pct === 100 ? "ok" : pct >= 50 ? "mid" : "low";
      return `<div class="skill-row">
                <span class="skill-name">${s.band ? s.cat + " · " + bandMeta(s.band).head + " · " + s.name : s.cat + " · " + s.name}</span>
                <span class="skill-score ${cls}">${s.right}/${s.total}</span>
              </div>`;
    }).join("");
    $("reportSkills").innerHTML = `<h3>By skill (first try)</h3>${rows}`;

    // remediation hook: skills below 100% first-try, route to resources if mapped
    const weak = Object.entries(bySkill).filter(([, s]) => s.right < s.total);
    if (weak.length) {
      let html = `<h3>Practise next</h3>`;
      weak.forEach(([id, s]) => {
        const skill = skillById(id);
        html += `<div class="remed-row"><b>${s.name}</b> `;
        if (skill.resources && (skill.resources.video || (skill.resources.sheets || []).length)) {
          if (skill.resources.video) html += `<a href="${skill.resources.video}" target="_blank">video</a> `;
          (skill.resources.sheets || []).forEach((sh) => { html += `<a href="${sh.url}" target="_blank">${escapeHtmlE(sh.name)}</a> `; });
        } else {
          html += `<span class="muted">no sheet linked yet</span>`;
        }
        html += `</div>`;
      });
      $("reportRemediation").innerHTML = html;
    } else {
      $("reportRemediation").innerHTML = `<p class="muted">Every selected skill correct first try. Nothing to reteach.</p>`;
    }

    buildTeacherExport(firstRight, total, totalAttempts, bySkill);
  }

  let teacherText = "";
  let lastReport = null;
  function buildTeacherExport(firstRight, total, totalAttempts, bySkill) {
    let t = `JAPANESE GRAMMAR HUB — Teacher results\n`;
    const name = studentName();
    if (name) t += `Student: ${name}\n`;
    t += `First try: ${firstRight}/${total}   Total attempts: ${totalAttempts}\n\n`;
    t += `By skill (first try):\n`;
    Object.values(bySkill).forEach((s) => {
      t += `  ${s.band ? s.cat + " · " + bandMeta(s.band).teacher + " · " + s.name : s.cat + " · " + s.name}: ${s.right}/${s.total}\n`;
      const tags = Object.entries(s.tags || {});
      if (tags.length > 1) tags.forEach(([tag, x]) => { t += `      - ${tag}: ${x.right}/${x.total}\n`; });
    });
    t += `\nItem log:\n`;
    log.forEach((r) => { t += `  [r${r.round}] (${r.type}) ${r.skill} — "${r.response}" → ${r.result}\n`; });
    teacherText = t;
  }

  function copyTeacher() {
    if (!teacherText) return;
    buildTeacherExport(lastReport.firstRight, lastReport.total,
      Object.values(attempts).reduce((a, b) => a + b, 0), lastReport.bySkill); // refresh: name may have been typed after the report rendered
    navigator.clipboard.writeText(teacherText)
      .then(() => { $("copyNote").textContent = "Copied to clipboard."; })
      .catch(() => { $("copyNote").textContent = "Copy failed — select the report text manually."; });
  }

  /* ---- CSV / sheet-row exports (ported from the Bone-Sparrow build) ---- */
  function studentName() {
    const el = $("studentName");
    return el ? el.value.trim() : "";
  }
  function csvCell(v) {
    const s = String(v == null ? "" : v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }
  function todayStr() { return new Date().toISOString().slice(0, 10); }

  function buildCsv() {
    if (!lastReport) return "";
    const { bySkill, firstRight, total } = lastReport;
    const name = studentName(), date = todayStr();
    let csv = "name,date,category,band,skill,sub_skill,first_try,out_of\n";
    csv += [name, date, "OVERALL", "", "", "", firstRight, total].map(csvCell).join(",") + "\n";
    Object.values(bySkill).forEach((s) => {
      const bandLabel = s.band ? bandMeta(s.band).teacher : "";
      csv += [name, date, s.cat, bandLabel, s.name, "", s.right, s.total].map(csvCell).join(",") + "\n";
      const tags = Object.entries(s.tags || {});
      if (tags.length > 1) tags.forEach(([tag, t]) => {
        csv += [name, date, s.cat, bandLabel, s.name, tag, t.right, t.total].map(csvCell).join(",") + "\n";
      });
    });
    return csv;
  }
  function buildTsvRow() {
    if (!lastReport) return "";
    const { bySkill, firstRight, total } = lastReport;
    const header = ["name", "date", "first_try", "out_of"].concat(Object.values(bySkill).map((s) => `${s.cat} ${s.band ? bandMeta(s.band).teacher : ""}`.trim()));
    const values = [studentName(), todayStr(), firstRight, total].concat(Object.values(bySkill).map((s) => `${s.right}/${s.total}`));
    return header.join("\t") + "\n" + values.join("\t");
  }
  function downloadCsv() {
    const csv = buildCsv(); if (!csv) return;
    const safe = (studentName().replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "student");
    const filename = `japanese-hub-${safe}-${todayStr()}.csv`;
    try {
      const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }); // BOM so Excel reads the Japanese as UTF-8
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = filename; a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { a.remove(); URL.revokeObjectURL(url); }, 3000);
      $("copyNote").textContent = "CSV downloaded.";
    } catch (e) {
      navigator.clipboard.writeText(csv)
        .then(() => { $("copyNote").textContent = "Download blocked — CSV text copied to clipboard instead. Paste into a text file and save as .csv."; })
        .catch(() => { $("copyNote").textContent = "Download failed. Use 'Copy row for sheet' instead."; });
    }
  }
  function copyTsv() {
    const tsv = buildTsvRow(); if (!tsv) return;
    navigator.clipboard.writeText(tsv)
      .then(() => { $("copyNote").textContent = "Row copied — paste into your sheet."; })
      .catch(() => { $("copyNote").textContent = "Copy failed — try Download CSV instead."; });
  }

  /* ---------------- helpers ---------------- */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function stripTags(s) { return (s || "").replace(/<[^>]*>/g, ""); }
  // One readable line per item shape, for the teacher log.
  function stimulusOf(item) {
    if (item.sentence) return stripTags(item.sentence);
    if (item.before !== undefined || item.after !== undefined) return stripTags((item.before || "") + " ___ " + (item.after || ""));
    if (item.words) return item.words.join(" / ");
    return stripTags(item.prompt || "");
  }
  function escapeHtmlE(s) { return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    screens.select = $("selectScreen");
    screens.task = $("taskScreen");
    screens.report = $("reportScreen");

    buildTypeFilter();

    /* Deep link: another tool in the hub can send a student straight to the
       step that owns a skill, e.g. ../grammar/#nominalisers-b4 from the
       Unit 10 hub's grammar gym. The chunk is preselected and scrolled to,
       so the two apps join up instead of just cross-referencing. */
    function applyDeepLink() {
      document.querySelectorAll(".tl-chunk.deeplinked").forEach((n) => n.classList.remove("deeplinked"));
      const id = decodeURIComponent((location.hash || "").replace(/^#/, ""));
      if (!id) return;
      const skill = skillById(id);
      if (!skill || !itemsFor(skill).length) return;
      selectedSkills.add(id);
      buildMatrix(); buildPools();
      // Queue exactly the skill that was asked for, but highlight the whole
      // step that contains it: a step can cover several skills, so it only
      // renders as "selected" when all of them are queued, and the student
      // still needs to see where on the timeline they have landed.
      let target = null;
      Object.values(window.JP_CHUNKS).forEach((chunks) => chunks.forEach((c) => {
        if (c.covers.indexOf(id) > -1) target = c;
      }));
      const el = target
        ? [...document.querySelectorAll(".tl-chunk")].find((n) => n.dataset.chunk === target.title)
        : document.querySelector(".tl-chunk.selected");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        el.classList.add("deeplinked");
      }
    }

    buildMatrix();
    buildPools();
    applyDeepLink();
    window.addEventListener("hashchange", applyDeepLink);

    $("selectAllBtn").addEventListener("click", () => {
      window.SKILLS.forEach((s) => { if (s.introduced && itemsFor(s).length) selectedSkills.add(s.id); });
      buildMatrix();
      buildPools();
    });
    $("selectNoneBtn").addEventListener("click", () => { selectedSkills.clear(); buildMatrix(); buildPools(); });
    $("startBtn").addEventListener("click", startSession);

    $("bandToggleBtn").addEventListener("click", () => { showAllBands = !showAllBands; buildMatrix(); });

    // The lever itself lives in lever.js, shared by every page of the hub.
    // This page hands it its own four-form strings; it mounts the big page
    // lever, discovers section levers from data-scope, and wires tap bumps.
    window.HubLever.init({
      strings: UI_STRINGS,
      ruby: RUBY,
      onChange: (s) => {
        uiForm = s;
        if ($("selectScreen").classList.contains("active")) { buildMatrix(); buildPools(); }
        else refreshCount();
      },
    });


    // task area emits gh:ready when an answer is entered, gh:submit on Enter
    $("taskArea").addEventListener("gh:ready", () => { if (!graded) $("checkBtn").disabled = false; });
    $("taskArea").addEventListener("gh:submit", () => { if (!graded) onCheck(); });

    $("checkBtn").addEventListener("click", onCheck);
    $("nextBtn").addEventListener("click", onNext);
    $("quitBtn").addEventListener("click", () => { buildMatrix(); buildPools(); show("select"); });

    $("copyBtn").addEventListener("click", copyTeacher);
    $("downloadCsvBtn").addEventListener("click", downloadCsv);
    $("copyTsvBtn").addEventListener("click", copyTsv);
    $("reviewBtn").addEventListener("click", () => { startSession(); }); // re-run same selection
    $("restartBtn").addEventListener("click", () => { buildMatrix(); buildPools(); show("select"); });
  });
})();
