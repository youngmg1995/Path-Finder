import {isSameNode, nodeOnBoard, findNeighbors, dotProduct, vectorOrthoMag} from './utils';

//=====================================================================================//
// Canvas Mouse and Touch Trackers for Drawing and Manipulating Board //
//=====================================================================================//
function onMouseDown(downEvent,state,canvasRef,setState) {
    if (downEvent.button !== 0) return;
    let canvas = canvasRef.current;
    let node = getPointerNode(downEvent,canvas,state.s,state.xOffset,state.yOffset);
    let origNode = node;
    let onMove, onMoveType;
    if (isSameNode(node,state.startNode)) {
        onMove = (oldNode,newNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState) =>
        moveStart(oldNode,newNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState);
        onMoveType = 1;
    } else if (isSameNode(node,state.targetNode)) {
        onMove = (oldNode,newNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState) => 
        moveTarget(oldNode,newNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState);
        onMoveType = 2;
    } else {
        drawLine(node,node,state.s,state.lineWidth,state.xOffset,state.yOffset,canvasRef,state,
            (stateUpdate) => setState(stateUpdate),state.xUnits,state.yUnits);
        onMove = (startNode,endNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState,xUnits,yUnits) => 
        drawLine(startNode,endNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState,xUnits,yUnits);
        onMoveType = 0;
    }
    let move = (moveEvent) => {
        if (moveEvent.buttons === 0) {
            canvas.removeEventListener("mousemove", move);
            let board = {};
            if (onMoveType === 1) {
                let oldStart = {[[origNode.i,origNode.j]]: {node:origNode,type:'empty',fill:'white',object:null}};
                let newStart = {[[node.i,node.j]]: {node:node,type:'start',fill:'white',object:'start'}};
                Object.assign(board, state.board, oldStart, newStart);
                setState({board:board});
            } else if (onMoveType === 2) {
                let oldTarget = {[[origNode.i,origNode.j]]: {node:origNode,type:'empty',fill:'white',object:null}};
                let newTarget = {[[node.i,node.j]]: {node:node,type:'target',fill:'white',object:'target'}};
                Object.assign(board, state.board, oldTarget, newTarget);
                setState({board:board});
            }
        } else {
            let newNode = getPointerNode(moveEvent,canvas,state.s,state.xOffset,state.yOffset);
            if (isSameNode(newNode,node)) return;
            if ( 
                    (onMoveType !== 0 && !nodeOnBoard(newNode,state.xUnits,state.yUnits))
                ||  (onMoveType === 1 && isSameNode(newNode,state.targetNode))
                ||  (onMoveType === 2 && isSameNode(newNode,state.startNode))
            ) return;
            onMove(node,newNode,state.s,state.lineWidth,state.xOffset,state.yOffset,canvasRef,state,
                (stateUpdate) => setState(stateUpdate),state.xUnits,state.yUnits);
            node = newNode;
        }
    };
    canvas.addEventListener("mousemove", move);
};


