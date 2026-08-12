---
title: "How to Train Your (Agent) Dragon, Part 2: What Running the Loop Taught Us"
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

Part 1 gave you the loop:

1. **Frame the provenance** 
2. **Generate the references**
3. **Train against the gaps**
4. **Regenerate forever.**

It read clean because it was written from the design. This post is what we learned by putting it into practice, end to end, on a domain with teeth: **bulk actions**, a feature spread across 15 GraphQL mutations, 4 repositories, and 3 generations of implementation.

The loop worked. One regeneration caught documentation that was already lying (a cleanup job had been fixed weeks earlier and the old references still described the broken version). The training sessions turned 10 open questions into 3 real bug tickets, 2 recorded architecture decisions, and 1 doc contradiction settled by reading the code. That part of the story is Part 1, validated.

But putting the loop into practice also surfaced three problems Part 1 never mentions, because you only meet them when you actually run it. Each one turned into a standard with a number behind it. That's what this post is: the three standards, why each exists, and the measurements that forced them.

## Standard 1 — Curate your sources like you curate the summary

Part 1 says to list every source you can find. We did. The bulk-actions manifest hit **49 sources**: design docs, spike reports, a dozen individually enumerated Jira tickets, product discovery items, epics, test plans, chat channels.

The review feedback was one line long: *saying it well usually means saying it briefly*. A manifest is not a bibliography. Every entry the generator has to read costs a full fetch on every run, and every entry a maintainer has to keep honest is a small standing debt. Forty-nine entries meant forty-nine caveat lines that could themselves go stale.

The fix has two parts.

**Only the exceptional earn a coded entry.** The test for each source is simple: does it teach something about the feature that you can't learn anywhere else? Say your domain is payments. The spike that explains why retries are capped at one attempt (because a retry once double-charged a customer) earns its own ID: that scar shaped the feature, no other document explains it, and an agent that doesn't know it will "fix" the cap and reintroduce the bug. The design doc that carries the why of your idempotency keys earns one too. But the forty routine tickets that also mention payments (a misaligned button, a typo in an error message, a flaky test) teach nothing about what the feature *is*. They are activity, not knowledge, and listing each one by hand buys you a list that is stale by Friday.

So the routine members of a class don't get listed at all. They get a **set-level entry**: one ID whose URL is a query, expanded by the generator at read time. You curate the *filter* once, and the generator reads whatever the filter returns on the day it runs.

> **INT-34 — Jira, the live defect set** *(set-level source)*
>
> **url:** a saved JQL filter over the domain's open tickets.
>
> **why:** whatever is open on the day the generator runs. It reads every match, comments included. A hand-kept list of tickets goes stale the moment someone files a new one. A filter never does.
>
> **caveats:** the query matches on text, so treat it as a net, not as truth. It can pull in tickets that merely mention the feature, and it can miss relevant ones that were worded differently. The generator judges every match before using it. And when one ticket keeps showing up in the references, it has stopped being routine: promote it to its own coded entry, with commentary.

That one entry replaced six hand-enumerated tickets, and it is the only kind of source entry that gets *fresher* over time instead of staler. The same pattern covers the domain's Slack feature channel: one entry, read at refresh time, treated as the lowest-durability class (a chat message is a decision only if a ticket, page, or code change followed it).

**Some classes don't survive curation at all.** We dropped product discovery tickets (PMPs) as a source class entirely, including the one the whole vision was distilled from. That sounds like a loss until you notice what the provenance already contains: the summary section is maintainer-authored, so the vision those tickets carried lives on as your own words, which is where judgment belongs anyway. Ticket keys survive in the references only as plain tracking pointers, telling a reader where a decision lives without pretending the ticket is a reliable statement of fact.

The manifest landed at **33 sources**, each with a reason to exist. The retired sixteen keep their IDs as one-line stubs, because IDs are permanent and old citations still need to resolve somewhere.

## Standard 2 — References grow unless something pushes back

Here is the measurement nobody wants to see. Our first full regeneration, reading all 49 sources with fresh eyes, grew the reference set from **2,526 to 3,433 lines (+36%)**. Every single file grew. Some of that was real: corrected facts, a per-mutation matrix nobody had ever assembled. But a third more volume, uniformly, across every file, is not knowledge. It is a generator with nothing telling it to stop.

