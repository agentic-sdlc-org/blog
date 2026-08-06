---
title: "How to Train Your (Agent) Dragon"
excerpt: "Agents rarely fail because they're dim — they fail because they're handed sprawling, contradictory, half-stale context and asked to guess which parts still matter. Here's a loop that fixes that: provenance, generation, training, and regeneration, forever."
coverImage: "/assets/blog/how-to-train-your-agent-dragon/cover.png"
date: "2026-08-03T09:00:00.000Z"
author:
  name: Marcus Tewksbury
  picture: "/assets/blog/authors/marcus.jpeg"
ogImage:
  url: "/assets/blog/how-to-train-your-agent-dragon/cover.png"
---

## Why context is the whole game

You can hand the same model two different piles of context and get either a genius or a liability. Agents rarely fail because they're dim; they fail because they're handed sprawling, contradictory, half-stale material and asked to guess which parts still matter. A capable model on bad context behaves like a brilliant new hire onboarded with last year's spec, a deprecated diagram, and three conflicting chat threads. It will confidently do the wrong thing.

Context engineering is the fix: deliberately condensing and correcting your sources so an agent reads *exactly* what it needs — no more, no less. The work has two verbs, and both matter. **Condense**: strip the forty-page spec down to the handful of facts an agent needs to act, so it isn't rationing attention across noise. **Correct**: reconcile the places your sources disagree — the doc that says one thing, the code that does another — so the agent never has to arbitrate a conflict in the middle of a task. A raw document dump does neither.

The payoff compounds. Less to read makes the agent **faster**. Fewer tokens make it **cheaper**. A single, settled source of truth makes it **dependable** — the same question yields the same answer run after run, instead of a fresh guess each time. And with no contradictions left to reconcile, the **quality** of what it produces climbs. Training a dragon was never about making it stronger — it's already strong. It's about pointing that power precisely.

Here's a loop that does exactly that. Four steps: frame the provenance, generate the references, train against the gaps, and regenerate forever.

## Step 1 — Frame your provenance

Everything starts with a `provenance.md`. This is the maintainer's file, not the agent's: a curated map of every source your knowledge is built from, plus a short summary of the thing itself. Agents doing real work never read it — they read the distilled references it produces. Provenance is where *you* do the sourcing and the judgment, once, so the agent doesn't have to.

It's tempting to open the file and start writing the summary. Don't. Start with the sources and let the summary fall out of them. The file has two parts, in this order of effort.

**The sources — a coded manifest.** List every source you can find, sorted into three classes, each entry given a stable ID so the generator can cite it later:

- **`EXT` — external, third-party references.** Industry standards and vendor docs: the Flowable DMN reference, the OWASP Top Ten, a payment API's spec. General knowledge the skill leans on but doesn't own. Each entry is a URL and a line on why it's here.
- **`INT` — internal, first-party docs.** Your own PRDs, arch-review pages, design notes, spike write-ups. These explain *intent* — and they may be dated or flat wrong, so each entry carries a caveat naming exactly where it misleads.
- **`SRC` — code.** The ultimate truth of how things actually behave. Point it at the core repos and the key migrations and let it spider outward. When a doc and the code disagree, the code wins.

The caveat is what separates a real citation from a bookmark. Don't write `INT-02 — the workflow doc`. Write what it's good for *and* where it lies:

> `INT-02` — Workflow Architecture (Confluence). Authoritative on the stage/role model; **caveat:** predates the Flowable migration, so its decision-engine diagram is stale — defer to `SRC` for runtime behavior.

That one line tells the generator what to trust and precisely where not to.

**The summary — written last.** Once the sources are down, don't start from a blank page: point an agent at the manifest to pre-review it for coverage and draft a preliminary summary, then make that draft your own. Lead with the **Vision**: what the thing is *supposed to be*, not a description of today's messy reality. The vision is the yardstick you measure the code against; where the two diverge, that gap becomes a question to resolve, not a thing to paper over. Circulate the draft to informed stakeholders to catch what's missing or wrong, and keep the whole thing to **no more than a page** — if it sprawls, you're describing the implementation, not framing it.

The shape:

