console.log("graph.js initialising...")

class Graph {
    constructor() {
        this.nodes = [];
        this.edges = {};
        this.num_of_nodes = 0;
        this.num_of_edges = 0;
    }


    add_node(node) {
        this.nodes.push(node);
        this.edges[node] = [];
        this.num_of_nodes++;
    }

    add_edge(start, end) {
        this.edges[start].push(end);
        this.num_of_edges++;
    }

    get_adjacent_nodes(node) {
        return this.edges(node);
    }

    printGraph()
    {
        console.log("printing graph:")
        for (let node of this.nodes) {
            let start = node;
            if (this.edges[node] === []) {
                continue;
            }
            let target = "";
            for (let targetNode of this.edges[node]) {
                target += targetNode + " ";
            }
            console.log(start + " -> " + target);
        }
        console.log("Nodes: " + this.num_of_nodes);
        console.log("Edges: " + this.num_of_edges);
    }

}