function onTouchStart(startEvent,state,canvasRef,setState) {
    // scrolling prevented using CSS instead because I could not find a way to make event listener active
    // startEvent.preventDefault();
    let canvas = canvasRef.current;
    let node = getPointerNode(startEvent.touches[0],canvas,state.s,state.xOffset,state.yOffset);
    let origNode = node;
    let onMove, onMoveType;
    if (isSameNode(node,state.startNode)) {
        onMove = (oldNode,newNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState) =>
        moveStart(oldNode,newNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState);
        onMoveType = 1;
    } else if (isSameNode(node,state.targetNode)) {
        onMove = (oldNode,newNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState) => 
        moveTarget(oldNode,newNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState);
        onMoveType = 2;
    } else {
        drawLine(node,node,state.s,state.lineWidth,state.xOffset,state.yOffset,canvasRef,state,
            (stateUpdate) => setState(stateUpdate),state.xUnits,state.yUnits);
        onMove = (startNode,endNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState,xUnits,yUnits) => 
        drawLine(startNode,endNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState,xUnits,yUnits);
        onMoveType = 0;
    }
    let move = (moveEvent) => {
        let newNode = getPointerNode(moveEvent.touches[0],canvas,state.s,state.xOffset,state.yOffset);
        if (isSameNode(newNode,node)) return;
        if ( 
                (onMoveType !== 0 && !nodeOnBoard(newNode,state.xUnits,state.yUnits))
            ||  (onMoveType === 1 && isSameNode(newNode,state.targetNode))
            ||  (onMoveType === 2 && isSameNode(newNode,state.startNode))
        ) return;
        onMove(node,newNode,state.s,state.lineWidth,state.xOffset,state.yOffset,canvasRef,state,
            (stateUpdate) => setState(stateUpdate),state.xUnits,state.yUnits);
        node = newNode;
    };
    let end = (endEvent) => {
        canvas.removeEventListener("touchmove", move);
        canvas.removeEventListener("touchend", end);
        let board = {};
        if (onMoveType === 1) {
            let oldStart = {[[origNode.i,origNode.j]]: {node:origNode,type:'empty',fill:'white',object:null}};
            let newStart = {[[node.i,node.j]]: {node:node,type:'start',fill:'white',object:'start'}};
            Object.assign(board, state.board, oldStart, newStart);
            setState({board:board});
        } else if (onMoveType === 2) {
            let oldTarget = {[[origNode.i,origNode.j]]: {node:origNode,type:'empty',fill:'white',object:null}};
            let newTarget = {[[node.i,node.j]]: {node:node,type:'target',fill:'white',object:'target'}};
            Object.assign(board, state.board, oldTarget, newTarget);
            setState({board:board});
        }
    }
    canvas.addEventListener("touchmove", move);
    canvas.addEventListener("touchend", end);
};

//=====================================================================================//
// Canvas Tools //
//=====================================================================================//
function drawLine(startNode,endNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState,xUnits,yUnits) {
    // Setting start of path
    let currentNode = startNode;
    let V = nodeDistance(endNode,startNode,s,xOffset,yOffset);
    // Fill start if not off board and not start/target node
    let canvasUpdates = {};
    if (nodeOnBoard(currentNode,xUnits,yUnits) &&  !isSameNode(currentNode,state.startNode) &&  !isSameNode(currentNode,state.targetNode)
    ) {
        // might be a problem that currentNode changes over time
        if (state.tool === 0) {
            Object.assign(canvasUpdates, {[[currentNode.i,currentNode.j]]: {node:currentNode,type:'wall',fill:'#282c34',object:null}});
        } else if (state.tool === 1) {
            Object.assign(canvasUpdates, {[[currentNode.i,currentNode.j]]: {node:currentNode,type:'weight',fill:'white',object:'weight'}});
        } else if (state.tool === 2) {
            Object.assign(canvasUpdates, {[[currentNode.i,currentNode.j]]: {node:currentNode,type:'empty',fill:'white',object:null}});
        }
    }
    // Looping over path
    while (!isSameNode(currentNode,endNode)) {
        // Reset minDis
        let minDis = Infinity;
        // Find next hex to move to by looping over adjacent hexs
        let neighbors = findNeighbors(currentNode);
        let tempNode = Object.assign({},currentNode);
        for (let neighbor of neighbors) {
            let v = nodeDistance(neighbor,tempNode,s,xOffset,yOffset);
            let dotProd = dotProduct(v,V);
            if (dotProd >= 0) {
                v = nodeDistance(neighbor,startNode,s,xOffset,yOffset);
                let currentDis = vectorOrthoMag(v,V);
                if (currentDis < minDis) {
                    currentNode = neighbor;
                    minDis = currentDis;
                }
            }
        }
        // If next hex off board then end path
        if (!nodeOnBoard(currentNode,xUnits,yUnits)) break;
        // Fill next hex unless it is start or target node
        else if (!isSameNode(currentNode,state.startNode) && !isSameNode(currentNode,state.targetNode)) {
            // might be a problem that currentNode changes over time
            if (state.tool === 0) {
                Object.assign(canvasUpdates, {[[currentNode.i,currentNode.j]]: {node:currentNode,type:'wall',fill:'#282c34',object:null}});
            } else if (state.tool === 1) {
                Object.assign(canvasUpdates, {[[currentNode.i,currentNode.j]]: {node:currentNode,type:'weight',fill:'white',object:'weight'}});
            } else if (state.tool === 2) {
                Object.assign(canvasUpdates, {[[currentNode.i,currentNode.j]]: {node:currentNode,type:'empty',fill:'white',object:null}});
            }
        }
    }
    // Update state
    setState((prevState) => {
        return {
                    board: Object.assign({},prevState.board,canvasUpdates),
                    updateID: prevState.updateID + 1,
                    canvasUpdates: canvasUpdates
        }
    });
};

