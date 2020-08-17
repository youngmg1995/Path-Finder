import {isSameNode, nodeOnBoard, isValidNode, findNeighbors, manhattanDistance, minHeap, shuffleArray} from './utils';


//=================================================================================================================================//
// Path-Finding Algorithms //
//=================================================================================================================================//


// Unweighted Algorithms //
//=======================//
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


//=================================================================================================================================//
// Maze Building Algorithms //
//=================================================================================================================================//
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
    //let i = 0;
    while (queue.length > 0) {
        // move to next node on the queue
        const currentNode = queue.shift();
        // if the node has already been extended or checked twice, then remove from queue and continue
        // else we extend the node and update visitedNodes and mazePath
        if (visitedNodes[[currentNode.i,currentNode.j]] >= 2) continue;
        visitedNodes[[currentNode.i,currentNode.j]] = Infinity;
        mazePath.push(currentNode);
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
        //i++;
        //console.log(i);
        //if (i >= 10) break;
    }
    //console.log(mazePath);
    return mazePath;
};



export {depthFirst, breadthFirst, hillClimbing, beamSearch, bestFirst, branchNBound, aStarSearch};
export {depthFirstMaze}