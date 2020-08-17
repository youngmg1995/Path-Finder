//=====================================================================================//
// Constants //
//=====================================================================================//
const DIRECTIONS = {
    even: [
            { i:0  , j:1 },
            { i:-1 , j:0 },
            { i:-1 , j:-1 },
            { i:0  , j:-1 },
            { i:1  , j:-1 },
            { i:1  , j:0 }
    ],
    odd: [
            { i:0  , j:1 },
            { i:-1 , j:1 },
            { i:-1 , j:0 },
            { i:0  , j:-1 },
            { i:1  , j:0 },
            { i:1  , j:1 }
    ]
};

//=====================================================================================//
// Helper Functions //
//=====================================================================================//

// Node Functions: node = {i:i,j:j}//
//=================================//
function isSameNode(node1,node2) {
    return (node1.i === node2.i && node1.j === node2.j);
};

function nodeInPath(node,path) {
    for (let pathNode of path) {
        if (isSameNode(node,pathNode)) return true;
    }
    return false;
};

function addNodes(node1,node2) {
    return { i:(node1.i + node2.i) , j:(node1.j + node2.j) };
};

function nodeOnBoard(node,xUnits,yUnits) {
    return (node.i>=0 && node.j>=0 && node.i<xUnits && node.j<yUnits);
};

function isValidNode(node,board,xUnits,yUnits) {
    let state = board[[node.i,node.j]];
    let onBoard = nodeOnBoard(node,xUnits,yUnits);
    return (onBoard && state.type !== 'wall');
};

function findNeighbors(node) {
    let neighbors = [];
    let directions;
    if (node.i%2 === 0) directions = DIRECTIONS.even;
    else directions = DIRECTIONS.odd;
    for (let change of directions) {
        let neighbor = addNodes(node,change);
        neighbors.push(neighbor);
    }
    return neighbors;
};

function manhattanDistance(node1,node2) {
    const hexCoord1 = hexCoordinates(node1);
    const hexCoord2 = hexCoordinates(node2);
    const dx = hexCoord2.x - hexCoord1.x;
    const dy = hexCoord2.y - hexCoord1.y;
    if (Math.sign(dx) === Math.sign(dy)) {
        return Math.max(Math.abs(dx), Math.abs(dy));
    }
    return Math.abs(dx) + Math.abs(dy);
};

function hexCoordinates(node) {
    return { x: node.j - floor2(node.i) , y: node.j + ceil2(node.i) };
};

function floor2(x) {
    return ((x >= 0) ? (x >> 1) : (x - 1) / 2);
};

function ceil2(x) {
    return ((x >= 0) ? ((x + 1) >> 1) : x / 2);
}

// Vectors Functions: v = {x:x,y:y} //
//==================================//
function dotProduct(v1,v2) {
    return v1.x*v2.x + v1.y*v2.y;
};

function scalarProd(a,v) {
    return {x:a*v.x , y:a*v.y};
};

function vectorDiff(v1,v2) {
    return {x: v1.x - v2.x, y: v1.y - v2.y};
};

function vectorSum(v1,v2) {
    return {x: v1.x + v2.x, y: v1.y + v2.y};
};

function vectorMag(v) {
    return Math.sqrt((v.x)**2 + (v.y)**2);
};

function vectorOrthoMag(v,V) {
    let b = scalarProd(dotProduct(v,V)/(vectorMag(V))**2, V);
    let d =  vectorDiff(v, b);
    return vectorMag(d);
};

function vectorAngle(v) {
    let angle = Math.atan( v.y / v.x );
    if (v.x < 0) angle += Math.PI;
    return angle;
};

// Data Structures for Algorithms //
//==================================//
class minHeap {
    constructor(lessThan) {
        this.heap = [];
        this.lessThan = lessThan
    }

    length() {
        return this.heap.length;
    }

    getMin() {
        return this.heap[0];
    }

    insert(value) {
        this.heap.push(value);
        let i = this.heap.length-1;
        while (i > 0) {
            if (this.lessThan(this.heap[i] , this.heap[Math.floor((i-1)/2)])) {
                [ this.heap[Math.floor((i-1)/2)] , this.heap[i] ] = [ this.heap[i] , this.heap[Math.floor((i-1)/2)] ];
                i = Math.floor((i-1)/2);
            } else {
                break;
            }
        }
    }

    shift() {
        const minValue = this.heap.shift();
        if (this.heap.length === 0) return minValue;
        this.heap.unshift(this.heap.pop());
        let i = 0;
        while (2*i+2 < this.heap.length) {
            if (this.lessThan(this.heap[2*i+1], this.heap[i]) || this.lessThan(this.heap[2*i+2], this.heap[i])) {
                if (this.lessThan(this.heap[2*i+1], this.heap[2*i+2])) {
                    [ this.heap[2*i+1], this.heap[i] ] = [ this.heap[i] , this.heap[2*i+1] ];
                    i = 2*i + 1;
                } else {
                    [ this.heap[2*i+2], this.heap[i] ] = [ this.heap[i] , this.heap[2*i+2] ];
                    i = 2*i + 2;
                }
            } else {
                break;
            }
        }
        return minValue;
    }
};

function shuffleArray(array) {
    let arrayCopy = array.slice();
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
};


//=====================================================================================//
// Exports //
//=====================================================================================//
export {isSameNode, nodeInPath, addNodes, nodeOnBoard, isValidNode, findNeighbors, manhattanDistance};      // node functions
export {dotProduct, scalarProd, vectorDiff, vectorSum, vectorMag, vectorOrthoMag, vectorAngle};                          // vector functions
export {minHeap, shuffleArray};                                                                                           // algorithm data structures
