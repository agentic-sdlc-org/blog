---
title: "Context Debt Is the New Technical Debt"
excerpt: "Every engineering organization runs two decision systems. The official one and the real one. Agents don't bridge that gap — they execute against it."
coverImage: "/assets/blog/context-pipeline-3/cover.png"
date: "2026-06-30T11:00:00.000Z"
author:
  name: Marcus Tewksbury
  picture: "/assets/blog/authors/marcus.jpeg"
ogImage:
  url: "/assets/blog/context-pipeline-3/cover.png"
---

*Part 3 of 3: Context Pipeline*

Every engineering organization runs two decision systems. The official one is PRDs, specifications, architecture plans, tickets, ADRs, and runbooks. The real one is Slack threads, meeting notes, hallway conversations, customer calls, and the senior engineer who "just knows how that service works."

Humans have always bridged that gap. A developer reading a vague ticket knows there's more context somewhere, and goes and finds it — asks around, searches Slack, remembers last month's architecture discussion. Agents don't bridge that gap. They execute against the context they're given. If the ticket is stale, they build the stale version. If a Slack thread quietly overrode the spec, they never see it.

That gap between the two systems is context debt. In the agentic age, it's becoming as dangerous as technical debt — and unlike technical debt, it doesn't show up in a code scan.

## Informal Decisions Are Still Decisions

No CTO should try to eliminate informal decision-making. Real organizations don't work that way — a customer escalation forces a scope change, a design review surfaces a missing edge case, a five-minute Slack thread resolves what a meeting would have taken an hour to settle. That's healthy.

The problem isn't that decisions happen informally. The problem is when they never make it back into the official system. A PRD says one thing, a thread modifies it, a meeting adds a constraint, the architecture plan never changes — and two weeks later an agent implements whichever artifact happened to be in context. The team then blames the agent. But the agent didn't create the ambiguity; it executed against it.

The operational challenge of this era isn't just writing better documents upfront. It's keeping the pipeline synchronized as decisions evolve.

## The CTO Owns the System

Documentation quality can't be left to goodwill. If the Context Pipeline is part of the execution system, the CTO has to run it like an operating model, not a hygiene habit — not by editing every PRD personally, but by defining expectations, assigning ownership, and building quality gates into how work moves.

The operating question is simple: when a meaningful decision gets made, where does it live? "In Slack" isn't enough. "In the meeting recording" isn't enough. "Sarah knows" is definitely not enough. The decision can originate anywhere — a call, a thread, a review comment — but if it changes what gets built, it has to land in the artifact that governs execution.

## Ownership by Artifact

The fastest way to manufacture context debt is to make documentation "everyone's responsibility," which in practice means no one's. Ownership has to be assigned per artifact: Product owns the PRD — the problem, the rationale, the scope boundaries. Engineering owns the Specification and Architecture Plan — expected behavior, constraints, tradeoffs. Product and Engineering jointly own epics and stories. Tech leads or engineering managers own ticket readiness — whether work is bounded and executable without oral tradition. SRE, Support, and Engineering jointly own runbooks and operational notes.

The specific model can vary by org. What can't vary is that every artifact has a named owner who knows what quality means for it. That's not bureaucracy, it's accountability: if an agent ships bad output because a ticket was thin, the team should already know whose job ticket readiness is.

## The Part That Deserves Its Own Article

Most context debt isn't created in the official documents — it's created in the gap between when a decision is made informally and when (or whether) it gets written back. Slack threads, meeting and call transcripts, code review comments, incident debriefs: these are where the real decisions happen first, and they're the hardest layer to operationalize, because nobody wants a rule that turns every channel into required reading.

A useful starting heuristic: distinguish decision from discussion. Most of a thread is discussion and can stay where it is. If a thread changes expected behavior, scope, or a technical constraint, that decision needs to move into the durable artifact it affects — not stay buried in a channel an agent will never read. The same split applies to meeting notes, review comments, and incident retros: capture what changed, not everything that was said.

This is a big enough problem — and a big enough opportunity, given how good agents are getting at summarizing unstructured conversation — that it deserves its own treatment. A future piece in this series will dig into how to actually operationalize informal decision capture at scale.

## Quality Gates Before Code Exists

Most teams already gate code after it's written: CI, coverage, review, security scans. In an agentic workflow, the more expensive failures happen earlier — an unclear PRD, an incomplete Spec, an Architecture Plan missing a constraint, a ticket that's too broad. By the time code exists, the team is already paying for the upstream miss.

The fix is lightweight gates at each transition: before PRD becomes Spec, is the problem and the non-goals explicit? Before Spec becomes Architecture, is behavior precise enough to design against? Before Architecture becomes tickets, are boundaries and dependencies clear? Before a ticket goes to an agent, is it small and self-contained? These don't need to be heavy — a checklist, a PR template field, a prompt requirement — but they need to exist, or the team keeps discovering documentation failures through bad code.

## Measure It Through Rework

Context quality stays abstract until it's tied to rework. When an agent's output needs correction, classify why: was the ticket unclear, the Spec incomplete, an architecture constraint missing, a Slack decision that never made it into the artifact? The fix differs by cause — ticket standards, PRD-to-Spec translation, decision-capture discipline, architecture review. The goal isn't to assign blame; it's to feed every failure back into the operating model so the pipeline gets better each time it breaks.

Agents can help here, too — summarizing threads into proposed decisions, flagging tickets that lack acceptance criteria, comparing PRs against the tickets they claim to implement. But agents should propose, not decide. A human still confirms the decision and updates the artifact. That division of labor — agents for coverage, humans for judgment — is itself something the CTO has to design deliberately.

## The Real Risk

Agents won't suddenly take over software engineering. The nearer risk is that they'll execute faithfully against the messy, half-documented reality already inside most organizations — every unclear requirement, stale decision, and architecture principle that only lives in someone's head. That exposure looks like agent failure. It's usually organizational failure made visible for the first time.

Treat context debt the way good organizations already treat technical debt: name it, track it, assign ownership, and pay it down deliberately. Because unlike technical debt, context debt doesn't sit quietly in a backlog. It ships.
