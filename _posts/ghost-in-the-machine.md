---
title: "The Ghost in the Machine: Why We Build a Harness Around Our Coding Agents"
excerpt: "Code says what shipped. The harness says what we meant. Why we give our coding agents a curated, versioned layer of intention, judgment, shortcuts and managed context."
coverImage: "/assets/blog/ghost-in-the-machine/cover.png"
date: "2026-11-04T09:00:00.000Z"
author:
  name: Marcus Tewksbury
  picture: "/assets/blog/authors/marcus.jpeg"
ogImage:
  url: "/assets/blog/ghost-in-the-machine/cover.png"
---

Most teams using coding agents are past the bare prompt. A good repo has a CLAUDE.md with its standards and a set of skills for the work it does often. That helps a lot. But both are written from the code's point of view: how we build things here.

Not everything comes from code. Why a feature exists, which quirks are deliberate, which design was abandoned, what someone ruled in a Slack thread last spring: that knowledge lives in people and conversations, and every session starts without it. So we built a harness around our agents, a curated, versioned layer of knowledge they load before they touch the code. It carries the four things an agent cannot recover from a code read and cannot trust a doc to keep: intention, judgment, shortcuts, and a managed context. Armed with it, an agent reaches a better answer, faster, on fewer tokens.

## The ghost in the machine

An agent can read our code faster than any of us, and it can read every Confluence page we have. Neither read tells it what we meant.

Code is evidence of what shipped. It says what the system does today, and on that question it wins every argument. But it is silent on why a thing was built, which of its quirks are deliberate, and which are mistakes we would never repeat. Docs try to answer those questions, and they rot. A design page is written once, walked back with inline notes, and left for the next reader to untangle.

What is missing from both is the person who was in the room. They know which trade-off was made on purpose, which code path is a dead end, and which page to trust for intent but not for mechanics. That knowledge is the ghost in the machine. A package is where we write it down, with its provenance, so that every agent and every engineer starts from the same place.

Conventions files and skills close part of that gap. They tell an agent how we write code, but not what we meant to build or which of our past decisions it should respect. In a single repo with a small team, the code may tell enough of the story. On a mature platform it rarely does, and the agent fills the gap with plausible guesses. A harness is how the person who was in the room gets into every session.

## What the harness is

Our harness lives in its own repository, which we call the clubhouse. Football runs through our naming: agents are players and coaches, and their skills are plays. The clubhouse sits beside our product repos rather than inside them, because much of what it holds spans several repos at once.

The unit of the harness is a package: a folder holding everything we know about one slice of the platform, in a shape an agent can load. It is not documentation in the usual sense. Humans curate the inputs, scripts we call generators build the outputs, and agents read only the outputs.

Every package has the same anatomy:

