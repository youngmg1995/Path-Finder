import {depthFirst, breadthFirst, hillClimbing, beamSearch, bestFirst, branchNBound, aStarSearch} from './algorithms';

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
        default: pathFinder = breadthFirst;
    };
    //let startTime = performance.now();
    let [path, searchUpdates] = pathFinder(state.startNode,state.targetNode,state.xUnits,state.yUnits,state.board);
    //let endTime = performance.now();
    //console.log(`Algorithm Time = ${endTime - startTime}`);
    let hexsPerSecond;
    switch (state.speed) {
        case 0: hexsPerSecond = 10; break;
        case 1: hexsPerSecond = 100; break;
        case 2: hexsPerSecond = 1000; break;
        case 3: hexsPerSecond = 10000; break;
        case 4: hexsPerSecond = Infinity; break;
        default: hexsPerSecond = 1000;
    };
    searchAnimation(path,searchUpdates,hexsPerSecond,state.board,setState,isRunning);
};

function searchAnimation(path,searchUpdates,hexsPerSecond,board,setState,isRunning) {
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
                pathAnimation(path,Math.ceil(hexsPerSecond/6),board,setState,isRunning);
            }
        }
    };
    requestAnimationFrame(frame);
};

function pathAnimation(path,hexsPerSecond,board,setState,isRunning) {
    let pathUpdates = [];
    for (let node of path.slice(1,-1)) {
        pathUpdates.push(Object.assign({},board[[node.i,node.j]],{fill:'#b1fc40'}));
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
                setState((prevState) => ({
                    running: false,
                    updateID: prevState.updateID + 1,
                    canvasUpdates: []
                }));
            }
        }
    };
    requestAnimationFrame(frame);
};

export {pathFinderAnimation};