import {
    randomWalk, depthFirst, breadthFirst, hillClimbing, beamSearch, bestFirst, branchNBound, aStarSearch,
    randomWalls, randomWeights, depthFirstMaze, breadthFirstMaze, kruskalsMaze, primsMaze, huntAndKill, randomDLA, wallDLA, cellularDungeon, simplexCaves,
} from './algorithms';
import { calcHexCenter, nodeDistance, doTheJohnWall, lightWeightBaby, clearTheWay } from './canvas-tools';
import { scalarProd, vectorSum, vectorDiff, vectorAngle, isSameNode } from './utils';



//=================================================================================================================================//
// Constants //
//=================================================================================================================================//
// mappings for speeds when animating search, drawPath, moveDownPath, victory, and drawMaze
const searchSpeed = {
    0: 10,
    1: 100,
    2: 1000,
    3: 10000,
    4: Infinity
};
const drawPathSpeed = {
    0: 5,
    1: 5**2,
    2: 5**3,
    3: 5**4,
    4: Infinity
};
const moveDownPathSpeed = {
    0: 3,
    1: 3**2,
    2: 3**3,
    3: 3**4,
    4: Infinity
};
const victorySpeed = {
    0: 1.5*Math.PI,
    1: 2*Math.PI,
    2: 3*Math.PI,
    3: 6*Math.PI,
    4: Infinity
};
const drawMazeSpeed = {
    0: 6,
    1: 6**2,
    2: 6**3,
    3: 6**4,
    4: Infinity
};


//=================================================================================================================================//
// Path-Finding Animations //
//=================================================================================================================================//
function pathFinderAnimation(state,canvasRef,setState,isRunning) {
    // Set state to running so user can't interfere with pathFinder 
    setState((prevState) => ({
        running: true, 
        updateID: prevState.updateID + 1
    }));
    let pathFinder;
    switch (state.algorithm) {
        case 0: pathFinder = depthFirst; break;
        case 1: pathFinder = breadthFirst; break;
        case 2: pathFinder = hillClimbing; break;
        case 3: pathFinder = beamSearch; break;
        case 4: pathFinder = bestFirst; break;
        case 5: pathFinder = branchNBound; break;
        case 6: pathFinder = aStarSearch; break;
        case 7: pathFinder = randomWalk; break;
        default: pathFinder = breadthFirst;
    };
    let [path, searchUpdates] = pathFinder(state.startNode,state.targetNode,state.xUnits,state.yUnits,state.board);
    searchAnimation(path,searchUpdates,state.startNode,state.s,state.xOffset,state.yOffset,state.speed,state.board,setState,isRunning);
};

function searchAnimation(path,searchUpdates,startNode,s,xOffset,yOffset,speed,board,setState,isRunning) {
    let hexsPerSecond = searchSpeed[speed];
    let lastTime = null;
    let currentStart = 0;
    let steps = 0;
    const totalHexs = searchUpdates.length;
    function updateAnimation(start,steps) {
        setState((prevState) => {
            let canvasUpdates = searchUpdates.slice(start,start+steps);
            let boardUpdates = {};
            for (let update of canvasUpdates) {
                Object.assign(boardUpdates,{[[update.node.i,update.node.j]]: update});
            }
            return {
                        board: Object.assign({},prevState.board,boardUpdates),
                        canvasUpdates: canvasUpdates,
                        updateID: prevState.updateID +1
            };
        });
    };
    function frame(time) {
        if (isRunning()) {
            if (lastTime != null) {
                steps = Math.floor(hexsPerSecond * (time - lastTime) / 1000);
                if (steps > 0) {
                    updateAnimation(currentStart,steps);
                    currentStart += steps;
                    lastTime = time;
                }
            } else {
                lastTime = time;
            }
            if (currentStart < totalHexs) {
                requestAnimationFrame(frame);
            } else {
                if (path.length > 0) drawPathAnimation(path,startNode,s,xOffset,yOffset,speed,board,setState,isRunning);
                else {
                    setState((prevState) => ({
                        running: false,
                        updateID: prevState.updateID + 1,
                        canvasUpdates: [],
                        startPosition: false
                    }));
                }
            }
        }
    };
    requestAnimationFrame(frame);
};

