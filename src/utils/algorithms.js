import {
    isSameNode, nodeOnBoard, isValidNode, findNeighbors, manhattanDistance, minHeap, shuffleArray, getRandomNode,
    getRandomWallNode, getRandomNeighbor, disjointSet
} from './utils';
import { parseKey, calcHexCenter } from './canvas-tools';
import {noise} from './perlin';


//=================================================================================================================================//
// Path-Finding Algorithms //
//=================================================================================================================================//


// Unweighted Algorithms //
//=======================//
function randomWalk(startNode,targetNode,xUnits,yUnits,board,isRunning) {
    // initialize path (not queue since we will only have one path) 
    let path = [startNode];
    // initialize array for storing updates to canvas for animation
    let searchUpdates = [];
    // now take a random walk, checking neighboring nodes at each visited nodes until target is found
    let startTime = new Date();
    while (((new Date()).getTime() - startTime.getTime()) < 5000) {
        let currentNode = path[path.length - 1];
        let lastNode;
        path.length < 2 ? lastNode = {i:-1,j:-1} : lastNode = path[path.length - 2];
        if (!isSameNode(currentNode,startNode) && !isSameNode(currentNode,targetNode)) {
            let newState = Object.assign({},board[[currentNode.i,currentNode.j]],{fill:'#6495ed'});
            searchUpdates.push(newState);
        }
        // extend path by iterating over neighboring nodes (that are not walls or off the board)
        let neighbors = findNeighbors(currentNode);
        // filter to valid nodes and randomize their order
        neighbors = shuffleArray(neighbors.filter((node) => (isValidNode(node,board,xUnits,yUnits))));
        for (let node of neighbors) {
            // if we found target return the completed path and updates, else add extended path to queue
            if (isSameNode(node,targetNode)) {
                return [path.concat([node]), searchUpdates];
            } else {
                if (!isSameNode(node,startNode) && !isSameNode(node,lastNode)) {
                    let newState = Object.assign({},board[[node.i,node.j]],{fill:'#4b0082'});
                    searchUpdates.push(newState);
                }
            }
        }
        path.push(neighbors[0])
    }
};

function depthFirst(startNode,targetNode,xUnits,yUnits,board) {
    // initialize queue of paths and set of visited node
    let queue = [[startNode]];
    let visitedNodes = new Set();
    let searchUpdates = [];
    // iteratively extend paths in queue until no possible paths left or target found
    while (queue.length > 0) {
        let currentPath = queue.shift();
        let currentNode = currentPath[currentPath.length - 1];
        // check that node has not been extended already, if so drop path, else add to set of visited nodes and updates
        if (visitedNodes.has(currentNode.i+','+currentNode.j)) continue;
        visitedNodes.add(currentNode.i+','+currentNode.j);
        if (!isSameNode(currentNode,startNode) && !isSameNode(currentNode,targetNode)) {
            let newState = Object.assign({},board[[currentNode.i,currentNode.j]],{fill:'#6495ed'});
            searchUpdates.push(newState);
        }
        // extend path by iterating over neighboring nodes (that are not walls or already extended)
        let neighbors = findNeighbors(currentNode);
        for (let newNode of neighbors) {
            if (isValidNode(newNode,board,xUnits,yUnits) && !visitedNodes.has(newNode.i+','+newNode.j)) {
                let newPath = currentPath.concat([newNode]);
                // if we found target return the completed path and updates, else add path extended path to queue
                if (isSameNode(newNode,targetNode)) {
                    return [newPath, searchUpdates];
                } else {
                    let newState = Object.assign({},board[[newNode.i,newNode.j]],{fill:'#4b0082'});
                    searchUpdates.push(newState);
                    queue.unshift(newPath);
                }
            }
        }
    }
    // Return empty path and updates if no path to target was found
    return [[], searchUpdates];
};

function breadthFirst(startNode,targetNode,xUnits,yUnits,board) {
    // initialize queue of paths and set of visited node
    let queue = [[startNode]];
    let visitedNodes = new Set();
    let searchUpdates = [];
    // iteratively extend paths in queue until no possible paths left or target found
    while (queue.length > 0) {
        let currentPath = queue.shift();
        let currentNode = currentPath[currentPath.length - 1];
        // check that node has not been extended already, if so drop path, else add to set of visited nodes and updates
        if (visitedNodes.has(currentNode.i+','+currentNode.j)) continue;
        visitedNodes.add(currentNode.i+','+currentNode.j);
        if (!isSameNode(currentNode,startNode) && !isSameNode(currentNode,targetNode)) {
            let newState = Object.assign({},board[[currentNode.i,currentNode.j]],{fill:'#6495ed'});
            searchUpdates.push(newState);
        }
        // extend path by iterating over neighboring nodes (that are not walls or already extended)
        let neighbors = findNeighbors(currentNode);
        for (let newNode of neighbors) {
            if (isValidNode(newNode,board,xUnits,yUnits) && !visitedNodes.has(newNode.i+','+newNode.j)) {
                let newPath = currentPath.concat([newNode]);
                // if we found target return the completed path and updates, else add path extended path to queue
                if (isSameNode(newNode,targetNode)) {
                    return [newPath, searchUpdates];
                } else {
                    let newState = Object.assign({},board[[newNode.i,newNode.j]],{fill:'#4b0082'});
                    searchUpdates.push(newState);
                    queue.push(newPath);
                }
            }
        }
    }
    // Return empty path and updates if no path to target was found
    return [[], searchUpdates];
};

