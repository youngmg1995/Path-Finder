import React from 'react';
import onClickOutside from 'react-onclickoutside';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp , faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons";

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOpen: false,
            headerTitle: this.props.title,
            options: this.props.options
        }
    }

    handleClickOutside() {
        this.setState({listOpen: false});
    }

    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    }

    escapeList(event) {
        if (this.state.listOpen && event.key === 'Escape') this.toggleList();
    }

    componentDidMount() {
        document.addEventListener('keydown',(event) => this.escapeList(event));
    }

    render() {
        const {listOpen, headerTitle, options} = this.state;
        let backgroundColor, fontColor;
        if (this.props.windowState === 1 || this.props.windowState === 2) {
            if (listOpen) [ backgroundColor , fontColor ] = ['#27af62' , 'white' ];
            else [ backgroundColor , fontColor ] = [ 'white' , 'black' ];
        } else [ backgroundColor , fontColor ] = [ '#191414' , 'white' ];
        return (
            <div className="Dropdown">
                <div className="Dropdown-header-wrapper">
                    <div className="Dropdown-header" onClick={() => this.toggleList()} style = {{backgroundColor: backgroundColor, color:fontColor}}>
                        <div className="Dropdown-header-title">{headerTitle}</div>
                        {listOpen
                            ? <FontAwesomeIcon className="angle-up" icon={faAngleUp} size="lg" transform="down-1"/>
                            : <FontAwesomeIcon className="angle-down" icon={faAngleDown} size="lg" transform="down-1"/>
                        }
                    </div>
                </div>
                {listOpen && <ul className={headerTitle+"-Dropdown-list"}>
                    {options.map((item) => (
                        <li key={item.id} className="Dropdown-list-item" onClick={() => this.props.callBack(item.id,item.key,item.title)}>
                            {item.title}
                            {item.selected && <FontAwesomeIcon className="check" icon={faCheck} size="1x"/>}
                        </li>
                    ))}
                </ul>}
            </div>
        );
    }
}

export default onClickOutside(Dropdown);