---
layout: post
title:  "Real Valued Multi-Armed Bandits"
date:   2014-12-10 23:05:34
categories: machine_learning
---
Optimizing a modern digital product is complicated, labor intensive, and riddled with traps. The current state of the industry (though by no means state-of-the-art) is to use A/B testing to optimize websites. This involves getting a designer to make several different versions of something you'd like to optimize (say, a landing page), and then presenting each option to a randomly selected subset of the traffic to your site. By measuring visitors' behavior on each of the versions, you can pick the one that maximizes profit for your business. The leader in the space has [a great explanation of A/B testing](https://www.optimizely.com/ab-testing/), if you want more detail.

The trouble is, A/B testing is hopelessly limited. You have to specify all your experiments in advance, and your only degree of freedom to optimize against is which version you choose. In mathematical terms, my gripe with A/B testing is that it's over *discrete space*. For something like a videogame, where there's lots of *continuous space* (how high should you be able to jump, how much health should you have, etc), you need a more sophisticated method for optimization.

That's what we've created.

In probability, there's a concept of [expected value](http://en.wikipedia.org/wiki/Expected_value), which is

![Golden user preferences](/assets/bandit/figure_2.png)

![Learned user preferences](/assets/bandit/figure_3.png)

We choose to model the transition probabilities from a node to a given child by the output of an SVM, normalized across the multiple possible outputs.

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