function hillClimbing(startNode,targetNode,xUnits,yUnits,board) {
    // initialize queue of paths and set of visited node
    let queue = [[startNode]];
    let visitedNodes = new Set();
    let searchUpdates = [];
    // iteratively extend paths in queue until no possible paths left or target found
    while (queue.length > 0) {
        let currentPath = queue.shift();
        let currentNode = currentPath[currentPath.length - 1];
        // check that node has not been extended already, if so drop path, else add to set of visited nodes and updates
        if (visitedNodes.has(currentNode.i+','+currentNode.j)) continue;
        visitedNodes.add(currentNode.i+','+currentNode.j);
        if (!isSameNode(currentNode,startNode) && !isSameNode(currentNode,targetNode)) {
            let newState = Object.assign({},board[[currentNode.i,currentNode.j]],{fill:'#6495ed'});
            searchUpdates.push(newState);
        }
        // extend path by iterating over neighboring nodes (that are not walls or already extended)
        let neighbors = findNeighbors(currentNode);
        // sort nodes according to distance to target node (descending)
        neighbors.sort((node1,node2) => manhattanDistance(node2,targetNode) - manhattanDistance(node1,targetNode));
        for (let newNode of neighbors) {
            if (isValidNode(newNode,board,xUnits,yUnits) && !visitedNodes.has(newNode.i+','+newNode.j)) {
                let newPath = currentPath.concat([newNode]);
                // if we found target return the completed path and updates, else add path extended path to queue
                if (isSameNode(newNode,targetNode)) {
                    return [newPath, searchUpdates];
                } else {
                    let newState = Object.assign({},board[[newNode.i,newNode.j]],{fill:'#4b0082'});
                    searchUpdates.push(newState);
                    queue.unshift(newPath);
                }
            }
        }
    }
    // Return empty path and updates if no path to target was found
    return [[], searchUpdates];
};

function beamSearch(startNode,targetNode,xUnits,yUnits,board, w = 2) {
    // initialize queue of paths and set of visited node
    let queue = [[startNode]];
    let visitedNodes = new Set();
    let searchUpdates = [];
    // iteratively extend paths in queue until no possible paths left or target found
    while (queue.length > 0) {
        let currentPath = queue.shift();
        let currentNode = currentPath[currentPath.length - 1];
        // check that node has not been extended already, if so drop path, else add to set of visited nodes and updates
        if (visitedNodes.has(currentNode.i+','+currentNode.j)) continue;
        visitedNodes.add(currentNode.i+','+currentNode.j);
        if (!isSameNode(currentNode,startNode) && !isSameNode(currentNode,targetNode)) {
            let newState = Object.assign({},board[[currentNode.i,currentNode.j]],{fill:'#6495ed'});
            searchUpdates.push(newState);
        }
        // extend path by iterating over neighboring nodes (that are not walls or already extended)
        let neighbors = findNeighbors(currentNode);
        // sort nodes according to distance to target node (descending)
        neighbors.sort((node1,node2) => manhattanDistance(node2,targetNode) - manhattanDistance(node1,targetNode));
        // filter to valid nodes and keep only the first w number of them
        neighbors = neighbors.filter(
            (node) => (isValidNode(node,board,xUnits,yUnits) && !visitedNodes.has(node.i+','+node.j))
        ).slice(-w);
        for (let newNode of neighbors) {
            let newPath = currentPath.concat([newNode]);
            // if we found target return the completed path and updates, else add path extended path to queue
            if (isSameNode(newNode,targetNode)) {
                return [newPath, searchUpdates];
            } else {
                let newState = Object.assign({},board[[newNode.i,newNode.j]],{fill:'#4b0082'});
                searchUpdates.push(newState);
                queue.push(newPath);
            }
        }
    }
    // Return empty path and updates if no path to target was found
    return [[], searchUpdates];
};

