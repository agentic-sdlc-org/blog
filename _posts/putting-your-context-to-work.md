---
title: "Putting Your Context to Work"
excerpt: "You built the reactor: a trained context that is correct, complete, and current. It is also inert. This is the road from a folder of knowledge to something your whole team runs: package it as a skill, share it as a plugin, and, when you need to, wrap it in an agent."
coverImage: "/assets/blog/putting-your-context-to-work/cover.png"
date: "2026-08-05T09:00:00.000Z"
author:
  name: Marcus Tewksbury
  picture: "/assets/blog/authors/marcus.jpeg"
coAuthor:
  name: Jorge Romera
  picture: "/assets/blog/authors/jorge.jpeg"
ogImage:
  url: "/assets/blog/putting-your-context-to-work/cover.png"
---

There is a strangely quiet moment at the end of context training. If you followed the [Arc Reactor](/posts/your-skills-arc-reactor) piece and the [training loop](/posts/how-to-train-your-agent-dragon), you know the grind that comes before it: framing the provenance, generating the references, sitting through the Socratic sessions, regenerating until the knowledge is correct, complete, and current. You did the hard part. You built the reactor.

And then you look at what you actually have. A folder. On your laptop. The most carefully curated body of knowledge your team owns, and its current deployment model is that people can ask *you* about it.

Now imagine your version of that moment. The loop has run its course on one of your domains: context trained, references solid, evals green. And the result is inert. Knowledge that is true, current, and hard-won, sitting in a directory, doing nothing. We are not fully there ourselves yet (our bulk-actions equipment is still getting tweaks and training passes), but the question already stares at us every day. This post is about the other half of the job: the road from that folder to something your whole team, and your agents, actually run. The road has three stops, and the good news is that every one of them is short.

## Stop one: give it a front door

The first move is almost anticlimactic. You drop a `SKILL.md` into the folder. That single file is what turns a pile of trained context into something an actor reaches for on purpose.

The mistake to avoid here is treating that file as the knowledge. It is not. The knowledge lives in the references, where you trained it. The `SKILL.md` is a front door, and it has exactly three jobs.

**First, identity.** The file opens by saying what this knowledge is about and where it ends: the purpose of the domain, the main concepts and their vocabulary, and the boundaries of what it covers. If you already keep a provenance file whose summary says exactly that, reuse it here. The skill does not need to repeat the knowledge, it needs to name it, the way a book cover tells you what is inside without being the book.

**Second, the trigger.** When a model gets a task, it decides which skill to load by reading every skill's description and picking the one that matches. So the description is what makes your skill turn on at the right moment. Write it using the real questions people ask ("why did my bulk job only process 250"), not vague categories ("use this for bulk questions"). The real question routes the request, the vague category misses it. Then write the other half: a short "do not use this for" list, so your skill stays quiet when the question belongs to a neighboring skill. You will not guess every case up front. When the wrong skill fires, you add the case to the list, and the file gets sharper with use.

**Third, the reading order.** The trained knowledge is not one big document. It is a set of small ones, each answering a different kind of question: what the concepts mean, what the standard way looks like, how the data is stored, which mistakes to avoid. The skill tells each reader where to start depending on what they came to do. Someone writing requirements gets pointed to one file first, someone designing the database to another. Nothing is hidden. It just saves everyone from reading everything to find the part they need.

Thin front door, heavy references behind it. That shape is the whole design.

## Test it where you already work

Before anything gets shared, converse with it. Pull the skill into whatever agent terminal you already live in and ask it real questions.

This is the fastest and cheapest honesty check you have. Does it reach for the right references? Do the trigger examples fire? Does it confidently answer something it should have declined, exposing a missing carve-out? Every seam you find in conversation is one you fixed before it mattered.

And a point worth sitting with: for a lot of knowledge, this is the whole job. A skill you can converse with, that answers correctly and knows its own edges, is already a genuinely useful thing. Not everything needs to become an agent.

## Stop two: share it

The skill works on your machine. Your teammate wants it. Now what?

There are really three ways to hand a skill to a team.

**Direct.** Copy the folder, or have everyone clone the repo and point their sessions at it. It works on day one. By day thirty there are five copies in five states and nobody knows which one is current. Distribution by diffusion.

