let currentDraggedAspect = null;




function getDivInfoOfAspect(aspect) {
    let myDiv = document.createElement("div");
    let filepath = "aspect_images/" + getImageName(aspect);
    let myImg = document.createElement("img");
    myImg.src = filepath;
    myImg.id = aspect
    myDiv.appendChild(myImg);

    let head = document.createElement("p");
    let str = aspect_translations[aspect];
    head.textContent = str.charAt(0).toUpperCase() + str.slice(1);
    head.classList.toggle("aspect-names")
    head.innerHTML = "<b>" + head.innerHTML + "</b>"
    myDiv.appendChild(head);

    let body = document.createElement("p");
    str = aspect;
    body.textContent = str.charAt(0).toUpperCase() + str.slice(1);
    body.classList.toggle("aspect-names")
    myDiv.appendChild(body);
    myDiv.classList.toggle("aspect_info")

    return myDiv;
}


let info_panel = document.getElementById("info-panel");
function updateInfoPanel(aspect) {
    let type;
    switch (aspect) {
        case "air":
        case "earth":
        case "fire":
        case "water":
        case "order":
        case "entropy":
            type = "base";
            break;
        default:
            type = "compound";
    }
    info_panel.innerHTML = "";
    let focusAspect = getDivInfoOfAspect(aspect)

    info_panel.appendChild(focusAspect);
    if (type === "base") {
        let text = document.createElement("p");
        text.textContent = "BASE ELEMENT";
        info_panel.appendChild(text);
    } else if (type === "compound") {
        let text = document.createElement("p");
        text.textContent = "COMPOUND ELEMENT";
        info_panel.appendChild(text);

        let parentAspects = compound_aspects[aspect];

        let compound_display = document.createElement("div");
        compound_display.classList.toggle("compound-display");

        let left = getDivInfoOfAspect(parentAspects[0])
        let plus = document.createElement("h1");
        plus.textContent = "+";
        let right = getDivInfoOfAspect(parentAspects[1])

        compound_display.appendChild(left)
        compound_display.appendChild(plus)
        compound_display.appendChild(right)

        info_panel.appendChild(compound_display)

    }
}

let aspect_selector = document.getElementById("aspect_selector");
for (let aspect of aspect_graph.nodes) {

    let myDiv = getDivInfoOfAspect(aspect)
    myDiv.id = aspect;

    // let filepath = "aspect_images/" + getImageName(aspect);
    // let myImg = document.createElement("img");
    // myImg.src = filepath;
    // myImg.id = aspect
    //
    myDiv.addEventListener('dragstart', dragStart);
    function dragStart() {
        currentDraggedAspect = myDiv.id;
    }

    myDiv.addEventListener("mouseenter", function() {
        updateInfoPanel(aspect);
    });
    //
    // myImg.classList.toggle("aspect_image")

    aspect_selector.appendChild(myDiv);
}

let original;
let solution;


function createStartingBoard(numOfExtraNodesToConnect=0) {
    let myGraph = new Graph();


    function getNumOfHexagonsOnLine(x) {
        if (x>4) {
            return -x+12
        } else {
            return x+4
        }
    }

    myGraph.rows = 0;
    for (let row = 0; row <= 8; row++) {
        let num_of_hexagons = getNumOfHexagonsOnLine(row);
        for (let i = 0; i < num_of_hexagons; i++) {
            let hex = new hNode(row,i);
            myGraph.add_node(hex);
        }
        myGraph.rows++;
    }

    for (let node of myGraph.nodes) {
        for (let check of node.get_surrounding_node_names()) {
            if (myGraph.get_node_from_name(check) !== "NODE NOT FOUND") {
                myGraph.add_edge(node.name, myGraph.get_node_from_name(check).name)
            }
        }
    }



    // generate a solution, and then a starting board based on the solution


    shuffle(myGraph.nodes)

    let startingNodeList = [];
    let chainLength = Math.floor(Math.random() * 3) + 5;

    let nodeChain = myGraph.getChainOfNodesStartingFrom(myGraph.nodes[0], chainLength);
    let startingAspect = getRandomAspect();
    let aspectChain = getConnectedAspectChainStartingFromWithLength(startingAspect, nodeChain.length);

    for (let i = 0; i<nodeChain.length; i++) {
        nodeChain[i].type = aspectChain[i]
    }

    startingNodeList.push(nodeChain[0]);
    startingNodeList.push(nodeChain[nodeChain.length-1]);

    for (let i = 0; i < numOfExtraNodesToConnect; i++) {
        // find an extra starting node
        let possibleStarts = myGraph.nodes.filter((x)=>(x.type !== "empty"));
        shuffle(possibleStarts);
        let startingNode = possibleStarts[0];
        let newNodeChain = myGraph.getChainOfNodesStartingFrom(startingNode, chainLength);
        let newStartingAspect = startingNode.type;
        let newAspectChain = getConnectedAspectChainStartingFromWithLength(newStartingAspect, newNodeChain.length)
        for (let j = 0; j<newNodeChain.length; j++) {
            newNodeChain[j].type = newAspectChain[j]
        }
        startingNodeList.push(newNodeChain[newNodeChain.length-1])
    }


    solution = {}
    for (let node of myGraph.nodes) {
        solution[node.name] = node.type
    }
    //console.log(solution)


    for (let node of myGraph.nodes) {
        if (!startingNodeList.includes(node)) {
            node.type = "empty";
        }
    }

    original = {}
    for (let node of myGraph.nodes) {
        original[node.name] = node.type
    }
    //console.log(original)


    return myGraph;

}

