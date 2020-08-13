import React from 'react';
import {initializeBoard, drawWeight, drawStart, drawTarget, drawNode} from '../utils/canvas-tools';

/*
// To Do //
//========================================================================================//
-- Make new drawWeight function that takes node as imput instead of pos

//========================================================================================//
*/


class Canvas extends React.Component {
    componentDidMount() {
        let [board] = initializeBoard(this.props.width, this.props.height, this.props.s);
        for (let key in board) {
            let {node, fill, object, angle} = board[key];
            this.updateNode(node, fill, object, angle);
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.updateID === this.props.updateID) return false;
        else return true;
    }

    componentDidUpdate(prevProps) {
        if (this.props.s !== prevProps.s) {
            let canvas = this.props.canvasRef.current;
            let cx = canvas.getContext('2d');
            cx.clearRect(0,0,this.props.width,this.props.height);
            this.componentDidMount();
        } else {
            for (let key in this.props.canvasUpdates) {
                let {node, fill, object, angle} = this.props.canvasUpdates[key];
                this.updateNode(node, fill, object, angle);
            }
        }
    }

    updateNode(node,fill,object,angle) {
        if (fill) {
            // need to fill white first if color = '#b7ff4ae8' since it is transparent
            drawNode(node, this.props.s, this.props.lineWidth, this.props.xOffset, this.props.yOffset, fill, this.props.canvasRef);
        }
        if (object) {
            if (object === 'weight') {
                drawWeight(node, this.props.s, this.props.lineWidth, this.props.xOffset, this.props.yOffset, this.props.canvasRef);
            } else if (object === 'start') {
                //console.log(angle);
                drawStart(node, this.props.s, this.props.xOffset, this.props.yOffset, this.props.canvasRef,angle);
            } else if (object === 'target') {
                drawTarget(node, this.props.s, this.props.lineWidth, this.props.xOffset, this.props.yOffset, this.props.canvasRef);
            }
        }
    }

    render() {
        return (
            <canvas
                ref = {this.props.canvasRef}
                width = {this.props.width}
                height = {this.props.height}
                onMouseDown={this.props.running ? null : (downEvent) => this.props.onMouseDown(downEvent)}
                onTouchStart={this.props.running ? null : (startEvent) => this.props.onTouchStart(startEvent)}
            />
        );
    }
}

export default Canvas;