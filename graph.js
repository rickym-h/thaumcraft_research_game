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
        let targetType = end.type;
        let queue = [[start]];

        function nodeInPath(nodeName, pathSoFar) {
            for (let node of pathSoFar) {
                if (node.name === nodeName) {
                    return true;
                }
            }
            return false;
        }

        while (queue.length>0) {
            let pathSoFar = queue.shift();
            let currentNode = pathSoFar[pathSoFar.length-1];
            let possibleAdjacentAspects = aspect_graph.edges[currentNode.type];
            // Get surrounding nodes
            for (let adjacentNodeName of this.get_adjacent_nodes(currentNode.name)) {
                let adjacentNode = this.get_node_from_name(adjacentNodeName)
                if ((adjacentNode.type === "empty") && (!nodeInPath(adjacentNodeName, pathSoFar))) {
                    // node is valid to add to path
                    for (let aspect of possibleAdjacentAspects) {
                        let newAdjacentNodeWithAspect = new hNode(adjacentNode.x, adjacentNode.y);
                        newAdjacentNodeWithAspect.set_type(aspect);
                        let newPathSoFar = pathSoFar.map((x)=>x);
                        newPathSoFar.push(newAdjacentNodeWithAspect);
                        queue.push(newPathSoFar)
                    }
                } else if ((end.name === adjacentNodeName) && (isConnected(currentNode.type, targetType))){
                    pathSoFar.push(end);
                    return pathSoFar;
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