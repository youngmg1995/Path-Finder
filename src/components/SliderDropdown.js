import React from 'react';
import onClickOutside from 'react-onclickoutside';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp , faAngleDown} from "@fortawesome/free-solid-svg-icons";

class SliderDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOpen: false,
            headerTitle: this.props.title,
            value: this.props.hexSize
        }
    }

    handleClickOutside() {
        if (this.props.windowState === 1) return;
        this.setState({
            listOpen: false
        });
    }

    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    }

    changeValue(event) {
        this.setState({value:event.target.value});
    }

    submitValue(event) {
        this.props.callBack(event.target.value);
    }

    escapeList(event) {
        if (this.state.listOpen && event.key === 'Escape') this.toggleList();
    }

    componentDidMount() {
        document.addEventListener('keydown',(event) => this.escapeList(event));
    }

    render() {
        let backgroundColor, fontColor;
        if (window.innerWidth < 481 || window.innerHeight < 481) {
            if (this.state.listOpen) [ backgroundColor , fontColor ] = ['#27af62' , 'white' ];
            else [ backgroundColor , fontColor ] = [ 'white' , 'black' ];
        } else [ backgroundColor , fontColor ] = [ '#191414' , 'white' ];
        return (
            <div className="Dropdown">
                <div className="Dropdown-header-wrapper">
                    <div className="Dropdown-header" onClick={() => this.toggleList()} style = {{backgroundColor: backgroundColor, color:fontColor}}>
                        <div className="Dropdown-header-title">{this.state.headerTitle}</div>
                        {this.state.listOpen
                            ? <FontAwesomeIcon className="angle-up" icon={faAngleUp} size="lg" transform="down-1"/>
                            : <FontAwesomeIcon className="angle-down" icon={faAngleDown} size="lg" transform="down-1"/>
                        }
                    </div>
                </div>
                {this.state.listOpen && <div className={"SliderDropdown-list"}>
                    <div className="slider-text">{this.state.value}</div>
                    <input className="slider" type="range" orient="vertical" min="5" max="100"
                        value={this.state.value}
                        onInput={(event) => this.changeValue(event)}
                        onMouseUp={(event) => this.submitValue(event)}
                        onKeyDown={(event) => {if (event.key === "Enter") this.submitValue(event);}}
                        onTouchEnd={(event) => this.submitValue(event)}
                    />
                </div>}
            </div>
        );
    }
}

export default onClickOutside(SliderDropdown);