function bestFirst(startNode,targetNode,xUnits,yUnits,board) {
    // initialize queue of paths as minHeap and set of visited node
    let lessThan = (path1,path2) => {return path1.distance < path2.distance;};
    let queue = new minHeap(lessThan);
    queue.insert({distance:manhattanDistance(startNode,targetNode) , path:[startNode]});
    let visitedNodes = new Set();
    let searchUpdates = [];
    // iteratively extend paths in queue until no possible paths left or target found
    while (queue.length() > 0) {
        let {path} = queue.shift();
        let currentNode = path[path.length - 1];
        // check that node has not been extended already, if so drop path, else add to set of visited nodes and updates
        if (visitedNodes.has(currentNode.i+','+currentNode.j)) continue;
        visitedNodes.add(currentNode.i+','+currentNode.j);
        if (!isSameNode(currentNode,startNode) && !isSameNode(currentNode,targetNode)) {
            let newState = Object.assign({},board[[currentNode.i,currentNode.j]],{fill:'#6495ed'});
            searchUpdates.push(newState);
        }
        // extend path by iterating over neighboring nodes (that are not walls or already extended)
        let neighbors = findNeighbors(currentNode);
        for (let newNode of neighbors) {
            if (isValidNode(newNode,board,xUnits,yUnits) && !visitedNodes.has(newNode.i+','+newNode.j)) {
                let newPath = path.concat([newNode]);
                // if we found target return the completed path and updates, else add extended path to queue
                if (isSameNode(newNode,targetNode)) {
                    return [newPath, searchUpdates];
                } else {
                    let newState = Object.assign({},board[[newNode.i,newNode.j]],{fill:'#4b0082'});
                    searchUpdates.push(newState);
                    queue.insert({distance:manhattanDistance(newNode,targetNode) , path:newPath});
                }
            }
        }
    }
    // Return empty path and updates if no path to target was found
    return [[], searchUpdates];
};


// Weighted Algorithms //
//=====================//
// Dictionary below determines relative weight moving from one node to another.
// Essentially moving through a weight is 10 times as difficult as an empty node.
const pathWeights = {'empty':1, 'weight':10, 'target':1};

function branchNBound(startNode,targetNode,xUnits,yUnits,board) {
    // initialize queue of paths as minHeap and set of visited node
    let lessThan = (path1,path2) => {return path1.distance < path2.distance;};
    let queue = new minHeap(lessThan);
    queue.insert({distance:0 , path:[startNode]});
    let visitedNodes = new Set();
    let searchUpdates = [];
    let bestDistance = Infinity;
    let bestPath = [];
    // iteratively extend paths in queue until no possible paths left or target found
    while (queue.length() > 0) {
        let {distance, path} = queue.shift();
        let currentNode = path[path.length - 1];
        // check that node has not been extended already, if so drop path, else add to set of visited nodes and updates
        if (visitedNodes.has(currentNode.i+','+currentNode.j)) continue;
        visitedNodes.add(currentNode.i+','+currentNode.j);
        if (!isSameNode(currentNode,startNode) && !isSameNode(currentNode,targetNode)) {
            let newState = Object.assign({},board[[currentNode.i,currentNode.j]],{fill:'#6495ed'});
            searchUpdates.push(newState);
        }
        // extend path by iterating over neighboring nodes (that are not walls or already extended)
        let neighbors = findNeighbors(currentNode);
        // filter to valid nodes
        neighbors = neighbors.filter((node) => (isValidNode(node,board,xUnits,yUnits) && !visitedNodes.has(node.i+','+node.j)));
        for (let newNode of neighbors) {
            let newPath = path.concat([newNode]);
            let newDistance = distance + pathWeights[board[[newNode.i,newNode.j]].type];
            // if newDistance is not less than the bestDistance to the target so far, then drop the path from the queue
            if (newDistance >= bestDistance) {
                if (!isSameNode(newNode,targetNode)) {
                    let newState = Object.assign({},board[[newNode.i,newNode.j]],{fill:'#4b0082'});
                    searchUpdates.push(newState);
                }
                continue;
            };
            // if we found target return the completed path and updates, else add extended path to queue
            if (isSameNode(newNode,targetNode)) {
                [bestPath, bestDistance] = [newPath, newDistance];
            } else {
                let newState = Object.assign({},board[[newNode.i,newNode.j]],{fill:'#4b0082'});
                searchUpdates.push(newState);
                queue.insert({distance:newDistance , path:newPath});
            }
        }
    }
    // Return best path (which could be empty if no path found) and searchUpdates for animation
    return [bestPath, searchUpdates];
};

