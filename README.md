[<img width=140 heigth=140 align="left" src="/public/android-chrome-192x192.png">](https://youngmg1995.github.io/Path-Finding-App/)

# Path-Finder
React App for Visualizing Path-Finding Algorithms

<br></br>
## Overview

Path-Finder is a single page web-app bootstrapped using [Create React App](https://create-react-app.dev/) that serves as tool for visualizing various path-finding algorithms. I decided to build this project while learning Javascript for the first time in order to put the new language to use and as a nice way of reviewing some of the algorithms I learned long ago. The app can be reached using the following link: [Path-Finder](https://youngmg1995.github.io/Path-Finding-App/), which can also be saved to your home screen for easy access later. If you like and enjoy the game, please star/follow the page and consider contributing to the project.

## Algorithms

### Unweighted
  - __*Depth-First Search*__: Simplest possible algorithm, keeps extending current path to first available node until target is found. Guarantees a path will be found, if possible, but does not gaurantee the shortest path.
  - __*Breadth-First Search:*__ Algorithm spreads out like a wave, always extending the shortest path so far to all available nodes. Guarantees the shortest path will be found, if possible.
  - __*Hill Climbing:*__ An altered version of depth-first search that utilizes an admissable heuristic. Like depth-first search, this algorithm always extends the current path; however, instead of choosing the first available node at random, we choose the node that we estimate to be closer to the target using the heuristic. Guarantees a path will be found, if possible, but does not gaurantee the shortest path.
  - __*Beam Search (w=2):*__ An altered version of breadth-first search that utilizes tree-trimming and an admissable heuristic. Like breadth-first search, this algorithm always extends the shortest path so far; however, instead of extending the path to all available nodes, we only extend the path to the first *w* nodes that are closest to the target according to our heuristic. In our case, we will use *w=2*. Does not guarantee a path will be found or that the path found will be the shortest possible.
  - __*Best-First Search:*__ A greedy algorithm that utilizes an admissible heuristic. Like breadth-first search, this algorithm will extend the current path to all available nodes; however, unlike any of the other algorithms, we do not necessarily continue along one of these extensions. Instead, the algorithm always chooses to extend the path that is currently closest to the target according to the prescribed heuristic. Guarantees the shortest path will be found, if possible.

### Weighted
  - __*Branch & Bound:*__ Weighted equivalent of breadth-first search, always extending the least costly path so far to all available nodes. Guarantees the least costly path will be found, if possible.
    - *Note* - This algorithm is equivalent to Dijkstra's. I prefer to call it a branch & bound algorithm that utilizes an extended list because that is how I was taught it and this makes my understanding of it more general.
  - __*A\*:*__ An altered version of branch & bound or Dijkstra's that utilizes an admissable heuristic. Like branch & bound the algorithm always extends the best path so far to all available nodes; however, this algorithm considers the best path to be the one with the smallest combined path cost and estimated cost from the current node to the target using the heuristic. Gaurantees the least costly path will be found, if possible.
