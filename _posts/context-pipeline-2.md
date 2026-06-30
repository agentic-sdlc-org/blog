---
title: "The Context Pipeline"
excerpt: "\"Better documentation\" is not a strategy. It's a slogan that summons templates, compliance checklists, and a stale wiki nobody trusts. CTOs need a sharper model — a working system, not a vibe."
coverImage: "/assets/blog/context-pipeline-2/cover.png"
date: "2026-06-30T10:00:00.000Z"
author:
  name: Marcus Tewksbury
  picture: "/assets/blog/authors/marcus.jpeg"
ogImage:
  url: "/assets/blog/context-pipeline-2/cover.png"
---

*Part 2 of 3: Context Pipeline*

"Better documentation" is not a strategy. It's a slogan that summons templates, compliance checklists, and a stale wiki nobody trusts. If context quality now drives engineering performance, CTOs need a sharper model than that — a working system, not a vibe.

That system is the Context Pipeline: the chain of artifacts that turns business intent into executable work.

**PRD → Specification → Architecture Plan → Epic → User Story → Ticket.**

Each layer should make the next one more precise. The PRD establishes why the work matters. The Specification defines what the system must do. The Architecture Plan defines how the system should change. Stories express valuable slices of behavior. Tickets define executable units.

The order isn't strictly linear — a Spec can expose a gap in the PRD, an Architecture Plan can reshape an Epic. That's normal. What matters is the principle underneath: progressive clarification. Each layer should reduce ambiguity, not just relabel it. When the pipeline works, every document narrows the range of reasonable interpretations. When it fails, every document passes its ambiguity downstream for someone — or some agent — to resolve. That downstream guessing is where agentic development gets expensive.

## The Documents and Their Jobs

Most organizations don't lack documents. They lack agreement on what each document is for. The PRD tries to do the Specification's job. The Specification gets skipped because "the ticket has enough detail." The Architecture Plan becomes a diagram with no decision record behind it. The Epic becomes a folder. The Ticket becomes a reminder of a conversation nobody wrote down.

Humans can sometimes survive that mess by filling gaps from memory. Agents cannot.

| Document | Primary Job | Common Failure Mode |
|---|---|---|
| PRD | Define the problem, user need, outcome, and priority | Reads like a feature request; key decisions stay implied |
| Specification | Translate the PRD into precise expected behavior | Repeats the PRD without resolving ambiguity |
| Epic | Group work into a coherent product increment | Becomes a bucket of loosely related tickets |
| Architecture Plan | Define how the system should change | Describes an implementation path without tradeoffs or constraints |
| User Stories | Describe valuable slices of behavior | Generic "as a user…" statements with no real guidance |
| Tickets | Define executable units of work | Thin descriptions that lean on tribal knowledge |

Not every team needs identical templates or the same ceremony. But every organization needs a shared answer to "what is this document's job" — without it, quality has nothing to be measured against.

## The Specification Is the Hinge

Of the six artifacts, the Specification carries the most weight. The PRD shouldn't try to do its job — a good PRD explains what matters and why, not every edge case and data constraint. That translation used to happen informally: a functional spec, a technical spec, or just the decisions a senior engineer carried out of a few clarification meetings.

In an agentic workflow, that informal translation has to become explicit, because there's no engineer in the room to supply it on the fly. The Specification answers what an agent can't infer: the happy paths, the sad paths, the edge cases. What business rules and data constraints apply. What's explicitly out of scope. How correctness will be verified.

If the Specification is strong, everything downstream gets easier — the Architecture Plan has something concrete to respond to, Stories sharpen, Tickets shrink, tests generate cleanly from acceptance criteria. If it's weak, everything downstream becomes guesswork. And in the agentic age, guesswork becomes generated code before anyone notices it was a guess.

## Not Waterfall

The obvious objection: doesn't this just bring back waterfall?

No. Waterfall documentation tried to predict an entire system before anyone built it. The Context Pipeline tries to make the next unit of work executable — a much narrower standard. A Specification doesn't need to answer every question for the next six months, only the ones required to safely build the current slice. An Architecture Plan doesn't need to design the platform's future, only the constraints relevant to the capability at hand. A Ticket doesn't need to restate the PRD, just carry enough context that nobody has to fill gaps from memory.

This is clear-context-before-execution, not big-design-up-front. It can be lightweight, iterative, and agent-assisted. It just can't be vague.

## What Good Looks Like

Strong documentation in the pipeline shares five traits. None of them are about length.

**Accurate.** The document reflects the current decision, not last week's assumption. Plans change constantly in real engineering work — a constraint gets relaxed, a tradeoff gets reversed, a scope line moves. The failure isn't that change happens; it's that the document doesn't move with it. An Architecture Plan that still describes a sync API after the team agreed to go async isn't a historical artifact, it's an active source of bad code. Accuracy means someone treats the document as the current source of truth and updates it the moment the decision changes, not at the next scheduled review.

**Specific.** The document removes ambiguity instead of gesturing at it. "Handle errors gracefully" is not specific. "Return a 422 with a field-level error map; retry transient failures up to three times with exponential backoff; surface permanent failures to the user with the record ID" is. Specificity is what separates a document that informs a decision from one that merely names a topic. Vague language doesn't disappear when it hits an agent — it gets resolved by guesswork instead.

**Layered.** Each artifact has one job and stays in its lane. The PRD doesn't try to specify behavior; the Specification doesn't try to make business-priority calls; the Ticket doesn't try to re-litigate architecture. When layers blur, teams end up with six-page PRDs that nobody reads and one-line tickets that nobody can execute, because all the thinking got crammed into whichever document someone happened to be writing that day.

**Traceable.** A Ticket should connect back through Story, Spec, and PRD, so a reviewer can reconstruct the chain of intent behind any line of generated code without reopening a meeting or a Slack thread. Traceability is what makes review fast — instead of asking "why did it do this," a reviewer can ask "does this match what we decided," and go check.

**Executable.** A capable human or agent should be able to act on the document without oral tradition filling the gaps. This is the trait that actually tests the other four — accuracy, specificity, layering, and traceability are all in service of this one. If a Ticket only works when assigned to the engineer who sat in the planning meeting, it isn't agent-ready. If a Specification needs a product manager to verbally explain the actual behavior, it isn't agent-ready. The question isn't "did we document this?" It's "could this document drive correct execution, on its own?"

## The Payoff

A strong Context Pipeline shows up as fewer correction loops, cleaner agent output, better-generated tests, more consistent architecture, and faster reviews — not because the agents got smarter, but because the inputs did. A weak pipeline shows up as fast output and slow convergence: a growing sense that AI is creating as many problems as it solves, when the real gap is upstream.

The fix isn't to slow agents down. It's to build the pipeline that lets them move fast correctly — designed deliberately, owned explicitly, kept current, and judged by whether it produces correct execution, not by whether it exists.
