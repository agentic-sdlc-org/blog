---
title: "What the AI Hype Cycle Gets Wrong About Engineering Culture"
excerpt: "84% of organizations haven't redesigned jobs or workflows around AI. 74% struggle to achieve value from AI investments. The tools aren't the problem. They never have been."
coverImage: "/assets/blog/ai-hype-cycle/cover.png"
date: "2026-05-19T05:35:07.322Z"
author:
  name: Tom Elrod
  picture: "/assets/blog/authors/tom.jpeg"
ogImage:
  url: "/assets/blog/ai-hype-cycle/cover.png"
republishedAt:
  - label: LinkedIn
    url: "https://www.linkedin.com/pulse/what-ai-hype-cycle-gets-wrong-engineering-culture-tom-elrod-vhbpe/"
---

Every major shift in engineering follows the same pattern: **the tooling arrives before the culture is ready.**

I have been building and leading engineering teams for twenty years. I have watched Agile replace waterfall. I have watched DevOps replace the wall between dev and ops. I have watched microservices replace monoliths, and then watched some of those teams quietly rebuild the monolith.

Every one of those transitions had the same shape: the tooling arrived before the culture was ready, the early adopters got the headlines, and the hard organizational work happened quietly, years later, out of the spotlight.

AI is no different.

But this time there is data to put numbers on the gap — and the numbers are striking. Deloitte's 2026 State of AI in the Enterprise found that **84% of organizations have not redesigned jobs or workflows around AI**, and fewer than half have meaningfully adjusted their talent strategies. A BCG study of 1,000 senior executives across 59 countries found that **74% of companies struggle to achieve value from AI investments** — and 70% of the challenges they identified were people and process issues, not technology.

The tools are not the problem. They never have been.

---

## The Pilot That Never Becomes the Practice

AI pilots typically run like this: a sponsor pushes a project for AI use, a deadline is set, the team delivers something considered sufficient, and in some cases there are even success metrics that are produced and evaluated. Then the sponsor declares mission accomplished and moves on.

These projects are often treated as milestones to satisfy quarterly objectives rather than as the beginning of a broader transformation. AI projects in particular are frequently viewed like the "I know kung fu" scene in the Matrix.

> It doesn't work that way. AI adoption should not be seen as a switch that is turned on and everything takes care of itself.

These situations also leave teams without ownership or any real stake in whether the project brings value. They are left with something they no longer use, or use only because they are required to but do not get any benefit from. I call this the **"proof of concept permanent" pattern.**

What is often missing is the desired long-term impact. What problem or pain point is the project trying to solve? What is the plan for sustaining and evolving it over time? And just as important: getting buy-in from the team. Making the team partners in the project instead of simply implementors.

---

## The Real Resistance Is Not About the Tools

Most engineers are already using AI or are at least curious about it. The resistance is not to the tools themselves. What engineers are actually wrestling with is **ownership, process, and trust.**

The ownership concern is understandable. It feels strange to be accountable for work you did not produce in the traditional sense. But the framing is off. Engineers are not passive in this loop — they are shaping every line of code through the prompts and context they provide: the design patterns, the error handling, the naming conventions. That is a higher order of programming, similar to the evolution from punch cards to assembly to compilers. The abstraction changed. The responsibility did not.

Trust works the same way. It is not given to the tool upfront. It is built through the review loop. You read the output, you find where it fell short, you understand what was missing from the input that produced the wrong result. Over time that cycle — prompt, review, calibrate — is how an engineer develops real confidence in what the tool can and cannot do.

The process friction is the harder problem. For a long time, software development has run on informal dynamics: people in close proximity, conversations in the hallway, shared tribal knowledge that never gets written down. That is a process, even if nobody calls it one.

**AI does not work with informal.** It has no access to what was decided in last Tuesday's standup or what the senior engineer knows from three years on the codebase. It needs explicit input — clean documentation, architecture plans, coding standards, detailed requirements. The things many dev shops have been putting off or skipping entirely.

That is the real forcing function. Not the tool. The discipline the tool demands.

---

## We Are Measuring the Wrong Thing

During initial AI adoption, almost everyone starts by measuring AI tool usage. Notice I didn't say adoption. The number of engineers with seats and tokens used is most common. These metrics measure the tool usage, not the work being done.

> High adoption + flat outcomes = you changed how code gets written, not how business value was added.

Being able to determine if there has been an impact on delivery is ultimately what you want to understand — from requirements being defined all the way to delivery in production. This can be challenging to measure and requires establishing a baseline early to have something to measure change against. Although some sub-phases of the overall process may get faster, there is a strong likelihood that some sub-phases will actually take longer, such as review steps where humans need to take more time to verify completeness and correctness.

---

## What "AI Adoption" Actually Looks Like

Most teams have not changed how work gets done. They still follow the same SDLC process that has been in place for years — rough draft requirements during the hand-off to engineering, loosely defined acceptance criteria in tickets, anemic supporting documentation, rubber-stamped PRs, and minimal automated test cases. They do use AI to generate the code, but this is only a small part of the overall picture.

The shift that actually matters is in **everything that feeds the tooling**: requirements that are complete before engineering starts, acceptance criteria specific enough to test against, documentation that reflects what the system actually does. Most teams have not touched any of that. They just added AI to the same undisciplined process they had before.

---

## The Process Change Is the Leverage

The organizations that figure this out will not have better tools than everyone else. They will have better results.

Process change is not glamorous. It does not make for good conference talks or LinkedIn posts. But it is where the leverage actually lives, and most organizations are skipping it entirely in the rush to show AI adoption numbers.

Of all the process changes available, **requirements has the highest leverage.** It seeds everything downstream. A well-defined requirement gives AI something solid to work with. A vague one gives it room to fill in the gaps — and it will, confidently, and often incorrectly. Get requirements wrong and AI does not just produce bad output. It produces bad output faster, at higher volume, and with enough surface credibility that it gets further down the pipeline before anyone catches it.

That is the part that does not get talked about enough.

> AI does not just accelerate good process. It accelerates bad process too.

The hard organizational work always happens quietly, out of the spotlight, years after the tooling arrives. The pattern is the same as it has always been. The only difference this time is how fast the gap is widening between the organizations doing that work and the ones still counting seats.

What process change has made the biggest difference in your organization? Or what are you still trying to figure out?
