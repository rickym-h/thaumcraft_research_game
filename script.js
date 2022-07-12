let aspect_selector = document.getElementById("aspect_selector");
for (let aspect of aspect_graph.nodes) {
    let filepath = "aspect_images/" + getImageName(aspect);
    let myImg = document.createElement("img");
    myImg.src = filepath;
    aspect_selector.appendChild(myImg);
}

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

    console.log(myGraph.edges)


    return myGraph;

}

function initBoard(graph) {
    let board = document.getElementById("board");
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
        for (let i of row) {
            let hex = document.createElement("div");
            hex.classList.toggle("hex");
            let t = document.createElement("div");
            t.classList.toggle("top");
            let m = document.createElement("div");
            m.classList.toggle("middle");
            let b = document.createElement("div");
            b.classList.toggle("bottom");

            m.textContent = i.name;

            hex.appendChild(t);
            hex.appendChild(m);
            hex.appendChild(b);


            hex.addEventListener("click", function () {
                console.log(i.name)
                console.log(graph.edges)
                let adjacent = graph.edges[i.name];
                console.log(adjacent);
            })



            hexRow.appendChild(hex);
        }
        board.appendChild(hexRow);
    }
}

let graph = createStartingBoard();
initBoard(graph);
