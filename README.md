[<img width=140 heigth=140 align="left" src="/public/android-chrome-192x192.png">](https://youngmg1995.github.io/Path-Finding-App/)

# Path-Finder
React App for Visualizing Path-Finding Algorithms

<br></br>
## Overview
Path-Finder is a single page web-app bootstrapped using [Create React App](https://create-react-app.dev/) that serves as tool for visualizing various path-finding and maze building algorithms. I decided to build this project while learning Javascript for the first time in order to put the new language to use and as a nice way of reviewing some of old algorithms. The app can be reached using the following link via desktop or mobile: [Path-Finder](https://youngmg1995.github.io/Path-Finding-App/), which can also be saved to your home screen for easy access later. If you like and enjoy the game, please star/follow the page and consider contributing to the project.

## Path-Finding Algorithms
Below are short descriptions of the path-finding algorithms used in the app. The algorithms are broken up into two categories: 

  - __Unweighted:__ algorithms which ignore the cost of moving from one node to another (ignores weights on board)
  - __Weighted:__ algorithms which take into account the cost of moving through an open node vs a weighted node (1:10 cost respectably)

All algorithms, besides Random Walk,  utilize a priority queue to order the paths and to allow for backtracking as well as an extended list to prevent paths from revisiting previously extended nodes. Also, in our implementation for algorithms that utilize an admissable heuristic we leverage the Manhattan Distance for hexagonal grids to get a perfect lower bound on the distance between the current node and the target node.

### Unweighted
  - __*Random Walk:*__ The simplest possible algorithm, just randomly wander from one node to the next, not even checking if it has already visited, hoping that eventually we stumble upon the target.
  - __*Depth-First Search:*__ Along with breadth first search, this is one of the basic search algorithms. This one keeps extending current path to first available node until target is found. Guarantees a path will be found, if possible, but does not gaurantee the shortest path.
  - __*Breadth-First Search:*__ This algorithm is the complement to depth-first search as one of the two basic search algorithms. It works in the exact opposite manner as depth-first search, spreading out like a wave and always extending the shortest path so far to all available nodes. Guarantees the shortest path will be found, if possible.
  - __*Hill Climbing:*__ An altered version of depth-first search that utilizes an admissable heuristic. Like depth-first search, this algorithm always extends the current path; however, instead of choosing the first available node at random, we choose the node that we estimate to be closer to the target using the heuristic. Guarantees a path will be found, if possible, but does not gaurantee the shortest path.
  - __*Beam Search (w=2):*__ An altered version of breadth-first search that utilizes tree-trimming and an admissable heuristic. Like breadth-first search, this algorithm always extends the shortest path so far; however, instead of extending the path to all available nodes, we only extend the path to the first *w* nodes that are closest to the target according to our heuristic. In our case, we will use *w=2*. Does not guarantee a path will be found or that the path found will be the shortest possible.
  - __*Best-First Search:*__ A greedy algorithm that utilizes an admissible heuristic. Like breadth-first search, this algorithm will extend the current path to all available nodes; however, unlike any of the other algorithms, we do not necessarily continue along one of these extensions. Instead, the algorithm always chooses to extend the path that is currently closest to the target according to the prescribed heuristic. Guarantees a path will be found, if possible, but does not gaurantee the shortest path.

### Weighted
  - __*Branch & Bound:*__ Weighted equivalent of breadth-first search, always extending the least costly path so far to all available nodes. Guarantees the least costly path will be found, if possible.
    - *Note* - This algorithm is equivalent to Dijkstra's. I prefer to call it a branch & bound algorithm that utilizes an extended list because that is how I was taught it and this makes my understanding of it more general.
  - __*A\*:*__ An altered version of branch & bound or Dijkstra's that utilizes an admissable heuristic. Like branch & bound the algorithm always extends the best path so far to all available nodes; however, this algorithm considers the best path to be the one with the smallest combined path cost and estimated cost from the current node to the target using the heuristic. Guarantees the least costly path will be found, if possible.

## Mazes-Building Algorithms
Below are short descriptions of the various algorithms used to build the mazes for the app. I have broken them up into the following four categories:

  - __Random:__ according to a given probability, randomly fill each node on the board with a wall or weight
  - __Perfect Mazes:__ these are true maze building algorithms which generate a single unique path between the start and target nodes
  - __DLA Fractals:__ these are patterns generated by simulating DLA (Diffusion Limited Aggregation) processes. Essentially, particles undergoing random walks are allowed to stick together to form Brownian trees, fractals that resemble lightning, tree roots, and certain mineral deposits.
  - __Caves:__ these produce procedurally generated caves, or open spaces, within an otherwise walled-off background. Similar techniques are used in countless video games to generate completely unique maps and dungeons on the fly.

All the algorithms build a maze of open hexes over top of a board filled with walled off nodes, except for the DLA Fractals which build on top of a board filled with weighted nodes. To ensure the algorithms do not randomly wall off the start or target nodes, we leverage flood-fill and an A* path-finding algorithm to ensure a path between the two exists for the Random and Cave algorithms. This is not an issue for the perfect mazes which ensure a perfect path exists.

### Random

### Perfect Mazes

### DLA Fractals

### Caves
  
## Resources
  - __*React:*__ As mentioned previously, this project was bootstrapped using [Create React App](https://create-react-app.dev/). I would highly recommend this tool and the linked resources to anyone else considering building a single page app, since it makes building, developing, and deploying the app much simpler.
  - __*Javascript:*__ With this being my first project in Javascript, I needed a good Javascript reference to turn to when I ran into roadblocks. I found the book [Eloquent Javascript](https://eloquentjavascript.net/) to be the best resource for educating myself on the ins and outs of the language and a good reference for examples on typical Javascript scenarios. In particular the book has several chapters and a project focusing on working with canvas elements that proved to be incredibly applicable to this project. I would strongly recommend that anyone looking to learn Javascript start with this book since it is available online for free and has numerous exercises to work through.
  - __*Algorithms:*__ Though I tried to describe each algorithm concisely, these descriptions do not explain how to implement each algorithm in detail and likely will go over the heads of anyone who has never worked with pathfinding. For those who find my explanations lacking or just want to learn more, I recommend watching the following two videos provided by MIT: [Unweighted Algorithms](https://www.youtube.com/watch?v=j1H3jAAGlEA), [Weighted Algorithms](https://www.youtube.com/watch?v=gGQ-vAmdAOI&t=1394s). In general, MIT's OpenCourseWare is a fantastic website for taking fully immersive computer science courses online and for free.
