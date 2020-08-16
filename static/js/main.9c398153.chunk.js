(this["webpackJsonppath-finding-app"]=this["webpackJsonppath-finding-app"]||[]).push([[0],{17:function(t,e,a){t.exports=a(29)},22:function(t,e,a){},28:function(t,e,a){},29:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),s=a(11),r=a.n(s),o=(a(22),a(1)),c=a(4),l=a(5),h=a(9),u=a(8),f=a(12),d=a(6),p=a(7),v=function(t){Object(h.a)(a,t);var e=Object(u.a)(a);function a(t){var n;return Object(c.a)(this,a),(n=e.call(this,t)).state={listOpen:!1,headerTitle:n.props.title,options:n.props.options},n}return Object(l.a)(a,[{key:"handleClickOutside",value:function(){this.setState({listOpen:!1})}},{key:"toggleList",value:function(){this.setState((function(t){return{listOpen:!t.listOpen}}))}},{key:"escapeList",value:function(t){this.state.listOpen&&"Escape"===t.key&&this.toggleList()}},{key:"componentDidMount",value:function(){var t=this;document.addEventListener("keydown",(function(e){return t.escapeList(e)}))}},{key:"render",value:function(){var t,e,a=this,n=this.state,s=n.listOpen,r=n.headerTitle,o=n.options;return 1===this.props.windowState||2===this.props.windowState?s?(t="#27af62",e="white"):(t="white",e="black"):(t="#191414",e="white"),i.a.createElement("div",{className:"Dropdown"},i.a.createElement("div",{className:"Dropdown-header-wrapper"},i.a.createElement("div",{className:"Dropdown-header",onClick:function(){return a.toggleList()},style:{backgroundColor:t,color:e}},i.a.createElement("div",{className:"Dropdown-header-title"},r),s?i.a.createElement(d.a,{className:"angle-up",icon:p.b,size:"lg",transform:"down-1"}):i.a.createElement(d.a,{className:"angle-down",icon:p.a,size:"lg",transform:"down-1"}))),s&&i.a.createElement("ul",{className:r+"-Dropdown-list"},o.map((function(t){return i.a.createElement("li",{key:t.id,className:"Dropdown-list-item",onClick:function(){return a.props.callBack(t.id,t.key,t.title)}},t.title,t.selected&&i.a.createElement(d.a,{className:"check",icon:p.d,size:"1x"}))}))))}}]),a}(i.a.Component),g=Object(f.a)(v),j=function(t){Object(h.a)(a,t);var e=Object(u.a)(a);function a(t){var n;return Object(c.a)(this,a),(n=e.call(this,t)).state={listOpen:!1,headerTitle:n.props.title,value:n.props.hexSize},n}return Object(l.a)(a,[{key:"handleClickOutside",value:function(){this.setState({listOpen:!1})}},{key:"toggleList",value:function(){this.setState((function(t){return{listOpen:!t.listOpen}}))}},{key:"changeValue",value:function(t){this.setState({value:t.target.value})}},{key:"submitValue",value:function(t){this.props.callBack(t.target.value)}},{key:"escapeList",value:function(t){this.state.listOpen&&"Escape"===t.key&&this.toggleList()}},{key:"componentDidMount",value:function(){var t=this;document.addEventListener("keydown",(function(e){return t.escapeList(e)}))}},{key:"render",value:function(){var t,e,a=this;return window.innerWidth<481||window.innerHeight<481?this.state.listOpen?(t="#27af62",e="white"):(t="white",e="black"):(t="#191414",e="white"),i.a.createElement("div",{className:"Dropdown"},i.a.createElement("div",{className:"Dropdown-header-wrapper"},i.a.createElement("div",{className:"Dropdown-header",onClick:function(){return a.toggleList()},style:{backgroundColor:t,color:e}},i.a.createElement("div",{className:"Dropdown-header-title"},this.state.headerTitle),this.state.listOpen?i.a.createElement(d.a,{className:"angle-up",icon:p.b,size:"lg",transform:"down-1"}):i.a.createElement(d.a,{className:"angle-down",icon:p.a,size:"lg",transform:"down-1"}))),this.state.listOpen&&i.a.createElement("div",{className:"SliderDropdown-list"},i.a.createElement("div",{className:"slider-text"},this.state.value),i.a.createElement("input",{className:"slider",type:"range",orient:"vertical",min:"5",max:"100",value:this.state.value,onInput:function(t){return a.changeValue(t)},onMouseUp:function(t){return a.submitValue(t)},onKeyDown:function(t){"Enter"===t.key&&a.submitValue(t)},onTouchEnd:function(t){return a.submitValue(t)}})))}}]),a}(i.a.Component),b=Object(f.a)(j),y=function(t){Object(h.a)(a,t);var e=Object(u.a)(a);function a(t){var n;return Object(c.a)(this,a),(n=e.call(this,t)).state={algorithm:[{id:0,title:"Depth-First Search",selected:!1,key:"algorithm"},{id:1,title:"Breadth-First Search",selected:!1,key:"algorithm"},{id:2,title:"Hill Climbing",selected:!1,key:"algorithm"},{id:3,title:"Beam Search (\u03c9=2)",selected:!1,key:"algorithm"},{id:4,title:"Best-First Search",selected:!1,key:"algorithm"},{id:5,title:"Branch & Bound",selected:!0,key:"algorithm"},{id:6,title:"A* Search",selected:!1,key:"algorithm"}],speed:[{id:0,title:"Slow",selected:!1,key:"speed"},{id:1,title:"Medium",selected:!1,key:"speed"},{id:2,title:"Fast",selected:!0,key:"speed"},{id:3,title:"Ludicrous",selected:!1,key:"speed"},{id:4,title:"Instant",selected:!1,key:"speed"}],tool:[{id:0,title:"Walls",selected:!0,key:"tool"},{id:1,title:"Weights",selected:!1,key:"tool"},{id:2,title:"Eraser",selected:!1,key:"tool"}],clear:[{id:1,title:"Path",selected:!1,key:"clear"},{id:2,title:"Walls",selected:!1,key:"clear"},{id:3,title:"Weights",selected:!1,key:"clear"},{id:0,title:"Board",selected:!1,key:"clear"},{id:4,title:"Canvas",selected:!1,key:"clear"}]},n}return Object(l.a)(a,[{key:"toggleSelected",value:function(t,e,a){if("clear"!==e){for(var n=this.state[e].slice(),i=0;i<n.length;i++)n[i].selected=t===n[i].id;this.setState(Object(o.a)({},e,n))}this.props.toggleSelected(e,t)}},{key:"render",value:function(){var t=this;return i.a.createElement("div",{className:"ControlPanel"},this.props.showControls&&i.a.createElement("div",{className:"Controls-Wrapper-Background"},i.a.createElement("div",{className:"Controls-Wrapper"},i.a.createElement("div",{className:"ControlPanel-column"},i.a.createElement(g,{className:"Algorithm-Dropdown",windowState:this.props.windowState,title:"Algorithm",options:this.state.algorithm,callBack:function(e,a,n){return t.toggleSelected(e,a,n)},disableOnClickOutside:1===this.props.windowState})),i.a.createElement("div",{className:"ControlPanel-column"},i.a.createElement(g,{className:"Speed-Dropdown",windowState:this.props.windowState,title:"Speed",options:this.state.speed,callBack:function(e,a,n){return t.toggleSelected(e,a,n)},disableOnClickOutside:1===this.props.windowState})),i.a.createElement("div",{className:"ControlPanel-column"},i.a.createElement(g,{className:"Tool-Dropdown",windowState:this.props.windowState,title:"Tool",options:this.state.tool,callBack:function(e,a,n){return t.toggleSelected(e,a,n)},disableOnClickOutside:1===this.props.windowState})),i.a.createElement("div",{className:"ControlPanel-column"},i.a.createElement(b,{className:"Hex-Size-Dropdown",windowState:this.props.windowState,title:"Hex Size",hexSize:this.props.hexSize,callBack:function(e){return t.props.changeHexSize(e)},disableOnClickOutside:1===this.props.windowState})),i.a.createElement("div",{className:"ControlPanel-column"},i.a.createElement(g,{className:"Clear-Dropdown",windowState:this.props.windowState,title:"Clear",options:this.state.clear,callBack:function(e,a,n){return t.props.clearBoard(e)},disableOnClickOutside:1===this.props.windowState})))),i.a.createElement("div",{className:"Play-Button-Wrapper"},i.a.createElement("div",{className:"Play-Button",onClick:this.props.running?function(e){return t.props.stopSearch()}:function(e){return t.props.startSearch()}},this.props.running?i.a.createElement(d.a,{className:"pause",icon:p.e}):i.a.createElement(d.a,{className:"play",icon:p.f}))))}}]),a}(i.a.Component),O=a(10),m=a(3),w=[{i:0,j:1},{i:-1,j:0},{i:-1,j:-1},{i:0,j:-1},{i:1,j:-1},{i:1,j:0}],x=[{i:0,j:1},{i:-1,j:1},{i:-1,j:0},{i:0,j:-1},{i:1,j:0},{i:1,j:1}];function k(t,e){return t.i===e.i&&t.j===e.j}function S(t,e,a){return t.i>=0&&t.j>=0&&t.i<e&&t.j<a}function M(t,e,a,n){var i=e[[t.i,t.j]];return S(t,a,n)&&"wall"!==i.type}function N(t){var e,a=[];e=t.i%2===0?w:x;var n,i,s,r=Object(m.a)(e);try{for(r.s();!(n=r.n()).done;){var o=n.value,c=(s=o,{i:(i=t).i+s.i,j:i.j+s.j});a.push(c)}}catch(l){r.e(l)}finally{r.f()}return a}function D(t,e){var a=E(t),n=E(e),i=n.x-a.x,s=n.y-a.y;return Math.sign(i)===Math.sign(s)?Math.max(Math.abs(i),Math.abs(s)):Math.abs(i)+Math.abs(s)}function E(t){return{x:t.j-(e=t.i,e>=0?e>>1:(e-1)/2),y:t.j+I(t.i)};var e}function I(t){return t>=0?t+1>>1:t/2}function C(t,e){return t.x*e.x+t.y*e.y}function P(t,e){return{x:t*e.x,y:t*e.y}}function U(t,e){return{x:t.x-e.x,y:t.y-e.y}}function W(t){return Math.sqrt(Math.pow(t.x,2)+Math.pow(t.y,2))}function B(t,e){var a=P(C(t,e)/Math.pow(W(e),2),e);return W(U(t,a))}function T(t){var e=Math.atan(t.y/t.x);return t.x<0&&(e+=Math.PI),e}var R=function(){function t(e){Object(c.a)(this,t),this.heap=[],this.lessThan=e}return Object(l.a)(t,[{key:"length",value:function(){return this.heap.length}},{key:"getMin",value:function(){return this.heap[0]}},{key:"insert",value:function(t){this.heap.push(t);for(var e=this.heap.length-1;e>0&&this.lessThan(this.heap[e],this.heap[Math.floor((e-1)/2)]);){var a=[this.heap[e],this.heap[Math.floor((e-1)/2)]];this.heap[Math.floor((e-1)/2)]=a[0],this.heap[e]=a[1],e=Math.floor((e-1)/2)}}},{key:"shift",value:function(){var t=this.heap.shift();if(0===this.heap.length)return t;this.heap.unshift(this.heap.pop());for(var e=0;2*e+2<this.heap.length&&(this.lessThan(this.heap[2*e+1],this.heap[e])||this.lessThan(this.heap[2*e+2],this.heap[e]));)if(this.lessThan(this.heap[2*e+1],this.heap[2*e+2])){var a=[this.heap[e],this.heap[2*e+1]];this.heap[2*e+1]=a[0],this.heap[e]=a[1],e=2*e+1}else{var n=[this.heap[e],this.heap[2*e+2]];this.heap[2*e+2]=n[0],this.heap[e]=n[1],e=2*e+2}return t}}]),t}();function F(t,e,a,n,i,s,r,c,l,h,u){var f=t,d=K(e,t,a,i,s),p={};for(!S(f,h,u)||k(f,c.startNode)||k(f,c.targetNode)||(0===c.tool?Object.assign(p,Object(o.a)({},[f.i,f.j],{node:f,type:"wall",fill:"#282c34",object:null})):1===c.tool?Object.assign(p,Object(o.a)({},[f.i,f.j],{node:f,type:"weight",fill:"white",object:"weight"})):2===c.tool&&Object.assign(p,Object(o.a)({},[f.i,f.j],{node:f,type:"empty",fill:"white",object:null})));!k(f,e);){var v,g=1/0,j=N(f),b=Object.assign({},f),y=Object(m.a)(j);try{for(y.s();!(v=y.n()).done;){var O=v.value,w=K(O,b,a,i,s);if(C(w,d)>=0){var x=B(w=K(O,t,a,i,s),d);x<g&&(f=O,g=x)}}}catch(M){y.e(M)}finally{y.f()}if(!S(f,h,u))break;k(f,c.startNode)||k(f,c.targetNode)||(0===c.tool?Object.assign(p,Object(o.a)({},[f.i,f.j],{node:f,type:"wall",fill:"#282c34",object:null})):1===c.tool?Object.assign(p,Object(o.a)({},[f.i,f.j],{node:f,type:"weight",fill:"white",object:"weight"})):2===c.tool&&Object.assign(p,Object(o.a)({},[f.i,f.j],{node:f,type:"empty",fill:"white",object:null})))}l((function(t){return{board:Object.assign({},t.board,p),updateID:t.updateID+1,canvasUpdates:p}}))}function L(t,e,a,n,i,s,r,c,l){var h=0;c.xUnits>c.yUnits&&(h=-Math.PI/2);var u=Object(o.a)({},[e.i,e.j],{node:e,type:"start",fill:"white",object:"start",angle:h}),f=Object.assign({},c.board[[t.i,t.j]]);"start"===f.type?Object.assign(u,Object(o.a)({},[t.i,t.j],{node:t,type:"empty",fill:"white",object:null})):Object.assign(u,Object(o.a)({},[t.i,t.j],f)),l((function(t){return{startNode:e,updateID:t.updateID+1,canvasUpdates:u}}))}function z(t,e,a,n,i,s,r,c,l){var h=Object(o.a)({},[e.i,e.j],{node:e,type:"target",fill:"white",object:"target"}),u=Object.assign({},c.board[[t.i,t.j]]);"target"===u.type?Object.assign(h,Object(o.a)({},[t.i,t.j],{node:t,type:"empty",fill:"white",object:null})):Object.assign(h,Object(o.a)({},[t.i,t.j],u)),l((function(t){return{targetNode:e,updateID:t.updateID+1,canvasUpdates:h}}))}function q(t,e,a,n,i,s){var r=J(t,e,n,i),o=.9*e,c=o,l=o,h=1.5*o,u=.18*o,f=.33*o,d=s.current.getContext("2d"),p=[{x:l/2,y:-c/2},{x:-l/2,y:-c/2},{x:-h/2,y:c/2},{x:h/2,y:c/2}];d.beginPath(),d.fillStyle="black",d.moveTo(r.x+p[0].x,r.y+p[0].y);for(var v=1;v<p.length;v++)d.lineTo(r.x+p[v].x,r.y+p[v].y);d.closePath(),d.fill(),d.beginPath();var g={x:r.x,y:r.y-c/2};d.lineWidth=u,d.arc(g.x,g.y,f,0,7),d.stroke()}function H(t,e,a,n){var i=n.current.getContext("2d"),s=X(t,e);i.lineWidth=a,i.beginPath(),i.moveTo(s[0].x,s[0].y);for(var r=1;r<s.length;r++)i.lineTo(s[r].x,s[r].y);i.closePath(),i.stroke()}function A(t,e,a,n){var i=n.current.getContext("2d");i.fillStyle=a;var s=X(t,e);i.beginPath(),i.moveTo(s[0].x,s[0].y);for(var r=1;r<s.length;r++)i.lineTo(s[r].x,s[r].y);i.closePath(),i.fill()}function V(t,e,a,n,i){var s=e.getBoundingClientRect();return function(t,e,a,n){var i,s,r=Math.floor((t.x-a)/(e*Math.sqrt(3))),o=Math.floor((t.y-n)/(1.5*e)),c=(t.x-a)/(e*Math.sqrt(3))-r,l=1-((t.y-n)/(1.5*e)-o);o%2===0?c<.5?l>2/3*c+2/3?(i=o-1,s=r-1):(i=o,s=r):l>-2/3*c+4/3?(i=o-1,s=r):(i=o,s=r):c<.5?l>-2/3*c+1?(i=o-1,s=r):(i=o,s=r-1):l>2/3*c+1/3?(i=o-1,s=r):(i=o,s=r);return{i:i,j:s}}({x:t.clientX-s.left,y:t.clientY-s.top},a,n,i)}function J(t,e,a,n){return{x:a+(t.j+1-(t.i+1)%2/2)*e*Math.sqrt(3),y:n+(1.5*t.i+1)*e}}function K(t,e,a,n,i){var s=J(t,a,n,i),r=J(e,a,n,i);return{x:s.x-r.x,y:s.y-r.y}}function X(t,e){for(var a=[],n=Math.PI/6;n<2*Math.PI;n+=Math.PI/3){var i=t.x+e*Math.cos(n),s=t.y+e*Math.sin(n);a.push({x:i,y:s})}return a}function Y(t,e,a){var n=Math.floor(e/(1.5*a)-.5),i=Math.floor(t/(a*Math.sqrt(3))-.5);return[n,i,(t-(i+.5)*a*Math.sqrt(3))/2,(e-(1.5*n+.5)*a)/2]}function $(t,e,a){for(var n,i,s,r=Y(t,e,a),c=Object(O.a)(r,2),l=c[0],h=c[1],u={},f=0;f<l;f++)for(var d=0;d<h;d++)Object.assign(u,Object(o.a)({},[f,d],{node:{i:f,j:d},type:"empty",fill:"white",object:null}));l>h?(n={i:l-1-(s=Math.floor(.25*l)),j:Math.floor(h/2)},i={i:s,j:Math.floor(h/2)}):(s=Math.floor(.25*h),n={i:Math.floor(l/2),j:s},i={i:Math.floor(l/2),j:h-1-s});var p=0;return l>h&&(p=-Math.PI/2),Object.assign(u[[n.i,n.j]],{type:"start",object:"start",angle:p}),Object.assign(u[[i.i,i.j]],{type:"target",object:"target"}),[u,n,i]}function G(t,e,a){var n=Y(t,e,a),i=Object(O.a)(n,4),s=i[0],r=i[1],o=i[2],c=i[3],l=$(t,e,a),h=Object(O.a)(l,3);return{board:h[0],startNode:h[1],targetNode:h[2],xUnits:s,yUnits:r,xOffset:o,yOffset:c,lineWidth:a/10}}function Q(t){var e=t.split(",").map((function(t){return parseInt(t)})),a=Object(O.a)(e,2);return{i:a[0],j:a[1]}}var Z=function(t){Object(h.a)(a,t);var e=Object(u.a)(a);function a(){return Object(c.a)(this,a),e.apply(this,arguments)}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var t=$(this.props.width,this.props.height,this.props.s),e=Object(O.a)(t,1)[0];for(var a in e){var n=e[a],i=n.node,s=n.fill,r=n.object,o=n.angle;this.updateNode(i,s,r,o)}}},{key:"shouldComponentUpdate",value:function(t){return t.updateID!==this.props.updateID}},{key:"componentDidUpdate",value:function(t){if(this.props.s!==t.s){this.props.canvasRef.current.getContext("2d").clearRect(0,0,this.props.width,this.props.height),this.componentDidMount()}else{for(var e in this.props.canvasUpdates){var a=this.props.canvasUpdates[e],n=a.node,i=a.fill,s=a.object,r=a.angle;this.updateNode(n,i,s,r)}if(this.props.startPosition){var o=this.props.startPosition,c=o.pos,l=o.angle;!function(t,e,a,n){var i=a.current.getContext("2d"),s=e*Math.sqrt(3)*.85/2,r=s/1.3,o=s/2.6,c=[{x:s,y:0},{x:-2*o,y:r},{x:-o,y:0},{x:-2*o,y:-r}];if(n)for(var l=0;l<c.length;l++){var h=c[l],u={x:h.x*Math.cos(n)-h.y*Math.sin(n),y:h.x*Math.sin(n)+h.y*Math.cos(n)};c[l]=u}i.fillStyle="black",i.beginPath(),i.moveTo(t.x+c[0].x,t.y+c[0].y);for(var f=1;f<c.length;f++)i.lineTo(t.x+c[f].x,t.y+c[f].y);i.closePath(),i.fill()}(c,this.props.s,this.props.canvasRef,l)}}}},{key:"updateNode",value:function(t,e,a,n){e&&function(t,e,a,n,i,s,r){var o=J(t,e,n,i);A(o,e,s,r),H(o,e,a,r)}(t,this.props.s,this.props.lineWidth,this.props.xOffset,this.props.yOffset,e,this.props.canvasRef),a&&("weight"===a?q(t,this.props.s,this.props.lineWidth,this.props.xOffset,this.props.yOffset,this.props.canvasRef):"start"===a?function(t,e,a,n,i,s){var r=i.current.getContext("2d"),o=e*Math.sqrt(3)*.85/2,c=o/1.3,l=o/2.6,h=[{x:o,y:0},{x:-2*l,y:c},{x:-l,y:0},{x:-2*l,y:-c}];if(s)for(var u=0;u<h.length;u++){var f=h[u],d={x:f.x*Math.cos(s)-f.y*Math.sin(s),y:f.x*Math.sin(s)+f.y*Math.cos(s)};h[u]=d}var p=J(t,e,a,n);r.fillStyle="black",r.beginPath(),r.moveTo(p.x+h[0].x,p.y+h[0].y);for(var v=1;v<h.length;v++)r.lineTo(p.x+h[v].x,p.y+h[v].y);r.closePath(),r.fill()}(t,this.props.s,this.props.xOffset,this.props.yOffset,this.props.canvasRef,n):"target"===a&&function(t,e,a,n,i,s){var r=e,o=J(t,e,n,i);A(o,r,"#b22222",s),A(o,2*r/3-a/2,"white",s),A(o,r/3,"#b22222",s),H(o,r,a,s)}(t,this.props.s,this.props.lineWidth,this.props.xOffset,this.props.yOffset,this.props.canvasRef))}},{key:"render",value:function(){var t=this;return i.a.createElement("canvas",{ref:this.props.canvasRef,width:this.props.width,height:this.props.height,onMouseDown:this.props.running?null:function(e){return t.props.onMouseDown(e)},onTouchStart:this.props.running?null:function(e){return t.props.onTouchStart(e)}})}}]),a}(i.a.Component);function _(t,e,a,n,i){for(var s=[[t]],r=new Set,o=[];s.length>0;){var c=s.shift(),l=c[c.length-1];if(!r.has(l.i+","+l.j)){if(r.add(l.i+","+l.j),!k(l,t)&&!k(l,e)){var h=Object.assign({},i[[l.i,l.j]],{fill:"#6495ed"});o.push(h)}var u,f=N(l),d=Object(m.a)(f);try{for(d.s();!(u=d.n()).done;){var p=u.value;if(M(p,i,a,n)&&!r.has(p.i+","+p.j)){var v=c.concat([p]);if(k(p,e))return[v,o];var g=Object.assign({},i[[p.i,p.j]],{fill:"#4b0082"});o.push(g),s.unshift(v)}}}catch(j){d.e(j)}finally{d.f()}}}return[[],o]}function tt(t,e,a,n,i){for(var s=[[t]],r=new Set,o=[];s.length>0;){var c=s.shift(),l=c[c.length-1];if(!r.has(l.i+","+l.j)){if(r.add(l.i+","+l.j),!k(l,t)&&!k(l,e)){var h=Object.assign({},i[[l.i,l.j]],{fill:"#6495ed"});o.push(h)}var u,f=N(l),d=Object(m.a)(f);try{for(d.s();!(u=d.n()).done;){var p=u.value;if(M(p,i,a,n)&&!r.has(p.i+","+p.j)){var v=c.concat([p]);if(k(p,e))return[v,o];var g=Object.assign({},i[[p.i,p.j]],{fill:"#4b0082"});o.push(g),s.push(v)}}}catch(j){d.e(j)}finally{d.f()}}}return[[],o]}function et(t,e,a,n,i){for(var s=[[t]],r=new Set,o=[];s.length>0;){var c=s.shift(),l=c[c.length-1];if(!r.has(l.i+","+l.j)){if(r.add(l.i+","+l.j),!k(l,t)&&!k(l,e)){var h=Object.assign({},i[[l.i,l.j]],{fill:"#6495ed"});o.push(h)}var u=N(l);u.sort((function(t,a){return D(a,e)-D(t,e)}));var f,d=Object(m.a)(u);try{for(d.s();!(f=d.n()).done;){var p=f.value;if(M(p,i,a,n)&&!r.has(p.i+","+p.j)){var v=c.concat([p]);if(k(p,e))return[v,o];var g=Object.assign({},i[[p.i,p.j]],{fill:"#4b0082"});o.push(g),s.unshift(v)}}}catch(j){d.e(j)}finally{d.f()}}}return[[],o]}function at(t,e,a,n,i){for(var s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:2,r=[[t]],o=new Set,c=[];r.length>0;){var l=r.shift(),h=l[l.length-1];if(!o.has(h.i+","+h.j)){if(o.add(h.i+","+h.j),!k(h,t)&&!k(h,e)){var u=Object.assign({},i[[h.i,h.j]],{fill:"#6495ed"});c.push(u)}var f=N(h);f.sort((function(t,a){return D(a,e)-D(t,e)})),f=f.filter((function(t){return M(t,i,a,n)&&!o.has(t.i+","+t.j)})).slice(-s);var d,p=Object(m.a)(f);try{for(p.s();!(d=p.n()).done;){var v=d.value,g=l.concat([v]);if(k(v,e))return[g,c];var j=Object.assign({},i[[v.i,v.j]],{fill:"#4b0082"});c.push(j),r.push(g)}}catch(b){p.e(b)}finally{p.f()}}}return[[],c]}function nt(t,e,a,n,i){var s=new R((function(t,e){return t.distance<e.distance}));s.insert({distance:D(t,e),path:[t]});for(var r=new Set,o=[];s.length()>0;){var c=s.shift().path,l=c[c.length-1];if(!r.has(l.i+","+l.j)){if(r.add(l.i+","+l.j),!k(l,t)&&!k(l,e)){var h=Object.assign({},i[[l.i,l.j]],{fill:"#6495ed"});o.push(h)}var u,f=N(l),d=Object(m.a)(f);try{for(d.s();!(u=d.n()).done;){var p=u.value;if(M(p,i,a,n)&&!r.has(p.i+","+p.j)){var v=c.concat([p]);if(k(p,e))return[v,o];var g=Object.assign({},i[[p.i,p.j]],{fill:"#4b0082"});o.push(g),s.insert({distance:D(p,e),path:v})}}}catch(j){d.e(j)}finally{d.f()}}}return[[],o]}var it={empty:1,weight:10,target:1};function st(t,e,a,n,i){var s=new R((function(t,e){return t.distance<e.distance}));s.insert({distance:0,path:[t]});for(var r=new Set,o=[],c=1/0,l=[];s.length()>0;){var h=s.shift(),u=h.distance,f=h.path,d=f[f.length-1];if(!r.has(d.i+","+d.j)){if(r.add(d.i+","+d.j),!k(d,t)&&!k(d,e)){var p=Object.assign({},i[[d.i,d.j]],{fill:"#6495ed"});o.push(p)}var v=N(d);v=v.filter((function(t){return M(t,i,a,n)&&!r.has(t.i+","+t.j)}));var g,j=Object(m.a)(v);try{for(j.s();!(g=j.n()).done;){var b=g.value,y=f.concat([b]),O=u+it[i[[b.i,b.j]].type];if(O>=c){if(!k(b,e)){var w=Object.assign({},i[[b.i,b.j]],{fill:"#4b0082"});o.push(w)}}else if(k(b,e))l=y,c=O;else{var x=Object.assign({},i[[b.i,b.j]],{fill:"#4b0082"});o.push(x),s.insert({distance:O,path:y})}}}catch(S){j.e(S)}finally{j.f()}}}return[l,o]}function rt(t,e,a,n,i){var s=new R((function(t,e){return t.estimatedDistance<e.estimatedDistance}));s.insert({estimatedDistance:D(t,e),distance:0,path:[t]});for(var r=new Set,o=[];s.length()>0;){var c=s.shift(),l=c.distance,h=c.path,u=h[h.length-1];if(!r.has(u.i+","+u.j)){if(r.add(u.i+","+u.j),!k(u,t)&&!k(u,e)){var f=Object.assign({},i[[u.i,u.j]],{fill:"#6495ed"});o.push(f)}var d=N(u);d=d.filter((function(t){return M(t,i,a,n)&&!r.has(t.i+","+t.j)}));var p,v=Object(m.a)(d);try{for(v.s();!(p=v.n()).done;){var g=p.value,j=h.concat([g]),b=l+it[i[[g.i,g.j]].type];if(k(g,e))return[j,o];var y=Object.assign({},i[[g.i,g.j]],{fill:"#4b0082"});o.push(y),s.insert({estimatedDistance:b+D(g,e),distance:b,path:j})}}catch(O){v.e(O)}finally{v.f()}}}return[[],o]}var ot={0:10,1:100,2:1e3,3:1e4,4:1/0},ct={0:5,1:Math.pow(5,2),2:Math.pow(5,3),3:Math.pow(5,4),4:1/0},lt={0:3,1:Math.pow(3,2),2:Math.pow(3,3),3:Math.pow(3,4),4:1/0},ht={0:2*Math.PI,1:2*Math.PI,2:6*Math.PI,3:6*Math.PI,4:1/0};function ut(t,e,a,n){var i;switch(a((function(t){return{running:!0,updateID:t.updateID+1}})),t.algorithm){case 0:i=_;break;case 1:i=tt;break;case 2:i=et;break;case 3:i=at;break;case 4:i=nt;break;case 5:i=st;break;case 6:i=rt;break;default:i=tt}var s=i(t.startNode,t.targetNode,t.xUnits,t.yUnits,t.board),r=Object(O.a)(s,2);!function(t,e,a,n,i,s,r,c,l){var h=ot[s],u=null,f=0,d=0,p=e.length;requestAnimationFrame((function v(g){l()&&(null!=u?(d=Math.floor(h*(g-u)/1e3))>0&&(!function(t,a){c((function(n){var i,s=e.slice(t,t+a),r={},c=Object(m.a)(s);try{for(c.s();!(i=c.n()).done;){var l=i.value;Object.assign(r,Object(o.a)({},[l.node.i,l.node.j],l))}}catch(h){c.e(h)}finally{c.f()}return{board:Object.assign({},n.board,r),canvasUpdates:s,updateID:n.updateID+1}}))}(f,d),f+=d,u=g):u=g,f<p?requestAnimationFrame(v):function(t,e,a,n,i,s,r,c){var l,h=ct[i],u=[],f=Object(m.a)(t.slice(1,-1));try{for(f.s();!(l=f.n()).done;){var d=l.value;u.push(Object.assign({},s[[d.i,d.j]],{fill:"#b1fc40"}))}}catch(b){f.e(b)}finally{f.f()}var p=null,v=0,g=0,j=u.length;requestAnimationFrame((function s(l){c()&&(null!=p?(g=Math.floor(h*(l-p)/1e3))>0&&(!function(t,e){r((function(a){var n,i=u.slice(t,t+e),s={},r=Object(m.a)(i);try{for(r.s();!(n=r.n()).done;){var c=n.value;Object.assign(s,Object(o.a)({},[c.node.i,c.node.j],c))}}catch(b){r.e(b)}finally{r.f()}return{board:Object.assign({},a.board,s),canvasUpdates:i,updateID:a.updateID+1}}))}(v,g),v+=g,p=l):p=l,v<j?requestAnimationFrame(s):function(t,e,a,n,i,s,r){var o=lt[i],c=t.length-1,l=c/o*1e3,h=null,u=0;requestAnimationFrame((function o(f){if(r())null!=h?function(i){var r,o,f,d,p=[t[u],t[u+1]],v=p[0],g=p[1];if((u=Math.floor((i-h)/l*c))<c){var j=[t[u],t[u+1]],b=j[1],y=[J(j[0],e,a,n),J(b,e,a,n)],O=y[0],m=U(y[1],O),w=P((i-h)/l*c-u,m);d=w,r={x:(f=O).x+d.x,y:f.y+d.y},o=T(m)}else{var x=[t[t.length-2],t[t.length-1]],k=x[1],S=[J(x[0],e,a,n),J(k,e,a,n)],M=S[1],N=U(M,S[0]);r=J(M),o=T(N)}s((function(t){return{canvasUpdates:[Object.assign({},t.board[[v.i,v.j]]),Object.assign({},t.board[[g.i,g.j]])],startPosition:Object.assign({},{pos:r,angle:o}),updateID:t.updateID+1}}))}(f):h=f,f-h<l?requestAnimationFrame(o):function(t,e,a,n,i,s,r,o){console.log("got to victory animation");var c=ht[a],l=J(t,n,i,s),h=T(K(t,e,n,i,s)),u=6*Math.PI/c*1e3,f=null;requestAnimationFrame((function e(a){o()?(null!=f?function(e){var a;a=e-f<u?h+(e-f)/u*6*Math.PI:h+6*Math.PI,r((function(e){return{canvasUpdates:[Object.assign({},e.board[[t.i,t.j]])],startPosition:Object.assign({},{pos:l,angle:a}),updateID:e.updateID+1}}))}(a):f=a,a-f<u?requestAnimationFrame(e):r((function(t){return{running:!1,updateID:t.updateID+1,canvasUpdates:[],startPosition:!1}}))):r((function(e){return{canvasUpdates:[Object.assign({},e.board[[t.i,t.j]])],startPosition:!1,updateID:e.updateID+1}}))}))}(t[t.length-1],t[t.length-2],i,e,a,n,s,r);else{var d=[t[u],t[u+1]],p=d[0],v=d[1];s((function(t){return{canvasUpdates:[Object.assign({},t.board[[p.i,p.j]]),Object.assign({},t.board[[v.i,v.j]])],startPosition:!1,updateID:t.updateID+1}}))}}))}(t,e,a,n,i,r,c))}))}(t,a,n,i,s,r,c,l))}))}(r[0],r[1],t.s,t.xOffset,t.yOffset,t.speed,t.board,a,n)}var ft=function(t){Object(h.a)(a,t);var e=Object(u.a)(a);function a(t){var n;Object(c.a)(this,a),n=e.call(this,t);var s,r=window,o=r.innerWidth,l=r.innerHeight,h=n.getWindowState(),u={1:!1,2:!1,3:!0}[h];s=1===h?.8*l:2===h?.85*l:.9*l-4;var f=o;n.canvasRef=i.a.createRef();var d=G(f,s,15),p=d.board,v=d.startNode,g=d.targetNode,j=d.xUnits,b=d.yUnits,y=d.xOffset,O=d.yOffset,m=d.lineWidth;return n.state={windowState:n.getWindowState(),showControls:u,algorithm:5,speed:2,tool:0,canvasWidth:f,canvasHeight:s,s:15,lineWidth:m,board:p,startNode:v,targetNode:g,xUnits:j,yUnits:b,xOffset:y,yOffset:O,running:!1,canvasUpdates:[],startPosition:!1,updateID:0},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var t=this;window.addEventListener("resize",(function(e){return t.handleResize()}))}},{key:"handleResize",value:function(){var t=this.getWindowState();t!==this.state.windowState&&(1!==t&&2!==t||3!==this.state.windowState?3!==t||1!==this.state.windowState&&2!==this.state.windowState?this.setState({windowState:t}):this.setState({windowState:t,showControls:!0}):this.setState({windowState:t,showControls:!1}))}},{key:"getWindowState",value:function(){var t=window,e=t.innerWidth,a=t.innerHeight;return e<481||a<481?e>a?2:1:3}},{key:"toggleSelected",value:function(t,e){"clear"!==t&&this.setState(Object(o.a)({},t,e))}},{key:"toggleControls",value:function(){this.setState((function(t){return{showControls:!t.showControls}}))}},{key:"startPathFinder",value:function(){var t=this;if(!this.state.running){this.clearBoard(1),ut(this.state,this.canvasRef,(function(e){return t.setState(e)}),(function(){return t.state.running}))}}},{key:"stopPathFinder",value:function(){this.setState((function(t){return{running:!1,updateID:t.updateID+1}}))}},{key:"onMouseDown",value:function(t){var e=this;!function(t,e,a,n){if(0===t.button){var i,s,r=a.current,c=V(t,r,e.s,e.xOffset,e.yOffset),l=c;k(c,e.startNode)?(i=function(t,e,a,n,i,s,r,o,c){return L(t,e,a,n,i,s,r,o,c)},s=1):k(c,e.targetNode)?(i=function(t,e,a,n,i,s,r,o,c){return z(t,e,a,n,i,s,r,o,c)},s=2):(F(c,c,e.s,e.lineWidth,e.xOffset,e.yOffset,a,e,(function(t){return n(t)}),e.xUnits,e.yUnits),i=function(t,e,a,n,i,s,r,o,c,l,h){return F(t,e,a,n,i,s,r,o,c,l,h)},s=0);r.addEventListener("mousemove",(function t(h){if(0===h.buttons){r.removeEventListener("mousemove",t);var u={};if(1===s){var f=Object(o.a)({},[l.i,l.j],{node:l,type:"empty",fill:"white",object:null}),d=Object(o.a)({},[c.i,c.j],{node:c,type:"start",fill:"white",object:"start"});Object.assign(u,e.board,f,d),n({board:u})}else if(2===s){var p=Object(o.a)({},[l.i,l.j],{node:l,type:"empty",fill:"white",object:null}),v=Object(o.a)({},[c.i,c.j],{node:c,type:"target",fill:"white",object:"target"});Object.assign(u,e.board,p,v),n({board:u})}}else{var g=V(h,r,e.s,e.xOffset,e.yOffset);if(k(g,c))return;if(0!==s&&!S(g,e.xUnits,e.yUnits)||1===s&&k(g,e.targetNode)||2===s&&k(g,e.startNode))return;i(c,g,e.s,e.lineWidth,e.xOffset,e.yOffset,a,e,(function(t){return n(t)}),e.xUnits,e.yUnits),c=g}}))}}(t,this.state,this.canvasRef,(function(t){return e.setState(t)}))}},{key:"onTouchStart",value:function(t){var e=this;t.preventDefault(),function(t,e,a,n){var i,s,r=a.current,c=V(t.touches[0],r,e.s,e.xOffset,e.yOffset),l=c;k(c,e.startNode)?(i=function(t,e,a,n,i,s,r,o,c){return L(t,e,a,n,i,s,r,o,c)},s=1):k(c,e.targetNode)?(i=function(t,e,a,n,i,s,r,o,c){return z(t,e,a,n,i,s,r,o,c)},s=2):(F(c,c,e.s,e.lineWidth,e.xOffset,e.yOffset,a,e,(function(t){return n(t)}),e.xUnits,e.yUnits),i=function(t,e,a,n,i,s,r,o,c,l,h){return F(t,e,a,n,i,s,r,o,c,l,h)},s=0);var h=function(t){var o=V(t.touches[0],r,e.s,e.xOffset,e.yOffset);k(o,c)||0!==s&&!S(o,e.xUnits,e.yUnits)||1===s&&k(o,e.targetNode)||2===s&&k(o,e.startNode)||(i(c,o,e.s,e.lineWidth,e.xOffset,e.yOffset,a,e,(function(t){return n(t)}),e.xUnits,e.yUnits),c=o)};r.addEventListener("touchmove",h),r.addEventListener("touchend",(function t(a){r.removeEventListener("touchmove",h),r.removeEventListener("touchend",t);var i={};if(1===s){var u=Object(o.a)({},[l.i,l.j],{node:l,type:"empty",fill:"white",object:null}),f=Object(o.a)({},[c.i,c.j],{node:c,type:"start",fill:"white",object:"start"});Object.assign(i,e.board,u,f),n({board:i})}else if(2===s){var d=Object(o.a)({},[l.i,l.j],{node:l,type:"empty",fill:"white",object:null}),p=Object(o.a)({},[c.i,c.j],{node:c,type:"target",fill:"white",object:"target"});Object.assign(i,e.board,d,p),n({board:i})}}))}(t,this.state,this.canvasRef,(function(t){return e.setState(t)}))}},{key:"clearBoard",value:function(t){var e=this;this.state.running||function(t,e,a,n){if(0===t){var i=e.current;i.getContext("2d").clearRect(0,0,i.width,i.height);var s=$(i.width,i.height,a.s),r=Object(O.a)(s,3),c=r[0],l=r[1],h=r[2];n((function(t){return{board:c,startNode:l,targetNode:h,canvasUpdates:c,updateID:t.updateID+1}}))}else if(4===t){var u=e.current;u.getContext("2d").clearRect(0,0,u.width,u.height);var f,d=window,p=d.innerWidth,v=d.innerHeight,g=p,j=G(g,f=p<481||v<481?p>v?.85*v:.8*v:.9*v-4,a.s),b=j.board,y=j.startNode,m=j.targetNode,w=j.xUnits,x=j.yUnits,k=j.xOffset,S=j.yOffset;n((function(t){return{canvasWidth:g,canvasHeight:f,board:b,startNode:y,targetNode:m,xUnits:w,yUnits:x,xOffset:k,yOffset:S,canvasUpdates:b,updateID:t.updateID+1}}))}else{var M={};if(1===t){for(var N in a.board){var D=a.board[N];if(!["white","#282c34"].includes(D.fill)){var E=Q(N),I=Object.assign({},D,{fill:"white"});Object.assign(M,Object(o.a)({},[E.i,E.j],I))}}Object.assign(M,Object(o.a)({},[a.targetNode.i,a.targetNode.j],a.board[[a.targetNode.i,a.targetNode.j]]))}else if(2===t)for(var C in a.board){var P=a.board[C];if("wall"===P.type){var U=Q(C),W=Object.assign({},P,{type:"empty",fill:"white",object:null});Object.assign(M,Object(o.a)({},[U.i,U.j],W))}}else if(3===t)for(var B in a.board){var T=a.board[B];if("weight"===T.type){var R=Q(B),F=Object.assign({},T,{type:"empty",fill:"white",object:null});Object.assign(M,Object(o.a)({},[R.i,R.j],F))}}n((function(t){return{board:Object.assign({},t.board,M),canvasUpdates:M,updateID:t.updateID+1}}))}}(t,this.canvasRef,this.state,(function(t){return e.setState(t)}))}},{key:"changeHexSize",value:function(t){this.state.running||t===this.state.s||this.setState((function(e){return Object.assign({},G(e.canvasWidth,e.canvasHeight,t),{updateID:e.updateID+1,canvasUpdates:[],s:t})}))}},{key:"render",value:function(){var t=this;return i.a.createElement("div",{className:"PathFinder"},i.a.createElement("div",{className:"Bars-Wrapper"},i.a.createElement(d.a,{className:"bars",icon:p.c,onClick:function(e){return t.toggleControls()}}),i.a.createElement("div",{className:"Algorithm-Text"},{0:"Depth-First Search",1:"Breadth-First Search",2:"Hill Climbing",3:"Beam Search (\u03c9=2)",4:"Best-First Search",5:"Branch & Bound",6:"A* Search"}[this.state.algorithm])),i.a.createElement(y,{windowState:this.state.windowState,showControls:this.state.showControls,running:this.state.running,hexSize:this.state.s,toggleSelected:function(e,a){return t.toggleSelected(e,a)},clearBoard:function(e){return t.clearBoard(e)},changeHexSize:function(e){return t.changeHexSize(e)},startSearch:function(){return t.startPathFinder()},stopSearch:function(){return t.stopPathFinder()}}),i.a.createElement(Z,{className:"canvas",canvasRef:this.canvasRef,width:this.state.canvasWidth,height:this.state.canvasHeight,s:this.state.s,lineWidth:this.state.lineWidth,xOffset:this.state.xOffset,yOffset:this.state.yOffset,canvasUpdates:this.state.canvasUpdates,startPosition:this.state.startPosition,updateID:this.state.updateID,running:this.state.running,onMouseDown:function(e){return t.onMouseDown(e)},onTouchStart:function(e){return t.onTouchStart(e)}}))}}]),a}(i.a.Component);a(28);var dt=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(ft,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(dt,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.9c398153.chunk.js.map