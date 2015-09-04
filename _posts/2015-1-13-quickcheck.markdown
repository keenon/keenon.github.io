---
layout: post
title:  "Better Testing for Bulletproof Software"
date:   2015-1-13 11:53:34
categories: opensource
---
TLDR: Quickcheck has a Java port that's compatible with JUnit! It's [on Github](https://github.com/pholser/junit-quickcheck). I now use this for everything :)

In research, we often report results from the outputs of fundamentally broken, overgrown, duct-tape programs written in some typeless language with a few half hearted unit tests, if any. By informal estimates from around the lab, we seem to believe we tend to lose between 2 and 5 percent output accuracy to completely preventable bugs, unrelated to the science we're trying to prove about approaches. Those are huge numbers, and require radical changes to our testing habits to fix.

Hackers (the breaking and entering kind, not the warm and fuzzy variety) are in the actual business of bug finding. Unlike the rest of us, who are in the business of bug creation, these professionals have tools that actually work for bug discovery. They have one technique in particular that I (until recently) had cause to envy, called 'fuzzing'. Fuzzing works something like this: When faced with a new system that needs to be broken into, a black hat will write a script to pass random inputs to the system, and then she will run her script until the system crashes and she gets a stack trace. She then pokes around in the vicinity of the stack trace frames until she find a buffer whose bounds aren't being checked, and then (I'm simplifying here) after a little copy paste from the famous [aleph1](http://phrack.org/issues/49/14.html), it's off to [Tor](https://www.torproject.org/projects/torbrowser.html.en) to find the highest bidder for her new [0 day](https://en.wikipedia.org/wiki/Zero-day_(computing)).

It's only recently that we bug creators have started to catch up with our own (more powerful) variant of fuzzing tools. Quickcheck ([original paper](http://www.cs.tufts.edu/~nr/cs257/archive/john-hughes/quick.pdf)) is a testing system that can be best explained as fuzz testing on crack, and for the good guys. The basic idea here is to write generators of random inputs, and a functional way to validate outputs are correct, and then let you test suite do the hard work of thinking up all the edge cases you forgot about. This is great, because you will get stack frames and inputs when the system finds a bug that crashes your system, but you'll also get real confidence that your system produces outputs that conform to all sorts of functional invariants.

The original Quickcheck was written for Haskell, but in practice real people don't use functional languages much. There is a [JUnit Quickcheck port](https://github.com/pholser/junit-quickcheck) for the rest of us, and it's what I recommend if you're a Java person.

Assuming you're with me on the rough desirability of functional, randomly generated tests, then there's one more problem that needs careful thought: don't we have a chicken and egg problem here in terms of validating inputs? If we need to be able to tell if our program's output is correct for any random input in order to write these tests, don't the tests need as much functionality as the underlying program, thus needing tests themselves? What if your test and program have the same bug? Is it turtles all the way down?

Here's some guidelines I've developed to help me through these issues, and build confidence in my functional tests:

- Use different algorithms for the test validity check and the program being tested, so the intersection of the possible bugs is a smaller space
- Also write asserts for output invariants that don't have to do with getting exactly the right answer, but that reduce the space of possible bugs even further
- Use the slower (even intractible exhaustive enumeration) algorithm for the test, because those algorithms tend to be obviously correct by just reading. Then you can restrict that test to tractably small inputs, and be sure the answers are right for those inputs.
- If you can generate the right answer along with the input somehow, always do that, rather than calculate in the test. This is rarely possible though.

Since I hate programming advice that is all sweeping platitudes and no concrete examples, here's a scenario: I recently found myself writing a probabalistic graphical model library for Stanford's CoreNLP. When writing a PGM library, there are a few complicated algorithms that need to be checked. 

The scariest part is the inference algorithm, an implementation of message passing in tree shaped clique trees. Message passing involves a lot of tricky manipulations and data flows that are easy to mess up. The trick for testing is that the result should be identical to a brute force factor multiplication approach. Normally doing out a brute force computation is intractible, hence message passing, but at small input sizes it's totally fine. So the test is to generate hundreds of just-tractable clique trees and check that message passing and brute force yield the same answer for all inputs.

There were a few other tricks. For the learning system, write a brute force gradient calculator and check its outputs against your gradient computation on a few thousand random examples. For the optimizer, take the termination point on a random problem, check in a few thousand short random vector directions that nothing in the space has a better value. For spare-dense vector datastructures, check that the naive dense implementation using arrays performs identically. For factor objects that need to be able to multiply and sum-out, do post-hoc checks that after you've summed out or multiplied that each element in the resulting factor makes sense (sum >= each element, when all are non-negative, for example).

Despite their relative simpliciy, these tests ended up being almost as much software as the software it was testing, and sometimes more. How do you ensure the tests don't have bugs? Do the tests need tests?

Of course the tests need tests. But that's the beauty of it: your real program acts as a test for your tests. My advisor Chris Manning once described the usefulness of testing to me as "taking intersections of sets". If the output spaces of two programs taking different algorithmic approaches to the same problem match, then the likelihood of both having the same bug is very low. Algorithms tend to bring with them their own "set" of bugs (in the mathematical sense), and if you intersect two possible sets, the result is much smaller. Of course if you really wanted added assurance, you could continue to intersect programs, and each time you gain the confidence that your output is correct, because the likelihood of independently replicating the same bug in N programs is geometrically decreasing in N, but N=2 seems good enough for most issues.

If your two algorithms do disagree, the bug may equally likely be in either the test or the code. This can be unnerving for people who are used to using tests as documentation. Fixing the tests to agree with the code seems like "cheating," even if the tests were wrong. Once you get over the emotional response, though, and you've diagnosed and fixed the bug, whether it was in the test algorithm or the production one, you're much more likely to have solved the underlying bugs in the code, because the only remaining bugs that are possible are those in that intersection space. And that intersection space, if you've done your job right, is so small that even if it does exist, downstream dependencies will never notice.

-Keenon
