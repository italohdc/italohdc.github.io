---
layout: post
title:  "Raptor B - A robot for the RoboCup Rescue Maze competition"
date:   2016-07-02 07:32:02 +0000
lang:   en
thumbnail: raptorb_maze.png
banner: raptor-b.jpg
---

Aiming to participate in the [**RoboCup Rescue Maze**](http://rcj.robocup.org/rcj2016/rescue_maze_2016.pdf) competition, we developed a **robot** capable of travelling a **maze** looking for **heat victims**.

{% include image.html file="raptor-b/RaptorB.jpg" float=true description="Robot Raptor B" %}

In here we will provide a brief explanation of how the robot works.

You can check the latest version of the source code used in that robot [on GitHub {% include brand-icon.html id="github" %}](https://github.com/italohdc/Raptor-B). It is published "as is", which means there was no code review nor it's granted to work properly (the code is mainly for archival purposes).

**Raptor B Team (2016):**
- Italo Lelis de Carvalho, João Pedro Rosada Canesin

**Instructor:**
- Igor Araujo Dias Santos

### See the robot working:

{% include youtubePlayer.html id="Wu9DYnvc1BU?loop=1&playlist=0xHdz2xT8Wo" %}

---

## Software

### Tremaux Algorithm 

To explore the maze, it's used an algorithm called "Tremaux". This algorithm makes the robot goes right always as possible. If the robot cannot go right, it goes forward and, in the last scenario, goes left.

| Best path is right | Best path is forward |
|-|-|
| ![](/images/raptor-b/tremaux1.png) | ![](/images/raptor-b/tremaux2.png) |

You can read more about Tremaux Algorithm in here: [Interlude • Tremaux’s Algorithm
](http://blog.jamisbuck.org/2014/05/12/tremauxs-algorithm.html)

### A* Algorithm

To make the robot return to it's initial position, a pathfinder algorithm called A* (A-Star) is used. Both distances of each position on the map to the destination and to the current position are evaluated, and them the algorithm routes the path with the least sum of those distances. This assures that the robot will follow the shortest path possible to it's initial position.

| Cartesian coordinates of each section | Best route highlighted |
|-|-|
| ![](/images/raptor-b/a_star1.png) | ![](/images/raptor-b/a_star2.png) |

The implementation of the algorithm is based on the project [A* Search on Processing](https://github.com/italohdc/maze-solving).

This video shows a simulation of how the A* algorithm works:

{% include youtubePlayer.html id="kW7m7xmpSxM?showinfo=0" %}


## Hardware

We used two microcontrollers on the robot: an [Arduino Due](https://github.com/italohdc/Raptor-B/tree/master/Due/) as the main board and an [Arduino Nano](https://github.com/italohdc/Raptor-B/tree/master/Nano/) as a secondary board.

The [Arduino Due](https://github.com/italohdc/Raptor-B/tree/master/Due/) executes functions to handle actuators and most sensors, as well as the main algorithm.

The [Arduino Nano](https://github.com/italohdc/Raptor-B/tree/master/Nano/) reads the heat sensor and communicates with the main board.

{% include image.html file="raptor-b/hardware.png" description="Hardware Components" %}

### Components

- Microcontrollers
    - **Arduino Due** (Main):
        - 1x **Light sensors**
        - 1x **Inertial Measurement Unit**
        - 4x **Ultrasonic sensors**
        - 8x **Infrared sensors**
    - **Arduino Nano** (Secondary):
        - 4x **Temperature sensors**

- Motors
    - 4x **DC Motors** (connected to H-Bridges)
    - 1x **Servo Motors**

- LCD Display
    - **LEDs**
    - **Push-Buttons**

---

<h2 align="center">Awards</h2>

| Year | Competition           | Location               | Position |
|------|-----------------------|------------------------|----------|
| 2012 | LARC* / CBR**         | Fortaleza, Brazil      | 2nd      |
| 2013 | RoboCup Junior        | Eindhoven, Netherlands | 2nd      |
| 2013 | LARC/CBR              | Fortaleza, Brazil      | 1st      |
| 2014 | RoboCup Junior        | João Pessoa, Brazil    | 3rd      |
| 2014 | LARC/CBR              | São Carlos, Brazil     | 1st      |
| 2015 | LARC/CBR              | Uberlândia, Brazil     | 1st      |
| 2016 | RoboCup Junior        | Leipzig, Germany       | 9th      |

<p align="center">* LARC - Latin American Robotics Competition</p>
<p align="center">** CBR - Brazilian Robotics Competition</p>

## Acknowledgments

This project was made possible with the effort of many people. There was hard work and countless nights staying up until late.

I would like to thanks those indirectly related to this project, as our parents, faculty and event organizers. Also, a special thanks to those directly related to this project, who helped it grow the way it did:

- [Colégio Nossa Senhora de Fatima - Sacramentinas](http://colegiosacramentinas.com.br/)
- Andrique Figueiredo Amorim
- Daniel Hymer dos Santos Frota
- Hugo Santos Dias
- Joao Paulo Sandes Brito
- Joao Pedro Vilas Boas Silva
- Luiz Victor Fonseca Brasil
- Luisa Silva Oliveira
- Marilia de Mello Amorim Novais e Silva
