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

You can hand the same model two different piles of context and get either a genius or a liability. Agents rarely fail because they're dim; they fail because they're handed sprawling, contradictory, half-stale material and asked to guess which parts still matter. A capable model on bad context behaves like a brilliant new hire onboarded with last year's spec, a deprecated diagram, and three conflicting chat threads.

Context engineering is the fix: deliberately condensing and correcting your sources so an agent reads *exactly* what it needs — no more, no less. The payoff compounds. Less to read makes the agent **faster**. Fewer tokens make it **cheaper**. A single, settled source of truth makes it **dependable** — the same question yields the same answer run after run, instead of a fresh guess each time. And with no contradictions left to reconcile, the **quality** of what it produces climbs. Training a dragon was never about making it stronger — it's already strong. It's about pointing that power precisely.

Here's a loop that does exactly that.

## Step 1 — Frame your provenance

Everything starts with a `provenance.md`. This is the maintainer's file, not the agent's: a curated map of every source your knowledge is built from. Agents doing real work never read it — they read the distilled references it produces. Provenance is where you do the sourcing.

It has two parts. First, a **Vision**: an executive summary of what the thing is *supposed to be* — its purpose, its vocabulary, its major design patterns, and its known flaws. Emphasis on *supposed to be*. The vision is the intent you measure reality against, not a description of today's messy truth.

Second, a **coded source manifest** in three classes, each given a stable ID so the generator can cite it:

- **`EXT` — external, third-party references.** Industry standards, framework and API docs — general knowledge the skill leans on. Each gets a URL and a line on why it's here.
- **`INT` — internal, first-party docs.** PRDs, specs, arch plans, design notes. These may be dated or wrong, so each carries a caveat calling out where it misleads.
- **`SRC` — code.** The ultimate truth of how things actually behave. Point it at the core repos and let it spider outward.

A good citation earns its place. Not "the spec," but:

> `INT-02` — Workflow Architecture (Confluence). Authoritative on the stage/role model; **caveat:** predates the Flowable migration, so its decision-engine diagram is stale — defer to `SRC` for runtime behavior.

That one line tells the generator what to trust and exactly where not to.

A trimmed template:

```md
# Provenance — {{FUNCTION}}
## 1. Vision — What & Why
### What it is · Why we built it · Vocabulary · Design patterns · Known flaws
## 2. Sources
### 2.1 External (EXT)   - EXT-01 — {{title}} · url · why
### 2.2 Internal (INT)   - INT-01 — {{title}} · url · why · caveats
### 2.3 Code (SRC)       - SRC-01 — {{repo · path · why this entry point}}
```

## Step 2 — Run the skill reference generator

Provenance is raw material, and nobody wants an agent reading raw material. The **reference generator** transforms it into the consumable brain: a set of focused documents, each answering one question an agent will actually ask.

The standard set:

- **domain-model** — the concepts and vocabulary
- **standard-pattern** — the blessed default way
- **data-model** — what's persisted, and how
- **implementation** — how it's coded, and where
- **cross-cutting** — what every instance must handle (auth, concurrency, retention)
- **module-variance** — where modules legitimately deviate
- **decision-criteria** — when to use it; standard vs. custom
- **requirements-patterns** — good requirements and edge cases
- **anti-patterns** — recurring mistakes and their fixes
- **conformance-checklist** — the definition of done
- **certification-steps** — external quality gates
- **open-questions** — what's genuinely unresolved

The generator walks the sources in order — `EXT`, then `INT`, then `SRC` — folding each into the references. Processing code *last* is deliberate: it's layered on top of everything, so **code wins on conflict**. Anything the sources leave undefined is logged to `open-questions` rather than invented. Every claim is tagged with the source behind it, so you can always trace a statement back to a repo path or a doc. It closes by evaluating the eval suite — adding new checks, never quietly rewriting old ones — and it never touches the skill's router file.

The effect, in miniature:

```
SRC-01 (decision-engine/): stages evaluated in order; first failing stage halts.
  → standard-pattern.md :  "Stages run sequentially; the first rejection stops the flow. [SRC-01]"
Undefined: behavior on a tie?
  → open-questions.md    :  "Q4 — tie-break between two L2 approvers? [gap]"
```

## Step 3 — Train your skill

Documentation and code, even together, rarely tell the whole story — the intent is often locked in someone's head. That's what the **trainer** extracts. It reads the two references that capture what's unsettled — `open-questions` and `anti-patterns` — and uses them as the agenda for a Socratic session with you: *why this shape, what breaks if inverted, what does "done" actually mean?*

Nothing is invented; answers are confirmed with you, then memorialized in `memory/` as a dated, checked-in transcript:

```md
---
date: 2026-08-01
topic: approver-tie-break
resolves: [Q4]
tickets: [TM-1234]
---
## Resolution
A tie between two L2 approvers resolves to the earliest timestamp. Ties were never
specced — confirmed intended behavior, not current code. Retrofit tracked in TM-1234.
```

A session does more than record. When it proves a source wrong, it **revises that source** (the Vision, or an `INT` caveat). When it surfaces work, it **spawns tickets** — handed to the ticket generator, never hand-rolled. And critically, that `memory/` transcript becomes a *source in its own right*: on the next run, the generator scans `memory/` and folds these hard-won resolutions into the references. Intent you spoke once is now permanent.

## Step 4 — Regenerate, forever

None of this is one-and-done. Code moves. Docs rot. Decisions get made in hallways. Left alone, every reference drifts back toward the stale mush you started with.

So you re-run the generator on a cadence. Each pass re-reads the code — the ultimate truth — and captures whatever changed since. Each pass folds in the latest HITL feedback from `memory/`. And each pass should shrink `open-questions` as intent hardens into fact. That is the loop: sources feed the generator, the generator surfaces what's unresolved, the trainer resolves it, and those resolutions feed the next generation.

Do this well and your dragon stays fast, cheap, and dependable — not because you made it more powerful, but because it always knows exactly, and only, what it needs to.
