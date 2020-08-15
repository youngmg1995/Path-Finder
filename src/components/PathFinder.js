import React from 'react';
import ControlPanel from './ControlPanel';
import Canvas from './Canvas';
import {onMouseDown, onTouchStart, clearBoard, initializeCanvas} from '../utils/canvas-tools';
import {pathFinderAnimation} from '../utils/animations';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";

class PathFinder extends React.Component {
    constructor(props) {
        super(props);
        let { innerWidth: width, innerHeight: height } = window
        // Set Up Control Panel
        let showControls;
        if (width < 481 || height < 481) showControls = false;
        else showControls = true;
        // Setting Up Canvas
        let canvasHeight;
        if (width < 481 || height < 481)  {
            if ( width > height) canvasHeight = height*.85;
            else canvasHeight = height*.8;
        }
        else canvasHeight = height*.9-4;
        let canvasWidth = width;
        this.canvasRef = React.createRef();
        let s = 15;
        let {board,startNode,targetNode,xUnits,yUnits,xOffset,yOffset,lineWidth} = initializeCanvas(canvasWidth,canvasHeight,s);
        // Setting Initial State
        this.state = {
            showControls: showControls,
            algorithm: 5,
            speed: 2,
            tool: 0,
            canvasWidth: canvasWidth,
            canvasHeight: canvasHeight,
            s: s,
            lineWidth: lineWidth,
            board: board,
            startNode: startNode,
            targetNode: targetNode,
            xUnits: xUnits,
            yUnits: yUnits,
            xOffset: xOffset,
            yOffset: yOffset,
            running: false,
            canvasUpdates: [],
            updateID: 0
        }
    }

    toggleSelected(key,id) {
        if (key !== 'clear') {
            this.setState({
                [key]:id
            })
        } else {
            return;
        }
    }

    toggleControls() {
    this.setState((prevState) => ({showControls: !prevState.showControls}));
    }

    startPathFinder() {
        // Check to make sure not already running
        if (this.state.running) return;
        const setState = (stateUpdate) => this.setState(stateUpdate);
        const isRunning = () => {return this.state.running;};
        this.clearBoard(1);
        pathFinderAnimation(this.state,this.canvasRef,setState,isRunning);
    }

    stopPathFinder() {
        this.setState((prevState) => ({running:false, updateID:prevState.updateID+1}));
    }

    onMouseDown(downEvent) {
        downEvent.preventDefault();
        onMouseDown(downEvent,this.state,this.canvasRef,(stateUpdate) => this.setState(stateUpdate));
    }

    onTouchStart(startEvent) {
        onTouchStart(startEvent,this.state,this.canvasRef,(stateUpdate) => this.setState(stateUpdate));
    }

    clearBoard(id) {
        if (this.state.running) return;
        clearBoard(id,this.canvasRef,this.state,(stateUpdate) => this.setState(stateUpdate));
    }

    changeHexSize(s) {
        if (this.state.running) return;
        this.setState((prevState) => {
            return Object.assign(
                {}, 
                initializeCanvas(prevState.canvasWidth,prevState.canvasHeight,s),
                {updateID: prevState.updateID + 1, canvasUpdates: [], s:s}
            );
        });
    }

    render() {
        const algorithmMap = {
            0: "Depth-First Search",
            1: "Breadth-First Search",
            2: "Hill Climbing",
            3: "Beam Search (\u03C9=2)",
            4: "Best-First Search",
            5: "Branch & Bound",
            6: "A* Search"
        };
        return (
            <div className="PathFinder">
                <div className="Bars-Wrapper">
                    <FontAwesomeIcon className="bars" icon={faBars} onClick={(event) => this.toggleControls()}/>
                    <div className="Algorithm-Text">{algorithmMap[this.state.algorithm]}</div>
                </div>
                <ControlPanel
                    showControls={this.state.showControls}
                    running={this.state.running}
                    hexSize={this.state.s}
                    toggleSelected={(key,id) => this.toggleSelected(key,id)}
                    clearBoard={(id) => this.clearBoard(id)}
                    changeHexSize={(s) => this.changeHexSize(s)}
                    startSearch={() => this.startPathFinder()}
                    stopSearch={() => this.stopPathFinder()}
                />
                <Canvas
                    className="canvas"
                    canvasRef={this.canvasRef}
                    width={this.state.canvasWidth}
                    height={this.state.canvasHeight}
                    s={this.state.s}
                    lineWidth={this.state.lineWidth}
                    xOffset={this.state.xOffset}
                    yOffset={this.state.yOffset}
                    canvasUpdates={this.state.canvasUpdates}
                    updateID={this.state.updateID}
                    running={this.state.running}
                    onMouseDown={(downEvent) => this.onMouseDown(downEvent)}
                    onTouchStart={(startEvent) => this.onTouchStart(startEvent)}
                />
            </div>
        );
    }
}

export default PathFinder;