function moveStart(oldNode,newNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState) {
    let angle = 0;
    if (state.xUnits > state.yUnits) angle = -Math.PI/2;
    let canvasUpdates = {[[newNode.i,newNode.j]]: {node:newNode,type:'start',fill:'white',object:'start',angle:angle}};             
    const oldState = Object.assign({}, state.board[[oldNode.i,oldNode.j]]);
    if (oldState.type === 'start') {
        Object.assign(canvasUpdates, {[[oldNode.i,oldNode.j]]: {node:oldNode,type:'empty',fill:'white',object:null}});
    } else {
        Object.assign(canvasUpdates, {[[oldNode.i,oldNode.j]]: oldState});
    }
    setState((prevState) => {
        return {
                    startNode: newNode,
                    updateID: prevState.updateID + 1,
                    canvasUpdates: canvasUpdates
        }
    });
};

function moveTarget(oldNode,newNode,s,lineWidth,xOffset,yOffset,canvasRef,state,setState) {
    let canvasUpdates = {[[newNode.i,newNode.j]]: {node:newNode,type:'target',fill:'white',object:'target'}};             
    const oldState = Object.assign({}, state.board[[oldNode.i,oldNode.j]]);
    if (oldState.type === 'target') {
        Object.assign(canvasUpdates, {[[oldNode.i,oldNode.j]]: {node:oldNode,type:'empty',fill:'white',object:null}});
    } else {
        Object.assign(canvasUpdates, {[[oldNode.i,oldNode.j]]: oldState});
    }
    setState((prevState) => {
        return {
                    targetNode: newNode,
                    updateID: prevState.updateID + 1,
                    canvasUpdates: canvasUpdates
        }
    });
};

function clearBoard(id,canvasRef,state,setState) {
    if (id === 0) {
        let canvas = canvasRef.current;
        let cx = canvas.getContext('2d');
        cx.clearRect(0,0,canvas.width,canvas.height);
        let [board, startNode, targetNode] = initializeBoard(canvas.width, canvas.height, state.s);
        setState((prevState) => {
            return {
                        board: board, 
                        startNode: startNode, 
                        targetNode: targetNode, 
                        canvasUpdates: board,
                        updateID: prevState.updateID + 1
            };
        });
    } else if (id === 4) {
        let canvas = canvasRef.current;
        let cx = canvas.getContext('2d');
        cx.clearRect(0,0,canvas.width,canvas.height);
        let { innerWidth: width, innerHeight: height } = window
        let canvasHeight;
        if (width < 481 || height < 481)  {
            if ( width > height) canvasHeight = height*.85;
            else canvasHeight = height*.8;
        }
        else canvasHeight = height*.9-4;
        let canvasWidth = width;
        let {board,startNode,targetNode,xUnits,yUnits,xOffset,yOffset} = initializeCanvas(canvasWidth,canvasHeight,state.s);
        // Setting Initial State
        setState((prevState) => {
            return {
                canvasWidth: canvasWidth,
                canvasHeight: canvasHeight,
                board: board,
                startNode: startNode,
                targetNode: targetNode,
                xUnits: xUnits,
                yUnits: yUnits,
                xOffset: xOffset,
                yOffset: yOffset,
                canvasUpdates: board,
                updateID: prevState.updateID + 1
            };
        });
    } else {
        let canvasUpdates = {};
        if (id === 1) {
            for (let key in state.board) {
                let currentState = state.board[key];
                if (!['white','#282c34'].includes(currentState.fill)) {
                    let node = parseKey(key);
                    let newState = Object.assign({},currentState,{fill:'white'});
                    Object.assign(canvasUpdates, {[[node.i,node.j]]: newState});
                }
            }
            Object.assign(canvasUpdates, {[[state.targetNode.i,state.targetNode.j]]: state.board[[state.targetNode.i,state.targetNode.j]]});
        } else if (id === 2) {
            for (let key in state.board) {
                let currentState = state.board[key];
                if (currentState.type === 'wall') {
                    let node = parseKey(key);
                    let newState = Object.assign({},currentState,{type:'empty',fill:'white',object:null});
                    Object.assign(canvasUpdates, {[[node.i,node.j]]: newState});
                }
            }
        } else if (id === 3) {
            for (let key in state.board) {
                let currentState = state.board[key];
                if (currentState.type === 'weight') {
                    let node = parseKey(key);
                    let newState = Object.assign({},currentState,{type:'empty',fill:'white',object:null});
                    Object.assign(canvasUpdates, {[[node.i,node.j]]: newState});
                }
            }
        }
        setState((prevState) => {
            return {
                        board: Object.assign({},prevState.board,canvasUpdates), 
                        canvasUpdates: canvasUpdates,
                        updateID: prevState.updateID + 1
            };
        });
    }
};

