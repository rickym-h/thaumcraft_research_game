let aspect_selector = document.getElementById("aspect_selector");
let count = 0;
for (let aspect of aspect_graph.nodes) {
    let filepath = "aspect_images/" + getImageName(aspect);
    let myImg = document.createElement("img");
    myImg.src = filepath;
    myImg.id = aspect
    aspect_selector.appendChild(myImg);
    count++
}
console.log(count)

let original;
let solution;


function createStartingBoard(numOfExtraNodesToConnect=1) {
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

    let emptyGraphNodes = myGraph.nodes.map((x)=>x);

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
            let t = document.createElement("div");
            t.classList.toggle("top");
            let m = document.createElement("div");
            m.classList.toggle("middle");
            let b = document.createElement("div");
            b.classList.toggle("bottom");

            m.textContent = currentNode.name;

            // Add image if it is not empty
            if (currentNode.type !== "empty") {
                let img = currentNode.get_svg_img();
                // todo make image bigger
                m.appendChild(img);
            }

            hex.addEventListener("click", function () {
                if ((!graph.complete) && (currentNode.type === "empty")) {
                    currentNode.set_type("water")
                    initBoard(graph);
                }

                // check if the board is complete and update graph.complete
            })


            hex.appendChild(t);
            hex.appendChild(m);
            hex.appendChild(b);

            hexRow.appendChild(hex);
        }
        board.appendChild(hexRow);
    }
}

let graph = createStartingBoard();
initBoard(graph);

let new_board_button = document.getElementById("new-board");
new_board_button.addEventListener("click", function() {
    let graph = createStartingBoard();
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
    console.log("showing solution")

    graph.set_nodes_to_dict(solution)
    graph.complete = true;
    initBoard(graph)
})