function aStarSearch(startNode,targetNode,xUnits,yUnits,board) {
    // initialize queue of paths as minHeap and set of visited node
    let lessThan = (path1,path2) => {return path1.estimatedDistance < path2.estimatedDistance;};
    let queue = new minHeap(lessThan);
    queue.insert({estimatedDistance:manhattanDistance(startNode,targetNode), distance:0 , path:[startNode]});
    let visitedNodes = new Set();
    let searchUpdates = [];
    // iteratively extend paths in queue until no possible paths left or target found
    while (queue.length() > 0) {
        let {distance, path} = queue.shift();
        let currentNode = path[path.length - 1];
        // check that node has not been extended already, if so drop path, else add to set of visited nodes and updates
        if (visitedNodes.has(currentNode.i+','+currentNode.j)) continue;
        visitedNodes.add(currentNode.i+','+currentNode.j);
        if (!isSameNode(currentNode,startNode) && !isSameNode(currentNode,targetNode)) {
            let newState = Object.assign({},board[[currentNode.i,currentNode.j]],{fill:'#6495ed'});
            searchUpdates.push(newState);
        }
        // extend path by iterating over neighboring nodes (that are not walls or already extended)
        let neighbors = findNeighbors(currentNode);
        // filter to valid nodes
        neighbors = neighbors.filter((node) => (isValidNode(node,board,xUnits,yUnits) && !visitedNodes.has(node.i+','+node.j)));
        for (let newNode of neighbors) {
            let newPath = path.concat([newNode]);
            let newDistance = distance + pathWeights[board[[newNode.i,newNode.j]].type];
            // if we found target return the completed path and updates, else add extended path to queue
            if (isSameNode(newNode,targetNode)) {
                // extend other paths to be sure they aren't actually closer to the target (not sure about this part)
                return [newPath, searchUpdates];
            } else {
                let newState = Object.assign({},board[[newNode.i,newNode.j]],{fill:'#4b0082'});
                searchUpdates.push(newState);
                queue.insert({
                    estimatedDistance: newDistance + manhattanDistance(newNode,targetNode), 
                    distance:newDistance, 
                    path:newPath
                });
            }
        }
    }
    // Return empty path and updates if no path to target was found
    return [[], searchUpdates];
};

// Modified A* For Use In Maze Buidlers //
//======================================//
const modifiedWeights = (type) => {
    if (type === 0) return 1;
    else return Math.random()*10000 + 1000;
};

function modifiedAStar(startNode,targetNode,xUnits,yUnits,board) {
    // initialize queue of paths as minHeap and set of visited node
    let lessThan = (path1,path2) => {return path1.estimatedDistance < path2.estimatedDistance;};
    let queue = new minHeap(lessThan);
    queue.insert({estimatedDistance:manhattanDistance(startNode,targetNode), distance:0 , path:[startNode]});
    let visitedNodes = new Set();
    // iteratively extend paths in queue until no possible paths left or target found
    while (queue.length() > 0) {
        let {distance, path} = queue.shift();
        let currentNode = path[path.length - 1];
        // check that node has not been extended already, if so drop path, else add to set of visited nodes and updates
        if (visitedNodes.has(currentNode.i+','+currentNode.j)) continue;
        visitedNodes.add(currentNode.i+','+currentNode.j);
        // extend path by iterating over neighboring nodes (that are not walls or already extended)
        let neighbors = findNeighbors(currentNode);
        // filter to valid nodes
        neighbors = neighbors.filter((node) => (nodeOnBoard(node,xUnits,yUnits) && !visitedNodes.has(node.i+','+node.j)));
        for (let newNode of neighbors) {
            let newPath = path.concat([newNode]);
            let newDistance = distance + modifiedWeights(board[[newNode.i,newNode.j]]);
            // if we found target then we have the shortest path, which we will then convert into canvas updates that are returned
            if (isSameNode(newNode,targetNode)) {
                let searchUpdates = [];
                for (let node of newPath) {
                    if (board[[node.i,node.j]] === 1) searchUpdates.push({node:node, type:'empty', fill:'white'});
                }
                return searchUpdates;
            } else {
                queue.insert({
                    estimatedDistance: newDistance + manhattanDistance(newNode,targetNode), 
                    distance:newDistance, 
                    path:newPath
                });
            }
        }
    }
    // Return empty updates if no path to target was found
    console.log('got here, but should not have')
    return [];
};


//=================================================================================================================================//
// Maze Building Algorithms //
//=================================================================================================================================//
function randomWalls(startNode,targetNode,xUnits,yUnits,board) {
    // initialize array to keep track of path for drawing maze and dungeon object for state of maze
    let mazePath = [];
    let dungeon = {};
    // iterate over whole board and randomly generate walls (with P(wall) = .5)
    for (let key in board) {
        let node = parseKey(key);
        if (isSameNode(node,startNode) || isSameNode(node,targetNode)) {
            dungeon[key] = 0;
        } else if (Math.random() < .50) {
            dungeon[key] = 1;
            mazePath.push({node:node, type:'wall', fill:'#282c34'})
        } else {
            dungeon[key] = 0;
        }
    }
    // use modified A* to ensure a path between the start and target nodes
    let pathUpdates = modifiedAStar(startNode,targetNode,xUnits,yUnits,dungeon);
    mazePath = mazePath.concat(pathUpdates);
    // return path used to build the maze for animations
    return mazePath;
};

function randomWeights(startNode,targetNode,xUnits,yUnits,board) {
    // initialize array to keep track of path for drawing maze
    let mazePath = [];
    // iterate over whole board and randomly generate walls (with P(wall) = .5)
    for (let key in board) {
        let node = parseKey(key);
        if (isSameNode(node,startNode) || isSameNode(node,targetNode)) continue;
        if (Math.random() < .5) {
            mazePath.push({node:node, type:'weight', fill:'white', object:'weight'})
        }
    }
    // return path used to build the maze for animations
    return mazePath;
};

