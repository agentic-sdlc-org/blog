---
title: "How to Train Your (Agent) Dragon, Part 2: What Production Taught Us"
excerpt: "We ran the four-step loop from Part 1 on a real domain, end to end. Three standards came out of it that Part 1 didn't teach: sources need curation, references grow unless something pushes back, and a re-run on unchanged sources must change nothing. With the numbers to prove each one."
coverImage: "/assets/blog/how-to-train-your-agent-dragon/cover.png"
date: "2026-08-13T09:00:00.000Z"
author:
  name: Jorge Romera & Marcus Tewksbury
  picture: "/assets/blog/authors/jorge.jpeg"
ogImage:
  url: "/assets/blog/how-to-train-your-agent-dragon/cover.png"
---

## The loop met reality

Part 1 gave you the loop: frame the provenance, generate the references, train against the gaps, regenerate forever. It read clean because it was written from the design. This post is what happened when we ran it for real, end to end, on a domain with teeth: bulk actions, a feature spread across 15 GraphQL mutations, 4 repositories, and 3 generations of implementation that all still run in production.

The loop worked. One regeneration caught documentation that was already lying (a cleanup job had been fixed weeks earlier and the old references still described the broken version). The training sessions turned 10 open questions into 3 real bug tickets, 2 recorded architecture decisions, and 1 doc contradiction settled by reading the code. That part of the story is Part 1, validated.

But running it also surfaced three problems Part 1 never mentions, because you only meet them at scale. Each one turned into a standard with a number behind it. That's what this post is: the three standards, why each exists, and the measurements that forced them.

## Standard 1 — Curate your sources like you curate the summary

Part 1 says to list every source you can find. We did. The bulk-actions manifest hit **49 sources**: design docs, spike reports, a dozen individually enumerated Jira tickets, product discovery items, epics, test plans, chat channels.

The review feedback was one line long: *saying it well usually means saying it briefly*. A manifest is not a bibliography. Every entry the generator has to read costs a full fetch on every run, and every entry a maintainer has to keep honest is a small standing debt. Forty-nine entries meant forty-nine caveat lines that could themselves go stale.

The fix has two parts.

**Only the exceptional earn a coded entry.** A source gets its own ID when it settles something nothing else does: a rolled-back spike that explains a scar in the code, a defect the references cite constantly, a design doc that carries the why. Routine members of a class don't get listed. They get a **set-level entry**: one ID whose URL is a query, expanded by the generator at read time.

```md
- INT-34 — Jira — the live bulk-action defect set (set-level source)
  url: {{JQL filter over the domain's open tickets}}
  why: whatever is open the day the generator runs — it reads every match,
       comments included. The filter cannot go stale the way a hand-kept
       list does.
  caveats: JQL is a text match — it can catch strangers and miss the
           mislabeled; judge each match. A ticket that becomes load-bearing
           gets promoted to its own coded entry.
```

That one entry replaced six hand-enumerated tickets, and it is the only kind of source entry that gets *fresher* over time instead of staler. The same pattern covers the domain's Slack feature channel: one entry, read at refresh time, treated as the lowest-durability class (a chat message is a decision only if a ticket, page, or code change followed it).

**Some classes don't survive curation at all.** We dropped product discovery tickets (PMPs) as a source class entirely, including the one the whole vision was distilled from. That sounds like a loss until you notice what the provenance already contains: the summary section is maintainer-authored, so the vision those tickets carried lives on as your own words, which is where judgment belongs anyway. Ticket keys survive in the references only as plain tracking pointers, telling a reader where a decision lives without pretending the ticket is a reliable statement of fact.

The manifest landed at **33 sources**, each with a reason to exist. The retired sixteen keep their IDs as one-line stubs, because IDs are permanent and old citations still need to resolve somewhere.

## Standard 2 — References grow unless something pushes back

Here is the measurement nobody wants to see. Our first full regeneration, reading all 49 sources with fresh eyes, grew the reference set from **2,526 to 3,433 lines (+36%)**. Every single file grew. Some of that was real: corrected facts, a per-mutation matrix nobody had ever assembled. But a third more volume, uniformly, across every file, is not knowledge. It is a generator with nothing telling it to stop.

The insight that fixed it: **bloat and contradiction are the same disease.** References grow mostly by restating each other, and two copies of a fact eventually disagree, because one gets updated and the other doesn't. So the size rules and the consistency rules turn out to be one rule.