```md
# Provenance — {{FUNCTION}}
## 1. Summary
### Vision — for what is supposed to be
### What it is today
### Why we built it · 
### Vocabulary · 
### Design patterns · 
### Known flaws
## 2. Sources
### 2.1 External (EXT)   - EXT-01 — {{title}} · url · why
### 2.2 Internal (INT)   - INT-01 — {{title}} · url · why · caveats
### 2.3 Code (SRC)       - SRC-01 — {{repo · path · why this entry point}}
```

Filled in, an excerpt looks like this:

```md
# Provenance — Workflow

## 1. Summary
### Vision
A workflow is a configurable, multi-stage review that gates a change to a
recommendation — it decides *who approves what, and in what order*. When one is
defined, a user's edits are captured as Actions and only committed once the approval
chain completes. The target is one standard workflow everywhere: same actions, same
stored context, same permissions, with older implementations retrofitted to it.
### Known flaws
Because this is the *intended* standard, some shipped features don't conform yet; any
change must first confirm whether it already follows the standard or needs a retrofit.

## 2. Sources
### 2.1 External (EXT)
- EXT-01 — Flowable DMN docs (https://flowable.com/docs/dmn). Our current decision
  engine is a DMN; this defines its evaluation semantics.

### 2.2 Internal (INT)
- INT-02 — Workflow Architecture (Confluence). Authoritative on the stage/role model;
  caveat: predates the Flowable migration — its engine diagram is stale.
- INT-03 — Early POC write-up. Good for *why* Flowable was chosen; caveat: weighs
  several options that were never built. Defer to SRC for anything current.

### 2.3 Code (SRC)
- SRC-01 — tm-graphql-be · src/domains/recommendations/decision-engine/. The brain;
  how it really decides. Wins over every doc above.
- SRC-02 — migration 20250910-4187_add_flowable_workflow_support.sql. The data model —
  the starting point for what's actually possible.
```

Everything downstream inherits the provenance's quality; a sloppy manifest produces a sloppy brain.

## Step 2 — Run the skill reference generator

Provenance is raw material, and nobody wants an agent reading raw material. The **reference generator** transforms it into the consumable brain: a set of focused documents, each answering exactly one question an agent will actually ask, through one lens.

The standard set:

- **domain-model** — the concepts and vocabulary
- **standard-pattern** — the blessed default way
- **data-model** — what's persisted, and how
- **implementation** — how it's coded, and where
- **cross-cutting** — what every instance must handle (auth, concurrency, retention)
- **module-variance** — where modules legitimately deviate from the standard
- **decision-criteria** — when to use it; standard vs. custom
- **requirements-patterns** — good requirements and edge cases
- **anti-patterns** — recurring mistakes and their fixes
- **conformance-checklist** — the definition of done
- **certification-steps** — external quality gates
- **open-questions** — what's genuinely unresolved

The generator isn't a summarizer that skims everything at once. It works the sources in a deliberate order — every `EXT` entry, then every `INT` entry, then every `SRC` entry — folding each into the references it touches. Processing code **last** is the whole trick: because later passes layer on top of earlier ones, code overrides any doc that contradicts it, automatically. You don't have to police conflicts by hand; the ordering resolves them. Then it makes a final pass over `memory/` (more on that in Step 3), evaluates the eval suite, and stops. It never touches the skill's router file.

Three rules keep the output honest. **Every claim is cited** back to the source ID behind it, so any statement is traceable to a repo path or a doc. **Nothing is invented** — anything the sources leave undefined is logged to `open-questions` rather than guessed. And **the vision is a yardstick, not a fact** — where code contradicts the intended design, the generator records what the code actually does and files the divergence as a question.

Watch what a single run does with the workflow sources. Each group below is one transformation — what the generator **read** from a source, and what it then **wrote**, into which reference:

```
READ   SRC-02 · migration: tables workflow, workflow_stage, workflow_plant (org- or plant-scoped)
WRITE  data-model.md       "Three tables back a workflow… scope is org- or plant-based. [SRC-02]"

READ   SRC-01 · decision-engine: stages run in order; the first rejection halts the flow
WRITE  standard-pattern.md "✅ Stages run sequentially; the first rejection stops the flow. [SRC-01]"

READ   INT-02 says stages run in parallel — but SRC-01 (code) shows them sequential
WRITE  implementation.md   doc claim dropped, code wins  [SRC-01 > INT-02]

READ   Vision wants "one standard everywhere"; SRC shows two modules still diverge
WRITE  module-variance.md  "⚠️ Enrichment & Duplicates still on the legacy path. [SRC-03, §1]"
WRITE  open-questions.md   "Q4 — when do we retrofit the legacy modules? [needs owner]"
```

