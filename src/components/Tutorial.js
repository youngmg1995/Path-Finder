import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

/* Images */
/*========*/
// Page 1
import Logo from "../static/android-chrome-512x512.png";
// Page 2
import PathFinding from "../static/Path-Finding.png";
import Unweighted from "../static/Unweighted.png";
import Weighted from "../static/Weighted.png";
import Shortest from "../static/Shortest-Path.png";
import NotShortest from "../static/Not-Shortest-Path.png";
import Heuristic from "../static/Heuristic.png";
import NoHeuristic from "../static/No-Heuristic.png";
// Page 4
import HexGrid from "../static/Hex-Grid.png";
import Start from "../static/Start.png";
import Target from "../static/Target.png";
import Empty from "../static/Empty.png";
import Weight from "../static/Weight.png";
import Wall from "../static/Wall.png";
import Searched from "../static/Searched.png";
import Extended from "../static/Extended.png";
import FinalPath from "../static/Final-Path.png";


function Tutorial(props) {
    return (
        <div className="Tutorial-Outer-Wrapper">
            <div className="Tutorial-Inner-Wrapper">
                <div className="Tutorial-Page-Indicator">
                    {props.tutorialPage} / 8
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
                            <h3 className="Page-Sub-Header">Which Algorithm Should I Choose?</h3>
                            <p className="Page-Instructions">Some algorithms are more sophisticated than others. Below is a short description of each technique to help you decide on which to use.</p>
                            <h2 className="Content-Header-1">Unweighted</h2>
                            <p className="Algorithm-1"><b>Random Walk:</b> Wanders around the board randomly, even over previously visited nodes, until we happen to find the target by chance. Funny, but not practical.</p>
                            <p className="Algorithm-2"><b>Depth-First Search:</b> Searches down the same path until the target is found or no options available. Inefficient and results in long winding paths.</p>
                            <p className="Algorithm-3"><b>Breadth-First Search:</b> Always searches the nodes closest to the start first, spreading out like a wave. Inefficient, but guaranteed to find the shortest path.</p>
                            <p className="Algorithm-4"><b>Hill Climbing:</b> Like depth-first search, but uses a distance heuristic to extend the path towards the target. More efficient, but still likely to produce terrible paths.</p>
                            <p className="Algorithm-5"><b>Beam Search (w=2):</b> Like breadth-first search, but uses a distance heuristic to limit the extensions of the closest node to the two directions closest to the target. More efficient, but does not guarantee the shortest path.</p>
                            <p className="Algorithm-6"><b>Best-First Search:</b> Like breadth-first search, but uses a distance heuristic to always extend the node closest to the target rather than the node closest to the start. Very efficient, but does not guarantee the shortest path.</p>
                            <h2 className="Content-Header-2">Weighted</h2>
                            <p className="Algorithm-7"><b>Branch & Bound:</b> Also referred to as Dijkstra's algorithm, this is the weighted equivalent of breadth-first search. Inefficient but guarantees the least costly path.</p>
                            <p className="Algorithm-8"><b>A* Search:</b> Like branch & bound, but uses a distance heuristic to encourage searching down paths in the direction of the target first. Efficient and guarantees the least costly path making it hands down the best algorithm.</p>
                        </div>
                    </div>
                }
                {props.tutorialPage === 4 && 
                    <div className="Tutorial-Page-4">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Hex Board</h1>
                        <div className="Tutorial-Page-Content">
                            <h3 className="Page-Sub-Header">How We Will Visualize Our Path-Finding Algorithms</h3>
                            <p className="Page-Instructions-1">To visualize our algorithms we will be using a hex grid. Each hex will represent a unique node and from each node we can move to any of its 6 neighboring hexes.</p>
                            <div className="Image-Wrapper-1"><img className="Image-1" alt="loading..." src={HexGrid}/></div>
                            <p className="Page-Instructions-2">Each algorithm will attempt to find a path on our hex grid from the <b>Start</b> node to the <b>Target</b> node. </p>
                            <div className="Content-Box-1">
                                <div className="Image-Wrapper-2"><b>Start</b><img className="Image-2" alt="loading..." src={Start}/></div>
                                <div className="Image-Wrapper-3"><b>Target</b><img className="Image-3" alt="loading..." src={Target}/></div>
                            </div>
                            <p className="Page-Instructions-3">While searching for a path, our algorithms will encounter 3 types of nodes: <b>Empty</b> nodes, <b>Weighted</b> nodes, and <b>Wall</b> nodes. Empty nodes are the easiest to move through with a cost of 1, weighted nodes are more difficult to move through with a cost of 10, and wall nodes are impenetrable with a cost of {"\u221E"}.</p>
                            <div className="Content-Box-2">
                                <div className="Image-Wrapper-4"><b>Empty</b><img className="Image-4" alt="loading..." src={Empty}/></div>
                                <div className="Image-Wrapper-5"><b>Weighted</b><img className="Image-5" alt="loading..." src={Weight}/></div>
                                <div className="Image-Wrapper-5"><b>Wall</b><img className="Image-5" alt="loading..." src={Wall}/></div>
                            </div>
                            <p className="Page-Instructions-4">To help visualize how the path-finding algorithms search for the target, we will color each node as it is operated on. Nodes are colored purple when checked to see if they are the target, blue when the path is extended to that node, and yellow if the node is included in the final path.</p>
                            <div className="Content-Box-3">
                                <div className="Image-Wrapper-6"><b>Searched</b><img className="Image-6" alt="loading..." src={Searched}/></div>
                                <div className="Image-Wrapper-7"><b>Extended</b><img className="Image-7" alt="loading..." src={Extended}/></div>
                                <div className="Image-Wrapper-8"><b>Final Path</b><img className="Image-8" alt="loading..." src={FinalPath}/></div>
                            </div>
                        </div>
                    </div>
                }
                {props.tutorialPage === 5 && 
                    <div className="Tutorial-Page-5">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Controls</h1>
                        <div className="Tutorial-Page-Content">
                        </div>
                    </div>
                }
                {props.tutorialPage === 6 && 
                    <div className="Tutorial-Page-6">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Drawing</h1>
                        <div className="Tutorial-Page-Content">
                            
                        </div>
                    </div>
                }
                {props.tutorialPage === 7 && 
                    <div className="Tutorial-Page-7">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Mazes</h1>
                        <div className="Tutorial-Page-Content">
                            
                        </div>
                    </div>
                }
                {props.tutorialPage === 8 && 
                    <div className="Tutorial-Page-8">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Run</h1>
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