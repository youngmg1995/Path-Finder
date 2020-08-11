import React from 'react';
import ControlPanel from './ControlPanel';
import Canvas from './Canvas';
import {onMouseDown, clearBoard, initializeCanvas} from '../utils/canvas-tools';
import {pathFinderAnimation} from '../utils/animations';

class PathFinder extends React.Component {
    constructor(props) {
        super(props);
        // Control Panel Height
        this.controlPanelHeight = 80;
        // Setting Up Canvas
        const { innerWidth: width, innerHeight: height } = window
        this.canvasHeight = height-this.controlPanelHeight-4;
        this.canvasWidth = width;
        this.canvasRef = React.createRef();
        const s = 15;
        let {board,startNode,targetNode,xUnits,yUnits,xOffset,yOffset,lineWidth} = initializeCanvas(this.canvasWidth,this.canvasHeight,s);
        // Setting Initial State
        this.state = {
            algorithm: 5,
            speed: 2,
            tool: 0,
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
        onMouseDown(downEvent,this.state,this.canvasRef,(stateUpdate) => this.setState(stateUpdate));
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
                initializeCanvas(this.canvasWidth,this.canvasHeight,s),
                {updateID: prevState.updateID + 1, canvasUpdates: [], s:s}
            );
        });
    }

    render() {
        return (
            <div className="PathFinder">
                <ControlPanel 
                    toggleSelected={(key,id) => this.toggleSelected(key,id)}
                    clearBoard={(id) => this.clearBoard(id)}
                    changeHexSize={(s) => this.changeHexSize(s)}
                    startSearch={() => this.startPathFinder()}
                    stopSearch={() => this.stopPathFinder()}
                />
                <Canvas
                    className="canvas"
                    canvasRef={this.canvasRef}
                    width={this.canvasWidth}
                    height={this.canvasHeight}
                    s={this.state.s}
                    lineWidth={this.state.lineWidth}
                    xOffset={this.state.xOffset}
                    yOffset={this.state.yOffset}
                    canvasUpdates={this.state.canvasUpdates}
                    updateID={this.state.updateID}
                    onMouseDown={(downEvent) => this.onMouseDown(downEvent)}
                    running={this.state.running}
                />
            </div>
        );
    }
}

export default PathFinder;