---
layout: post
title:  "Organizing Cooperative Science"
date:   2015-8-14 23:05:34
categories: science
---

I just got through [Learning Agile](http://shop.oreilly.com/product/0636920025849.do), which is an excellent introduction to Agile and several of its manifestations: Scrum, Extreme Programming, and Kanban. It's gotten me thinking about teamwork in the Stanford AI lab or, more accurately, its absence.

In this post we're going to go over how people build bombers, agile software development methods, and open source software development. Then we'll discuss the need for a theory for collaboration in AI research

As historical contrast for the modern project management science, let's take a brief digression into the high stakes world of bomber design and manucturing. In [Skunk Works](http://www.amazon.com/Skunk-Works-Personal-Memoir-Lockheed/dp/0316743003) the author (who was the head of the famous [Lockheed Skunk Works](https://en.wikipedia.org/wiki/Skunk_Works) during the developement of the [Stealth Bomber](https://en.wikipedia.org/wiki/Lockheed_F-117_Nighthawk)) occassionally takes a break from war stories to talk about the design process they used to create their paradigm-breaking airplanes.

First, a salesman/engineer talks to a few generals over at the Pentagon, and gets a sense of operational requirements for a new plane. These requirements are usually found in a strategic plan someplace, and have been carefully considered by teams of slide-rule-equipped analysts. They're also dead simple: must have a range of X miles, with a cruising height of Y, and be able to carry a payload of Z.

Then, a chief engineer sits down with the department heads (organized around critical engineering skills, like aerodynamics, thermodynamics, etc), and budgets out the rough specs for each component (landing gear, engines, wing lift, fuel tank capacity, etc). Appropriate parts are then found off-the-shelf whenever possible. Where not possible, the specs are given to more junior engineers, who design each component individually, with some guidance from the chief engineer. At the end, assuming everyone followed their specs, all the components are fit back together, shimmied a little to slot into place, and you've got a working plane (or atleast a design for one).

Then, since only a few of each of these plane designs were ever produced (selling dozens would be considered a wild success), each one is assembled by hand. The Skunk Works had a (self-discribed) unique structure, at the time, where the engineers kept their desks in the same hangar as the manufacturing guys, and were in constant close communication as manufacturing realized that what had been drawn could not possibly be constructed as specified, and revisions were needed.

Finally, the planes are built, and ready to be sailed off to the sunset (or Russia, as the case may be).



Contrast that with the modern "Agile" approaches to software design, especially Scrum. Scrum is designed around the assumption that specifications are almost as difficult to write correctly as the software itself, and that the only way the customer will know that they don't actually want what they asked for is for you to build it and show it to them.

The method is to have the team meet for a full day at the beginning of every week to plan that week's work. The work must culminate in something tangible that can be shown to customers. At the end of the week, the customer is presented with the work so far, and inevitably asks for a course correction.



Then we can look at Open Source Software. OSS is a fascinating break from traditional management, because the engineers and contributors are also the users, and so any communication overhead between customers and engineers is unnecessary.

That means that project evolution in the OSS space is driven organically as the result of cumulative pull requests. There may be an overall direction to the project, and a roadmap for future design set by stakeholders, but the daily reality is that the project is coordinate by a giant set of tickets, and code comes in as the result of (for the most part) individual engineers with ideas.


---


Bombers and software are clearly very different beasts, both called "engineering," yet these three processes are almost unrecognizably different. It's worth contrasting the differences, to see if we can extrapolate to guidance for scientific cooperation.

I'm going to invent some terminology here, though I'm almost certain the concepts these words refer to are not new (Google can't turn up the papers I need yet though, so I'm not certain what's come before). Let's call the bomber design process "recursive enhancement," and the agile software design process "iterative enhancement," and open source software is "distributed enhancement."

Recursive enhancement:

Bomber design involves a master engineer outlining rough specifications for a section of the machine and recursively asking junior engineers to enhance the specifications with details, constrained by specifications from above. This can unfurl to arbitrary levels of detail and organizational scales. This has the strength of accomodating large numbers of highly coordinated individuals. In order for this to work, general architectural patterns must be well understood at the outset.

Iterative enhancement:

Scrum software design allows frequent changes of direction, and requires collaboration in short term planning and execution that may not lend itself to clean recursive structure or large groups. The trouble is that the all-to-all communication of Scrum that is required at the beginning of every sprint limits scale of both the team and the problems tackled. That all-to-all communication distributes the load of software design across a lot of people, however, so allows for enormous amounts of planning and re-planning as things inevitably change when dealing with customers.

Distributed enhancement:

Starting from a basic shell produced by an intelligent design, distributed enhancement makes lots of little changes sum into project evolution. This is free to scale almost infinitely, but lacks the ability to centally coordinate onto a shared vision. A lot of energy is spent in making very small decisions, so projects move slowly, but the resulting software is usually extremely high quality. "With enough eyeballs, all bugs are shallow" - Linus Torvalds.


---


Going forward then, let's look at the Stanford AI Lab. A few professors, each with a specific specialty, advise a few students each. The incentives are skewed toward publication above all else, and the cultural importance in our fields on the first author position leads to many breakdowns or false starts in cooperative effort.

That being said, when cooperation does bear fruit, it does so in bulk. The Stanford [CoreNLP](https://github.com/stanfordnlp/CoreNLP) package is widely used as the standard preliminary toolset in Natural Language Processing, leading to dozens of citations for each of the components and lots of productivity for people within the lab working on top of a well understood, shared platform. Lately Bengio's lab has been having a lot of success (their paper publication rate is enormous) with [Blocks](https://github.com/mila-udem/blocks), their neural networks framework.

I would estimate from personal experience that 95-98% of all work spent on AI research is spent on engineering large systems to implement ideas, and the other 2-5% is spent on math and managing runs. We often need to replicate the work of others, debug crappy open source to get valid comparisons, and generally suffer through enormous engineering slog. This work almost always is redundant with other systems, but the redundancies are never quite striking enough to justify the painful learning curve of using somebody else's software.

There are two reasons to figure out a way to collaborate anyways: within a group it will reduce redundant engineering (waste) and increase rate of publication, and between groups it will increase citations.

In order to manage this collaboration effectively, we'll need new methods to both overcome institutional inertia, and handle rapidly fluctuating interests and team structures within academia. That means we'll have to learn from all the management methods that have come before, and work out the infrastructure to make collaboration efficient, sustainable, and useful.

Here are a few things to ponder while I work on the sequel to this post:

- If we substitute Nature for customers, does Scrum actually amount to a team-based Scientific Method?
- Can/should we standardize AI architectures to the point where the "recursize enhancement" strategies will work for new system construction?
- Is there a productive way to divide AI into a sufficienty modular structure that code-sharing is useful?
- How can we evolve team work to be more than sharing code? Can we reorganize credit systems to account for team assistance work?

To be continued...