---
layout: post
title:  "Real Valued Multi-Armed Bandits"
date:   2014-12-14 23:05:34
categories: machine_learning
---
Optimizing a modern digital product is complicated, labor intensive, and riddled with traps. The current state of the industry (though by no means state-of-the-art) is to use A/B testing to optimize websites. This involves getting a designer to make several different versions of something you'd like to optimize (say, a landing page), and then presenting each option to a randomly selected subset of the traffic to your site. By measuring visitors' behavior on each of the versions, you can pick the one that maximizes profit for your business. The leader in the space has [a great explanation of A/B testing](https://www.optimizely.com/ab-testing/), if you want more detail.

The trouble is, A/B testing is hopelessly limited. You have to specify all your experiments in advance, and A/B testing can only be expected to pick the best among those options. It can't point out a new option that you didn't think of, which is better than anything you thought to try. In mathematical terms, my gripe with A/B testing is that it's over *discrete space*, and a very small discrete space at that.

A better way wouldn't require you to create options in advance. It would search over a whole enormous (potentially infinte) number of possible configurations, and pick the best one for you automatically. A pundit might call this "AI Creativity," or "Machine Artwork," but that would be an abuse of the terms "creativity" and "art." Really, it's all just automating trial and error, and a bit of tricky mathematics.

On a small team, Amy Bearman, Bhaven Patel, and I (all Juniors at Stanford), cooked up a way to have a machine design the optimial digital business for you. The rest of this article is laying out what we did, hopefully in fairly understandable terms.

Like all Machine Learning systems, this isn't completely magic (just mostly). In order to use our system, you need to specify a set of things that the algorithm can change, in terms of numbers. For instance, you could let the system pick a font size for your landing page call to action. If you want the system to pick a color, you need to give the system 3 real values (red, green, and blue) to search over. In theory, you can give the system an unlimited number of parameters to search over, and with enough traffic it should work. In practice, the fewer parameters you give the system, the better a job it will do of jointly optimizing them.

**The Proof In The Pudding**

Before we dive into math, graphs are always helpful. Below, there are 2 graphs. On both, I've used the same axis. The X and Y (the non-height axis) represent two features of your website you're trying to optimize. For concreteness let's say these axis represent the size of the call to action font, and darkness of the background, but in principle they could be any parameter that can be mapped by a number. The Z (height) at any combination of feature values (X and Y coordinates) represent the [expected value](http://en.wikipedia.org/wiki/Expected_value) at that combination. This is a measure from statistics representing the long run average amount of money we make per user, if we had a very large number of users visit the website.

In order to test the math and theory that follows, we ran an experiment with a virtual population, because we didn't have access to a website with a large flow of users (if you *have* access to a large website, and feel like doing some science, feel free to get in touch). The following graph represents the preferences of our virtual population. We *made up this function*, it has no bearing on reality. With a setting of "feature 1" at 2.0, and "feature 2" at 2.0, we have an expected value of $1.00 per user on average. With "feature 1" at 2.0, and "feature 2" at -2.0, we expect to lose an average of $1.00 per user (maybe this represents acquisition cost).

![Golden user preferences](/assets/bandit/figure_2.png)

There's a key point to grasp here. If we knew the true population preferences, we could optimize by finding the highest point on that graph. This is a tricky mathematical problem, but solvable (as we show below). The trouble is, our learning algorithm doesn't know this in advance. In fact, our learning algorithm has no idea how users will respond to different settings of the parameters, a priori. We have to learn that through trial and error.

Below is a graph of what the algorithm thinks about the population preferences, after only 30 virtual users visiting the site. Notice how amazingly close the algorithm's guess about the virtual user preferences is to the true preferences. For now, ignore the lines on the plot. Those are charting how the computer can find the maximum value of the function, which we explain at length in the next section.

![Learned user preferences](/assets/bandit/figure_3.png)

**The Gory Mathematical Details**

We assume that there are a finite and known set of transitions that the user can take, each of which has a known and constant expected value. We assume that the user will behave stochastically. We also assume there exists some function that consistently maps the values of the parameters to the probability that the user will take a given action (click on a certain link), although the algorithm doesn't know it. The analogy to the multi-armed bandit is loose, because the multi-armed bandit problem is about choosing from a number of discrete choices to maximize payout (unknown random payout distribution on each lever). In our casting of the problem, there are a number of known possible outcomes, each with known payout, but the function mapping some setting of real parameters to the probability of each outcome happing is unknown a priori. We draw the analogy anyways, because there is a conscious tradeoff between exploration and exploitation, and we borrow the simplest of the multi-armed bandit solutions: $$\epsilon$$-greedy. This means with a probability $$\epsilon$$ we choose a parameter setting at random, in order to learn about user behavior, and with probability $$1-\epsilon$$ we maximize our expected value.

We approximate that function mapping parameter settings to user choice probabilities (and consequently expected value) with a set of SVMs, each responsible for mapping the probability that a single action is taken. We leave one SVM per choice. The probability of a choice $$i$$ given a paremeter setting $$x$$ is:

$$
P(i,x) = \frac{P_i(x)}{\sum{j = 1}^n P_j(x)}
$$

If we pull apart the guts of the SVM, and remove the irritating normalization term, we have that 

$$
f(x) \propto \sum_{i = 1}^m a_iy_iK(x_i,x) + b
$$

We have a set of $$n$$ children, where child $$i$$ has expected value $$E_i$$. We are interested in our expected value, given a choice of $$x$$, representing the feature vector for creating a website.

$$
E(x) = \frac{\sum_{i=1}^nE_i(\sum_{j=1}^m a_j^{(i)}y_j^{(i)}K(x_j^{(i)},x) + b_i)}{\sum_{i=1}^n\sum_{j=1}^m a_j^{(i)}y_j^{(i)}K(x_j^{(i)},x) + b_i}
$$

We wish to choose an $$x$$ that maximizes our expected value under the model, given our evidence so far. This is non-convex, so we'd like a solution in closed form. Begin by taking the derivative

$$
\frac{d}{dx}E(x) = \frac{d}{dx}\frac{\sum_{i=1}^nE_i(\sum_{j=1}^m a_j^{(i)}y_j^{(i)}K(x_j^{(i)},x) + b_i)}{\sum_{i=1}^n\sum_{j=1}^m a_j^{(i)}y_j^{(i)}K(x_j^{(i)},x) + b_i}
$$

In order to fit the entire derivative on one line, let:

$$
d(x) = \sum_{i=1}^n\sum_{j=1}^m a_j^{(i)}y_j^{(i)}K(x_j^{(i)},x)
$$

$$
e(x) = \sum_{i=1}^nE_i(\sum_{j=1}^m a_j^{(i)}y_j^{(i)}K(x_j^{(i)},x))
$$

Then by the quotient rule, we have

$$
\frac{d}{dx}E(x) = \frac{d(x)\frac{d}{dx}e(x) - e(x)\frac{d}{dx}d(x)}{(d(x))^2}
$$

Following convention, let's choose the Guassian kernel as our kernel:

$$
K(y,x) = e^{-\frac{||x-y||^2}{2\sigma^2}}
$$

We'll need the derivative also. We use the fact: $$
||x-y||^2 = ||x||^2 - 2x^Ty + ||y||^2
$$

$$
\frac{d}{dx} K(y,x) = \frac{d}{dx} e^{-\frac{||x||^2 - 2x^Ty + ||y||^2}{2\sigma^2}}
$$

Then we apply the chain rule and arrive at

$$
\frac{d}{dx} K(y,x) = (e^{-\frac{||x||^2 - 2x^Ty + ||y||^2}{2\sigma^2}})*(\frac{y - x}{\sigma^2})
$$

And simplifying:

$$
\frac{d}{dx} K(y,x) = e^{-\frac{||x-y||^2}{2\sigma^2}}(\frac{y - x}{\sigma^2})
$$

Then we can substitute in and get our final derivative (written in pieces so it fits onto a sheet of paper):

$$
d(x) = \sum_{i=1}^n\sum_{j=1}^m a_j^{(i)}y_j^{(i)}e^{-\frac{||x-x_j^{(i)}||^2}{2\sigma^2}}
$$

$$
\frac{d}{dx}d(x) = \sum_{i=1}^n\sum_{j=1}^m a_j^{(i)}y_j^{(i)}e^{-\frac{||x-x_j^{(i)}||^2}{2\sigma^2}}(\frac{x_j^{(i)} - x}{\sigma^2})
$$

$$
e(x) = \sum_{i=1}^nE_i(\sum_{j=1}^m a_j^{(i)}y_j^{(i)}e^{-\frac{||x-x_j^{(i)}||^2}{2\sigma^2}})
$$

$$
\frac{d}{dx}e(x) = \sum_{i=1}^nE_i(\sum_{j=1}^m a_j^{(i)}y_j^{(i)}e^{-\frac{||x-x_j^{(i)}||^2}{2\sigma^2}}(\frac{x_j^{(i)} - x}{\sigma^2}))
$$

$$
\frac{d}{dx}E(x) = \frac{d(x)\frac{d}{dx}e(x) - e(x)\frac{d}{dx}d(x)}{(d(x))^2}
$$

Our expectation in $$x$$ is non-concave and has many local optima. In practice, we use gradient descent with several restarts per problem to find the best value we can, with no optimality guarantees. Below is a graph of a gradient check on a toy dataset, with 6 potential user actions, each with a different expected value, resulting in 2 distinct (identical) peaks.

![Gradient check for multi-armed bandit](/assets/bandit/figure_1.png)


Cheers,
Keenon
