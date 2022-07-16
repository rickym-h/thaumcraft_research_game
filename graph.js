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

class Graph {
    constructor() {
        this.nodes = [];
        this.edges = {};
        this.num_of_nodes = 0;
        this.num_of_edges = 0;
        this.complete = false;
    }

    checkCompleteness(original) {
        let myStartingNodes = [];
        for (let key of Object.keys(original)) {
            if (original[key] !== "empty") {
                myStartingNodes.push(key)
            }
        }

        // take the first starting node, and do a bfs, returning true if all the nodes are visited
        let visited = [];
        let myQueue = [myStartingNodes[0]]
        while (myQueue.length > 0) {
            let currentNode = myQueue.shift();
            let adjacentNodes = this.get_adjacent_nodes(currentNode);
            adjacentNodes = adjacentNodes.filter((n)=> {
                if (this.get_node_from_name(n).type === "empty") {
                    return false;
                }
                return isConnected(this.get_node_from_name(n).type, this.get_node_from_name(currentNode).type);
            })

            adjacentNodes = adjacentNodes.filter((n)=>{return !visited.includes(n)})
            for (let adjacentNode of adjacentNodes) {
                myQueue.push(adjacentNode)
                visited.push(adjacentNode)
            }
        }

        for (let startingNode of myStartingNodes) {
            if (!visited.includes(startingNode)) {
                this.complete = false;
                return;
            }
        }
        this.complete = true;
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

    set_nodes_to_dict(input) {
        for (let node of this.nodes) {
            node.type = input[node.name];
        }
    }

    getChainOfNodesStartingFrom(startingNode, chainLength = 6) {
        // do a breadth first search where it takes a random directions each time
        // return first chain of length >=chain length
        // if no path found, then no path is possible
        let visited = [startingNode];
        let longestSoFar = [startingNode];
        let myQueueOfPaths = [[startingNode]];
        while (myQueueOfPaths.length > 0) {
            // pop last path
            let lastPath = myQueueOfPaths.shift();
            // check length and return if valid
            if (lastPath.length >= chainLength) {
                return lastPath;
            } else {
                if (lastPath.length>longestSoFar.length) {
                    longestSoFar = lastPath.map(((x)=>x))
                }
            }
            // otherwise, process
            // add adjacent nodes which are not in the path, and are empty
            let connectedNodes = this.get_adjacent_nodes(lastPath[lastPath.length-1].name)
            connectedNodes = connectedNodes.map((x)=>this.get_node_from_name(x))
            connectedNodes = connectedNodes.filter((n)=>((!lastPath.includes(n)) && (n.type === "empty") && (!visited.includes(n))));
            // IN RANDOM ORDER
            shuffle(connectedNodes);
            for (let adjacentNode of connectedNodes) {
                // create new path
                let newPath = lastPath.map((x)=>x);
                newPath.push(adjacentNode);
                myQueueOfPaths.push(newPath);
                visited.push(adjacentNode);
            }
        }
        return longestSoFar
    }

    canPlaceNode(node, aspect) {
        let adjacentNodes = this.get_adjacent_nodes(node.name);
        let possibleAdjacentAspects = aspect_graph.edges[aspect];
        for (let neighbourNode of adjacentNodes) {
            let nodeToCheck = this.get_node_from_name(neighbourNode);
            if (possibleAdjacentAspects.includes(nodeToCheck.type)) {
                return true;
            }
        }
        return false;
    }

}
