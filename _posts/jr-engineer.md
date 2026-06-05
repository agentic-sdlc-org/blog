---
title: "Where Do Senior Engineers Come From When Junior Engineers Disappear?"
excerpt: "AI is absorbing the struggle that builds senior engineers — the debugging loops, the undocumented decisions, the systems you had to understand before you could fix them. What happens to the pipeline when that disappears?"
coverImage: "/assets/blog/jr-engineer/cover.png"
date: "2026-05-25T05:35:07.322Z"
author:
  name: Tom Elrod
  picture: "/assets/blog/authors/tom.jpeg"
ogImage:
  url: "/assets/blog/jr-engineer/cover.png"
republishedAt:
  - label: LinkedIn
    url: "https://www.linkedin.com/pulse/where-do-senior-engineers-come-from-when-junior-disappear-tom-elrod-7n80e/"
---

We have always known there was a gap between engineers who produce working code and engineers who understand the system they are working in.

AI did not create that gap. It just made it harder to see.

Jai Jalan shared an observation on one of my earlier posts that has stayed with me. He described watching three engineers work through the same problem, all using AI, all producing code that worked. None of them were working from the same picture of the system. The gap between them did not close. It widened. They just could not see it yet.

That gap is what this article is about.

---

## How Senior Engineers Are Actually Made

Senior engineers are not made in classrooms or in round after round of code reviews. They are made through the hard work of solving problems no one has already solved for them.

Not long ago, my team inherited an event-driven architecture mid-implementation. The architect who designed it had left. What remained was a partial system, a set of decisions nobody had fully documented, and a team that now had to figure it out.

They had to learn how OpenSearch actually behaves at scale across tens of millions of inventory records. They had to understand what eventual consistency means when a user accepts thousands of recommendations in bulk and the system is processing that work asynchronously in the background. They had to answer a question nobody had written down: **what does the user experience while that work is happening, and how do they know when it is done?**

There was no clean answer waiting for them. They had to sit with the system long enough to develop a mental model of it. They had to feel the consequences of decisions made upstream, before they arrived, by someone who was no longer there to explain them.

> That is the craft. That is what builds a senior engineer. Not the output. The struggle to understand the system well enough to produce it correctly.

---

## AI Is Absorbing the Struggle

AI is shortening the very loops that used to build that understanding.

The debugging loop that used to require sitting with a problem long enough to understand the system is getting shorter. The architectural decisions that used to produce consequences a junior engineer had to live with are getting papered over faster. The gaps in documentation that used to force someone to read the code carefully enough to build a real mental model are getting filled in by tools that are very good at producing plausible answers.

The output looks right. The question is whether the understanding is forming underneath it.

**Most of the time, I do not think it is.**

---

## The Gap That Won't Show Up in Your Metrics

This creates a problem that will not announce itself in sprint velocity or deployment frequency. Those numbers may look fine right up until they do not.

What shifts is the ability to evaluate readiness. Managers and leads are looking at output and trying to make judgments that output used to make obvious. Who is ready for more responsibility? Who actually understands the system versus who has learned to produce answers that look like understanding?

> Someone can appear senior for months before the gap becomes visible — usually at the worst possible moment.

That is where most teams are right now. Very few are talking about it.

---

## The Harder Question Nobody Is Asking

Here is the harder version of the problem.

If the world stayed the same, this is where a thoughtful engineering leader would start asking how to rebuild the conditions that develop senior engineers. How do you deliberately create the struggle AI is removing? How do you ensure junior engineers still develop the craft?

But the world is not staying the same. And that set of questions assumes something worth examining.

**It assumes junior engineers will still exist in two or three years.**

If AI can produce output at the same level of comprehension as a junior engineer, and do it faster, the economic case for hiring and developing junior engineers weakens considerably. And if junior engineers disappear — or shrink to a fraction of what they once were — the source pool for senior engineers disappears with them.

Which raises the question nobody seems to be asking yet.

Where do senior engineers come from a few years from now? And will we still need them by the time we find out the answer?
