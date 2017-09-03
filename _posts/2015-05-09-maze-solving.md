---
layout: post
title:  "RoboCup Rescue Maze: A* Search"
date:   2015-05-09 07:32:02 +0000
---

Aiming to participate in the [RoboCup](http://www.robocup.org/) [Rescue Maze](http://rcj.robocup.org/rcj2016/rescue_maze_2016.pdf) competition, we developed a robot capable of travelling a maze. The robot initially didn't know it's location nor the map of the environment. After going through all the maze, the robot mapped the labirint and was capable of coming back to its initial position in an optimal way. For that last function, was used the **A* Search Algorithm**.

To make it easy to develop the A* Algorithm, a virtual environment was set using [**Processing**](http://processing.org/). The robot was then emulated in a two-dimensional maze.

<iframe  width="560" height="315" src="https://www.youtube.com/embed/kW7m7xmpSxM?showinfo=0" frameborder="0" allowfullscreen></iframe><!-- {: .post-youtube } -->

The **A\* Search Algorithm** shows the best route to move from a point A to a point B. You can see more about the A\* Search Algorithm in the book [_Artificial Intelligence: A Modern Approach_](http://aima.cs.berkeley.edu/) by _Stuart Russell and Peter Norvig_.

## Source Code

You can see the code and some more information about how to run it on Processing on the [GitHub Repository](https://github.com/italohdc/maze-solving).

## Team

Developed for the **[RoboCup](http://www.robocup.org/) Rescue Maze Competition**.

Raptor B Team:
 - Italo Lelis de Carvalho
 - João Pedro Rosada Canesin

Instructor:
 - Igor Araujo Dias Santos