import React from 'react';
import Tutorial from './Tutorial';
import ControlPanel from './ControlPanel';
import Canvas from './Canvas';
import {onMouseDown, onTouchStart, clearBoard, initializeCanvas} from '../utils/canvas-tools';
import {pathFinderAnimation, mazeAnimation} from '../utils/animations';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";

class PathFinder extends React.Component {
    constructor(props) {
        super(props);
        let { innerWidth: width, innerHeight: height } = window
        // Set Up Control Panel
        let windowState = this.getWindowState();
        let showControls = {1:false,2:false,3:true}[windowState]
        // Setting Up Canvas
        let canvasHeight;
        if (windowState === 1) canvasHeight = height*.8;
        else if (windowState === 2) canvasHeight = height*.85;
        else canvasHeight = height*.9-4;
        let canvasWidth = width;
        this.canvasRef = React.createRef();
        let s = 15;
        let {board,startNode,targetNode,xUnits,yUnits,xOffset,yOffset,lineWidth} = initializeCanvas(canvasWidth,canvasHeight,s);
        // Setting Initial State
        this.state = {
            showTutorial: true,
            tutorialPage: 1,
            windowState: this.getWindowState(),
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
            startPosition: false,
            updateID: 0
        }
    }

    componentDidMount() {
        window.addEventListener('resize', (event) => this.handleResize());
    }

    handleResize() {
        let windowState = this.getWindowState();
        if (windowState !== this.state.windowState) {
            if ((windowState === 1 || windowState === 2) && (this.state.windowState === 3)) {
                this.setState({windowState:windowState, showControls:false});
            } else if ((windowState === 3) && (this.state.windowState === 1 || this.state.windowState === 2)) {
                this.setState({windowState:windowState, showControls:true});
            } else this.setState({windowState:windowState});
        }
    }

    getWindowState() {
        let { innerWidth: width, innerHeight: height } = window;
        if (width < 481 || height < 481)  {
            if ( width > height) return 2;
            else return 1;
        } else return 3;
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
        onMouseDown(downEvent,this.state,this.canvasRef,(stateUpdate) => this.setState(stateUpdate));
    }

    onTouchStart(startEvent) {
        // This isn't working in Chrome. Chrome automatically sets scroll event to passive which dissallows preventDefault
        // I could find a way to set event to active, so instead just disabling scroll for canvas in CSS.
        // This however is leading to a bug where scroll gets re-enabled after user uses pinch zoom. No soultion found yet. 
        startEvent.preventDefault();
        onTouchStart(startEvent,this.state,this.canvasRef,(stateUpdate) => this.setState(stateUpdate));
    }

    clearBoard(id) {
        if (this.state.running) return;
        clearBoard(id,this.canvasRef,this.state,(stateUpdate) => this.setState(stateUpdate));
    }

    changeHexSize(s) {
        if (this.state.running || s === this.state.s) return;
        this.setState((prevState) => {
            // check that s is not too large
            let hexSize;
            if (prevState.canvasWidth < prevState.canvasHeight) {
                if (prevState.canvasWidth > 1.5*Math.sqrt(3)*s && prevState.canvasHeight > 3.5*s) hexSize = s;
                else hexSize = Math.min(prevState.canvasWidth/(1.5*Math.sqrt(3)),prevState.canvasHeight/(3.5));
            } else {
                if (prevState.canvasWidth > 2*Math.sqrt(3)*s && prevState.canvasHeight > 2*s) hexSize = s;
                else hexSize = Math.min(prevState.canvasWidth/(2*Math.sqrt(3)),prevState.canvasHeight/(2));
            }
            return Object.assign(
                {}, 
                initializeCanvas(prevState.canvasWidth,prevState.canvasHeight,hexSize),
                {updateID: prevState.updateID + 1, canvasUpdates: [], s:hexSize}
            );
        });
    }

    drawMaze(id) {
        if (this.state.running) return;
        const setState = (stateUpdate) => this.setState(stateUpdate);
        const isRunning = () => {return this.state.running;};
        mazeAnimation(id,this.state,setState,isRunning);
    }

    toggleTutorial() {
        this.setState((prevState) => {
            return {
                showTutorial: !prevState.showTutorial,
                tutorialPage: 1
            };
        });
    }

    changePage(direction) {
        this.setState((prevState) => {
            if ((direction === -1 && prevState.tutorialPage === 1) || (direction === 1 && prevState.tutorialPage === 5)) {
                return {};
            } else {
                return {tutorialPage: prevState.tutorialPage + direction};
            }
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
            6: "A* Search",
            7: "Random Walk"
        };
        return (
            <div className="PathFinder">
                {this.state.showTutorial &&
                    <Tutorial className="Tutorial"
                        tutorialPage={this.state.tutorialPage}
                        toggleTutorial={(event) => this.toggleTutorial()}
                        changePage={(direction) => this.changePage(direction)}
                    />
                }
                <div className="Bars-Wrapper">
                    <FontAwesomeIcon className="bars" icon={faBars} onClick={(event) => this.toggleControls()}/>
                    <div className="Algorithm-Text">{algorithmMap[this.state.algorithm]}</div>
                </div>
                <ControlPanel
                    windowState={this.state.windowState}
                    showControls={this.state.showControls}
                    running={this.state.running}
                    hexSize={this.state.s}
                    toggleSelected={(key,id) => this.toggleSelected(key,id)}
                    clearBoard={(id) => this.clearBoard(id)}
                    changeHexSize={(s) => this.changeHexSize(s)}
                    drawMaze={(id) => this.drawMaze(id)}
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
                    startPosition={this.state.startPosition}
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