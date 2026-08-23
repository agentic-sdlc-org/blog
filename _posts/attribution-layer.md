---
title: "The Attribution Layer"
excerpt: "Seats, tokens, and acceptance rates all rise as adoption rises and never fall when quality does. The measurement that tells you whether an agentic SDLC is working starts somewhere less glamorous: knowing which changes the agents actually made."
coverImage: "/assets/blog/attribution-layer/cover.png"
date: "2026-09-02T09:00:00.000Z"
author:
  name: Tom Elrod
  picture: "/assets/blog/authors/tom.jpeg"
ogImage:
  url: "/assets/blog/attribution-layer/cover.png"
---

The teams that compound their agentic investment will not be the ones with the largest tooling budget or the highest adoption numbers. They will be the ones that can tell which parts of their delivery system are getting better, and which parts are only getting busier.

That sounds like a reporting concern. It is closer to a navigation concern. The playbook describes the lifecycle as five stages: Define, Shape, Build, Validate, Run. Agents collapse Build. The question worth answering is what that does to the other four, and where the constraint lands next. You cannot answer it without knowing which parts of your delivery system improved and why.

Most measurement available today does not go near that. Seats deployed, tokens consumed, suggestion acceptance rate, lines produced. These are real numbers and they are easy to gather, which is why they end up on the slide. They rise as adoption rises, and they stay flat when quality falls. They tell you how much is happening. Whether any of it is helping is a separate question they do not touch.

The good news is that the fix is mostly plumbing, and the plumbing is cheaper than it looks.

## Start with attribution

Cycle time, defect rate, review load. Every metric a team already has is a blend of human work, AI-assisted work, and agent-executed work, with no way to separate them. When cycle time improves nine percent, the improvement could be agents or it could be the deploy pipeline someone finally fixed. Both readings fit the data.

Attribution is what makes that answerable, and it takes one field. Every merge request carries a label describing how it was produced. Agent-executed, AI-assisted, or human-built. One required value, checked in continuous integration (CI). Add a commit trailer alongside the label so the attribution survives in git history long after the label has been forgotten.

The categories need boring, explicit definitions, published where people will actually find them. Agent-executed should mean the implementation was principally produced by an agent working from human-provided intent. Substantial human implementation makes it assisted. Consistency across teams matters more than precision at the boundary, because the moment two teams classify the same change differently, every number downstream describes the classifier instead of the work.

That single field makes every downstream metric splittable. Speed by AI involvement. Quality by AI involvement. Cost by AI involvement. It does not establish causation on its own, and it is worth being clear about that. Agent work tends to concentrate in simpler changes, in better-maintained parts of the codebase, and on the teams that adopted earliest. What the label buys you is populations you can compare, which is more than most organizations have today. Without it, every number is one average across two populations, describing neither.

The right way to roll this out is to make it useful before making it required. Ship the tagging inside a tool that improves the act of opening a merge request. Run the lint, run the tests, run a pre-review pass that mirrors what CI will say, fill the description from the template, apply the label. Developers adopt it because it saves them a review cycle. Adoption follows utility far more reliably than it follows policy.

Agent-executed work is easier still. When a worker opens a merge request, it stamps its own attribution. That path is entirely within your control and can ship immediately.

## Report speed and quality on the same view

Cycle time can improve because the system got better. It can also improve because testing got thinner. The number is identical in both cases, which is why speed reported alone is worth very little.

The target is simple to state and specific enough to hold a team to: speed up, quality flat or improving. Put both on the same panel, over the same period, split by attribution. Report medians and p75 rather than averages, because the tail is where stuck work lives and averages tend to hide it.

Here is the shape of what that produces.

| | Human-built | AI-assisted | Agent-executed |
|---|---|---|---|
| Cycle time, median | 4.1 days | 2.8 days | 1.6 days |
| Cycle time, p75 | 7.2 days | 4.9 days | 3.1 days |
| Escaped defects per 100 merge requests | 3.2 | 3.0 | 4.8 |

Those numbers are illustrative rather than measured. The shape is the point. Read that table and the speed improvement is the least useful thing in it. Agent-executed work is moving faster and currently leaking more defects into production, and that combination is immediately actionable. A speed number on its own is not.

One panel like that turns a debate about whether AI is helping into a question with an answer.

## Make defects tell you where the leverage is

A defect count on its own is close to inert. The valuable signal is one field away.

Link every production issue back to the feature that introduced it, and capture a root cause at triage from a short fixed list. Missed spec. Not built to spec. Poor implementation. Missing test.

Those four are not a generic defect taxonomy. Each one names a stage. Missed spec is a Define or Shape failure that stayed invisible until Run. Not built to spec is a Build failure against a description that was adequate. Poor implementation is a Build failure of a different kind. Missing test is a Validate failure. Reading the distribution is reading which stage of your own lifecycle is leaking.

Defects clustering under poor implementation point at code, and better models, tighter review, and stronger pre-merge gates will move the number. Defects clustering under missed spec point somewhere else entirely. The agent built what was described. The description was thin, and something plausible filled the gap. No model upgrade fixes that.

This is the core claim of the agentic SDLC expressed as a measurement. Coding stopped being the constraint. Specification quality became the constraint. Most teams believe that in principle and have never looked at data from their own organization that would confirm it.

A required link and a required field is what it takes to find out. That is among the highest-return process changes available to an engineering org right now, and it costs remarkably little beyond discipline at triage.

## Design the system so the data stays honest

Every metric here describes teams and systems. None of it is reported per person.

This is a design decision rather than a cultural nicety. The moment a measure becomes an individual target, it stops describing reality and starts describing what people believe leadership wants to see. Attribution labels get applied selectively. Root causes drift toward the categories that sound less like anyone's fault. Correction loops quietly resolve off the record.

What is being measured is a system. That system includes specification quality, review capacity, the deploy pipeline, and the agents. Keeping the measurement at the team level is what keeps every number downstream worth reading.

## Sequence it so each step pays for itself

There are two measurement problems here and they run on different clocks. Trend metrics tell you whether the system is improving across quarters. Flow instrumentation tells you where work is stuck this week. Both are worth having. The second is cheaper to build, and it is the one to build first.

Before either, pilot the metric definitions in a spreadsheet for two weeks. Definitions are almost always wrong on the first pass, and code written against a wrong definition is more expensive than no code at all. Once the definitions survive contact with real tickets, build.

Then ship the flow board before the trend charts. Every active feature as a row, its current stage in the lifecycle, time in stage, flagged when it stops moving. That single view pays for the entire foundation on its own, because it surfaces bottlenecks the week they form rather than at the end of the quarter. It also requires none of the sophisticated metrics to be finished first, which means the foundation work delivers value while the rest is still being built.

The trends come after, and they are worth considerably more once the definitions have been tested.

## What this unlocks

An attribution layer, a paired speed and quality view, and a root-cause distribution are not a reporting exercise. They are the instrumentation that lets an organization tell the difference between a system that is genuinely improving and one that is simply producing more.

That difference is the whole game as shipping gets cheaper. Build the attribution layer first, and the questions worth asking about your agentic SDLC stop being matters of opinion.
