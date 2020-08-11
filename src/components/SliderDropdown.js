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
            value: 15
        }
    }

    handleClickOutside() {
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
        return (
            <div className="Dropdown">
                <div className="Dropdown-header" onClick={() => this.toggleList()}>
                    <div className="Dropdown-header-title">{this.state.headerTitle}</div>
                    {this.state.listOpen
                        ? <FontAwesomeIcon className="angle-up" icon={faAngleUp} size="lg" transform="right-8 down-1"/>
                        : <FontAwesomeIcon className="angle-down" icon={faAngleDown} size="lg" transform="right-8 down-1"/>
                    }
                </div>
                {this.state.listOpen && <div className={"SliderDropdown-list"}>
                    <div className="slider-text">{this.state.value}</div>
                    <input className="slider" type="range" orient="vertical" min="5" max="100"
                        value={this.state.value}
                        onInput={(event) => this.changeValue(event)}
                        onMouseUp={(event) => this.submitValue(event)}
                        onKeyDown={(event) => {if (event.key === "Enter") this.submitValue(event);}}
                    />
                </div>}
            </div>
        );
    }
}

export default onClickOutside(SliderDropdown);