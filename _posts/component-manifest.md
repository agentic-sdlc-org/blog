---
title: "The Component Manifest"
excerpt: "The Context Pipeline used to begin with the PRD. Vibe-coding platforms added a step to the left of it — and engineering needs a new artifact to make that step safe to build from."
coverImage: "/assets/blog/component-manifest/cover.png"
date: "2026-08-14T09:00:00.000Z"
author:
  name: Marcus Tewksbury
  picture: "/assets/blog/authors/marcus.jpeg"
ogImage:
  url: "/assets/blog/component-manifest/cover.png"
---

*A companion to the Context Pipeline series.*

The Context Pipeline started with the PRD. The chain ran PRD → Specification → Architecture Plan → Epic → User Story → Ticket, each layer narrowing the range of reasonable interpretations until an agent had something precise to build. The PRD was the source — the first place intent got written down.

It isn't anymore. The way features begin has changed, and the pipeline grew a new left edge.

## Step Zero Is Now a Prototype

Vibe-coding platforms — Replit and its peers — let a product team visualize a functional prototype into existence before a PRD exists. Not a static mockup or a Figma frame, but a clickable, working thing: real navigation, real states, something a stakeholder can use and react to. What used to take a design sprint and an engineering spike now happens in an afternoon, authored by the people who understand the problem.

This is a genuine gain. Intent formed by clicking through a working artifact is sharper than intent argued over in a document, and feedback comes faster because people respond to what they can touch. In practice this has become step zero: the prototype comes first, and the PRD codifies what it proved worth building. The two move back and forth — the prototype exposes a gap in the PRD, the PRD reframes the prototype — with stakeholders and engineering weighing in across the loop. That iteration is healthy.

But a prototype has the same defect the series has warned about from the start. It is intent you can *see* and cannot *build from*.

## A Prototype Is Intent You Can't Execute

A working prototype encodes hundreds of decisions implicitly. Which screens exist. How they're laid out. What lives inside each one, and how those pieces nest. What a control does when the data is empty, or slow, or forbidden. A human reviewer absorbs all of this by using the thing. None of it is written down.

Hand that prototype to engineering — human or agent — and every implicit decision becomes a guess. Is this list the same list component used everywhere else, or a new one? Is that filter bar real behavior or prototype scaffolding? The prototype answers none of it, and in the agentic age an unanswered question doesn't create a meeting. It creates code, generated against an assumption nobody meant to make.

The prototype proves *what* to build. Something still has to specify *what it's made of*. That artifact is the component manifest.

## The Manifest: An Order Form for the UI

A component manifest is a bill of materials for a feature's interface. It names every page the feature ships, the layout each page uses, the components nested inside that layout, and the props that matter — the ones that change behavior, not the cosmetic ones. It is deliberately concrete. Where a PRD says why the work matters and a Specification says how the system must behave, the manifest says what the screen is assembled from.

It sits to the left of the PRD because it's derived from the prototype, not the requirements. The prototype makes the manifest cheap to author — you describe what's already on screen rather than imagine it — and the manifest makes the prototype safe to build from, by converting implicit structure into an explicit order form. That's the trade the series keeps returning to: do the thinking as an artifact, before generation, not as a correction after it.

On its own, though, a manifest is just a careful inventory. What gives it force is having a fixed vocabulary of parts to order from.

## The Design System Gives It Punch

A component manifest is only as precise as the catalog it points into. Without a shared set of components, every line is ambiguous — "a table" could mean the table you already ship or a bespoke one built from scratch, and the manifest can't tell you which. That ambiguity is exactly what a design system removes.

By design system I mean a standard, reusable set of components used across the application — catalogued in Storybook so anyone can see what exists, what props it takes, and how it behaves, and packaged as a standalone library so the *same* components are consumed by the prototyping environment and by production. That shared library is what makes prototype fidelity mean something: when the prototype is built from real components, the manifest references real parts, and "it looked like this in the prototype" becomes a buildable claim instead of a hope.

With a design system behind it, every line in the manifest collapses to one of three verbs:

- **Install** — use an existing component as-is. No engineering design required; it's an order against the catalog.
- **Extend** — an existing component needs a new variant, prop, or state. Bounded work against a known starting point.
- **Build** — genuinely new, with no precedent in the library. The line that deserves real scrutiny, a Specification, and an Architecture Plan.

That triage is the leverage. Most of any feature is install-and-extend; the manifest makes the small set of true new-builds visible, so engineering spends its judgment where it actually matters instead of rediscovering what was already solved.

## What One Looks Like

Here's a manifest for a generic list manager — the kind of screen every application has a few of. Nothing exotic: a searchable, filterable table with bulk actions, and a drawer to edit a record.

```
LIST MANAGER — Component Manifest

Page 1 · Records List
  AppShell ......................... install
  └─ ListPageLayout ................ install
     ├─ PageHeader ................. install   props: title, actions
     ├─ Toolbar .................... install
     │  ├─ SearchInput ............. install   props: placeholder, onSearch (debounced)
     │  ├─ FilterBar ............... extend    add multi-select "status" variant
     │  └─ BulkActionBar ........... build     shows on row-select; props: selectedCount, actions[]
     ├─ DataTable .................. install   props: columns[], rows[], selectable, sortBy
     │  ├─ StatusPill .............. install   props: status → color
     │  └─ RowActionMenu ........... install   props: actions[]
     ├─ Pagination ................. install   props: page, pageSize, total
     └─ EmptyState ................. extend    add "no results for filter" variant

Page 2 · Record Editor (Drawer)
  Drawer ........................... install   props: open, onClose, size
  └─ Form
     ├─ FormField › TextInput ...... install
     ├─ FormField › Select ......... install
     ├─ TagInput ................... build     props: value[], suggestions[], onChange
     ├─ Button (Save / Cancel) ..... install
     └─ ConfirmDialog .............. install   unsaved-changes guard

Tally:  14 install · 2 extend · 2 build
```

Eighteen lines, and only two are genuine new builds — the `BulkActionBar` and the `TagInput`. Two more are bounded extensions of components that already exist. Everything else is an order against the catalog. Read the manifest and the shape of the work is immediate: this isn't a from-scratch feature, it's mostly assembly, with two components that deserve a Specification and an Architecture Plan and everything else that doesn't. That legibility is what a prototype alone can't give you — every screen in it looks equally new until someone maps it back to the parts.

## Not a New Gate

None of this is a document you finish once and freeze. The manifest tracks the prototype, and the prototype keeps moving while stakeholders react. A component gets swapped, a screen gets added, an extend turns into a build — and the manifest has to move with it, or it becomes the stale artifact an agent faithfully implements two weeks after it stopped being true. Same discipline the pipeline has always demanded: keep the artifact synchronized with the decision, not with the calendar.

The payoff is a familiar one, pushed further left. The manifest turns "build this feature" into an itemized order where most lines are already-solved and the few that aren't are unmistakable. The org does the componentization thinking before it asks for implementation — and the code, once again, is only as good as the context that produced it.
