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

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    shuffle(myGraph.nodes);

    shuffle(aspect_graph.nodes)

    myGraph.nodes[0].set_type(getRandomAspect());
    myGraph.nodes[1].set_type(getRandomAspect());

    // REMOVE
    //myGraph.get_node_from_name("x4y2").set_type("water");
    //myGraph.get_node_from_name("x4y4").set_type("water");
    // REMOVE

    console.log(myGraph.BFS(myGraph.nodes[0], myGraph.nodes[1]))

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
                let adjacent = graph.edges[currentNode.name];

                console.log(adjacent);
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
    initBoard(graph);
})


let solve_board_button = document.getElementById("solve-board");
solve_board_button.addEventListener("click", function() {
    // todo perform bfs on graph.
    graph.nodes = original_nodes;
    initBoard(graph);

    let foo = graph.getStartAndEnd();
    console.log(graph.BFS(foo[0], foo[1]))
    console.log("done")
})
