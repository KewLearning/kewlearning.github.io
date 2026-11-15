/* ============================================================
   GRAMMAR HUB — ENGINE
   ------------------------------------------------------------
   Owns: the level selector, the drill loop (with mastery
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
  /* The steps the student actually clicked, as opposed to the ones that
     came along with them as review. The two used to look the same on the
     timeline, which made picking one step look like picking two. */
  let chosenChunks = new Set();
  let typeFilter = "all";
  let level = null;       // the level on screen; null means the three level cards
  let query = "";         // what is in the search box

  /* ---------------- ENGLISH FIRST, JAPANESE ON REQUEST ----------------
     Andrew's call, November 2026: this is not an immersion school, and a
     beginner cannot find じょし by looking for it. Every tile reads English
     first with the Japanese pattern underneath, and the EN button turns the
     English off for a student who would rather have Japanese titles.

     That choice sticks. It is written once for the whole site, so a student
     sets it here and every app opens the way they left it, and it is the
     same EN button in the same corner as the twelve apps that already carry
     one: one control to learn rather than a mechanism to work out.

     What this replaces: a spring-loaded lever that stepped every label
     through kanji, kana, romaji and English and then crept back to kanji on
     its own. It was the best thing on the page and the wrong thing for a
     student who had come to find the particles. lever.js keeps it for the
     apps built around it.                                               */
  const LANG_KEY = "japuri:en";
  let showEn = true;

  function readLang() {
    try { showEn = window.localStorage.getItem(LANG_KEY) !== "0"; }
    catch (e) { showEn = true; }
  }
  function paintLang() {
    document.body.classList.toggle("noen", !showEn);
    const b = $("enBtn");
    if (b) {
      b.classList.toggle("off", !showEn);
      b.setAttribute("aria-pressed", showEn ? "true" : "false");
      b.title = showEn ? "Turn the English titles off" : "Turn the English titles back on";
    }
  }
  function setLang(on) {
    showEn = on;
    try { window.localStorage.setItem(LANG_KEY, on ? "1" : "0"); } catch (e) {}
    paintLang();
  }

  /* Band names survive only as report and export labels. The selection
     screen used to be a band grid, then a year timeline; it is neither now. */
  function bandMeta(b) { return (window.BAND_META && window.BAND_META[b]) || { head: b, long: b, teacher: b, cur: "", show: true }; }

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

  /* ---------------- THE SELECTOR ----------------
     Three levels; then one level's patterns, under the seven headings a
     student reads. Nothing on this screen names a year.

     WHAT THIS REPLACES, AND WHY. The screen used to be the whole Prep-to-12
     sequence at once: 13 strand rows by 13 year columns, 38 patterns on
     screen together. It is a good diagram and a bad front door, and Andrew
     named the symptom exactly: "students just don't know where to start".
     A composite Year 10/11/12 room makes the year axis worse than useless,
     because three answers are right at the same desk.

     So: pick a level, read English, see the pattern in Japanese underneath,
     tap it. Years still order the patterns inside a heading, so a strand
     still gets harder left to right, and picking a pattern still brings the
     step before it along as review. Nothing is locked, and nothing is
     hidden: the search box reaches all 38 from the first screen.          */

  /* A pattern covers one or more skill nodes, by id, and is only "chosen"
     when every node of it that has items is queued. */
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

  function groupOf(strand) { return (window.JP_GROUPS && window.JP_GROUPS[strand]) || strand; }
  function levelMeta(id) { return (window.JP_LEVELS || []).find((l) => l.id === id) || null; }

  /* every pattern, flattened, with the strand it came from and the pattern
     before it in that strand (the one that comes along as review) */
  function allPatterns() {
    const out = [];
    Object.entries(window.JP_CHUNKS).forEach(([strand, chunks]) => {
      chunks.forEach((chunk, i) => {
        out.push({ strand: strand, chunk: chunk, prev: i > 0 ? chunks[i - 1] : null,
                   group: groupOf(strand), n: chunkItemCount(chunk) });
      });
    });
    return out;
  }

  function levelCount(id) {
    const list = allPatterns().filter((e) => e.chunk.level === id && e.n);
    return { patterns: list.length, items: list.reduce((a, e) => a + e.n, 0) };
  }

  /* Tap a pattern: queue it, and bring the step before it in the same strand
     along as review. Liam's rule from the English hub, kept. */
  function togglePattern(entry) {
    const on = !chunkSelected(entry.chunk);
    if (on) chosenChunks.add(entry.chunk.title);
    else chosenChunks.delete(entry.chunk.title);
    const apply = (c) => c.covers.forEach((id) => {
      const sk = skillById(id);
      if (!sk || !itemsFor(sk).length) return;
      if (on) selectedSkills.add(id); else selectedSkills.delete(id);
    });
    apply(entry.chunk);
    if (on && entry.prev && chunkItemCount(entry.prev)) apply(entry.prev);
    renderSelect();
  }

  function patTile(entry) {
    const c = entry.chunk;
    const el = document.createElement("button");
    el.type = "button";
    el.className = "pat" + (entry.n ? "" : " empty");
    el.dataset.chunk = c.title;
    const en = c.en || c.title;
    const jp = c.jp || (c.t && c.t[0]) || "";
    el.innerHTML =
      '<span class="pat-en en">' + escapeHtmlE(en) + "</span>" +
      '<span class="pat-ja">' + escapeHtmlE(jp) + "</span>" +
      '<span class="pat-n">' + (entry.n ? entry.n + (entry.n === 1 ? " item" : " items")
                                        : "no items yet") + "</span>";
    if (!entry.n) {
      el.disabled = true;
      el.title = en + ". No items written for this one yet.";
      return el;
    }
    let tip = en + " · " + jp + " · " + entry.n + " items.";
    if (entry.prev && chunkItemCount(entry.prev)) {
      tip += " Picking this brings " + (entry.prev.en || entry.prev.title) + " along as review.";
    }
    if (c.needs && c.needs.length) tip += " Builds on " + c.needs.join("; ") + ".";
    el.title = tip;
    el.setAttribute("aria-label", entry.group + ": " + en + ". " + tip);
    el.addEventListener("click", () => togglePattern(entry));
    if (chunkSelected(c)) {
      if (chosenChunks.has(c.title)) el.classList.add("selected");
      else {
        el.classList.add("review");
        const why = document.createElement("span");
        why.className = "pat-why";
        why.innerHTML = '<span class="en">review</span><span class="pat-why-ja">復習</span>';
        el.appendChild(why);
      }
    }
    return el;
  }

  /* the three level cards, with what each one covers */
  function renderLevels() {
    const wrap = $("picker");
    wrap.innerHTML = "";
    const q = document.createElement("h2");
    q.className = "pick-q";
    q.textContent = "Where do you want to start?";
    wrap.appendChild(q);
    const row = document.createElement("div");
    row.className = "levels";
    (window.JP_LEVELS || []).forEach((l) => {
      const count = levelCount(l.id);
      const el = document.createElement("button");
      el.type = "button";
      el.className = "lvl";
      el.innerHTML = '<span class="lvl-name">' + escapeHtmlE(l.name) + "</span>" +
        '<span class="lvl-blurb">' + escapeHtmlE(l.blurb) + "</span>" +
        '<span class="lvl-n">' + count.patterns + " patterns · " + count.items + " items</span>";
      el.addEventListener("click", () => { level = l.id; query = ""; $("patSearch").value = ""; renderSelect(); });
      row.appendChild(el);
    });
    wrap.appendChild(row);
    const note = document.createElement("p");
    note.className = "pick-note";
    note.textContent = "Pick a level, or search for a pattern. Nothing is locked: open any level you like.";
    wrap.appendChild(note);
  }

  /* one level's patterns, or the search results, grouped under headings */
  function renderPatterns() {
    const wrap = $("picker");
    wrap.innerHTML = "";
    const searching = !!query;
    const head = document.createElement("div");
    head.className = "lvl-head";
    const back = document.createElement("button");
    back.type = "button";
    back.className = "linkbtn";
    back.textContent = "← All levels";
    back.addEventListener("click", () => { level = null; query = ""; $("patSearch").value = ""; renderSelect(); });
    head.appendChild(back);
    const name = document.createElement("span");
    name.className = "lvl-now";
    const meta = levelMeta(level);
    name.textContent = searching ? "Patterns matching “" + query + "”"
                                 : (meta ? meta.name : "");
    head.appendChild(name);
    wrap.appendChild(head);

    let list = allPatterns();
    if (searching) {
      const q = query.toLowerCase();
      list = list.filter((e) => {
        const hay = [e.chunk.en, e.chunk.jp, e.chunk.title, e.group, e.strand]
          .concat(e.chunk.t || []).join(" ").toLowerCase();
        return hay.indexOf(q) > -1;
      });
    } else {
      list = list.filter((e) => e.chunk.level === level);
    }
    if (!list.length) {
      const none = document.createElement("p");
      none.className = "pick-note";
      none.textContent = "Nothing matches that. Try a particle, a form, or a word like time or compare.";
      wrap.appendChild(none);
      return;
    }
    (window.JP_GROUP_ORDER || []).forEach((g) => {
      const mine = list.filter((e) => e.group === g);
      if (!mine.length) return;
      const h = document.createElement("h3");
      h.className = "grp";
      h.textContent = g;
      wrap.appendChild(h);
      const grid = document.createElement("div");
      grid.className = "pats";
      mine.forEach((e) => grid.appendChild(patTile(e)));
      wrap.appendChild(grid);
    });
  }

  function renderSelect() {
    if (query || level) renderPatterns(); else renderLevels();
    const picking = !!(query || level);
    $("selectTools").hidden = !picking;
    $("typeFilter").hidden = !picking;
    refreshCount();
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
      group.innerHTML = `<h3 class="grp">${escapeHtmlE(cat)}</h3>`;
      const list = document.createElement("div");
      list.className = "pools-list";
      catSkills.forEach((skill) => {
        const n = itemsFor(skill).length;
        const card = document.createElement("div");
        card.className = "pool-card" + (n ? " has-items" : " no-items");
        card.innerHTML = `<span class="pool-name">${escapeHtmlE(skill.name)}</span>` +
          (n ? `<span class="pool-count">${n} question${n === 1 ? "" : "s"}</span>`
             : `<span class="pool-count zero">0</span>`);
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
    selectedSkills.forEach((id) => { items += itemsFor(skillById(id)).length; });
    const k = selectedSkills.size;
    const chosen = chosenChunks.size;
    $("selCount").textContent = chosen
      ? `${chosen} pattern${chosen === 1 ? "" : "s"} chosen · ${items} item${items === 1 ? "" : "s"}`
      : `${k} skill${k === 1 ? "" : "s"} · ${items} item${items === 1 ? "" : "s"}`;
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
      const label = t === "all" ? "All tasks" : window.TASK_TYPES[t].label;
      return `<button class="filter-btn${t === typeFilter ? " active" : ""}" data-t="${t}">${escapeHtmlE(label)}</button>`;
    }).join("");
    wrap.querySelectorAll(".filter-btn").forEach((b) => {
      b.addEventListener("click", () => {
        typeFilter = b.dataset.t;
        wrap.querySelectorAll(".filter-btn").forEach((x) => x.classList.toggle("active", x === b));
        // drop selections that now have no items
        [...selectedSkills].forEach((id) => { if (itemsFor(skillById(id)).length === 0) selectedSkills.delete(id); });
        renderSelect();
        buildPools();
      });
    });
  }

  /* ---------------- DRILL ---------------- */

  function startSession() {
    pool = [];
    selectedSkills.forEach((id) => {
      const skill = skillById(id);
      itemsFor(skill).forEach((item, i) => {
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
    $("remainText").textContent = `${countNotMastered()} to master`;
    $("roundText").textContent = round === 1 ? "Main round" : `Mastery round ${round - 1}`;
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
      if (nextSet.length > 0) {
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

    $("reportSummary").innerHTML =
      `<div class="big-stat">${firstRight}/${total}</div>` +
      `<div class="stat-label">correct first try</div>` +
      `<p class="muted">Mastered all ${total} after ${totalAttempts} total attempt${totalAttempts === 1 ? "" : "s"}.</p>`;

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
          html += `<span class="muted">no resources mapped yet — add to skills.js → resources</span>`;
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
       pattern that owns a skill, e.g. ../grammar/#nominalisers-b4 from the
       Unit 10 hub's grammar gym. The pattern is queued, its level opens, and
       the tile pings so the student can see where they have landed. */
    function applyDeepLink() {
      document.querySelectorAll(".pat.deeplinked").forEach((n) => n.classList.remove("deeplinked"));
      const id = decodeURIComponent((location.hash || "").replace(/^#/, ""));
      if (!id) return;
      const skill = skillById(id);
      if (!skill || !itemsFor(skill).length) return;
      selectedSkills.add(id);
      // Queue exactly the skill that was asked for, and open the level that
      // holds it. A pattern can cover several skills, so it still only reads
      // as chosen when all of them are queued.
      let target = null;
      Object.values(window.JP_CHUNKS).forEach((chunks) => chunks.forEach((c) => {
        if (c.covers.indexOf(id) > -1) target = c;
      }));
      if (target && target.level) { level = target.level; query = ""; $("patSearch").value = ""; }
      renderSelect(); buildPools();
      const el = target
        ? [...document.querySelectorAll(".pat")].find((n) => n.dataset.chunk === target.title)
        : document.querySelector(".pat.selected");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("deeplinked");
      }
    }

    renderSelect();
    buildPools();
    applyDeepLink();
    window.addEventListener("hashchange", applyDeepLink);

    /* The search box reaches all 38 patterns from the first screen, so
       nothing is more than one keystroke away from a student who knows what
       they want. Typing leaves the level behind; clearing it goes back. */
    $("patSearch").addEventListener("input", () => {
      query = $("patSearch").value.trim();
      renderSelect();
    });
    $("patSearch").addEventListener("keydown", (e) => {
      if (e.key === "Escape") { $("patSearch").value = ""; query = ""; renderSelect(); }
    });

    $("selectAllBtn").addEventListener("click", () => {
      /* "all ready" means everything on screen, not everything in the bank:
         a student in Grammar basics asking for all of it does not mean the
         VCE argument patterns. */
      const shown = [...document.querySelectorAll(".pat:not(.empty)")].map((n) => n.dataset.chunk);
      Object.values(window.JP_CHUNKS).forEach((chunks) => chunks.forEach((c) => {
        if (shown.indexOf(c.title) < 0) return;
        chosenChunks.add(c.title);
        c.covers.forEach((id) => {
          const sk = skillById(id);
          if (sk && itemsFor(sk).length) selectedSkills.add(id);
        });
      }));
      renderSelect();
      buildPools();
    });
    $("selectNoneBtn").addEventListener("click", () => {
      selectedSkills.clear(); chosenChunks.clear(); renderSelect(); buildPools();
    });
    $("startBtn").addEventListener("click", startSession);

    /* EN off leaves the Japanese titles on their own, and stays off. */
    readLang();
    paintLang();
    $("enBtn").addEventListener("click", () => setLang(!showEn));

    // task area emits gh:ready when an answer is entered, gh:submit on Enter
    $("taskArea").addEventListener("gh:ready", () => { if (!graded) $("checkBtn").disabled = false; });
    $("taskArea").addEventListener("gh:submit", () => { if (!graded) onCheck(); });

    $("checkBtn").addEventListener("click", onCheck);
    $("nextBtn").addEventListener("click", onNext);
    $("quitBtn").addEventListener("click", () => show("select"));

    $("copyBtn").addEventListener("click", copyTeacher);
    $("downloadCsvBtn").addEventListener("click", downloadCsv);
    $("copyTsvBtn").addEventListener("click", copyTsv);
    $("reviewBtn").addEventListener("click", () => { startSession(); }); // re-run same selection
    $("restartBtn").addEventListener("click", () => show("select"));
  });
})();