function depthFirstMaze(startNode,targetNode,xUnits,yUnits,board) {
    // initialize dictionary of nodes that keeps track of how many times each one was visited
    // each time we check the node, add 1, and if we extend the node set to Infinity
    let visitedNodes = {};
    for (let node in board) {
        visitedNodes[node] = 0;
    }
    // pick starting point at random
    let start = {i: Math.floor(Math.random()*xUnits) , j: Math.floor(Math.random()*yUnits)};
    // initialize queue as array
    let queue = [start];
    // initialize array to keep track of path for drawing maze
    let mazePath = [];
    // iteratively extend path until no more paths are left in the queue
    while (queue.length > 0) {
        // move to next node on the queue
        const currentNode = queue.shift();
        // if the node has already been extended or checked twice, then remove from queue and continue
        // else we extend the node and update visitedNodes and mazePath
        if (visitedNodes[[currentNode.i,currentNode.j]] >= 2) continue;
        visitedNodes[[currentNode.i,currentNode.j]] = Infinity;
        if (!isSameNode(currentNode,startNode) && !isSameNode(currentNode,targetNode)) mazePath.push({node:currentNode, type:'empty', fill:'white'});
        // find the node's neighbors
        let neighbors = findNeighbors(currentNode);
        // filter to nodes on the board that have not already been extended or checked twice
        neighbors = neighbors.filter((node) => (nodeOnBoard(node,xUnits,yUnits) && (visitedNodes[[node.i,node.j]] < 2)));
        // shuffle array to randomize order
        neighbors = shuffleArray(neighbors);
        // initialize array for adding the new nodes to queue (this lets us control the order in case the start or target node are encountered
        // since we want to immediately extend these nodes to ensure a perfect path)
        let nodesToAdd = [];
        for (let node of neighbors) {
            visitedNodes[[node.i,node.j]]++
            if (isSameNode(node,startNode) || isSameNode(node,targetNode)) nodesToAdd.unshift(node);
            else nodesToAdd.push(node);
        }
        queue = nodesToAdd.concat(queue);
    }
    // return path used to build the maze for animations
    return mazePath;
};

function breadthFirstMaze(startNode,targetNode,xUnits,yUnits,board) {
    // initialize dictionary of nodes that keeps track of how many times each one was visited
    // each time we check the node, add 1, and if we extend the node set to Infinity
    let visitedNodes = {};
    for (let node in board) {
        visitedNodes[node] = 0;
    }
    // pick starting point at random
    let start = {i: Math.floor(Math.random()*xUnits) , j: Math.floor(Math.random()*yUnits)};
    // initialize queue as array
    let queue = [start];
    // initialize array to keep track of path for drawing maze
    let mazePath = [];
    // iteratively extend path until no more paths are left in the queue
    while (queue.length > 0) {
        // move to next node on the queue
        const currentNode = queue.shift();
        // if the node has already been extended or checked twice, then remove from queue and continue
        // else we extend the node and update visitedNodes and mazePath
        if (visitedNodes[[currentNode.i,currentNode.j]] >= 2) continue;
        visitedNodes[[currentNode.i,currentNode.j]] = Infinity;
        if (!isSameNode(currentNode,startNode) && !isSameNode(currentNode,targetNode)) mazePath.push({node:currentNode, type:'empty', fill:'white'});
        // find the node's neighbors
        let neighbors = findNeighbors(currentNode);
        // filter to nodes on the board that have not already been extended or checked twice
        neighbors = neighbors.filter((node) => (nodeOnBoard(node,xUnits,yUnits) && (visitedNodes[[node.i,node.j]] < 2)));
        // shuffle array to randomize order
        neighbors = shuffleArray(neighbors);
        // add new nodes to queue, putting them at the end unless they are the start or target node (this ensures the start and target always get
        // extended immediately which preserves the perfect maze condition)
        for (let node of neighbors) {
            visitedNodes[[node.i,node.j]]++
            if (isSameNode(node,startNode) || isSameNode(node,targetNode)) queue.unshift(node);
            else queue.push(node);
        }
    }
    // return path used to build the maze for animations
    return mazePath;
};

