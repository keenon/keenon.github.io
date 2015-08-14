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

I'd like to hear everyone else's thoughts about functional testing, and testing in general. How do you verify correctness? When do you write tests? How many tests do you need to feel confident? When do you decide to skip testing all together?

Cheers,
Keenon
