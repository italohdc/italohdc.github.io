---
layout: post
title:  "RoboCup Rescue Maze: A* Search"
date:   2015-05-09 07:32:02 +0000
lang:   en
thumbnail: raptorb_maze.png
---

Aiming to participate in the [RoboCup](http://www.robocup.org/) [Rescue Maze](http://rcj.robocup.org/rcj2016/rescue_maze_2016.pdf) competition, we developed a robot capable of travelling a maze. The robot initially didn't know it's location nor the map of the environment. After going through all the maze, the robot mapped the labirint and was capable of coming back to its initial position in an optimal way. For that last function, was used the **A* Search Algorithm**.

To make it easy to develop the A* Algorithm, a virtual environment was set using [**Processing**](http://processing.org/). The robot was then emulated in a two-dimensional maze.

{% include youtubePlayer.html id="kW7m7xmpSxM?showinfo=0" %}

The **A\* Search Algorithm** shows the best route to move from a point A to a point B. You can see more about the A\* Search Algorithm in the book [_Artificial Intelligence: A Modern Approach_](http://aima.cs.berkeley.edu/) by _Stuart Russell and Peter Norvig_.

## Robot Video

{% include youtubePlayer.html id="Wu9DYnvc1BU?loop=1&playlist=0xHdz2xT8Wo" %}

## Source Code

You can see the code and some more information about how to run it on Processing on the [GitHub Repository {% include brand-icon.html id="github-alt" %}](https://github.com/italohdc/maze-solving).

## Team

Developed for the **[RoboCup Rescue Maze Competition {% include fa-icon.html id="trophy" %}](http://www.robocup.org/)**.

Raptor B Team:
 - Italo Lelis de Carvalho
 - João Pedro Rosada Canesin

Instructor:
 - Igor Araujo Dias Santos [{% include fa-icon.html id="address-card" %}](http://lattes.cnpq.br/5202609356103130)

{% include thanksnote-rescueb.html %}