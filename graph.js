class Graph {
    constructor() {
        this.nodes = [];
        this.edges = {};
        this.num_of_nodes = 0;
        this.num_of_edges = 0;
    }

    get_node_from_name(name) {
        for (let node of this.nodes) {
            if (node.name === name) {
                return node;
            }
        }
        return "NODE NOT FOUND";
    }


    add_node(node) {
        this.nodes.push(node);
        this.edges[node] = [];
        this.num_of_nodes++;
    }

    add_edge(start, end) {
        if (this.edges[start] === undefined) {
            this.edges[start] = [];
        }
        this.edges[start].push(end);
        this.num_of_edges++;
    }

    get_adjacent_nodes(node) {
        return this.edges[node];
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

    BFS (start, end) {
        console.log("start: " + start.name + " end: " + end.name)
        let queue = [];
        queue.push([start]);
        while (queue.length>0) {
            let path = queue.shift();
            console.log("path: " + path.map(x => x.name))
            let node = path[path.length-1];
            for (let adjacentNodeName of this.edges[node.name]) {
                console.log("node: " + adjacentNodeName)
                let adjacentNode = this.get_node_from_name(adjacentNodeName);
                if (adjacentNode.name === end.name) {
                    console.log("returning path")
                    path.push(adjacentNode);
                    return path;
                }
                if (!path.includes(adjacentNode)) {
                    let newPath = path.map(x=>x);
                    newPath.push(adjacentNode);
                    queue.push(newPath);
                    console.log("adding new path:" + newPath.map(x => x.name))
                }
            }
        }
        return "NOT FOUND"


    }

    getStartAndEnd() {
        let out = []
        for (let node of this.nodes) {
            if (node.type !== "empty") {
                out.push(node);
            }
        }
        return out;
    }

}