The insight that fixed it: **getting bigger and getting contradictory are the same disease.** References grow mostly by repeating each other, and two copies of a fact eventually disagree, because one gets updated and the other doesn't. So the size rules and the consistency rules turn out to be one rule.

- **Every fact is written down in one place only.** Each fact has a single reference that owns it. Any other file that needs that fact links to it instead of repeating it. The per-mutation matrix lives in `implementation`, the locking table in `standard-pattern`, the schema in `data-model`, and everyone else points there.
- **Keep each file small** (we aim for ~250 lines). It's a goal, not a hard rule: some files are legitimately bigger, like the one that owns the giant table of every mutation and its behavior. But going over the target is never silent. The run report has to say which file went over and why.
- **Tables over prose** for anything enumerable. Prose is for the why.
- **Resolutions collapse.** A resolved question renders as one line and a pointer. The story of how it got resolved lives in the training transcripts, not the reference.
- **Every run reports per-file size deltas.** Growth without a named reason is a defect of the run, not a neutral outcome.

Regenerating under those rules took the set from 3,433 to **2,797 lines (−19%)** with zero facts lost. Against the original baseline, the corrected knowledge now costs 11% more than the stale version did, instead of 36%.

```
                                   Lines            Words
Before the full regeneration       2,526            24,528
After it (no guardrails yet)       3,433 (+36%)     32,887 (+34%)
After the shrink (guardrails on)   2,797            26,625
```

## Standard 3 — The re-run test

The sharpest question in the whole review was this one: *if you re-run the generator on the SAME sources, does it add anything? I'm guessing it does. That would be the test.*

It is the right test because it catches the one failure the size rules can't: a generator that adds things nobody asked for. The logic is simple. If nothing changed in the world, a regeneration should change nothing in the documents. Any new line on a run like that didn't come from a source. It came from the model, and that is exactly the confident filler this whole loop exists to eliminate.

So we ran it. Same sources, same instructions as any normal run, with one twist: the workers were not told it was a test, because telling them would bias the result. The output went to a separate folder, and the diff was checked independently instead of trusting the workers' own reports.

**Result: 0 changed lines across all 11 references.**

To be fair, the guess (that it adds) was right about the pipeline of a week earlier. That first run grew 36% because nothing pushed back. Two rules are what changed the outcome, and neither is magic:

1. **A re-run edits, it doesn't rewrite.** The generator opens the existing document and treats it as correct until a source proves otherwise. Its job is to compare, not to compose. Ask a writer to write the same essay twice and you get two essays. Give an editor nothing to flag and the document comes back untouched.
2. **Every changed line must name the source that caused it.** The last step of every run is walking the diff: each change has to point at a source that moved (a commit, an edited page, a ticket, a new training transcript). A change with no source behind it gets reverted, no matter how much better it reads.

The natural follow-up question is: *how does it know a source changed? That sounds like a big database.*

There is no database. For code it's easy: the documents record the exact commits they were checked against, and git tells you what moved. For Confluence and Jira there is no snapshot of what a page said last time, so the generator simply re-reads every source on every run and compares what it says now against what the documents claim. How does it know what to compare? That's the citations: every claim in every document carries its source ID right next to it, so any changed line names its own source. And the eval suite from Part 1 is the safety net in between, re-checking claims against the live sources for the day the world moves and nobody regenerates.

One habit to keep: re-run this test every time you change the generator's own instructions. If a no-op run starts adding again, you broke something. It is a unit test for your knowledge pipeline.

## The loop, revised

Part 1's loop stands: provenance, generation, training, regeneration. What running it added is three habits that keep the loop healthy as it spins:

- **Curate what goes in.** Individual entries only for the sources that really shaped the feature, one query for the routine rest, and the nerve to drop a source class that isn't reliable.
- **Keep what comes out small.** Every fact written in one place only, a size goal per file, and every run reporting what grew and why.
- **Trust nothing that changes without a reason.** Unchanged sources mean zero diff, every changed line names its source, and the re-run test checks the checker.

All three now live in the templates and the generator, so the next domain starts from them instead of rediscovering them. One gap stays open on purpose: nothing watches the sources between runs yet. Today a refresh happens when a human triggers it. An agent that watches the sources and pulls the trigger when they move is the natural next piece, and probably the next post.

Train the dragon once and it knows the territory. These three habits are how it stays lean enough to keep flying.