Notice the four behaviors in one pass: code becomes fact (`data-model`, `standard-pattern`), a stale doc claim gets dropped without ceremony (`implementation`), and a single vision-versus-reality divergence lands in *two* files — the deviation in `module-variance`, the unresolved question in `open-questions`. Five different references, one read of the sources. The agent that later reads `standard-pattern.md` sees only the settled truth, with a citation — never the argument that produced it.

## Step 3 — Train your skill

Documentation and code, even together, rarely tell the whole story. The *why* — and what something is supposed to do in a case nobody's hit yet — is usually locked in a maintainer's head. Step 2 surfaced exactly those holes into two references: `open-questions` (what's undefined) and `anti-patterns` (what keeps going wrong). The **trainer** turns them into an agenda and pulls the answers out of you.

It's a Socratic session, not a form. The trainer opens each thread with the question verbatim and probes — *why this shape, what breaks if you invert it, what does "done" mean, what happens at the edge?* It never invents an answer to move on, and it reflects each answer back as a crisp claim you have to confirm before it's recorded:

```
Agenda (from open-questions.md): Q4 — tie-break between two L2 approvers?

Trainer: When two L2 approvers act, does order matter? What if both approve — or one
         approves and the other rejects at the same moment?
You:     A rejection always wins. Two approvals — earliest timestamp is the record.
Trainer: Is that what the code does today, or what it *should* do?
You:     Should. I don't think it's implemented; we've never hit it in prod.
Trainer: Then I'll record it as intended behavior and open a ticket to build it.
```

The confirmed answer is memorialized in `memory/` as a dated, checked-in transcript — an edited record, not a raw log:

```md
---
date: 2026-08-01
topic: approver-tie-break
status: active
resolves: [Q4]
tickets: [TM-1234]
---
## Question
Q4 — how is a tie between two L2 approvers resolved?

## Resolution
A rejection by either approver halts the flow. Two approvals resolve to the earliest
timestamp. This is *intended* behavior, confirmed with the maintainer — not what the
code does today; the case is currently unhandled.

## Follow-ups
- Ticket: TM-1234 — implement L2 tie-break (earliest-timestamp) + reject-wins.
- Open question Q4 → resolved.
```

A session produces up to four things, and each has a home. It writes that **transcript** to `memory/`. When it proves a source wrong, it **revises the source** — the Vision or an `INT` caveat — so the error doesn't resurface. When it surfaces work, it **spawns a ticket**, handed to the ticket generator rather than hand-rolled. And it **resolves the open question** it started from.

Here's the part that makes it a loop rather than a chore: that transcript is now a *source in its own right*. On the next generation run, the generator scans `memory/`, reads the resolution, and folds it into the references — writing the tie-break rule into `standard-pattern` (flagged as intended, not yet shipped) and dropping Q4 from `open-questions`. Intent you spoke once, in one session, is now permanent knowledge the dragon carries forever.

## Step 4 — Regenerate, forever

None of this is one-and-done. Code moves. Docs rot. Decisions get made in hallways and never written down. Left alone, every reference drifts back toward the stale mush you started with — and a drifted reference is worse than none, because the agent trusts it.

So you re-run the generator on a cadence, and each pass does two jobs at once. It **re-reads the code** — the ultimate truth — and reconciles the references to whatever changed since. And it **folds in the latest `memory/`**, so human intent keeps accumulating. Concretely: a sprint later, `TM-1234` ships. The next regeneration re-reads the decision engine, finds the tie-break now implemented, and flips that claim in `standard-pattern` from "⚠️ intended" to "✅ verified in code" — no human in the loop. In the same pass it might notice a migration quietly added a `workflow_priority` column that no doc mentions, and catch it in `data-model` anyway, because it read the schema rather than the story about the schema.

That's the discipline: the only way to stay current with code is to keep re-reading it, and the eval suite is your tripwire — a failing eval means a reference went stale and it's time to regenerate. Each pass should also shrink `open-questions` as intent hardens into fact. That is the loop, closed: sources feed the generator, the generator surfaces what's unresolved, the trainer resolves it, and those resolutions feed the next generation.

Do this well and your dragon stays fast, cheap, and dependable — not because you made it more powerful, but because it always knows exactly, and only, what it needs to.
