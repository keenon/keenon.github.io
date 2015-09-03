---
layout: post
title:  "Organizing Cooperative Science"
date:   2015-8-14 23:05:34
categories: science
---

NOTE: Post under construction

I just got through [Learning Agile](http://shop.oreilly.com/product/0636920025849.do), which is an excellent introduction to Agile and several of its manifestations: Scrum, Extreme Programming, and Kanban. It's gotten me thinking about teamwork in the Stanford AI lab or, more accurately, its absence.

---

As historical contrast for the modern project management science, let's take a brief digression into the high stakes world of bomber design and manucturing. In [Skunk Works](http://www.amazon.com/Skunk-Works-Personal-Memoir-Lockheed/dp/0316743003) the author (who was the head of the famous [Lockheed Skunk Works](https://en.wikipedia.org/wiki/Skunk_Works) during the developement of the [Stealth Bomber](https://en.wikipedia.org/wiki/Lockheed_F-117_Nighthawk)) occassionally takes a break from war stories to talk about the design process they used to create their paradigm-breaking airplanes.

First, a salesman/engineer talks to a few generals over at the Pentagon, and gets a sense of operational requirements for a new plane. These requirements are usually found in a strategic plan someplace, and have been carefully considered by teams of slide-rule-equipped analysts. They're also dead simple: must have a range of X miles, with a cruising height of Y, and be able to carry a payload of Z.

Then, a chief engineer sits down with the department heads (organized around critical engineering skills, like aerodynamics, thermodynamics, etc), and budgets out the rough specs for each component (landing gear, engines, wing lift, fuel tank capacity, etc). Appropriate parts are then found off-the-shelf whenever possible. Where not possible, the specs are given to more junior engineers, who design each component individually, with some guidance from the chief engineer. At the end, assuming everyone followed their specs, all the components are fit back together, shimmied a little to slot into place, and you've got a working plane (or atleast a design for one).

Then, since only a few of each of these plane designs were ever produced (selling dozens would be considered a wild success), each one is assembled by hand. The Skunk Works had a (self-discribed) unique structure, at the time, where the engineers kept their desks in the same hangar as the manufacturing guys, and were in constant close communication as manufacturing realized that what had been drawn could not possibly be constructed as specified, and revisions were needed.

Finally, the planes are built, and ready to be sailed off to the sunset (or Russia, as the case may be).

---

Contrast that with the modern "Agile" approaches to software design, especially Scrum. Scrum is designed around the assumption that specifications are almost as difficult to write correctly as the software itself, and that the only way the customer will know that they don't actually want what they asked for is for you to build it and show it to them.

The method is to have the team meet for a full day at the beginning of every week to plan that week's work. The work must culminate in something tangible that can be shown to customers. At the end of the week, the customer is presented with the work so far, and inevitably asks for a course correction.

---

Bombers and software are clearly very different beasts, both called "engineering," yet these processes are almost unrecognizably different. It's worth contrasting the differences, to see if we can extrapolate to guidance for scientific cooperation.

I'm going to invent some terminology here, though I'm almost certain the concepts are not new (Google can't turn up the papers I need yet though, so I'm not certain what's come before). Let's call the bomber design process "recursive enhancement," and the agile software design process "iterative enhancement." Bomber design involves a master engineer outlining rough specifications for a section of the machine and recursively asking junior engineers to enhance the specifications with details, constrained by specifications from above. This can unfurl to arbitrary levels of detail. Scrum software design requires frequent changes of direction, and requires collaboration in short term planning and execution that may not lend itself to clean recursive structure.

---

To be continued...