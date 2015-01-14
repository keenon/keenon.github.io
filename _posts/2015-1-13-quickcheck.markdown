---
layout: post
title:  "The 1 Big Thing Java Programmers Should Learn From Haskell Programmers"
date:   2015-1-13 11:53:34
categories: opensource
---
![haskell logo](https://www.haskell.org/wikiupload/4/4a/HaskellLogoStyPreview-1.png)

Haskell is an amazing language, and I'm sure I'll get hate mail from my Haskellphile friends John and Gabor for saying this, but there's only one thing that Java people should steal from Haskell people to completely replace current standard practice. It's not strict shunning of shared state, giant Unix beards, or even laziness (the computational kind, not the human kind). Those are all great things about functional programming, but Java has its reasons for not applying them all the time. The thing Java programmers should be using every day is Quickcheck!

Quickcheck has a Java port that's compatible with JUnit! It's [on Github](https://github.com/pholser/junit-quickcheck). I now use this for everything :)

Quickcheck ([original paper](http://www.cs.tufts.edu/~nr/cs257/archive/john-hughes/quick.pdf)) is this awesome idea that seems completely obvious in a functional environment like Haskell. Instead of writing a unit test, where you run code through a very specific set of inputs and expect a specific set of outputs, you take a function through an *automatically generated* set of inputs and *enforce invariants* in the function output. That's completely genius.

This has a bunch of benefits, and I won't hash them all out here. Just to get you thinking though, a unit test is only as devious as your imagination. It tends to miss nasty edge cases you didn't think of in your code, because, had you thought of them, you'd have also written them into the test. Passing a battery of unit tests doesn't say much. Passing a battery of tests that use thousands of randomly generated inputs to hammer on your code, and knowing that for every single one of those inputs your code performed flawlessly really builds trust. Basically, it's an undisputed fact that more robust testing is better if it doesn't take orders of magnitude longer to write, and the [JUnit Quickcheck port](https://github.com/pholser/junit-quickcheck) fits that bill. Use it!

Cheers,
Keenon
