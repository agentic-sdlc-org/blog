---
title: "Agents vs Skills"
excerpt: "We kept having the same argument in the hallway — is that a skill or an agent? — and never finishing it. So we took a trip through how Anthropic and the industry define each, and came back with a definition we can actually build on."
coverImage: "/assets/blog/agents-vs-skills/cover.png"
date: "2026-07-31T09:00:00.000Z"
author:
  name: Jorge Romera
  picture: "/assets/blog/authors/jorge.jpeg"
ogImage:
  url: "/assets/blog/agents-vs-skills/cover.png"
---

There is an argument we keep having at Verusen. It doesn't happen in a meeting with an agenda. It happens in the hallway, in the last five minutes of a standup, in a Slack thread that was supposed to be about something else entirely. Someone says the word *agent*. Someone else says, gently, "isn't that just a skill?" And we're off.

We are good at this argument. We have had it many times. We have never once finished it.

That would be fine if the two words were decoration. They are not. We are building an entire agentic SDLC on top of them — ticketing, code review, standards enforcement, whole pipelines — and every time we design a new piece of it, the same fork in the road shows up: *is this thing we're about to build a skill, or an agent?* And every time, we discover we still don't share an answer. We've been pouring concrete on top of a word we haven't defined.

So instead of having the argument a tenth time, I want to do something different. I want to take a trip — and I want you to come with me. We'll go ask Anthropic what these words mean, because these are their tools. We'll go ask the rest of the industry, because they use the same words to mean slightly different things and that's half our problem. We'll take each tool apart to see what it actually does and how you make one. We'll catalog the different shapes they come in. And then, at the end of the road, we'll try to come back with a single definition — ours — that we can hang the agentic SDLC on without wincing.

Grab a coffee. It's not a long trip, but it goes somewhere.

## First stop: what Anthropic actually says

We start at the source, because the tools we build on — Claude Code, the Agent SDK — are Anthropic's, and it's only fair to hear their definition before we argue with it.

A **Skill**, in Anthropic's telling, is almost disappointingly concrete. It's a folder. Inside it lives a `SKILL.md` file with a little bit of YAML at the top — a `name` and a `description` — followed by instructions written in plain language. Optionally, the folder carries more: reference documents, scripts Claude can execute, example files. That's it. That's the whole thing. A skill is packaged know-how, sitting on disk, waiting.

The clever part is *how* it gets used. Claude doesn't read the whole folder all the time — that would drown its context. It reads only the `name` and `description` up front, always. When a task comes in that matches that description, it pulls in the body. And only if the body points to a script or a reference does it reach for those. Anthropic calls this **progressive disclosure**, and it's the reason a skill can be enormous and cheap at the same time: you pay for the parts you use, when you use them. The same skill folder works in the Claude app, in Claude Code, and through the API. Write it once; it travels.

An **Agent** is a different kind of animal, and Anthropic is careful about the word. In their writing on building effective agents, they start by naming the thing an agent is most often confused with: a *workflow*. From the outside the two look alike — both use a model, both get work done. The difference is who holds the steering wheel.

In a workflow, *you* hold it. You wire the steps together in code — first this, then that, then this — and the model just fills in the blanks at each step. The path was decided before the run ever started; the model never chooses the route.

In an agent, the *model* holds the wheel. You hand it a goal and a set of tools, and it decides what to do next: which tool to call, what to try when that doesn't work, and when the job is done. Under the hood it runs a loop — look at the situation, decide, act, look at the result, decide again — and it keeps going until the work is finished or you stop it.

Two definitions, and already the shape of the difference is peeking through. A skill is a *thing you wrote down*. An agent is a *thing that runs*. Hold onto that — we'll come back to it, and it'll turn out to be the whole story.

## Second stop: what the rest of the industry means

Here's where the fog rolls in, and where I think most of our hallway arguments are actually born.

Ask the broader industry "what is an agent?" and you'll get a version everyone roughly agrees on: an LLM that uses tools, in a loop, to pursue a goal, usually with some memory of what it's done. The disagreements are about *how much autonomy* earns the name — is a chatbot that can call one function an agent? Is a rigid five-step script an agent? People will fight about the edges forever, but the center holds: **an agent is a system that acts on its own in a loop.** That lines up cleanly with Anthropic. Good.

Now ask the industry "what is a skill?" and the ground gets soft. For a lot of people, "skill" just means "a thing the model can do" — a synonym for a tool, or a function, or a plugin. Alexa has "skills." Some frameworks call any registered capability a skill. In that loose usage, a skill is basically *an action*.

And there's our confusion, named at last. If you walked in believing "skill = an action the model can take," then of course you can't tell it apart from an agent — because taking actions is exactly what agents do. The two words collapse into each other. But Anthropic's Skills aren't actions at all. They're *knowledge*. They're the instructions and context that shape how an actor behaves — not the acting itself. The industry's fuzziest word and Anthropic's most concrete artifact happen to share a spelling, and we've been paying the tax on that coincidence in every hallway conversation since.

So we correct course, and travel on with the sharper version: a skill is packaged knowledge; an agent is an actor that runs.

## Taking them apart: how you actually make one

Definitions are cheap. Let's look at how each is built, because you understand a tool best when you've held its pieces.

To make a **skill**, you write a folder. The `description` is the most important sentence you'll write, because it's the part that's always in Claude's view — it's the trigger that decides whether the skill wakes up for a given task. The body is a procedure: *when asked to do X, here is how we do it here.* If the procedure needs muscle — a data transformation, a validation step — you drop a script in the folder and point the instructions at it. There is no loop. There is no decision engine. A skill, opened and read, just sits there being true. It has no way to *do* anything until some actor picks it up.