//=====================================================================================//
// Basic Drawing Functions //
//=====================================================================================//
function drawSearch(node,s,lineWidth,xOffset,yOffset,canvasRef,board,color) {
    let pos = calcHexCenter(node,s,xOffset,yOffset);
    let state = board[[node.i,node.j]];
    sleep(0).then(() => {
        if (state === 'weight') {
            drawWeight(pos,s,lineWidth,canvasRef,color);
        } else {
            fillHex(pos,s,color,canvasRef);
            drawHex(pos,s,lineWidth,canvasRef)
        }
    });
};

function drawWeight(node,s,lineWidth,xOffset,yOffset,canvasRef){
    let pos = calcHexCenter(node,s,xOffset,yOffset);
    let sideLength = s*.9;
    let h = sideLength;
    let w1 = sideLength;
    let w2 = 1.5*sideLength;
    let rw = sideLength*.18;
    let r1 = sideLength*.33;
    let canvas = canvasRef.current;
    let cx = canvas.getContext('2d');
    // draw trapezoid
    let path = [
                    {x:w1/2  , y:-h/2},
                    {x:-w1/2 , y:-h/2},
                    {x:-w2/2 , y:h/2},
                    {x:w2/2  , y:h/2}
    ]
    cx.beginPath();
    cx.fillStyle = 'black';
    cx.moveTo(pos.x + path[0].x, pos.y + path[0].y);
    for (let i = 1; i < path.length; i++) {
        cx.lineTo(pos.x + path[i].x, pos.y + path[i].y);
    }
    cx.closePath();
    cx.fill();
    // draw ring
    cx.beginPath();
    let ringCenter = {x:pos.x, y:pos.y - h/2};
    cx.lineWidth = rw;
    cx.arc(ringCenter.x, ringCenter.y, r1, 0, 7);
    cx.stroke();
};

function drawStart(startNode,s,xOffset,yOffset,canvasRef,angle) {
    let canvas = canvasRef.current;
    let cx = canvas.getContext('2d');
    const r = .85;
    const a = s*Math.sqrt(3)*r/2;
    const b = a/1.3;
    const c = a/2.6;
    let path = [
                { x:a    ,  y:0},
                { x:-2*c ,  y:b},
                { x:-c   ,  y:0},
                { x:-2*c ,  y:-b}
    ];
    if (angle) {
        for (let i=0; i<path.length; i++) {
            let oldPos = path[i];
            let newPos = {
                x: oldPos.x*Math.cos(angle) - oldPos.y*Math.sin(angle),
                y: oldPos.x*Math.sin(angle) + oldPos.y*Math.cos(angle)
            }
            path[i] = newPos;
        }
    }
    let pos = calcHexCenter(startNode,s,xOffset,yOffset);
    cx.fillStyle = 'black';
    cx.beginPath();
    cx.moveTo(pos.x + path[0].x, pos.y + path[0].y);
    for (let i=1; i<path.length; i++) {
        cx.lineTo(pos.x + path[i].x, pos.y + path[i].y);
    }
    cx.closePath();
    cx.fill();
};

