let base_aspects = [
    "air",
    "earth",
    "fire",
    "water",
    "order",
    "entropy"
];
let compound_aspects = {
    "armor": ["tool", "earth"],
    "aura": ["magic", "air"],
    "beast": ["motion", "life"],
    "cheatiness": ["mine", "greed"],
    "cloth": ["tool", "beast"],
    "cold": ["water", "order"],
    "craft": ["man", "tool"],
    "crop": ["plant", "man"],
    "crystal": ["stone", "water"],
    "darkness": ["void", "light"],
    "death": ["life", "entropy"],
    "eldritch": ["void", "darkness"],
    "electricity": ["energy", "mechanism"],
    "energy": ["order", "fire"],
    "envy": ["senses", "hunger"],
    "exchange": ["motion", "water"],
    "flesh": ["death", "beast"],
    "flight": ["air", "motion"],
    "gluttony": ["hunger", "void"],
    "greed": ["man", "hunger"],
    "harvest": ["crop", "tool"],
    "heal": ["life", "life"],
    "hunger": ["life", "void"],
    "life": ["water", "earth"],
    "light": ["air", "fire"],
    "lust": ["flesh", "hunger"],
    "magic": ["void", "energy"],
    "magnetism": ["metal", "travel"],
    "man": ["beast", "mind"],
    "mechanism": ["motion", "tool"],
    "metal": ["stone", "order"],
    "mind": ["earth", "soul"],
    "mine": ["man", "stone"],
    "motion": ["air", "water"],
    "nether": ["fire", "magic"],
    "plant": ["seed", "earth"],
    "poison": ["water", "death"],
    "pride": ["flight", "void"],
    "radioactivity": ["light", "energy"],
    "seed": ["life", "order"],
    "senses": ["air", "soul"],
    "slime": ["life", "water"],
    "sloth": ["trap", "soul"],
    "soul": ["life", "death"],
    "stone": ["earth", "earth"],
    "stupidity": ["entropy", "mind"],
    "taint": ["magic", "entropy"],
    "time": ["void", "order"],
    "tool": ["man", "order"],
    "trap": ["motion", "entropy"],
    "travel": ["motion", "earth"],
    "tree": ["air", "plant"],
    "undead": ["motion", "death"],
    "void": ["air", "entropy"],
    "weapon": ["tool", "entropy"],
    "weather": ["air", "cold"],
    "wrath": ["weapon", "fire"]
};


aspect_graph = new Graph();
for (let aspect of base_aspects) {
    aspect_graph.add_node(aspect);
}
for (const [key] of Object.entries(compound_aspects)) {
    aspect_graph.add_node(key);
}
for (const [key, value] of Object.entries(compound_aspects)) {
    for (let aspect of value) {
        aspect_graph.add_edge(key, aspect);
        aspect_graph.add_edge(aspect, key);
    }
}

function isConnected(aspect1, aspect2) {
    return aspect_graph.edges[aspect1].includes(aspect2);

}

function getRandomAspect() {
    return aspect_graph.nodes[Math.floor(Math.random()*aspect_graph.nodes.length)];
}


function getConnectedAspectChainStartingFromWithLength(startingAspect, chainLength) {
    let myChain = [startingAspect];
    while (myChain.length < chainLength) {
        let possibleNewAspects = aspect_graph.edges[myChain[myChain.length-1]];

        let filteredPossibleNewAspects = possibleNewAspects.filter((a)=>(!myChain.includes(a)));
        if (filteredPossibleNewAspects.length === 0) {
            myChain.push(possibleNewAspects[Math.floor(Math.random()*possibleNewAspects.length)]);
        } else {
            myChain.push(filteredPossibleNewAspects[Math.floor(Math.random()*filteredPossibleNewAspects.length)]);
        }
    }

    return myChain;

}