function drawPathAnimation(path,startNode,s,xOffset,yOffset,speed,board,setState,isRunning) {
    let hexsPerSecond = drawPathSpeed[speed];
    let pathUpdates = [];
    for (let node of path.slice(1,-1)) {
        if (!isSameNode(node,startNode)) pathUpdates.push(Object.assign({},board[[node.i,node.j]],{fill:'#b1fc40'}));
    }
    let lastTime = null;
    let currentStart = 0;
    let steps = 0;
    const totalHexs = pathUpdates.length;
    function updateAnimation(start,steps) {
        setState((prevState) => {
            let canvasUpdates = pathUpdates.slice(start,start+steps);
            let boardUpdates = {};
            for (let update of canvasUpdates) {
                Object.assign(boardUpdates,{[[update.node.i,update.node.j]]: update});
            }
            return {
                        board: Object.assign({},prevState.board,boardUpdates),
                        canvasUpdates: canvasUpdates,
                        updateID: prevState.updateID +1
            };
        });
    };
    function frame(time) {
        if (isRunning()) {
            if (lastTime != null) {
                steps = Math.floor(hexsPerSecond * (time - lastTime) / 1000);
                if (steps > 0) {
                    updateAnimation(currentStart,steps);
                    currentStart += steps;
                    lastTime = time;
                }
            } else {
                lastTime = time;
            }
            if (currentStart < totalHexs) {
                requestAnimationFrame(frame);
            } else {
                moveDownPathAnimation(path,s,xOffset,yOffset,speed,setState,isRunning);
            }
        }
    };
    requestAnimationFrame(frame);
};

function moveDownPathAnimation(path,s,xOffset,yOffset,speed,setState,isRunning) {
    let hexsPerSecond = moveDownPathSpeed[speed];
    const totalSteps = path.length - 1;
    const totalTime = totalSteps / hexsPerSecond * 1000;
    let startTime = null;
    let i = 0;
    function updateAnimation(time) {
        let [ prevStartNode , prevEndNode ] = [ path[i] , path[i+1] ];
        i = Math.floor((time - startTime) / totalTime * totalSteps);
        let pos, angle;
        if (i < totalSteps) {
            let [ startNode , endNode ] = [ path[i] , path[i+1] ];
            let [ startPos , endPos ] = [ calcHexCenter(startNode,s,xOffset,yOffset) , calcHexCenter(endNode,s,xOffset,yOffset) ]
            let V = vectorDiff(endPos,startPos);
            let v = scalarProd((time - startTime) / totalTime * totalSteps - i, V);
            pos = vectorSum(startPos, v);
            angle = vectorAngle(V);
        } else {
            let [ startNode , endNode ] = [ path[path.length-2] , path[path.length-1] ];
            let [ startPos , endPos ] = [ calcHexCenter(startNode,s,xOffset,yOffset) , calcHexCenter(endNode,s,xOffset,yOffset) ]
            let V = vectorDiff(endPos,startPos);
            pos = calcHexCenter(endPos);
            angle = vectorAngle(V);
        }
        setState((prevState) => {
            return {
                        canvasUpdates: [
                            Object.assign({}, prevState.board[[prevStartNode.i,prevStartNode.j]]),
                            Object.assign({},  prevState.board[[prevEndNode.i,prevEndNode.j]])
                        ],
                        startPosition: Object.assign({},{pos:pos,angle:angle}),
                        updateID: prevState.updateID +1
            };
        });
    };
    function frame(time) {
        if (isRunning()) {
            if (startTime != null) {
                updateAnimation(time);
            } else {
                startTime = time;
            }
            if ((time - startTime) < totalTime) {
                requestAnimationFrame(frame);
            } else {
                victoryAnimation(path[path.length-1],path[path.length-2],speed,s,xOffset,yOffset,setState,isRunning);
            }
        } else {
            let [ prevStartNode , prevEndNode ] = [ path[i] , path[i+1] ];
            setState((prevState) => {
                return {
                            canvasUpdates: [
                                Object.assign({}, prevState.board[[prevStartNode.i,prevStartNode.j]]),
                                Object.assign({},  prevState.board[[prevEndNode.i,prevEndNode.j]])
                            ],
                            startPosition: false,
                            updateID: prevState.updateID +1
                };
            });
        }
    };
    requestAnimationFrame(frame);
};

