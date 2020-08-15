import React from 'react';
import Dropdown from './Dropdown';
import SliderDropdown from './SliderDropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay , faPause } from "@fortawesome/free-solid-svg-icons";

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            algorithm: [
                        {id:0, title:'Depth-First Search', selected:false, key:'algorithm'},
                        {id:1, title:'Breadth-First Search', selected:false, key:'algorithm'},
                        {id:2, title:'Hill Climbing', selected:false, key:'algorithm'},
                        {id:3, title:'Beam Search (\u03C9=2)', selected:false, key:'algorithm'},
                        {id:4, title:'Best-First Search', selected:false, key:'algorithm'},
                        {id:5, title:'Branch & Bound', selected:true, key:'algorithm'},
                        {id:6, title:'A* Search', selected:false, key:'algorithm'}
            ],
            speed: [
                        {id:0, title:'Slow', selected:false, key:'speed'},
                        {id:1, title:'Medium', selected:false, key:'speed'},
                        {id:2, title:'Fast', selected:true, key:'speed'},
                        {id:3, title:'Ludicrous', selected:false, key:'speed'},
                        {id:4, title:'Instant', selected:false, key:'speed'}
            ],
            tool: [
                        {id:0, title:'Walls', selected:true, key:'tool'},
                        {id:1, title:'Weights', selected:false, key:'tool'},
                        {id:2, title:'Eraser', selected:false, key:'tool'}
            ],
            clear: [
                        {id:1, title:'Path', selected:false, key:'clear'},
                        {id:2, title:'Walls', selected:false, key:'clear'},
                        {id:3, title:'Weights', selected:false, key:'clear'},
                        {id:0, title:'Board', selected:false, key:'clear'},
                        {id:4, title:'Canvas', selected:false, key:'clear'}
            ]
        }
    }

    toggleSelected(id,key,title) {
        if (key !== 'clear') {
            let temp = this.state[key].slice();
            for (let i = 0; i < temp.length; i++) {
                temp[i].selected = (id === temp[i].id);
            }
            this.setState({
                [key]:temp
            });
        }
        this.props.toggleSelected(key,id);
    }

    render() {
        return (
            <div className="ControlPanel">
                {this.props.showControls &&
                    <div className="Controls-Wrapper-Background">
                        <div className="Controls-Wrapper">
                            <div className="ControlPanel-column">
                                <Dropdown className="Algorithm-Dropdown"
                                    title={'Algorithm'} 
                                    options={this.state.algorithm}
                                    callBack = {(id,key,title) => this.toggleSelected(id,key,title)}
                                    disableOnClickOutside={(window.innerWidth < 481 || window.innerHeight < 481) && ( window.innerWidth < window.innerHeight)}
                                />
                            </div>
                            <div className="ControlPanel-column"> 
                                <Dropdown className="Speed-Dropdown"
                                    title={'Speed'} 
                                    options={this.state.speed}
                                    callBack = {(id,key,title) => this.toggleSelected(id,key,title)}
                                    disableOnClickOutside={(window.innerWidth < 481 || window.innerHeight < 481) && ( window.innerWidth < window.innerHeight)}
                                />
                            </div>
                            <div className="ControlPanel-column">
                                <Dropdown className="Tool-Dropdown"
                                    title={'Tool'} 
                                    options={this.state.tool}
                                    callBack = {(id,key,title) => this.toggleSelected(id,key,title)}
                                    disableOnClickOutside={(window.innerWidth < 481 || window.innerHeight < 481) && ( window.innerWidth < window.innerHeight)}
                                />
                            </div>
                            <div className="ControlPanel-column">
                                <SliderDropdown className="Hex-Size-Dropdown"
                                    title={'Hex Size'}
                                    hexSize={this.props.hexSize}
                                    callBack = {(s) => this.props.changeHexSize(s)}
                                    disableOnClickOutside={(window.innerWidth < 481 || window.innerHeight < 481) && ( window.innerWidth < window.innerHeight)}
                                />
                            </div>
                            <div className="ControlPanel-column">
                                <Dropdown className="Clear-Dropdown"
                                    title={'Clear'} 
                                    options={this.state.clear}
                                    callBack = {(id,key,title) => this.props.clearBoard(id)}
                                    disableOnClickOutside={(window.innerWidth < 481 || window.innerHeight < 481) && ( window.innerWidth < window.innerHeight)}
                                />
                            </div>
                        </div>
                    </div>
                }
                <div className="Play-Button-Wrapper">
                    <div className="Play-Button" onClick={this.props.running
                        ? (clickEvent) => this.props.stopSearch()
                        : (clickEvent) => this.props.startSearch()
                    }>
                        {this.props.running
                            ? <FontAwesomeIcon className="pause" icon={faPause}/>
                            : <FontAwesomeIcon className="play" icon={faPlay}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ControlPanel;