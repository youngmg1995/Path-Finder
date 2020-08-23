import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

// Images
import Logo from "../static/android-chrome-512x512.png";
import PathFinding from "../static/Path-Finding.png";
import Unweighted from "../static/Unweighted.png";
import Weighted from "../static/Weighted.png";
import Shortest from "../static/Shortest-Path.png";
import NotShortest from "../static/Not-Shortest-Path.png";
import Heuristic from "../static/Heuristic.png";
import NoHeuristic from "../static/No-Heuristic.png";

function Tutorial(props) {
    return (
        <div className="Tutorial-Outer-Wrapper">
            <div className="Tutorial-Inner-Wrapper">
                <div className="Tutorial-Page-Indicator">
                    {props.tutorialPage} / 5
                </div>
                {props.tutorialPage === 1 && 
                    <div className="Tutorial-Page-1">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Tutorial</h1>
                        <div className="Tutorial-Page-Content">
                            <h3 className="Page-Sub-Header">Welcome to Path-Finder the React App for Visualizing Path-Finding Algorithms!!!</h3>
                            <p className="Page-Instructions">This tutorial will instruct you on how to use the App. When finished hit "Exit Tutorial" to get started.</p>
                            <div className="Image-Wrapper"><img className="Path-Finder-Logo" alt="Logo" src={Logo}/></div>
                        </div>
                    </div>
                }
                {props.tutorialPage === 2 && 
                    <div className="Tutorial-Page-2">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Path-Finding</h1>
                        <div className="Tutorial-Page-Content">
                            <h3 className="Page-Sub-Header">What is a Path-Finding Algorithm?</h3>
                            <p className="Page-Instructions-1">Path-finding algorithms are computer programs used to search for paths from one place to another.</p>
                            <div className="Image-Wrapper-1"><img className="Image-1" alt="loading..." src={PathFinding}/></div>
                            <p className="Page-Instructions-2">Path-finding algorithms come in two flavors <b>Weighted</b> and <b>Unweighted</b>. Unweighted algorithms simply account for the number of moves from one node to another, while Weighted algorithms also take into account additional costs associated with each move. </p>
                            <div className="Content-Box-1">
                                <div className="Image-Wrapper-2"><b>Weighted</b><img className="Image-2" alt="loading..." src={Weighted}/></div>
                                <div className="Image-Wrapper-3"><b>Unweighted</b><img className="Image-3" alt="loading..." src={Unweighted}/></div>
                            </div>
                            <p className="Page-Instructions-3">Some algorithms guarantee the shortest path possible will always be found, while others do not.</p>
                            <div className="Content-Box-2">
                                <div className="Image-Wrapper-4"><b>Shortest Path</b><img className="Image-4" alt="loading..." src={Shortest}/></div>
                                <div className="Image-Wrapper-5"><b>Not Shortest Path</b><img className="Image-5" alt="loading..." src={NotShortest}/></div>
                            </div>
                            <p className="Page-Instructions-4">To be more efficient, some algorithms even utilitze a distance heuristic to incentivise the path to move closer to the target rather than away from it.</p>
                            <div className="Content-Box-3">
                                <div className="Image-Wrapper-6"><b>Uses Heuristic</b><img className="Image-6" alt="loading..." src={Heuristic}/></div>
                                <div className="Image-Wrapper-7"><b>No Heuristic</b><img className="Image-7" alt="loading..." src={NoHeuristic}/></div>
                            </div>
                        </div>
                    </div>
                }
                {props.tutorialPage === 3 && 
                    <div className="Tutorial-Page-3">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Algorithms</h1>
                        <div className="Tutorial-Page-Content">
                            
                        </div>
                    </div>
                }
                {props.tutorialPage === 4 && 
                    <div className="Tutorial-Page-4">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Canvas Board</h1>
                        <div className="Tutorial-Page-Content">
                            
                        </div>
                    </div>
                }
                {props.tutorialPage === 5 && 
                    <div className="Tutorial-Page-5">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Mazes</h1>
                        <div className="Tutorial-Page-Content">
                            
                        </div>
                    </div>
                }
                <div className="Tutorial-Buttons-Wrapper">
                    <div className="End-Button-Wrapper">
                        <div className="Tutorial-End-Button" onClick={props.toggleTutorial}>
                            Exit Tutorial
                        </div>
                    </div>
                    <div className="Page-Buttons-Wrapper">
                        <div className="Tutorial-Next-Button" onClick={(event) => props.changePage(1)}>
                            <FontAwesomeIcon className="Next-Arrow" icon={faAngleDoubleRight}/>
                        </div>
                        <div className="Tutorial-Previous-Button" onClick={(event) => props.changePage(-1)}>
                            <FontAwesomeIcon className="Previous-Arrow" icon={faAngleDoubleLeft}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Tutorial;