- **One primary home per fact.** Each fact lives in exactly one reference. Every other file that needs it links there instead of restating it. The per-mutation matrix lives in `implementation`, the locking table in `standard-pattern`, the schema in `data-model`, and everyone else points.
- **A soft target per file** (~250 lines), with a justify-if-over rule. Not a hard cap: the file that is the designated home of a 15-by-8 matrix gets to be big, but it has to say so by name in the run report.
- **Tables over prose** for anything enumerable. Prose is for the why.
- **Resolutions collapse.** A resolved question renders as one line and a pointer. The story of how it got resolved lives in the training transcripts, not the reference.
- **Every run reports per-file size deltas.** Growth without a named reason is a defect of the run, not a neutral outcome.

Regenerating under those rules took the set from 3,433 to **2,797 lines (−19%)** with zero facts lost. Against the original baseline, the corrected knowledge now costs 11% more than the stale version did, instead of 36%.

| | Lines | Words |
|---|---|---|
| Before the full regeneration | 2,526 | 24,528 |
| After (no guardrails) | 3,433 (+36%) | 32,887 (+34%) |
| After the shrink (guardrails on) | 2,797 | 26,625 |

## Standard 3 — The re-run test

The sharpest question in the whole review was this one: *if you re-run the generator on the SAME sources, does it add anything? I'm guessing it does. That would be the test.*

It is exactly the right test, because it isolates the failure mode that size targets alone can't catch: a generator that pads. If nothing changed in the world, a regeneration should change nothing in the references. Any line it adds on a no-op input came from the model, not from a source, and a line with no source behind it is exactly the kind of confident filler the whole loop exists to eliminate.

So we ran it. Full write pass over the same sources, the standard regeneration instructions, and one deliberate twist: the workers were not told it was a test, because telling them would bias the result. Output went to a separate directory and the diff was checked by the coordinator, not taken from the workers' own reports.

**Result: 0 changed lines across all 11 references.**

Honesty requires saying why it held, because the hypothesis (it adds) was right about the previous week's pipeline. The first full regeneration grew 36% precisely because nothing pushed back. Two instructions make the difference, and neither is magic:

1. **A re-run edits, it doesn't rewrite.** The generator opens the existing reference and treats it as correct until a source proves otherwise. Its job is comparison, not composition. A writer asked to write the same essay twice will produce two essays. An editor with nothing to flag returns the document untouched.
2. **Every changed line needs a named source behind it.** The last step of every run is a diff walk: each hunk must be attributable to a source that moved (a commit, an edited page, a ticket that changed, a new training transcript). A hunk with no source behind it gets reverted, no matter how much better it reads.

Which raises the question we got next, and you will too: *how does it know a source changed? That's a pretty big database.*

There is no database, and for non-repo sources there is no diff either. For code, the references record the exact commits they were verified against, so git answers precisely. For Confluence and Jira there is no stored snapshot of what a page said last run. The generator re-reads every source on every run and compares what it says now against what the references claim, claim by claim. Modified dates and ticket timestamps are hints for where to look first, not the mechanism. The attribution "database" is the citations themselves: every material claim in every reference carries its source ID inline, so when a diff line appears, its own citation names the source, and the run report says whether that source moved. The eval suite from Part 1 is the second net, re-checking claims against live sources between runs, for the day the world moves and nobody regenerates.

Run the re-run test once to calibrate, and then re-run it every time you change the generator's own instructions. Additive drift on a no-op input means the instructions regressed. It is a unit test for your knowledge pipeline.

## The loop, revised

Part 1's loop stands: provenance, generation, training, regeneration. What production added is a set of forces that keep the loop from silting up as it spins:

- **Curation pressure on the way in.** Coded entries for the exceptional, set-level queries for the routine, and the nerve to drop a source class that isn't reliable.
- **Size pressure on the way out.** One home per fact, soft targets with named justifications, and size deltas in every run report.
- **The no-op invariant across runs.** Unchanged sources mean zero diff, every changed line traces to a named source, and the re-run test guards the guards.

All three now live in the templates and the generator skill, so the next domain starts from them instead of rediscovering them. And one gap stays open on purpose: nothing watches the sources between runs yet. Today a refresh happens when a human triggers it. An agent that monitors the pinned sources and pulls the trigger when they move is the natural next piece of the pipeline, and probably the next post.

Train the dragon once and it knows the territory. These three standards are how it stays lean enough to keep flying.
