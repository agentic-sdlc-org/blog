---
title: "Domain Knowledge Agents"
excerpt: "Great artifacts are correct, complete, and concise — and you cannot reliably hit all three with general, one-shot prompting. The tooling that closes the gap is the domain knowledge agent."
coverImage: "/assets/blog/domain-knowledge-agents/cover.png"
date: "2026-07-10T09:00:00.000Z"
author:
  name: Marcus Tewksbury
  picture: "/assets/blog/authors/marcus.jpeg"
ogImage:
  url: "/assets/blog/domain-knowledge-agents/cover.png"
---

*The Tools Needed to Build Great Context Pipelines*

The Context Pipeline series made a single argument: in an agentic software development lifecycle, the artifacts that carry intent into execution — PRDs, specifications, architecture plans, tickets — are the real bottleneck. Get them right and agents produce good software. Get them wrong and agents produce a lot of confident, plausible, wrong software.

But "get them right" hides a hard question. What does a right artifact actually look like, and how do you produce one on demand?

A great artifact has three properties. It is correct — it is validated by triangulating the documents, the code, and human judgment to land on the best available answer, not merely a plausible one. It is complete — it captures everything there is to know on the subject, both how the system was intended to behave and how it is actually implemented. And it is concise — it carries exactly the context needed to execute and no more, because bloat is its own form of ambiguity. Correct, complete, concise. Those are the hallmarks.

Here is the uncomfortable part: you cannot reliably hit all three with general, one-shot prompting. Point a capable model at a folder of source documents and ask it to write a specification, and it produces something that looks right and is subtly, expensively incomplete. It does not know which decisions were later reversed, where the code diverged from the plan, or which of two conflicting docs is authoritative. It averages over whatever it was handed.

To produce great artifacts consistently and efficiently, you have to stop hand-assembling context and start building tooling that does it for you. The most critical class of that tooling is the domain knowledge agent.

## What a domain knowledge agent is

A domain knowledge agent is an agent trained to deeply understand one domain of your application along three axes.

First, it understands how the domain was intended to work — the design, the requirements, the architectural decisions, the standard the team meant to instill.

Second, it understands the reality and variability of how the domain is actually implemented — where the code matches the intent, where it drifted, and the specific ways it varies across the platform.

Third — and this is what makes it a tool for building artifacts rather than a fancy search box — it can evaluate a new request and produce a sound implementation plan: what needs to change, where, how, and what to watch out for, grounded in both the intent and the reality.

That third axis is the payoff. A domain knowledge agent is not there to answer trivia about your system. It is there to be invoked — often by an orchestrating agent, often in parallel with its peers — to evaluate a proposed change and return grounded commentary that becomes part of a specification, an architecture plan, or a ticket.

## How it learns: book-smart first, then street-smart

Domain knowledge is built in a deliberate order, and the order matters.

The agent starts book-smart. It works through the requirement docs, architecture plans, design documents, testing plans, and diagrams to tease out how the domain is supposed to work. This is the intent layer. From this position alone it can already do useful work — reason about how a capability should extend to a new part of the application, or engage with other agents to revise requirements to fit what the feature can actually support.

Then it becomes street-smart. It grounds that intended direction in a review of the implemented code — the reality that is niche to this domain and captured nowhere in the docs. Only now can it speak to the gap between plan and practice, direct code-writers toward correct and testable outcomes, or author extensions itself.

Intent first is what makes the code-grounding safe. An agent that only reads code faithfully describes the mess; an agent that reads intent first knows which parts of the mess are load-bearing and which are drift to be corrected.

Two artifacts hold this knowledge together. `provenance.md` is the traced record of every source the agent's understanding is built on — which docs, which diagrams, which code paths and commit ranges, and the human commentary layered on top. It is what lets the agent answer "how do I know this?" and, crucially, what lets it retrain itself when the platform moves. The reference folder — a set of curated, commented `.md` files — is the durable knowledge itself: not raw source dumps, but the reconciled, annotated understanding the agent operates from.

## How it keeps learning: open-questions and the human in the loop

An agent that grounds itself once and never updates is just a new place for context debt to hide. The mechanism that prevents this is `open-questions.md` and the human-in-the-loop (HITL) that works it down.

`open-questions.md` is the agent's honest ledger of what it could not reconcile: intent-versus-code conflicts, behavior it found in the codebase that no document explains, requirements too ambiguous to act on, decisions whose provenance it could not locate. Left alone, these are just uncertainty. Run through an iterative HITL loop, they become the engine that sharpens the agent's interpretation of its own findings.

That loop does real, varied work. It corrects flaws in the agent's logic. It fixes source documents that were wrong or stale. It spawns Jira tickets to resolve genuine code issues the agent surfaced. And it yields a resolution log — a record of what was asked, what was decided, and why — that is consumed alongside `provenance.md` whenever the agent is retrained. Each resolved question makes the agent smarter and leaves a durable trace, so the next retraining starts from more solid ground than the last.