function kruskalsMaze(startNode,targetNode,xUnits,yUnits,board) {
    // initialize list of unvisited nodes which we will visit in a randomized order; however, start and target nodes will be placed at the front to ensure
    // a perfect maze is generated
    let unVisitedNodes = [];
    for (let key in board) {
        if (!isSameNode(parseKey(key),startNode) && !isSameNode(parseKey(key),targetNode)) unVisitedNodes.push(key);
    }
    unVisitedNodes = shuffleArray(unVisitedNodes);
    unVisitedNodes.unshift(startNode.i+','+startNode.j);
    unVisitedNodes.unshift(targetNode.i+','+targetNode.j);
    // initialize set to keep track of nodes added to the path
    let pathNodes = new Set();
    // initialize disjoint set to keep track of the disjoint paths
    let disjointPaths = new disjointSet();
    // lastly initialize array for storing mazePath updates for animation
    let mazePath = [];
    // iteratively look at each node in unVisited nodes, checking to see if it can be added to the path
    for (let currentNode of unVisitedNodes) {
        // get neighboring nodes and convert node to string
        let neighbors = findNeighbors(parseKey(currentNode)).map((node) => (node.i+','+node.j));
        // filter to neighbors that are on the board and are part of a path
        neighbors = neighbors.filter((node) => (nodeOnBoard(parseKey(node),xUnits,yUnits) && pathNodes.has(node)));
        // get the roots of each of these neighbors
        let roots = neighbors.map((node) => disjointPaths.find(node));
        // get the unique roots
        let rootsSet = new Set(roots);
        // Condition below guarantees perfect maze, but would not guarantee all paths are joined (and thus not guarantee that there is a path from start to target)
        //if (roots.length !== rootsSet.size) continue;
        // Condition below guarantees all paths are joined, but does not guarantee a perfect maze
        if (roots.length > 1 && rootsSet.size < 2) continue;
        // else we make current node part of the pathNodes and union all the roots
        pathNodes.add(currentNode);
        if (!isSameNode(parseKey(currentNode),startNode) && !isSameNode(parseKey(currentNode),targetNode)) {
            mazePath.push({node:parseKey(currentNode), type:'empty', fill:'white'});
        }
        disjointPaths.makeSet(currentNode);
        for (let node of roots) {
            disjointPaths.union(currentNode,node);
        }
    }
    // return path used to build the maze for animations
    return mazePath;
}

function primsMaze(startNode,targetNode,xUnits,yUnits,board) {
    // initialize dictionary of nodes that keeps track of how many times each one was visited
    // each time we check the node, add 1, and if we extend the node set to Infinity
    let visitedNodes = {};
    for (let node in board) {
        visitedNodes[node] = 0;
    }
    // pick starting point at random
    let start = {i: Math.floor(Math.random()*xUnits) , j: Math.floor(Math.random()*yUnits)};
    // initialize queue as array and initialize values for keeping track of start and target nodes
    let queue = [start];
    let [ startFound , targetFound ] = [ false , false ];
    // initialize array to keep track of path for drawing maze
    let mazePath = [];
    // iteratively extend path until no more paths are left in the queue
    while (queue.length > 0) {
        // move to random node on the queue, unless we have encountered the start or target node, in which case move to this node
        // doing so ensures a perfect maze
        let currentNode;
        if (startFound) {
            currentNode = queue.shift();
            startFound = false;
        }
        else if (targetFound) {
            currentNode = queue.shift();
            targetFound = false;
        } else {
            const i = Math.floor(Math.random() * queue.length);
            currentNode = queue[i];
            queue = queue.slice(0,i).concat(queue.slice(i+1));
        }
        // if the node has already been extended or checked twice, then remove from queue and continue
        // else we extend the node and update visitedNodes and mazePath
        if (visitedNodes[[currentNode.i,currentNode.j]] >= 2) continue;
        visitedNodes[[currentNode.i,currentNode.j]] = Infinity;
        if (!isSameNode(currentNode,startNode) && !isSameNode(currentNode,targetNode)) mazePath.push({node:currentNode, type:'empty', fill:'white'});
        // find the node's neighbors
        let neighbors = findNeighbors(currentNode);
        // filter to nodes on the board that have not already been extended or checked twice
        neighbors = neighbors.filter((node) => (nodeOnBoard(node,xUnits,yUnits) && (visitedNodes[[node.i,node.j]] < 2)));
        // add new nodes to queue, putting them at the end unless they are the start or target node (this ensures the start and target always get
        // extended immediately which preserves the perfect maze condition)
        for (let node of neighbors) {
            visitedNodes[[node.i,node.j]]++
            if (isSameNode(node,startNode)) {
                queue.unshift(node);
                startFound = true;
            } else if (isSameNode(node,targetNode)) {
                queue.unshift(node);
                targetFound = true;
            }
            else queue.push(node);
        }
    }
    // return path used to build the maze for animations
    return mazePath;
};

