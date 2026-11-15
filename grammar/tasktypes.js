/* ============================================================
   GRAMMAR HUB — TASK TYPES (reconstructed)
   ------------------------------------------------------------
   The original tasktypes.js from the upload was missing (see
   filename mix-up notes). This is a from-scratch rebuild that
   implements the exact interface engine.js calls:
     render(item)         -> html string for #taskArea
     wire(area)            -> attach listeners; fire "gh:ready" once
                               an answer exists, "gh:submit" on Enter
     collect(area)         -> current response, or null if empty
     check(item, response) -> { correct, expected }
     mark(area, item, res) -> visual correct/incorrect state

   Uses only existing CSS classes from index.html (.stimulus,
   .options, .option, .gap-input, .cue) — no new styles, no new
   dependencies, per DESIGN_RULES.md.

   Flag for your friend: once he finds his original tasktypes.js,
   it's worth diffing against this — his may have extra polish
   (animations, a11y details) that's not reconstructed here.
   ============================================================ */

window.TASK_TYPES = (function () {
  function esc(s) {
    return (s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }

  function shuffled(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // Normalise a typed Japanese (or mixed) answer for comparison (SPEC §6):
  // NFKC unifies full-width Latin and half-width katakana; all spaces
  // (including full-width) are removed because Japanese answers carry no
  // meaningful spacing; trailing punctuation is forgiven. Kana vs kanji is
  // NOT unified — accept lists still spell out both (よんで／読んで).
  function normJa(s) {
    return (s || "")
      .normalize("NFKC")
      .replace(/[\s　]+/g, "")
      .replace(/[。、．，.,!?！？]+$/, "")
      .toLowerCase();
  }

  const identify = {
    label: "Identify",
    render(item) {
      // Shuffled on every render so the correct answer isn't always
      // in the same position (was previously always option A).
      const opts = shuffled(item.options).map(
        (opt) => `<button type="button" class="option" data-value="${esc(opt)}">${opt}</button>`
      ).join("");
      return `
        <div class="stimulus">${item.sentence}</div>
        <div class="options">${opts}</div>
      `;
    },
    wire(area) {
      const buttons = area.querySelectorAll(".option");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          buttons.forEach((b) => b.classList.remove("chosen"));
          btn.classList.add("chosen");
          area.dataset.chosen = btn.dataset.value;
          area.dispatchEvent(new CustomEvent("gh:ready", { bubbles: true }));
        });
      });
    },
    collect(area) {
      return area.dataset.chosen || null;
    },
    check(item, response) {
      return { correct: response === item.answer, expected: item.answer };
    },
    mark(area, item) {
      const buttons = area.querySelectorAll(".option");
      buttons.forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.value === item.answer) btn.classList.add("correct");
        else if (btn.dataset.value === area.dataset.chosen) btn.classList.add("incorrect");
      });
    }
  };

  const gapfill = {
    label: "Gap fill",
    render(item) {
      return `
        <div class="stimulus gap">
          <span>${item.before || ""}</span>
          <input type="text" class="gap-input" autocomplete="off" lang="ja" placeholder="${esc(item.cue || "")}">
          <span>${item.after || ""}</span>
        </div>
        ${item.cue ? `<div class="cue">ヒント: ${esc(item.cue)}</div>` : ""}
      `;
    },
    wire(area) {
      const input = area.querySelector(".gap-input");
      input.addEventListener("input", () => {
        area.dispatchEvent(new CustomEvent("gh:ready", { bubbles: true }));
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") area.dispatchEvent(new CustomEvent("gh:submit", { bubbles: true }));
      });
      input.focus();
    },
    collect(area) {
      const input = area.querySelector(".gap-input");
      const val = (input.value || "").trim();
      return val || null;
    },
    check(item, response) {
      const accepted = (item.accept || []).map(normJa);
      return { correct: accepted.includes(normJa(response)), expected: (item.accept || [])[0] };
    },
    mark(area, item, result) {
      const input = area.querySelector(".gap-input");
      input.disabled = true;
      input.classList.add(result.correct ? "correct" : "incorrect");
    }
  };

  /* ===== transform: conjugate / rewrite to a target form =====
     { type:"transform", prompt, sentence, accept:[...], explain }
     `sentence` is the source form (e.g. "たべる (to eat)"); the student
     types the transformed result. Checked with normJa against accept. */
  const transform = {
    label: "Transform",
    render(item) {
      return `
        <div class="stimulus">${item.sentence}</div>
        <div class="stimulus gap">
          <input type="text" class="gap-input" autocomplete="off" autocapitalize="off"
                 spellcheck="false" lang="ja" aria-label="your transformed answer">
        </div>
      `;
    },
    wire(area) {
      const input = area.querySelector(".gap-input");
      input.addEventListener("input", () => {
        if (input.value.trim()) area.dispatchEvent(new CustomEvent("gh:ready", { bubbles: true }));
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && input.value.trim()) area.dispatchEvent(new CustomEvent("gh:submit", { bubbles: true }));
      });
      input.focus();
    },
    collect(area) {
      const val = (area.querySelector(".gap-input").value || "").trim();
      return val || null;
    },
    check(item, response) {
      const accepted = (item.accept || []).map(normJa);
      return { correct: accepted.includes(normJa(response)), expected: (item.accept || [])[0] };
    },
    mark(area, item, result) {
      const input = area.querySelector(".gap-input");
      input.disabled = true;
      input.classList.add(result.correct ? "correct" : "incorrect");
    }
  };

  /* ===== order: tap scrambled word/particle tiles into sequence =====
     { type:"order", prompt, words:[...tiles...], answer, accept?:[...], explain }
     Tiles move between the bank and the sentence line. Comparison uses
     normJa, which strips spaces — so tile boundaries never matter, and
     `accept` can list additional valid orderings where Japanese word
     order genuinely permits them. Tiles render in shuffled display order
     (never pre-solved), while `words` stays in a readable order in the data. */
  const order = {
    label: "Order",
    render(item) {
      const tiles = shuffled(item.words.map((w, i) => ({ w, i })))
        .map(({ w, i }) => `<button type="button" class="order-word" lang="ja" data-index="${i}">${esc(w)}</button>`)
        .join("");
      return `
        <div class="order-line" aria-label="your sentence"><span class="order-placeholder">tap the tiles below to build the sentence…</span></div>
        <div class="order-bank">${tiles}</div>
        <div class="order-hint">Tap a tile to add it. Tap a tile in your sentence to send it back.</div>
      `;
    },
    wire(area) {
      const line = area.querySelector(".order-line");
      const bank = area.querySelector(".order-bank");
      const ph = line.querySelector(".order-placeholder");
      const total = area.querySelectorAll(".order-word").length;
      function refresh() {
        const inLine = line.querySelectorAll(".order-word").length;
        if (ph) ph.style.display = inLine ? "none" : "";
        if (inLine === total) area.dispatchEvent(new CustomEvent("gh:ready", { bubbles: true }));
      }
      area.querySelectorAll(".order-word").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.parentElement === bank) { btn.classList.add("in-line"); line.appendChild(btn); }
          else { btn.classList.remove("in-line"); bank.appendChild(btn); }
          refresh();
        });
        btn.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && line.querySelectorAll(".order-word").length === total) {
            area.dispatchEvent(new CustomEvent("gh:submit", { bubbles: true }));
          }
        });
      });
    },
    collect(area) {
      const placed = Array.from(area.querySelectorAll(".order-line .order-word")).map((b) => b.textContent);
      const total = area.querySelectorAll(".order-word").length;
      return placed.length === total && total > 0 ? placed.join(" ") : null;
    },
    check(item, response) {
      const valid = [item.answer].concat(item.accept || []).map(normJa);
      return { correct: valid.includes(normJa(response)), expected: item.answer };
    },
    mark(area, item, result) {
      area.querySelector(".order-line").classList.add(result.correct ? "correct" : "incorrect");
      area.querySelectorAll(".order-word").forEach((btn) => { btn.disabled = true; });
    }
  };

  /* ===== produce: safety-net stub =====
     engine.js falls back to TASK_TYPES.produce for unknown types; without
     this stub an unknown `type` in content crashes the session. Renders a
     note and never reports ready, so Check stays disabled and the item is
     skippable via Exit rather than fatal. */
  const produce = {
    label: "Produce",
    render(item) {
      return `<div class="stub">This task type isn't available yet (item type: "${esc(item.type)}"). Exit and pick another skill.</div>`;
    },
    collect() { return null; },
    check(item) { return { correct: false, expected: "" }; }
  };

  return { identify, gapfill, transform, order, produce };
})();
