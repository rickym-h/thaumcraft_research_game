let aspect_selector = document.getElementById("aspect_selector");
for (let aspect of aspect_graph.nodes) {
    let filepath = "aspect_images/" + getImageName(aspect);
    let myImg = document.createElement("img");
    myImg.src = filepath;
    aspect_selector.appendChild(myImg);
}

let original_nodes;


function createStartingBoard() {
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

    console.log("test")


    // generate a solution, and then a starting board based on the solution

    let complete = false;

    shuffle(myGraph.nodes)

    let chainLength = 8;



    let nodeChain = myGraph.getChainOfNodesStartingFrom(myGraph.nodes[0], chainLength);
    console.log(nodeChain)
    let startingAspect = getRandomAspect();
    let aspectChain = getConnectedAspectChainStartingFromWithLength(startingAspect, nodeChain.length);
    console.log(aspectChain);

    for (let i = 0; i<nodeChain.length; i++) {
        nodeChain[i].type = aspectChain[i]
    }

    original_nodes = myGraph.nodes;


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
                if (!graph.complete) {
                    graph.get_node_from_name(currentNode.name).set_type("water")
                    initBoard(graph);
                    graph.isComplete();
                }
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
    graph.nodes = original_nodes;
    graph.complete = false;
    initBoard(graph);
})


let solve_board_button = document.getElementById("solve-board");
solve_board_button.addEventListener("click", function() {
    graph.nodes = original_nodes;
    // todo get the solved board and display
})

console.log("finished everything")