function huntAndKill(startNode,targetNode,xUnits,yUnits,board) {
    // initialize dictionary of nodes that keeps track of how many times each one was visited
    // each time we check the node, add 1, and if we extend the node set to Infinity
    let visitedNodes = {};
    for (let node in board) {
        visitedNodes[node] = 0;
    }
    // pick starting point at random
    let start = {i: Math.floor(Math.random()*xUnits) , j: Math.floor(Math.random()*yUnits)};
    // initialize queue as array and initialize variable to determine when to choose new random walk point
    let queue = [start];
    let newRandomWalk = false;
    // initialize array to keep track of path for drawing maze
    let mazePath = [];
    // iteratively extend path until no more paths are left in the queue
    while (queue.length > 0) {
        // move to next node on the queue, unless we determined current path cannot be exteneded, in which case pick random node
        let currentNode;
        if (newRandomWalk) {
            const i = Math.floor(Math.random() * queue.length);
            currentNode = queue[i];
            queue = queue.slice(0,i).concat(queue.slice(i+1));
            newRandomWalk = false;
        } else {
            currentNode = queue.shift();
        }
        // if the node has already been extended or checked twice, then remove from queue and continue
        // else we extend the node and update visitedNodes and mazePath
        if (visitedNodes[[currentNode.i,currentNode.j]] >= 2) continue;
        visitedNodes[[currentNode.i,currentNode.j]] = Infinity;
        if (!isSameNode(currentNode,startNode) && !isSameNode(currentNode,targetNode)) mazePath.push({node:currentNode, type:'empty', fill:'white'});
        // find the node's neighbors
        let neighbors = findNeighbors(currentNode);
        // filter to nodes on the board that have not already been extended or checked twice
        neighbors = neighbors.filter((node) => (nodeOnBoard(node,xUnits,yUnits) && (visitedNodes[[node.i,node.j]] < 2)));
        // shuffle array to randomize order
        neighbors = shuffleArray(neighbors);
        // initialize array for adding the new nodes to queue (this lets us control the order in case the start or target node are encountered
        // since we want to immediately extend these nodes to ensure a perfect path)
        let nodesToAdd = [];
        for (let node of neighbors) {
            visitedNodes[[node.i,node.j]]++
            if (isSameNode(node,startNode) || isSameNode(node,targetNode)) nodesToAdd.unshift(node);
            else nodesToAdd.push(node);
        }
        queue = nodesToAdd.concat(queue);
        if (nodesToAdd.length === 0) newRandomWalk = true;
    }
    // return path used to build the maze for animations
    return mazePath;
};

function randomDLA(startNode,targetNode,xUnits,yUnits,board) {
    // initialize sets for keeping track of nodes in the path and neighboring nodes to the path
    let [ pathNodes , pathNeighbors ] = [ new Set() , new Set() ];
    // initialize array for keeping track of canvas updates
    let mazePath = [];
    // initialize brownianNode that randomly drifts around the board, add it to pathNeighbors to esure it is the first node added to th path
    let brownianNode = getRandomNode(xUnits,yUnits,pathNodes);
    pathNeighbors.add(brownianNode);
    // run loop that lets the brownianNode walk randomly around the board
    while (pathNodes.size < (xUnits*yUnits)/6) {
        // updates for when brownianNode comes into contact with path
        if (pathNeighbors.has(brownianNode)) {
            // add node to pathNodes and add neighbors to pathNeighbors
            pathNodes.add(brownianNode);
            let neighbors = findNeighbors(parseKey(brownianNode)).filter((node) => nodeOnBoard(node,xUnits,yUnits));
            for (let neighbor of neighbors) {
                pathNeighbors.add(neighbor.i+','+neighbor.j);
            }
            // add to canvas updates if it is not the start or target node
            if (!isSameNode(parseKey(brownianNode),startNode) && !isSameNode(parseKey(brownianNode),targetNode)) {
                mazePath.push({node:parseKey(brownianNode), type:'empty', fill:'white', object:null});
            }
            // set brownianNode to new random position
            brownianNode = getRandomNode(xUnits,yUnits,pathNodes);
        } else {
            // let brownianNode walk to new neighbor at random
            brownianNode = getRandomNeighbor(brownianNode,xUnits,yUnits);
        }
    }
    // return path used to build the maze for animations
    return mazePath;
};
function wallDLA(startNode,targetNode,xUnits,yUnits,board) {
    // initialize sets for keeping track of nodes in the path and neighboring nodes to the path
    let [ pathNodes , pathNeighbors ] = [ new Set() , new Set() ];
    // initialize array for keeping track of canvas updates
    let mazePath = [];
    // initialize brownianNode that randomly drifts around the board, add it to pathNeighbors to esure it is the first node added to th path
    let brownianNode = getRandomWallNode(xUnits,yUnits,pathNodes);
    pathNeighbors.add(brownianNode);
    // run loop that lets the brownianNode walk randomly around the board
    while (pathNodes.size < (xUnits*yUnits)/6) {
        // updates for when brownianNode comes into contact with path
        if (pathNeighbors.has(brownianNode)) {
            // add node to pathNodes and add neighbors to pathNeighbors
            pathNodes.add(brownianNode);
            let neighbors = findNeighbors(parseKey(brownianNode)).filter((node) => nodeOnBoard(node,xUnits,yUnits));
            for (let neighbor of neighbors) {
                pathNeighbors.add(neighbor.i+','+neighbor.j);
            }
            // add to canvas updates if it is not the start or target node
            if (!isSameNode(parseKey(brownianNode),startNode) && !isSameNode(parseKey(brownianNode),targetNode)) {
                mazePath.push({node:parseKey(brownianNode), type:'empty', fill:'white', object:null});
            }
            // set brownianNode to new random position
            brownianNode = getRandomWallNode(xUnits,yUnits,pathNodes);
        } else {
            // let brownianNode walk to new neighbor at random
            brownianNode = getRandomNeighbor(brownianNode,xUnits,yUnits);
        }
    }
    // return path used to build the maze for animations
    return mazePath;
};