function victoryAnimation(targetNode,prevNode,speed,s,xOffset,yOffset,setState,isRunning) {
    const radiansPerSecond = victorySpeed[speed];
    const targetPos = calcHexCenter(targetNode,s,xOffset,yOffset);
    const startAngle = vectorAngle(nodeDistance(targetNode,prevNode,s,xOffset,yOffset));
    const totalTime = 6*Math.PI / radiansPerSecond * 1000;
    let startTime = null;
    function updateAnimation(time) {
        let angle;
        if ((time - startTime) < totalTime) {
            angle = startAngle + (time - startTime)/totalTime*6*Math.PI;
        } else {
            angle = startAngle + 6*Math.PI;
        }
        setState((prevState) => {
            return {
                        canvasUpdates: [ Object.assign({}, prevState.board[[targetNode.i,targetNode.j]]) ],
                        startPosition: Object.assign({},{pos:targetPos,angle:angle}),
                        updateID: prevState.updateID +1
            };
        });
    };
    function frame(time) {
        if (isRunning()) {
            if (startTime != null) {
                updateAnimation(time);
            } else {
                startTime = time;
            }
            if ((time - startTime) < totalTime) {
                requestAnimationFrame(frame);
            } else {
                setState((prevState) => ({
                    running: false,
                    updateID: prevState.updateID + 1,
                    canvasUpdates: [],
                    startPosition: false
                }));
            }
        } else {
            setState((prevState) => {
                return {
                            canvasUpdates: [ Object.assign({}, prevState.board[[targetNode.i,targetNode.j]]) ],
                            startPosition: false,
                            updateID: prevState.updateID +1
                };
            });
        }
    };
    requestAnimationFrame(frame);
};


//=================================================================================================================================//
// Maze-Drawing Animations //
//=================================================================================================================================//
function mazeAnimation(mazeID,state,setState,isRunning) {
    // clear board or fill it with required fill for maze
    if (mazeID === 0 || mazeID === 1 || mazeID === 9 || mazeID === 10) clearTheWay(state,setState);
    else if (mazeID === 7 || mazeID === 8) lightWeightBaby(state,setState);
    else doTheJohnWall(state,setState);
    // Set state to running so user can't interfere with pathFinder 
    setState((prevState) => ({
        running: true, 
        updateID: prevState.updateID + 1
    }));
    // Get path array of nodes to fill in for maze
    let mazeBuilder;
    switch (mazeID) {
        case 0: mazeBuilder = randomWalls; break;
        case 1: mazeBuilder = randomWeights; break;
        case 2: mazeBuilder = depthFirstMaze; break;
        case 3: mazeBuilder = breadthFirstMaze; break;
        case 4: mazeBuilder = huntAndKill; break;
        case 5: mazeBuilder = primsMaze; break;
        case 6: mazeBuilder = kruskalsMaze; break;
        case 7: mazeBuilder = randomDLA; break;
        case 8: mazeBuilder = wallDLA; break;
        case 9: mazeBuilder = cellularDungeon; break;
        case 10: mazeBuilder = simplexCaves; break;
        default: mazeBuilder = depthFirstMaze;
    };
    let mazePath = mazeBuilder(state.startNode,state.targetNode,state.xUnits,state.yUnits,state.board,state.s,state.xOffset,state.yOffset);
    // Set up parameters for animation
    let hexsPerSecond = drawMazeSpeed[state.speed];
    let lastTime = null;
    let currentStart = 0;
    let steps = 0;
    const totalHexs = mazePath.length;
    function updateAnimation(start,steps) {
        setState((prevState) => {
            let canvasUpdates = mazePath.slice(start,start+steps);
            let boardUpdates = {};
            for (let update of canvasUpdates) {
                Object.assign(boardUpdates,{[[update.node.i,update.node.j]]: update});
            }
            return {
                        board: Object.assign({},prevState.board,boardUpdates),
                        canvasUpdates: canvasUpdates,
                        updateID: prevState.updateID +1
            };
        });
    };
    function frame(time) {
        if (isRunning()) {
            if (lastTime != null) {
                steps = Math.floor(hexsPerSecond * (time - lastTime) / 1000);
                if (steps > 0) {
                    updateAnimation(currentStart,steps);
                    currentStart += steps;
                    lastTime = time;
                }
            } else {
                lastTime = time;
            }
            if (currentStart < totalHexs) {
                requestAnimationFrame(frame);
            } else {
                setState((prevState) => ({
                    running: false,
                    updateID: prevState.updateID + 1,
                    canvasUpdates: [],
                    startPosition: false
                }));
            }
        }
    };
    requestAnimationFrame(frame);
};

export {pathFinderAnimation, mazeAnimation};