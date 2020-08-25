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
// Page 5
import Dropdown from "../static/Dropdown.png";
import BarsIcon from "../static/Bars-Icon.png";
// Page 6
import Dragging from "../static/Dragging-GIF.gif"
import Drawing from "../static/Drawing-GIF.gif"
// Page 7
import Random from "../static/Random.png";
import Maze from "../static/Maze.png";
import Fractal from "../static/Fractal.png";
import Caves from "../static/Caves.png";
// Page 8
import Play from "../static/Play.png";
import Pause from "../static/Pause.png";




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
                            <h3 className="Page-Sub-Header">Welcome To Path-Finder: The React App For Visualizing Path-Finding Algorithms!!!</h3>
                            <p className="Page-Instructions">This tutorial will instruct you on how to use the app. When finished hit "Exit Tutorial" to get started.</p>
                            <div className="Image-Wrapper"><img className="Path-Finder-Logo" alt="Logo" src={Logo}/></div>
                        </div>
                    </div>
                }
                {props.tutorialPage === 2 && 
                    <div className="Tutorial-Page-2">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Path-Finding</h1>
                        <div className="Tutorial-Page-Content">
                            <h3 className="Page-Sub-Header">What Is A Path-Finding Algorithm?</h3>
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
                            <h3 className="Page-Sub-Header">How To Interact With The App</h3>
                            <p className="Page-Instructions-1">Most controls for the app are located in the control panel as dropdowns. For larger devices the control panel is simply located at the top of the app and for smaller devices the control panel can be reached by clicking on the &#8801; icon.</p>
                            <div className="Content-Box-1">
                                <div className="Image-Wrapper-1"><b>Large Devices</b><img className="Image-1" alt="loading..." src={Dropdown}/></div>
                                <div className="Image-Wrapper-2"><b>Small Devices</b><img className="Image-2" alt="loading..." src={BarsIcon}/></div>
                            </div>
                            <p className="Page-Instructions-2"> Below is a short description of each of the control categories. For those that are not covered in detail elsewhere in the tutorial, explanations of the control options are also included.</p>
                            <h2 className="Content-Header">Algorithm</h2>
                            <p className="Description"><b>Description:</b> Allows you to select which path-finding algorithm will be visualized.</p>
                            <p className="Options"><b>Options:</b> See page 3</p>
                            <h2 className="Content-Header">Speed</h2>
                            <p className="Description"><b>Description:</b> Determines the speed of the path-finding and maze-building visualizations.</p>
                            <p className="Options"><b>Options:</b></p>
                            <ul className="Options-List">
                                <li className="Option"><b>Slow:</b> Slowest visualization speed, ~10 hexes/sec. Good for capturing every detail on small boards.</li>
                                <li className="Option"><b>Medium:</b> Relatively slow visualization speed, ~100 hexes/sec. Appropriate for small boards.</li>
                                <li className="Option"><b>Fast:</b> Default visualization speed, ~1,000 hexes/sec. Appropriate for most larger boards.</li>
                                <li className="Option"><b>Ludicrous:</b> Fastest visualization speed, ~10,000 hexes/sec. Great for largest boards and mazes.</li>
                                <li className="Option"><b>Instant:</b> Skips visualization animation and instantly shows path-finding or maze-building results.</li>
                            </ul>
                            <h2 className="Content-Header">Tool</h2>
                            <p className="Description"><b>Description:</b> Tools used for manually drawing on the hex board.</p>
                            <p className="Options"><b>Options:</b></p>
                            <ul className="Options-List">
                                <li className="Option"><b>Walls:</b> Converts selected hexes to wall nodes.</li>
                                <li className="Option"><b>Weights:</b> Converts selected hexes to weighted nodes.</li>
                                <li className="Option"><b>Eraser:</b> Converts selected hexes to empty nodes.</li>
                            </ul>
                            <h2 className="Content-Header">Hex Size</h2>
                            <p className="Description"><b>Description:</b> Changes the size of the hex units comprising the board. Smaller sizes result in a finer board, while larger sizes result in a coarser board.</p>
                            <h2 className="Content-Header">Mazes</h2>
                            <p className="Description"><b>Description:</b> Generates random mazes and board configurations that are fun to visualize and solve.</p>
                            <p className="Options"><b>Options:</b> See page 7</p>
                            <h2 className="Content-Header">Clear</h2>
                            <p className="Description"><b>Description:</b> Allows the you to remove certain elements from and/or completely reset the hex board.</p>
                            <p className="Options"><b>Options:</b></p>
                            <ul className="Last-Options-List">
                                <li className="Option"><b>Path:</b> Removes all the path-finder visualizations from the board.</li>
                                <li className="Option"><b>Walls:</b> Removes all the wall nodes from the board.</li>
                                <li className="Option"><b>Weights:</b> Removes all the weighted nodes from the board.</li>
                                <li className="Option"><b>Board:</b> Removes all elements from the board and returns the start and target nodes to their original positions.</li>
                                <li className="Option"><b>Canvas:</b> Completely resets the hex board. This is useful for resizing the board to a new screen size or orientation.</li>
                            </ul>
                        </div>
                    </div>
                }
                {props.tutorialPage === 6 && 
                    <div className="Tutorial-Page-6">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Drawing</h1>
                        <div className="Tutorial-Page-Content">
                            <h3 className="Page-Sub-Header">How To Manipulate The Board</h3>
                            <p className="Page-Instructions-1">In order to create unique board configurations, users have the ability to manually manipulate the hex board. This includes moving the start and target nodes, as well as creating wall, weighted, or empty nodes by drawing on the canvas.</p>
                            <h2 className="Content-Header">Move Start/Target Node</h2>
                            <p className="Page-Instructions-2">To move the start or target node, simply click and drag the node to the desired new position.</p>
                            <div className="Image-Wrapper-1"><img className="Image-1" alt="loading..." src={Dragging}/></div>
                            <h2 className="Content-Header">Draw and Erase</h2>
                            <p className="Page-Instructions-3">To draw on the board, first select the desired tool from the "Tool" dropdown in the control panel. Then click and drag over the nodes you wish to draw or erase.</p>
                            <div className="Image-Wrapper-2"><img className="Image-2" alt="loading..." src={Drawing}/></div>
                        </div>
                    </div>
                }
                {props.tutorialPage === 7 && 
                    <div className="Tutorial-Page-7">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Mazes</h1>
                        <div className="Tutorial-Page-Content">
                            <h3 className="Page-Sub-Header">Generate Fun Board Configurations</h3>
                            <p className="Page-Instructions-1">Drawing your own board configurations is fun, but having an algorithm generate them is even cooler!!! Included are numerous algorithms for procedurally generating and visualizing different types of unique board structures. Below we break them up into differet categories and explain each in detail.</p>
                            <h2 className="Content-Header">Random</h2>
                            <div className="Image-Wrapper-1"><img className="Image-1" alt="loading..." src={Random}/></div>
                            <p className="Description"><b>Description:</b> Randomly assigns each hex on the board as a wall or weighted node with a 50% probability.</p>
                            <p className="Options"><b>Options:</b></p>
                            <ul className="Options-List">
                                <li className="Option"><b>Random Walls:</b> Fills board randomly with wall nodes.</li>
                                <li className="Option"><b>Random Weights:</b> Fills board randomly with weighted nodes.</li>
                            </ul>
                            <h2 className="Content-Header">Perfect Mazes</h2>
                            <div className="Image-Wrapper-2"><img className="Image-2" alt="loading..." src={Maze}/></div>
                            <p className="Description"><b>Description:</b> These are true maze building algorithms that generate a single unique path between the start and target nodes.</p>
                            <p className="Options"><b>Options:</b></p>
                            <ul className="Options-List">
                                <li className="Option"><b>Depth-First Maze:</b> Generates mazes having a single long solution with short side-paths. Very difficult to solve by hand.</li>
                                <li className="Option"><b>Breadth-First Maze:</b> Generates mazes that appear to radiate from a single starting point. As such, solutions are generally shorter, having many side-paths, and are fairly easy to solve by hand. </li>
                                <li className="Option"><b>Hunt & Kill:</b> Similar to depth-first mazes, but the resulting path will include much longer side-paths. These are usually the most difficult to solve and my personal favorite.</li>
                                <li className="Option"><b>Prim's Maze:</b> Similar to breadth-first mazes, but the resulting maze has much more randomness and complexity to it. Fairly difficult to solve by hand.</li>
                                <li className="Option"><b>Kruskal's Maze:</b> Visually, this is the most interesting algorithm. It generates well balanced mazes in terms of difficulty of the solution and complexity of side paths.</li>
                            </ul>
                            <h2 className="Content-Header">DLA Fractals</h2>
                            <div className="Image-Wrapper-3"><img className="Image-3" alt="loading..." src={Fractal}/></div>
                            <p className="Description"><b>Description:</b> Using stochastic simulations, these algorithms generate Brownian tree fractals that resemble lightning and tree roots. While visually stunning, these algorithms are computationally expensive, so please allow up to 30sec for them to run.</p>
                            <p className="Options"><b>Options:</b></p>
                            <ul className="Options-List">
                                <li className="Option"><b>Random DLA Fractal:</b> Generates Brownian trees that appear to radiate outward, evenly from a single point and sometimes are thicker near the center.</li>
                                <li className="Option"><b>Wall DLA Fractal:</b> Generates Brownian trees that appear to grow towards the edges of the board and are usually of an even thickness.</li>
                            </ul>
                            <h2 className="Content-Header">Caves</h2>
                            <div className="Image-Wrapper-4"><img className="Image-4" alt="loading..." src={Caves}/></div>
                            <p className="Description"><b>Description:</b> These algorithms generate caves and dungeon-like maps on our hex board. Similar techniques are used by some video games to generate completely unique levels on the fly.</p>
                            <p className="Options"><b>Options:</b></p>
                            <ul className="Last-Options-List">
                                <li className="Option"><b>Cellular Caves:</b> Uses a procedure similar to Conway's Game of Life. Results in very random and rough caves, but which do not scale very well.</li>
                                <li className="Option"><b>Simplex Caves:</b> Samples a Simplex Noise function to generate very open and smooth caves that also scale incredibly well.</li>
                            </ul>
                        </div>
                    </div>
                }
                {props.tutorialPage === 8 && 
                    <div className="Tutorial-Page-8">
                        <div className="Tutorial-Header-Spacer"></div>
                        <h1 className="Tutorial-Page-Header">Run</h1>
                        <div className="Tutorial-Page-Content">
                            <h3 className="Page-Sub-Header">How To Start The Path-Finder</h3>
                            <p className="Page-Instructions-1">Once you are happy with your choice of algorithm, settings, and board configuration, you can start the path-finding visualization by simply hitting the play button. At any point during the path-finding or maze-building visualizations you can stop the animation by again hitting the play/pause button.</p>
                            <div className="Content-Box-1">
                                <div className="Image-Wrapper-1"><b>Start</b><img className="Image-1" alt="loading..." src={Play}/></div>
                                <div className="Image-Wrapper-2"><b>Stop</b><img className="Image-2" alt="loading..." src={Pause}/></div>
                            </div>
                            <h2 className="Content-Header">Enjoy!!!</h2>
                            <p className="Page-Instructions-2">This concludes the tutorial; hit "Exit Tutorial" to begin using the app. Be sure to try out all the algorithms, mazes, and functionalities offered by the game. If you enjoy the app, please consider liking and contributing to the project which can be found on <a href="https://github.com/youngmg1995/Path-Finding-App" target="_blank" rel="noopener noreferrer">Github</a>.</p>
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