function initBoard(graph) {
    let board = document.getElementById("board");
    board.innerHTML = "";
    let matrix = [];
    for (let row = 0; row <= graph.rows; row++) {
        matrix.push([]);
    }
    for (let node of graph.nodes) {
        matrix[node.x][node.y] = node;
    }

    for (let row of matrix) {
        let hexRow = document.createElement("div");
        hexRow.classList.toggle("hex-row");
        for (let currentNode of row) {
            let hex = document.createElement("div");
            hex.classList.toggle("hex");

            hex.id=currentNode.name

            let t = document.createElement("div");
            t.classList.toggle("top");
            let m = document.createElement("div");
            m.classList.toggle("middle");

            m.ondragover = function(e) {
                e.preventDefault();
            }

            m.ondrop = function(e) {
                let targetNode = e.target;
                let parentNode = targetNode.parentNode;

                let currentNode = graph.get_node_from_name(parentNode.id)

                if (parentNode.classList.contains("hex") && (!graph.complete) && (currentNode.type === "empty") && (graph.canPlaceNode(currentNode, currentDraggedAspect))) {
                    // update graph
                    currentNode.type = currentDraggedAspect;

                    // update board
                    let filepath = "aspect_images/" + getImageName(currentDraggedAspect);
                    let myImg = document.createElement("img");

                    myImg.src = filepath;
                    myImg.id = currentDraggedAspect
                    let aspect = currentDraggedAspect;
                    myImg.addEventListener("mouseenter", function() {
                        updateInfoPanel(aspect);
                    });

                    targetNode.appendChild(myImg);
                    // check if graph is complete
                    graph.checkCompleteness(original);

                    let info = document.getElementById("game-info");
                    if (graph.complete) {
                        info.textContent = "You win! Congratulations!";
                    } else {
                        info.textContent = "";
                    }
                }
            }


            let b = document.createElement("div");
            b.classList.toggle("bottom");

            //m.textContent = currentNode.name;

            // Add image if it is not empty
            if (currentNode.type !== "empty") {
                let img = currentNode.get_svg_img();
                img.addEventListener("mouseenter", function() {
                    updateInfoPanel(currentNode.type);
                });
                m.appendChild(img);
            }



            hex.appendChild(t);
            hex.appendChild(m);
            hex.appendChild(b);

            hexRow.appendChild(hex);
        }
        board.appendChild(hexRow);
    }

    for (let key of Object.keys(original)) {
        if (original[key] !== "empty") {
            updateInfoPanel(original[key])
            break;
        }
    }
}

let graph = createStartingBoard();
initBoard(graph);

let new_board_button = document.getElementById("new-board-button");
new_board_button.addEventListener("click", function() {
    let num = document.getElementById("select-starting-num");

    let graph = createStartingBoard(num.value-2);
    initBoard(graph);
})

let reset_board_button = document.getElementById("reset-board");
reset_board_button.addEventListener("click", function() {
    graph.set_nodes_to_dict(original)
    graph.complete = false;
    initBoard(graph);
})


let solve_board_button = document.getElementById("solve-board");
solve_board_button.addEventListener("click", function() {

    graph.set_nodes_to_dict(solution)
    graph.complete = true;
    initBoard(graph)
})

document.addEventListener("drop", function() {
    currentDraggedAspect = null;
})

