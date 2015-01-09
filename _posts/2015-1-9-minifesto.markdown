---
layout: post
title:  "MinimalML: The Minifesto"
date:   2015-1-9 11:53:34
categories: opensource
---
What's the most important resource in Machine Learning research? It isn't compute power, office space, or white boards. It's *time*. Anything we can do to use it more effectively translates directly into better results. Basically, we want to *optimize research*, and that's what this post will be all about.

In any computer science curriculum, they'll teach you what to do if something is taking too long.

1. Double check that this isn't [premature optimization](http://en.wikipedia.org/wiki/Program_optimization)
2. Measure where your bottlenecks are
3. Exterminate them with maximum prejudice

With [MinimalML](http://github.com/keenon/minimalml), the library I'm opensourcing today (in very early alpha, with no docs yet), I've set out to implement tools in software that optimize ML research. Although ML research is software heavy, it is fundamentally a human operation, so the analogy to optimization is stretched at places. With that in mind, let's go through the optimization checklist together.

**1: Be mature, then optimize**

![meme](http://rs2img.memecdn.com/maturity-test_o_932609.webp)

I wrote a post about good research discipline a few weeks ago, [The "Unsolved Problem" Problem](/science/2014/12/10/unsolved-problem.html). In summary, I've experienced two kinds of research methodologies: The "Undisciplined Method", and the "Scientific Method." Far more frequently, the "Undisciplined Method" reigns. When confronted with a new problem, we think about our problem for half a day, whiteboard a few potential solutions, and then spend weeks building the sexiest thing we came up with. We then inevitably (well, 95% of the time) discover the sexy solution underperforms the baseline, and we have insufficient tools to understand why. For the full rant, see [the original post](/science/2014/12/10/unsolved-problem.html). Any research pipeline should optimize the Scientific Method.

**2: Find bottlenecks**

![meme](http://patsylynnforg.files.wordpress.com/2012/09/bottlenecklogo1.jpg)

It's easier to analyze research if you have an algorithm for it. In the spirit of mature optimization, we'll optimize the correct algorithm: the Scientific Method.

1. Form a hypothesis (usually, this means write down new features to try)
2. Write code to test the hypothesis
3. Write code to analyze the test results
4. Run the code
5. Stare at the output until understanding is reached, helped by any automatic analysis tools

Depending on your situation, any of these steps could be the bottleneck. That said, it's pretty easy to list why each step might take too long:

1. Hypothesis formation is slow if you don't have a good understanding of the data
2. Code writing is slow if you have to build from scratch
3. Analysis writing is slow if you don't recycle old analysis code
4. Running is slow if you're not optimized
5. Output analysis is slow if you don't have good analysis tools

So MinimalML will attempt to address each of these in turn.

**3: Crush bottlenecks like small insects**

![meme](http://images5.fanpop.com/image/photos/30900000/terminator-terminator-30973001-1280-1024.jpg)

Here's the key idea behind all of MinimalML: All you ever *needed* for your ML research was logistic regression and a polynomial kernel. It would be nice if it ran also really fast (and/or on a cluster), had an elegant and easy way to express features and kernels, and came with a growing suite of kick-ass error analysis tools.

By only doing one thing (the above, arguably the "minimum"), and doing it very carefully in order to optimize *time*, I think I've created something that will speed up your research process considerably. Here it is [on Github](http://github.com/keenon/minimalml).

Let's go through MinimalML's solution to each of the possible bottlenecks in the Scientific Method, one by one:

1. Hypothesis formation is fast because you have excellent error analysis tools automatically bundled
2. Code writing is fast, all you do is subclass Experiment and override its abstract configurations by adding feature extractors as anonymous methods, specifying where to find the data, configuring the kernel, and setting a couple of other computation-related parameters.
3. Analysis writing takes no time at all, because it's automatically bundled by subclassing Experiment
4. MinimalML has been very carefully optimized. For example, MinimalML uses a novel Sparse/Dense concatenated vector datastructure that allows super fast inner products (the primary op in linear classifiers), super fast construction, and has a small memory footprint. It's also been written to take advantage of Spark clusters for training, though you need a very large dataset to see a latency win from using Spark.
5. Output analysis is fast and easy because MinimalML bundles a suite of analysis tools (making liberal use of GNUPlot) with each Experiment automatically, making diagnosing the source of low scores a breeze.

**In defense of linear classifiers**

I know that only using linear classifiers seems like an unsexy idea, so let me defend it. First of all, MinimalML is intended to be used early in the research process, primarily for feature engineering in cases where features can conceivably be written by hand (think NLP, not vision). Non-linear classifiers are only slightly less dependant on feature selection than linear classifiers. Even an 8 layer neural net with 1000 hidden units per layer is still only able to predict based on inputs you provide. If those inputs are too rich, no amount of dropout will save you from not having enough training data (if you're Google, good for you, this doesn't apply to you). On the other hand, if those inputs don't carry enough information, even a real human being won't be able to figure it out, let alone your fancy neural net. So feature selection is important.

The advantages of only supporting linear classifiers over non-linear are that

* Linear classifiers can be trained and tested absurdly quickly (speeds up Step 4)
* Linear classifiers are very easy to explain and analyze (makes Step 5 much better + faster)

**Final Thoughts**

There are a few great research ML suites out there, which are *way better* than MinimalML at almost everything. CoreNLP and Weka come to mind. I have no intention of replacing them. Instead, I want a small, simple, outrageously fast system that makes it easy to do real science quickly. Before you publish, and after you have a good handle on what kinds of features you'll need and where you can justify complexity in your model, you'll still want to turn to one of these packages to beef up your classifier. In the beginning of the research process, however, I think MinimalML will come to stand out as an excellent approach to quickly get a good handle on your problem.

MinimalML is in super early alpha as of this writing, and as yet I haven't written any documentation. I'll post here again when it's in a more usable state, but for now, consider this a heads up that "something good this way comes" :)

Cheers,
Keenon