- **provenance.md**, the hub. The vision, what exists today, the framing, and every source with a why and its caveats. Humans write it; agents never read it.
- **open-questions.md and decisions.md**, the registers. What the agent could not settle on its own, and what a human ruled.
- **memory/**, the record. Dated transcripts and curated Slack syntheses that back each ruling.
- **knowledge/**, the distilled layer. Generated files an agent actually reads, each claim with its evidence inline.
- **SKILL.md**, the router. A skill file, in the format Claude Code loads, that tells the agent which knowledge file to open for which task.

We build two kinds:

- **Packages** distill a standing domain. They live as long as the domain does, and their distilled layer is **knowledge/**.
- **Projects** distill one feature request. They live as long as the work does, and their distilled layer is **understanding/**.

The examples in this article come from two of our packages. **Bulk actions** applies one change across many records at once. **Duplicate recommendations** flags catalog records that describe the same part.

A few names recur below. **Generators** build the distilled layers from provenance and the registers. **Miners** scan sources for new material and propose additions. **Trainer sessions** are Socratic sessions where a maintainer answers open questions with an agent we call context-trainer. **Factory skills** are the skills that build and maintain packages.

### How a package gets built

![Package generation diagram. Sources — code on main, docs and tickets, Slack and calls, with miners proposing new material — feed what humans curate: provenance.md, memory/, references/, and open-questions → decisions, answered in trainer sessions. Generators apply the precedence ladder and build what agents read: SKILL.md as the router and knowledge/ (or understanding/ for projects). SKILL.md also points agents directly at decisions.md, the final word on intent.](/assets/blog/ghost-in-the-machine/package-generation.svg)

Humans write the provenance, the canon and the rulings. Everything an agent reads is generated from them, so a correction goes upstream and the next rebuild carries it.

## 1. Intention

Over time, the why behind a vision is lost to document rot. A package's first job is to keep that vision complete, accurate and current.

Every package's provenance opens with a Vision that is kept apart from What it is today. The split matters. An agent that sees only today's behavior treats the current implementation as the target, and reproduces our mistakes on purpose. A package that describes only what exists is not safe. It is incomplete.

The bulk-actions Vision is a good example. It says bulk actions should be one standard, used the same way by every module, safe under concurrency and honest about partial failure. It then says plainly that today there are two competing async standards and three generations of the first. An agent reading that knows the direction of travel. It will not copy a fourth variant because the code happened to contain three.

## 2. Judgment

Trade-offs get made at every step, from the first requirements to the last line of code. The reasons are rarely written down anywhere everyone can find them. A package records them.

At the code level, judgment answers one question an agent asks constantly: is this pattern something to imitate, or something to avoid? The code cannot say. Both look equally deliberate on the page.

Take bulk actions again. A reasonable agent assumes the newer generation of a flow is the safer one. In this case that is backwards: the newer per-item flows skip the lock pre-check that the older flows perform. The package's anti-patterns file names this directly ("read the generation, not the date") and warns that adding the pre-check is a behavior change, not a cleanup. Another row warns that silent truncation at the cap was a deliberate 2025 decision, so read the decision before "fixing" it. Without those notes an agent would either copy the gap or repair something that was never broken.

Judgment also decides what knowledge is exposed in the first place. Sources conflict constantly: a design doc against a ticket, a Slack thread against a decision. The package settles those conflicts before an agent ever sees them, using a precedence ladder covered under References. What ships is the answer with the conflict already resolved. The agent reads the result and its citation, not the argument.

## 3. Shortcuts

A package is a map of where to look and where not to. It takes three shapes.

- **Geographic boundaries.** A package marks which parts of the codebase belong to its domain, so an agent can search a defined area instead of sweeping the whole repo. The framing in provenance names the surface area, the system of record and the neighbors. The neighbors list includes look-alikes: duplicate recommendations notes that our search index looks like a neighbor and is not, because duplicates are never indexed there.
- **Faraway continents.** Some of what matters lives in a repo the app never mentions. A sweep of the application repo will not find it. Bulk actions flags that one of its data contracts is written by a pipeline in our Databricks repo, outside the app entirely, and points straight at the file.
- **Pitfalls.** Deprecated paths, abandoned designs and misleading artifacts get called out by name. Bulk actions warns that a Redis-counter design from an old ticket never shipped, even though describing it as current "has happened before". Duplicate recommendations lists its decoys, such as a superseded set of tables and a deprecated vector-search pipeline, so nothing new gets built on them.

Each of these saves an agent from a search it would otherwise run, or from a wrong conclusion it would otherwise reach with confidence.

## 4. Context management

The knowledge layer condenses what an agent has to read. Instead of grepping and sweeping, the agent is routed to a short set of distillations that answer its question directly.

Each package's SKILL.md is a router. It lists the package's knowledge files with a one-line hook for each, plus a role table that says which file to open for which kind of task. A developer implementing a bulk change opens the implementation file and the anti-patterns file. A PM shaping a ticket opens the requirements patterns. Neither of them loads the 931-line provenance hub, which agents never read at all.

The claims in those files carry their evidence inline: a confidence mark (verified, inferred or open), and a repo, ref and file path. So the agent does not re-derive a fact. When it needs to check one, it knows exactly which file to open. A smaller context is not only cheaper. It is less noisy, and a less noisy context reasons better.

Both distilled layers work this way. knowledge/ distills a domain for a package. understanding/ distills one feature request for a project: understanding/request/ turns the PRD into its requirements, vocabulary and flows, and understanding/platform/ holds the spec stage's research into what the platform already does. Each is research done ahead of time. The results are pre-baked, so an agent starts from the answer instead of running the search again.

## Where the four jobs live

No single file does all four jobs. Each part of a package carries some of them, and together they cover all four.

| Package part | What it holds | Intention | Judgment | Shortcuts | Context |
| --- | --- | --- | --- | --- | --- |
| provenance.md §1 | Vision, what it is today, why we built it, known flaws | ✓ | ✓ |  |  |
| provenance.md §2 sources | Each link with a why and its caveats | ✓ | ✓ | ✓ |  |
| Code hints and framing | Surface area, neighbors, decoys, cross-repo pointers |  | ✓ | ✓ |  |
| open-questions.md → decisions.md | What a human ruled, when, and why | ✓ | ✓ |  |  |
| memory/ | Dated human-in-the-loop transcripts and curated Slack syntheses | ✓ | ✓ |  |  |
| knowledge/ | Generated distillations with inline evidence | ✓ | ✓ | ✓ | ✓ |
| SKILL.md | The router: which file to open for which task | ✓ |  | ✓ | ✓ |
| references/ and references.md | Canon and hard rules every package cites | ✓ | ✓ |  | ✓ |

The first three rows live in provenance, which agents never read. They do not need to: the generator carries what those rows hold into the layer agents do read. The bulk-actions SKILL.md states the vision, "one standard everywhere". Its anti-patterns file carries the matching known flaw, that three generations coexist and none was retired. Intent reaches the agent already distilled, with its source cited. The decision registers are the exception: SKILL.md points agents at them directly, because a decision row is the final word on intent.

The next three sections cover the parts doing the most human work: the why on sources, the curated conversation, and the references.

## The why on every source

Agents read docs better than people do. What they lack is the intuition for what the takeaway is supposed to be: which parts still hold, which were walked back, and which caveats clear or damn the rest.

Think of a professor who assigns an outside reading. Students can all read the text. The real teaching is the conversation around it: why this reading, what to take from it, where the author is wrong. A provenance entry is that conversation, kept short.

Each source in provenance carries two things and nothing else: a why (what this source is good for) and its caveats (where it misleads). Two real entries from bulk actions:

- **The original Bulk Actions design doc.** Why: the most complete write-up of the original design and its intent. Caveat: it is a palimpsest. The body has been walked back with inline notes, so read the notes as newer than the text they annotate.
- **The Bulk Review design document.** Why: the authority on why per-item status exists. Caveat: it predates the 2026 work, so trust it for intent and not for mechanics.

The entry never restates what the source says. That copy would rot as the source moved on. The test is simple: if the source changed tomorrow, would this line become wrong? If so, it belongs in the source. If it would still be true, it is a why, and it belongs in the package.

## Curating the conversation

Most of what a team knows lives in conversations: Slack threads, review comments, a call nobody wrote up. A grep may find the right thread and read it correctly. It may also find the wrong one, or miss that a later thread reversed it. A package keeps only what matters: where a decision changed, and why.

The most explicit form of this is the path from open-questions.md to decisions.md. An open question is a gap the agent could not close on its own, either because the answer was never written down or because it could not find it. A human answers it in a Socratic session with context-trainer. The answer becomes a decision row with an owner, a date and a cited transcript in memory/.

Two bulk-actions rows show what this produces:

- **Q1, retention of per-item status rows.** The code has no purge path, and an agent would likely flag that as a defect. The maintainer ruled it accepted for now, by decision, and recorded when it becomes urgent: the moment the uncap ships. The agent now knows not to "fix" it and when to raise it again.
- **Q12, the unassign CSV upload.** The review surfaced that a new upload can reset rows a running bulk job holds. The ruling was a defect, and it went straight onto the backlog as a bug.

A decision row holds its place. Nothing overrides it by arriving later, whether a PRD edit, a ticket or a Slack thread. Something that contradicts it becomes a new open question, and only a trainer may move the row. This is what makes the record trustworthy. It is also why the process pays twice: the same questioning that feeds agents catches real problems and opportunities, which feed straight back into the vision and the implementation.

The rulings do not stay in the registers. The generators fold them into the distilled layers, knowledge/ for a package and understanding/ for a project, and nobody edits those layers by hand. A correction goes into its source or a decision row, and the layer is regenerated from there. That is how human curation reaches every agent that reads the layer, and how it survives the next refresh.

## References: the rules and the canon

References hold the hard rules we want every agent to follow, and the canon of how things are and why. Every decision an agent makes should be grounded in them.

This is the role a repo's local CLAUDE.md plays, scaled to an enterprise platform. One file of conventions works for one repo. A platform with a dozen product repos and many packages needs a shared canon that every package cites and none restates.

- **references/** is that platform canon: the glossary, the encoding standards, the architecture, the boards and repos we use.
- **references/precedence.md** is the rule for weighing sources. It answers two questions separately. What does the system do today? The code on main, unranked. What did we mean to build? A nine-step ladder with decisions.md at the top and external sources at the bottom, on which the code does not appear at all.
- A package or project may add a local **references.md** for canon that applies to it alone. It ranks just below the decisions.

The ladder works because it is applied when a package is built, not when it is read. An agent doing a task does not reliably apply a nine-step ranking on the fly, and it is not asked to. The generators apply the ladder, trainer sessions settle what the ladder cannot, and a human makes the final call.

The point of a fixed canon is consistency. Two agents working on the same feature should reach for the same words, the same rules and the same tie-breaker, and get the same answer.

## But not free

Packages take human hands, time and effort. The cost is highest up front, but it never drops to zero. Since June the clubhouse has taken about 1,240 commits and 16 factory skills to build.

- **Who keeps them current.** Every package has a named maintainer in its layer's roster. The generators do the mechanical work: they rebuild only the references whose sources moved, and run a full rebuild at least every 90 days. The maintainer does what cannot be automated: adjudicating what the miners propose and answering open questions in trainer sessions.
- **What happens when nobody does.** A stale package fails quietly, and an agent believes it. That is worse than no package at all. So every claim carries the commit it was verified against, which makes drift visible, and the pipeline halts on an unreviewed draft instead of shipping a guess.

## The payoff: better, cheaper, faster

What is the point of a package, and what effect do we expect it to have? An agent armed with one should reach a better outcome, faster, while using fewer tokens.

- **Better**, because it builds toward the intended vision instead of copying the current implementation, and it knows which patterns to repeat and which to avoid.
- **Faster**, because it searches the right part of the codebase, knows about the repos it would never have swept, and skips the dead ends we already found.
- **Cheaper**, because it reads a few distilled files instead of the whole codebase and every page we have ever written.

Usually you get to pick two of those three. Pointing an agent at the code and its conventions is fast and cheap right up until it is wrong. The harness is our bet that writing down the ghost in the machine with its provenance, and keeping it current, gets us all three, for every agent and every engineer who comes after.