This is the difference between an agent that decays and one that compounds. The provenance tells it where its knowledge came from; the open-questions ledger tells it what it still does not know and how each gap was closed.

## Why pre-trained beats one-shot, every time

With that apparatus in view, the case against one-shot prompting is easy to make.

A generalist pointed at the source docs re-derives the domain from scratch on every invocation, across sources of varying breadth and quality, with no human commentary overlaid. It has no way to know that the design doc's "query attributes" table was later found to rot, or that two docs describing the same field actually disagree. It reconstructs a plausible average and moves on. Ask it the same question twice and you may get two different plausible averages.

The specialist does not reconstruct. It remembers — from curated, reconciled, human-annotated experience that was corrected over many HITL cycles and captured in its reference folder and resolution log.

And this holds even against a generalist that gets multiple shots over a long session. Accumulated context inside a single conversation is not the same as curated experience. A multi-shot generalist gathers more raw material, but nobody has told it which material is authoritative, which was superseded, or where the code lies about its own intent. It has volume without reconciliation. The domain knowledge agent has reconciliation as its starting point. Over any horizon that matters, the curated experience prevails — because the expensive, human part of understanding a domain has already been done and preserved, not re-attempted from zero.

## Case study: the Filter domain

> **CASE STUDY — THE FILTER AGENT**
>
> Filtering slices recommendation views by attributes like plant, vendor, material, availability, and recommendation type.
>
> **Intended (book-smart).** Filtering began as a custom GraphQL DSL over live PostgreSQL joins that did not scale. The optimization moved filterable data into per-org, per-type OpenSearch indexes — and the design doc flagged its own risk: if the denormalized fields are not kept in sync when source data changes, filters go stale.
>
> **Actual (street-smart).** The search queries, tab-level filters, and save-filter shipped. But the flagged risk came true: reference tables update in Postgres without firing a re-index event, so OpenSearch holds a creation-time snapshot. When a customer's plants were renamed, the stale names rotted in the index — a real incident, sixteen field gaps behind it. Add the semantic variances: an availability-operator bug (fixed) and a recommendation-type classification mismatch (still open).
>
> **In the loop.** That open mismatch is exactly what lives in `open-questions.md` — not papered over, not asserted, but tracked. When a human resolves it, the answer folds into the reference folder, the resolution log records why, and a Jira ticket carries any code fix into the pipeline.
>
> **At work.** Asked to spec a change that touches filtering, the orchestrator invokes the Filter agent alongside its peers. It does not say "filters are supported." It says: this change reads a field known to lag its Postgres source; unless a re-index event is wired in, results will be stale; build against the existing eventing dependency; and the classification variance is still open. No one-shot produces that — it took an incident, a design doc, and several HITL cycles to earn.

## Proving it: evals

None of this is worth much if you cannot tell whether a given domain knowledge agent is actually good. Confidence should not be anecdotal.

Grade the agent on the same three C's that define a great artifact — is its answer correct (triangulated across docs, code, and human judgment to the best available answer), complete (covering both intended and implemented behavior), and concise (only the context needed) — plus a fourth dimension the artifact framing does not need: is it quick? An agent that takes too long to answer cannot be invoked in parallel during spec generation, so speed is a first-class property here. And above all, can it propose a sound implementation plan, not merely answer questions? Test for exactly those. Build a catalog of evals: questions with known-good answers drawn from the people who own the domain, and proposed-change scenarios with known-good plans. Grade on correctness, completeness, concision, speed, and plan quality.

The evals are also your early-warning system. When scores drift — because the platform moved and the agent's grounding went stale — that failure is not a dead end. You fold the failing cases into `open-questions.md`, capture the anti-patterns the agent fell into, write new evals that pin down the correct behavior, and retrain. Drift becomes fuel. The eval catalog and the open-questions ledger together turn every failure into a permanent improvement.

## The pipeline built by specialists

The Context Pipeline series argued that shipping good software in the agentic age depends on one thing above all: the artifacts that carry intent into execution have to be correct, complete, and concise. This is the part that comes first. Those artifacts do not assemble themselves, and no vendor ships the tooling that produces them — because the knowledge required is specific to your application, your history, your code.

So you build that tooling yourself, one domain at a time. Standing up a domain knowledge agent is a repeatable process — ground it book-smart then street-smart, trace its provenance, work its open-questions through HITL, prove it with evals, retrain, repeat — so the process itself becomes a skill you apply across the platform. Every agent you add is one more domain the pipeline can generate a trustworthy artifact for. A bench of them, invoked together, is the machinery that turns "write the specification" from a one-shot gamble into a repeatable, gradeable operation.

That is the actual unlock. Correct, complete, concise artifacts do not come from pointing a clever model at a pile of documents. They come from specialists that have already done the expensive work of understanding — and can be trusted, because you can prove it. Build the specialists first, and the context pipeline finally has something to run on.