function drawStartPos(pos,s,canvasRef,angle) {
    let canvas = canvasRef.current;
    let cx = canvas.getContext('2d');
    const r = .85;
    const a = s*Math.sqrt(3)*r/2;
    const b = a/1.3;
    const c = a/2.6;
    let path = [
                { x:a    ,  y:0},
                { x:-2*c ,  y:b},
                { x:-c   ,  y:0},
                { x:-2*c ,  y:-b}
    ];
    if (angle) {
        for (let i=0; i<path.length; i++) {
            let oldPos = path[i];
            let newPos = {
                x: oldPos.x*Math.cos(angle) - oldPos.y*Math.sin(angle),
                y: oldPos.x*Math.sin(angle) + oldPos.y*Math.cos(angle)
            }
            path[i] = newPos;
        }
    }
    cx.fillStyle = 'black';
    cx.beginPath();
    cx.moveTo(pos.x + path[0].x, pos.y + path[0].y);
    for (let i=1; i<path.length; i++) {
        cx.lineTo(pos.x + path[i].x, pos.y + path[i].y);
    }
    cx.closePath();
    cx.fill();
};

function drawTarget(targetNode,s,lineWidth,xOffset,yOffset,canvasRef) {
    const sideLength = s;
    let pos = calcHexCenter(targetNode,s,xOffset,yOffset);
    // Outer Ring
    fillHex(pos,sideLength,'#b22222',canvasRef);
    // White Fill
    fillHex(pos,sideLength*2/3 - lineWidth/2,'white',canvasRef);
    // Inner Ring
    fillHex(pos,sideLength/3,'#b22222',canvasRef);
    // Remake Border
    drawHex(pos,sideLength,lineWidth,canvasRef);
};

function drawNode(node,s,lineWidth,xOffset,yOffset,color,canvasRef) {
    let pos = calcHexCenter(node,s,xOffset,yOffset);
    fillHex(pos,s,color,canvasRef);
    drawHex(pos,s,lineWidth,canvasRef);
};


//=====================================================================================//
// Helper Functions //
//=====================================================================================//

// Helpers for Canvas Tools//
//========================================//
function drawHex(pos,s,lineWidth,canvasRef) {
    let canvas = canvasRef.current;
    let cx = canvas.getContext('2d');
    let path = calcHexPath(pos,s);
    cx.lineWidth = lineWidth;
    cx.beginPath();
    cx.moveTo(path[0].x,path[0].y);
    for (let i=1; i<path.length; i++) {
        cx.lineTo(path[i].x,path[i].y);
    }
    cx.closePath();
    cx.stroke();
};

