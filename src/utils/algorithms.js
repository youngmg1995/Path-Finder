import {isSameNode, isValidNode, findNeighbors, manhattanDistance, minHeap} from './utils';

//=====================================================================================//
// Unweighted Algorithms //
//=====================================================================================//
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


//=====================================================================================//
// Weighted Algorithms //
//=====================================================================================//
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



// This is an old version of branch and bound algorithm. It doesn't have employ the check at the end
// once the target node is found, but I'm keeping it around because it's structure is much simpler
// and might be useful later.
/*
function branchNBound(startNode,targetNode,xUnits,yUnits,board) {
    // initialize queue of paths as minHeap and set of visited node
    let lessThan = (path1,path2) => {return path1.distance < path2.distance;};
    let queue = new minHeap(lessThan);
    queue.insert({distance:0 , path:[startNode]});
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
        // sort nodes according to weighted distance from currentNode (descending)
        neighbors.sort((node1,node2) => pathWeights[board[[node2.i,node2.j]].type] - pathWeights[board[[node1.i,node1.j]].type]);
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
                queue.insert({distance:newDistance , path:newPath});
            }
        }
    }
    // Return empty path and updates if no path to target was found
    return [[], searchUpdates];
};
*/

// Similar to above, this is an old version of the A* search algorithm. However, this old method does in fact run
// a check after finding the target, but I now realize that this check is uneccessary. The heuristic distance is
// always a lower bound which means there is no possibility of finding a shorter path once we have reached the target.
/*
function aStarSearch(startNode,targetNode,xUnits,yUnits,board) {
    // initialize queue of paths as minHeap and set of visited node
    let lessThan = (path1,path2) => {return path1.estimatedDistance < path2.estimatedDistance;};
    let queue = new minHeap(lessThan);
    queue.insert({estimatedDistance:manhattanDistance(startNode,targetNode), distance:0 , path:[startNode]});
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
        // sort nodes according to weighted distance from currentNode (descending) (this actually might not be necessary)
        //neighbors.sort((node1,node2) => pathWeights[board[[node2.i,node2.j]].type] - pathWeights[board[[node1.i,node1.j]].type]);
        for (let newNode of neighbors) {
            let newPath = path.concat([newNode]);
            let newDistance = distance + pathWeights[board[[newNode.i,newNode.j]].type];
            let estimatedDistance = newDistance + manhattanDistance(newNode,targetNode);
            // if newDistance is not less than the bestDistance to the target so far, then drop the path from the queue
            if (estimatedDistance >= bestDistance) {
                if (!isSameNode(newNode,targetNode)) {
                    let newState = Object.assign({},board[[newNode.i,newNode.j]],{fill:'#4b0082'});
                    searchUpdates.push(newState);
                }
                continue;
            };
            // if we found target return the completed path and updates, else add extended path to queue
            if (isSameNode(newNode,targetNode)) {
                [bestPath, bestDistance] = [newPath, newDistance];
                console.log(`bestDistance:${bestDistance}`);
            } else {
                let newState = Object.assign({},board[[newNode.i,newNode.j]],{fill:'#4b0082'});
                searchUpdates.push(newState);
                queue.insert({
                    estimatedDistance: estimatedDistance, 
                    distance:newDistance, 
                    path:newPath
                });
            }
        }
    }
    // Return empty path and updates if no path to target was found
    return [bestPath, searchUpdates];
};
*/

export {depthFirst, breadthFirst, hillClimbing, beamSearch, bestFirst, branchNBound, aStarSearch};