function cellularDungeon(startNode,targetNode,xUnits,yUnits,board) {
    // initialize array to keep track of path for drawing maze
    let mazePath = [];
    // initialize dictionary for keeping track of dungeon state (0 for empty and 1 for wall)
    let dungeon = {};
    // begin by iterating over whole board and randomly generating walls (with P(wall) = .35)
    for (let key in board) {
        let node = parseKey(key);
        if (isSameNode(node,startNode) || isSameNode(node,targetNode)) {
            dungeon[key] = 0;
        // remove this to have walls be open
        } else if (node.i === 0 || node.i === xUnits-1 || node.j === 0 || node.j === yUnits-1) {
            mazePath.push({node:node, type:'wall', fill:'#282c34'})
            dungeon[key] = 1;
        } else if (Math.random() < .47) {
            mazePath.push({node:node, type:'wall', fill:'#282c34'})
            dungeon[key] = 1;
        } else {
            dungeon[key] = 0;
        }
    }
    // now we let the board anneal over a set number of iterations to form the dungeons
    for (let i=0; i<5; i++) {
        let newDungeon = {};
        // iterate over previous state and determine new state for each grid cell
        for (let key in dungeon) {
            const node = parseKey(key);
            const neighborsStates = findNeighbors(node)
                .filter((node) => nodeOnBoard(node,xUnits,yUnits))
                // eslint-disable-next-line
                .map((node) => dungeon[[node.i,node.j]]);
            const wallCount = neighborsStates.reduce((state1,state2) => state1 + state2);
            if (isSameNode(node,startNode) || isSameNode(node,targetNode)) {
                newDungeon[key] = 0;
            // remove this to have walls be open
            } else if (node.i === 0 || node.i === xUnits-1 || node.j === 0 || node.j === yUnits-1) {
                newDungeon[key] = 1;
            } else if ((dungeon[key] && wallCount >= 3) || (!dungeon[key] && wallCount >= 4)) {
                newDungeon[key] = 1;
            } else {
                newDungeon[key] = 0;
            }
            if (dungeon[key] !== newDungeon[key]) {
                if (newDungeon[key] === 1) {
                    mazePath.push({node:node, type:'wall', fill:'#282c34'})
                } else {
                    mazePath.push({node:node, type:'empty', fill:'white'})
                }
            }
        }
        dungeon = newDungeon
    }
    // use modified A* to ensure a path between the start and target nodes
    let pathUpdates = modifiedAStar(startNode,targetNode,xUnits,yUnits,dungeon);
    mazePath = mazePath.concat(pathUpdates);
    // return path used to build the maze for animations
    return mazePath;
};

function simplexCaves(startNode,targetNode,xUnits,yUnits,board,s,xOffset,yOffset) {
    // initialize mazePath array for storing canvs updates and dungeon object for storing state of maze
    let mazePath = [];
    let dungeon = {};
    // initiate perline noise
    noise.seed(Math.random());
    // for each node on the board grab the perlin noise value; if the value is above the cutoff, make it a wall, else empty
    const defaultThreshold = .65;
    // use below function to have threshold go to zero as we approach the edges (so the edges become walls)
    const offset = Math.ceil(Math.min(xUnits/20, yUnits/20));
    function thresholdFunction(node) {
        const x = Math.min(node.i, xUnits-1-node.i);
        const y = Math.min(node.j, yUnits-1-node.j);
        const z = Math.min(x,y);
        if (z < offset) {
            return defaultThreshold * (1 - ((offset-z)/offset)**2);
        }
        else return defaultThreshold;
    };
    let scale = 150;
    for (let key in board) {
        let node = parseKey(key);
        if (isSameNode(node,startNode) || isSameNode(node,targetNode)) {
            dungeon[key] = 0;
        } else {
            const pos = calcHexCenter(node,s,xOffset,yOffset);
            const noiseValue = (noise.simplex2(pos.x / scale, pos.y / scale) + 1) / 2;
            const threshold = thresholdFunction(node);
            if (noiseValue > threshold) {
                dungeon[key] = 1;
                mazePath.push({node:node, type:'wall', fill:'#282c34'});
            } else {
                dungeon[key] = 0;
            }
        }
    }
    // use modified A* to ensure a path between the start and target nodes
    let pathUpdates = modifiedAStar(startNode,targetNode,xUnits,yUnits,dungeon);
    mazePath = mazePath.concat(pathUpdates);
    // return path used to build the maze for animations
    return mazePath;
}


export {randomWalk, depthFirst, breadthFirst, hillClimbing, beamSearch, bestFirst, branchNBound, aStarSearch};
export {randomWalls, randomWeights, depthFirstMaze, breadthFirstMaze, kruskalsMaze, primsMaze, huntAndKill, randomDLA, wallDLA, cellularDungeon, simplexCaves}