function fillHex(pos,s,color,canvasRef) {
    let canvas = canvasRef.current;
    let cx = canvas.getContext('2d');
    cx.fillStyle = color;
    let path = calcHexPath(pos,s);
    cx.beginPath();
    cx.moveTo(path[0].x, path[0].y);
    for (let i=1; i<path.length; i++) {
        cx.lineTo(path[i].x,path[i].y);
    }
    cx.closePath();
    cx.fill();
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function getPointerNode(event,domNode,s,xOffset,yOffset) {
    let rect = domNode.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return nearestHex({x:x,y:y},s,xOffset,yOffset);
};

// Functions That Peform Grid Calculations//
//========================================//
function calcHexCenter(node,s,xOffset,yOffset) {
    const x = xOffset + (node.j + 1 - ((node.i+1)%2)/2)*s*Math.sqrt(3);
    const y = yOffset + (1.5*node.i + 1)*s
    return {x:x, y:y};
};

function nodeDistance(node1,node2,s,xOffset,yOffset) {
    let pos1 = calcHexCenter(node1,s,xOffset,yOffset);
    let pos2 = calcHexCenter(node2,s,xOffset,yOffset);
    return {x:(pos1.x - pos2.x) , y:(pos1.y - pos2.y)};
};

function nearestHex(pos,s,xOffset,yOffset) {
    const J = Math.floor((pos.x - xOffset)/(s*Math.sqrt(3)));
    const I = Math.floor((pos.y - yOffset)/(1.5*s));
    const u = (pos.x - xOffset)/(s*Math.sqrt(3)) - J;
    const v = 1 - ((pos.y - yOffset)/(1.5*s) - I);
    let i, j;
    if (I%2 === 0) {
        if (u < .5) {
            if (v > (2/3*u + 2/3)) {
                [ i , j ] = [ I-1 , J-1 ];
            } else {
                [ i , j ] = [ I , J ];
            }
        } else {
            if (v > (-2/3*u + 4/3)) {
                [ i , j ] = [ I-1 , J ];
            } else {
                [ i , j ] = [ I , J ];
            }
        }
    } else {
        if (u < .5) {
            if (v > (-2/3*u + 1)) {
                [ i , j ] = [ I-1 , J ];
            } else {
                [ i , j ] = [ I , J-1 ];
            }
        } else {
            if (v > (2/3*u + 1/3)) {
                [ i , j ] = [ I-1 , J ];
            } else {
                [ i , j ] = [ I , J ];
            }
        }
    }
    return {i:i,j:j};
};

function calcHexPath(pos, s) {
    let path = [];
    for (let theta = Math.PI/6; theta < 2*Math.PI; theta += Math.PI/3) {
        const x = pos.x + s*Math.cos(theta);
        const y = pos.y + s*Math.sin(theta);
        path.push({x:x, y:y});
    }
    return path;
};

function calcUnits(canvasWidth, canvasHeight, s) {
    const xUnits = Math.floor(canvasHeight/(1.5*s) - .5);
    const yUnits = Math.floor(canvasWidth/(s*Math.sqrt(3)) - .5);
    const xOffset = (canvasWidth - (yUnits + .5)*s*Math.sqrt(3))/2;
    const yOffset = (canvasHeight - (xUnits*1.5 + .5)*s)/2;
    return [xUnits,yUnits,xOffset,yOffset];
};

function initializeBoard(canvasWidth, canvasHeight, s) {   
    let [xUnits,yUnits] = calcUnits(canvasWidth, canvasHeight, s);
    let board = {};
    for (let i = 0; i < xUnits; i++) {
        for (let j = 0; j < yUnits; j++) {
            Object.assign(board, {[[i,j]]: {node:{i:i,j:j}, type:'empty', fill:'white', object:null}})
        }
    }
    let startNode, targetNode, offset;
    if (xUnits > yUnits) {
        offset = Math.floor(xUnits*.25);
        startNode = {i: xUnits-1-offset, j: Math.floor(yUnits/2)};
        targetNode = {i: offset, j: Math.floor(yUnits/2)};
    } else {
        offset = Math.floor(yUnits*.25);
        startNode = {i: Math.floor(xUnits/2), j: offset};
        targetNode = {i: Math.floor(xUnits/2), j: yUnits-1-offset};
    }
    let angle = 0;
    if (xUnits > yUnits) angle = -Math.PI/2;
    Object.assign(board[[startNode.i,startNode.j]], {type: 'start', object:'start', angle:angle});
    Object.assign(board[[targetNode.i,targetNode.j]], {type: 'target', object:'target'});
    return [board, startNode, targetNode];
};

function initializeCanvas(canvasWidth,canvasHeight,s) {
    let [xUnits,yUnits,xOffset,yOffset] = calcUnits(canvasWidth, canvasHeight, s);
    let [board, startNode, targetNode] = initializeBoard(canvasWidth, canvasHeight, s);
    let lineWidth = s/10;
    return {board,startNode,targetNode,xUnits,yUnits,xOffset,yOffset,lineWidth};
}

function parseKey(key) {
    let [i,j] = key.split(',').map((item) => parseInt(item));
    return {i:i,j:j};
};

//=====================================================================================//
// Exports //
//=====================================================================================//
export {getPointerNode, onMouseDown, onTouchStart}
export {drawSearch, drawLine, moveStart, moveTarget, clearBoard}
export {drawWeight, drawStart, drawStartPos, drawTarget, drawNode, drawHex, fillHex};
export {sleep, calcHexCenter, nodeDistance, nearestHex, calcHexPath, calcUnits, initializeBoard, initializeCanvas, parseKey};