To make an **agent**, you assemble four things: a system prompt that tells it who it is and what it's for, a set of tools it's allowed to use, a context window it thinks inside of, and a loop that keeps it going until the work is done. In Claude Code, the lightest way to spin one up is a Markdown file under `.claude/agents/` — a name, a description, the tools it may touch, and its instructions. Ask Claude Code to tackle something big and it can hand a slice to one of these, which goes off and works with its *own* context window and hands back a result. The heavier way is to build a standalone program on the **Agent SDK**, wiring the loop into your own application so it can run somewhere no human is watching.

Notice what an agent has that a skill doesn't: a pulse. A context window and a loop. That's the organ the skill is missing, and it turns out to be the organ that matters.

## The shapes they come in

This was the part of the trip I expected to be symmetrical, and it wasn't — and the asymmetry is the most useful thing we found.

**Agents come in two runtime types**, and the split is real because agents are runtime things:

- **In-session subagents.** These live inside a Claude Code session. Your main agent — the orchestrator you're talking to — spawns them to divide and conquer: send three of them to explore three corners of the codebase in parallel, each in its own clean context window, and collect what they bring back. They exist for the length of the job and dissolve when it's done. They share your mission but not your context, which is exactly why they're useful — they keep the orchestrator's head clear.
- **Standalone agents.** These are built on the Agent SDK and run on their own, detached from any interactive session — in CI, on a cron, behind a service. Nobody is typing. The agent owns its whole loop from trigger to finish. Our code-review bot that wakes up on a merge request and comments without anyone asking is one of these.

Then I went looking for the two types of *skills*, and there aren't any. Not really. A skill can carry more or less — some are pure instructions, some ship scripts, some bundle reference docs — and skills can be scoped to a person, a project, or a shared plugin. But those are variations in *what a skill carries and where it lives*, not different *kinds* of thing. Every skill is the same species: packaged knowledge, waiting to be loaded.

And that's when the whole trip clicked into place. **Agents come in runtime types because they have a runtime. Skills don't come in runtime types because they don't have one.** The asymmetry isn't a gap in the taxonomy — it *is* the definition, wearing a disguise.

## The thing we finally saw

Here's the sentence I wish I'd had at the start of every hallway argument:

**An agent has a pulse. A skill doesn't.**

An agent owns a context window and a loop; it perceives, decides, and acts, and it keeps going on its own. A skill has neither. It activates *inside* whoever is holding the context — an agent, or a human's Claude Code session — and shapes what they do, then goes quiet. Agents *do*. Skills are *known*. Everything else — the folders, the SDK, the two runtime types, the progressive disclosure — is detail hanging off that one distinction.

And once you see it that way, they stop competing and start composing. Agents run; skills ride along. The most powerful pattern we have isn't "agent *or* skill" — it's an agent that loads the right skill at the right moment. The worker with the pulse, reaching for the packaged expertise it needs, exactly when the task calls for it.

## Our definition

So here's what we're bringing home from the trip — the definition we'll build the agentic SDLC on.

> A **skill** is a packaged, on-demand unit of our know-how: a repeatable procedure plus exactly the context needed to run it, that any actor can load when a task calls for it. It has no loop and no life of its own. It is *known*, not *run*.
>
> An **agent** is a worker that owns a context window and an execution loop. It decides, uses tools, and acts on its own — and it can load skills as it goes. It comes in two forms: **in-session subagents** we spawn to divide and conquer inside a session, and **standalone agents** we deploy to run without us.

And the heuristic that falls out of it, the one we'll actually use at the fork in the road:

- Does the thing need to **decide and act on its own**? That's an **agent**. If it runs while nobody's watching, it's a standalone one; if it's helping an orchestrator get through a bigger job, it's a subagent.
- Does the thing need to be **known and reused** across many different actors and situations? That's a **skill**.
- If you catch yourself wanting to give one thing *both* a loop *and* a fixed body of expertise — stop. You don't have one blurry thing. You have an agent that should be **loading a skill**. Split them, and both get simpler.

You can see the whole model in what we've already built. Our `create-verusen-jira-ticket` skill knows the field IDs, the checklist format, the house rules for a well-formed ticket — and it does absolutely nothing until a Claude session picks it up and runs the ticket creation. Pure knowledge, no pulse. Our merge-request skills are the same: they carry the standard, not the act. Meanwhile, our CI code-review pipeline is a standalone agent — it triggers on a merge request, runs its own loop, and *loads those same standards skills* to do the review. And when we ask Claude Code to take on something sprawling, it fans the work out to in-session subagents, each in its own context, each free to load whatever skill its slice of the job needs.

Same two building blocks, arranged three different ways. A worker with a pulse; a body of knowledge without one; and the good sense to keep them separate so they can be combined.

## Back in the hallway

The next time the argument starts — and it will, because someone new always joins and someone old always forgets — we don't have to relitigate it from scratch. We have a shared question now, and it's short enough to fit in the five minutes at the end of a standup:

*Does it have a pulse?*

If it runs, it's an agent. If it's something an agent knows, it's a skill. And if it seems to want to be both, you've just found a seam — an agent on one side, a skill on the other — and your architecture got a little cleaner the moment you saw it.

We took the trip so we'd stop having the argument. What we actually got was better: a way to design. Turns out the fastest way to end a debate about definitions is to go find the real one together.
