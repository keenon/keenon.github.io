---
layout: post
title:  "MinimalML: The Minifesto"
date:   2015-1-8 11:53:34
categories: opensource
---
What's the most important resource in Machine Learning research? It isn't compute power, office space, or white boards. It's *time*. Anything we can do to use it more effectively translates directly into better results. In any computer science curriculum, they'll teach you what to do if something is taking too long.

1. Double check that this isn't [premature optimization](http://en.wikipedia.org/wiki/Program_optimization)
2. Measure where your bottlenecks are
3. Exterminate them with maximum prejudice

With MinimalML, I've set out to implement tools in software that optimize the ML research. Although ML research is software heavy, it is fundamentally a human operation, so the analogy to optimization is stretched at places. With that in mind, let's go through the checklist together.

*1: Be mature, then optimization*

I wrote a post about good research discipline a few weeks ago, [The "Unsolved Problem" Problem](/science/2014/12/10/unsolved-problem.html). In summary, I've experienced two kinds of research methodologies: The "Undisciplined Method", and the "Scientific Method." Far more frequently, the "Undisciplined Method" reigns. When confronted with a new problem, we think about our problem for half a day, whiteboard a few potential solutions, and then spend weeks building the sexiest thing we came up with. We then inevitably (well, 95% of the time) discover the sexy solution underperforms the baseline, and we have insufficient tools to understand why. For the full rant, see [the original post](/science/2014/12/10/unsolved-problem.html). Any research pipeline should optimize the Scientific Method.

*2: Find bottlenecks*

It's easier to analyze research if you have an algorithm for it. In the spirit of mature optimization, we'll optimize the correct algorithm: the Scientific Method.

1. Form a hypothesis (usually, this means write down new features to try)
2. Write code to test the hypothesis
3. Write code to analyze the test results
4. Run the code
5. Stare at the output until understanding is reached, helped by any automatic analysis tools

Depending on your situation, any of these could be the bottleneck. With very large datasets, running the code can take days, thus slowing you to two or three cycles through this loop per week. It could also be that writing the code for each hypothesis test can take minutes or weeks, depending on whether you're changing features or trying a whole new model. Writing code to for analysis is rarely the bottleneck, because an impending sense of doom (or too much trust in Unix tools) will cause researchers to pack up and hurry along to step 4. Staring at the output should rightly be the bottleneck, but is often slower than it needs to be because there aren't enough tools to properly analyze the system.

*3: Crush bottlenecks like small insects*

Here's the key idea behind all of MinimalML: All you ever needed was logistic regression and a polynomial kernel.

I know that's an unsexy opinion, so let me defend myself. Non-linear classifiers are only slightly less dependant on feature selection than linear classifiers. Even a 8 layer neural net with 1000 hidden units per layer is still only able to predict based on inputs you provide. If those inputs are too rich, no amount of dropout will save you from not having enough training data (if you're Google, good for you, this doesn't apply to you). On the other hand, if those inputs are too narrow, even a real human being won't be able to figure it out. So feature selection is important.

It's good to remember that in practice, we almost never rely on the assumptions about the data that underly a given classifier type. Using linear classifiers doesn't mean you're assuming that the data is naturally linearly seperable, or that feature weights should behave linearly with one another. It means instead that you're willing to write all the feature combinations that the classifier will have to watch out for, until the task *becomes* linear, which usually means that there's only one highly weighted feature firing per example.

Things to cover:

- Subclass Experiment Workflow
- Multivectors
- Spark
- Reusable Analysis

Cheers,
Keenon