**MCP.** Stand up a server that serves the knowledge as tools. We do this for company coding standards, and for lookup-style knowledge it is great. But the skill's shape gets lost in translation: no progressive disclosure, no role routing, no front door. And you now operate a service, with hosting and auth to match.

**Plugin.** Package the skills (and, as we will see, the agents) into a plugin, list it in a marketplace, and everyone installs it from there. One artifact, versioned, discoverable, and the same in every session.

We went with the plugin, and the reasoning fits in one sentence: it is the easiest to adopt and the most scalable. The marketplace side of it is deliberately boring, and that is a compliment. Adding our plugin definition to the company marketplace was a ten line entry: a name, a description, and a source pointing at the clubhouse repo. (The marketplace itself, how to stand one up and run it, deserves its own piece. Not today.)

The detail that actually sold us is what happens on update. Our plugin is served by reference: the marketplace entry points at the repo's `main` branch. So merging to `main` IS the deploy. There is no release step, no version bump ceremony, no reinstall instructions to broadcast. We lived the proof this week: we renamed two of the clubhouse maintenance skills, merged the MR, and every session picked up the new set on its next refresh. Nobody did anything.

There is a quiet consequence in there that we like a lot: the review gate for knowledge is now the same review gate as for code. A skill update is an MR. It gets reviewed, it gets merged, it is live. Git was already your release pipeline, now it releases knowledge too.

## Stop three: when conversation is not enough, wrap it in an agent

Some work outgrows the conversation. In practice there are two moments that tell you it is time.

The first is isolation. You want a request to run clean: no residue from earlier calls, no accumulated conversation bending the answer, a fresh window that sees only the skill and the task. The second is parallelism. Some jobs want to be fanned out and run at the same time, not queued through one chat.

Both of those want an agent, and here is the punchline we set up in [Agents vs Skills](/posts/agents-vs-skills): the upgrade is almost embarrassingly thin. A skill is packaged knowledge. An agent is a pulse (a context window and a loop) wrapped around it. So the wrapper is a few lines of markdown in an `agents/` folder. Ours looks like this: a name, a description that says what to delegate to it, and one frontmatter line, `skills: [bulk-actions]`. That line is the glue. Whenever the worker runs, the hub auto-loads. We rebuilt nothing. The knowledge, the references, the when-to and when-not-to were already there.

Now, the honest questions that come with the mirrored pair.

Once the plugin ships both a bulk-actions skill and a bulk-actions agent, how does an invoking agent know which to use? The same way everything else routes: by description. The skill's description says load me when you need to *know* something about this domain. The agent's says delegate to me when you need this domain's work *done* end to end, in its own window. It is the pulse test from the last post, operationalized: pull the knowledge into your window, or hand the work to a pulse of its own. Write both descriptions with that split in mind and the router does the rest.

And one limitation to be clear-eyed about: a plugin agent borrows the host session's tools. It cannot bring its own hooks or its own MCP servers. For the in-session worker that is exactly right, it uses your Jira, your Git, your filesystem. But it means the fully unattended worker (the one that watches for new specs, refreshes the skill, and files tickets with nobody around) is a different animal entirely: a standalone agent, its own service, its own credentials, its own loop. That one you build on the Agent SDK, not with a wrapper file. Know which of the two you are signing up to build before you start.

## A word on sub-agents

The term of the moment. Be clear-eyed here too: a sub-agent is not a fourth kind of thing. It is just an agent whose owner is another agent. The app you are typing into is itself the top-level agent, so the moment it invokes anything that runs its own loop, you are looking at the sub-agent pattern, and you have been sitting inside the parent all along. Spawn one wrapper agent for a clean isolated answer. Spawn twenty for a batch across parallel windows. Same pattern, different fan-out. The full taxonomy is in [Agents vs Skills](/posts/agents-vs-skills).

## The payoff

Look at how little happened in this post, and how much changed.

Delivery was one markdown file. Distribution was a ten line plugin entry. Updates collapsed into git merges. Promotion to an agent was a wrapper with one load-bearing line. All the drama stayed upstream, where it belongs, in training a context worth trusting. That is the tell that the system works: when the ending is boring, the architecture is right.

Knowledge sitting in a folder is a cost. Package it and it becomes reachable. Share it and it becomes the team's. Wrap it and it becomes runnable: in isolation, in parallel, on demand. Build the reactor, yes. Then send it to work.
