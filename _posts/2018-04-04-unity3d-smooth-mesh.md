---
layout: post
title:  "Smooth Meshes on Unity3D (Mesh Subdivide)"
date:   2018-04-04 9:00:00 +0000
lang:   en
thumbnail: smooth-mesh-unity3d.jpg
---

Graphical interfaces on computers work by discretizing an environment. For example, when you see a circle on your screen, it's shaped by showing a finitude of dots (pixels) tangent to the circle. As there is a multitude of pixels to represent the circle, you have the perception that the circle is smooth, as you cannot see these individual pixels in naked eye.

{% include image.html file="2018-04-04-smooth-mesh-unity3d/mesh_raw_vs_smooth.jpg" float=true description="Raw vs Smooth Mesh" %}

A similar thing happens when you're dealing with meshes, but instead of circles or lines, you're dealing with triangles in a 3D environment. **A multitude of triangles tangents to the mesh connects to one another to forge the desired mesh shape.** The more the triangles, the smoother and more similar to the original shape is the mesh.

Sometimes when you're are handling a mesh in Unity, it may look pixelated. One of the easiest ways to achieve this is to increase the number of triangles on the mesh.

When using this method (steps on how to reproduce it described below), you will get a result similar to this one:

{% include image.html file="2018-04-04-smooth-mesh-unity3d/mesh-comparison.jpg" description="Non-Smoothed vs Smoothed Mesh Comparison" %}

>This method is specially helpful if you want to **change the mesh shape in runtime** (for example, if the user interacts with the application shaping the mesh).

## How to subdivide mesh (How to make mesh smoother)

To easily make a mesh smoother, you will need to create two scripts in your Unity project.

One script is responsible for the algorithm to subdivide the triangles in the mesh (available on [Unity Community Wiki](http://wiki.unity3d.com/index.php/MeshHelper#Code)) and the other is an abstraction layer to show the user the available options to smooth the mesh.

### Import Scripts

You must **create two new scripts in C#** (``MeshHelper.cs`` and ``MeshSmoother.cs``) and place them in your project folder as following:

```tree
.
└── Assets
    └── Scripts
        ├── MeshHelper.cs
        └── MeshSmoother.cs

```

#### ``MeshHelper.cs``

Code available on [Unity Community Wiki](http://wiki.unity3d.com/index.php/MeshHelper#Code).

#### ``MeshSmoother.cs``

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MeshSmoother : MonoBehaviour {

    MeshFilter meshfilter;
    Mesh mesh;
    Vector3[] vertices;
    int[] triangles;

    private int[] subdivision = new int[] {0,2,3,4,6,8,9,12,16,18,24};

    [Header("Subdive Mesh")]

    [Tooltip("Divide meshes in submeshes to generate more triangles")]
    [Range(0, 10)]
    public int subdivisionLevel;

    [Tooltip("Repeat the process this many times")]
    [Range(0, 10)]
    public int timesToSubdivide;

    void Start () {
        meshfilter = GetComponent<MeshFilter>();
        mesh = meshfilter.mesh;
        vertices = mesh.vertices;
        triangles = mesh.triangles;

        for (int i = 0; i < timesToSubdivide; i++)
        {
            MeshHelper.Subdivide(mesh, subdivision[subdivisionLevel]);
        }
        meshfilter.mesh = mesh;
        vertices = mesh.vertices;
    }
}
```

### Setup Script

Now, you need to **Add** the script to the mesh you want to manipulate. Select the mesh in the scene list and, in the **Inspector** tab, search for ``Mesh Smoother``.

{% include image.html file="2018-04-04-smooth-mesh-unity3d/inspector-mesh-full.png" description="Inspector Tab" %}

To make the mesh smoother, you must tweak the options in the script.

**Subdivision Level** [0-10]: The level in which the triangles of the mesh will be subdivided in smaller triangles.

**Times to Subdivide** [0-10]: How many times to repeat the process of subdivision using the above _Subdivision Level_.

{% include image.html file="2018-04-04-smooth-mesh-unity3d/script-options.png" description="Mesh Smoother options" %}

>If you are going to modify the shape of the mesh during runtime, it's recommended that you keep a low subdivision level and repeat the subdivision more times, as it will be less resourceful (and will achieve a higher FPS rate).

---

This article was written based on the project [**Unity Robot Teleoperation**](https://github.com/lucascoelhof/unity-robot-teleoperation).

Thanks to [Lucas C. Figueiredo](https://github.com/lucascoelhof) and [Luciano C. A. Pimenta](https://scholar.google.com.br/citations?user=jF9S_gMAAAAJ&hl=en) for making this project possible.