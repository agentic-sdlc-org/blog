---
title: "When Nobody Wrote It, Who Owns It?"
excerpt: "The 'you wrote it, you own it' model breaks down when AI is the author. Accountability doesn't disappear all at once — it diffuses, slowly, until something breaks and nobody can say who made the call."
coverImage: "/assets/blog/nobody-wrote-it/cover.jpg"
date: "2026-05-30T05:35:07.322Z"
author:
  name: Tom Elrod
  picture: "/assets/blog/authors/tom.jpeg"
ogImage:
  url: "/assets/blog/nobody-wrote-it/cover.jpg"
republishedAt:
  - label: LinkedIn
    url: "https://www.linkedin.com/pulse/when-nobody-wrote-who-owns-tom-elrod-1ts3e/"
---

Most engineering teams have ownership models that work until they don't.

You wrote it, you own it. You reviewed it, you signed off on it. That is how accountability scales across a distributed team. Simple enough to hold in your head. Clear enough to enforce when something breaks.

AI didn't break that model. It just made it much harder to apply.

---

## The New Accountability Gap

When a senior engineer reviews AI-generated code, what exactly did they just own?

They reviewed the output. They may have understood it well enough to approve it. But they did not write it, and in many cases they did not understand every decision baked into it. The logic is plausible. The tests pass. The review is done.

Three months later, that code is in production handling something it was never designed for. The engineer who reviewed it has moved to another team. Nobody in the incident channel can say with confidence who made the call.

> That is the new version of the accountability gap.

---

## What AI Actually Changes

This is not a new problem. A RACI matrix makes ownership look clean. It rarely is.

**What AI changes is the rate at which unowned decisions accumulate.**

Before, a complex function took time to write. Time created natural checkpoints. The author had to make deliberate choices. Reviewers were looking at a manageable amount of work. The slow pace of production was itself a forcing function for ownership clarity.

AI removes that friction. A senior engineer can now generate, review, and merge a week's worth of functionality in a day. The output looks authoritative. The process looked normal. But the depth of understanding that used to accompany that pace simply isn't there.

Most teams haven't updated their ownership models to reflect this. The process changed faster than the accountability model did. The models still assume a ratio of understanding to output that no longer holds.

---

## The Problem Lives in the Requirements, Too

There's a version of this problem that lives in the requirements, not the code.

When AI generates something that behaves differently than the product team expected, the first question usually becomes: whose fault is it? The honest answer is often that the behavior was never specified. Nobody wrote it down. AI made a plausible guess, the reviewer approved something that looked correct, and the gap only became visible when someone in the business said "that's not what I meant."

Fixing that now takes longer than it used to. A developer who built something themselves could spot the problem, trace it, fix it, and push a hotfix in a few hours. In a process where AI is doing the building, the same problem might require updating the requirements document, creating a new ticket, re-prompting AI, reviewing the new output, and running it back through QA before it can be patched.

> Nobody is asking how much time has been added to that cycle. They are only counting what AI saved on the front end.

---

## When Accountability Diffuses, It Disappears

The harder version of this problem is organizational.

When nobody owns a decision, nobody is accountable for it. And when accountability is diffuse enough, it disappears. You end up with teams that are productive by every visible metric and fragile in ways nobody has bothered to name yet.

QA is part of this story, and not in the way most people think. Quality Assurance means assuring quality. The industry has spent years treating it as a synonym for testing. **Those are not the same thing.** Testing is what happens at the back of the process. Quality assurance, taken seriously, has to happen throughout it.

In an AI-native workflow, that distinction matters more than ever. If requirements are incomplete before AI starts generating code, no amount of testing at the back end will catch what was never specified. Someone has to be in the requirements conversation early, asking the uncomfortable questions. What happens if this edge case occurs? What does the product do when the data looks like this? What was the intended behavior here?

That is not testing. That is quality assurance in the original sense of the phrase.

Most QA teams are not positioned for this. Most organizations have not asked them to be.

---

## The Cultural Version Is the Hardest

The uncomfortable version is that this problem is partly cultural.

AI has made it easier for teams to move decisions through the system without explicitly assigning ownership. You can generate something that works, get it reviewed at a surface level, and ship it without anyone ever deeply owning the decision. The PR is clean. The metrics are green. The post-mortem, if it happens, won't be able to trace responsibility because responsibility was never clearly assigned.

Some teams will notice this and build ownership models that account for it. They will define what it means to own a system you didn't fully write. They will establish accountability at the requirements stage, not just the review stage.

Most teams will not notice until something forces them to.

---

Engineering has always required someone to stand behind the work. Not just approve it. **Stand behind it.**

That standard doesn't change because AI made the work easier to produce. If anything, it matters more now. When output is cheap and abundant, the thing that separates good engineering organizations from brittle ones is whether someone is still accountable for what ships.

The question I keep coming back to: when something breaks, is there a person who actually owns it? Not in the org chart. In the room.
