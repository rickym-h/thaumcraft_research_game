console.log("aspect_graph.js initialising...")

let base_aspects = [
    "air",
    "earth",
    "fire",
    "water",
    "order",
    "entropy"
];
let compound_aspects = {
    "void": ["air", "entropy"],
    "light": ["air", "fire"],
    "energy": ["order", "fire"],
    "motion": ["air", "water"],
    "stone": ["earth", "earth"],
    "life": ["water", "earth"],
    "weather": ["air", "cold"],
    "cold": ["water", "order"],
    "crystal": ["stone", "water"],
    "death": ["life", "entropy"],
    "flight": ["air", "motion"],
    "darkness": ["void", "light"],
    "soul": ["life", "death"],
    "heal": ["life", "life"],
    "travel": ["motion", "earth"],
    "poison": ["water", "death"],
    "eldritch": ["void", "darkness"],
    "magic": ["void", "energy"],
    "aura": ["magic", "air"],
    "taint": ["magic", "entropy"],
    "seed": ["life", "order"],
    "slime": ["life", "water"],
    "plant": ["seed", "earth"],
    "tree": ["air", "plant"],
    "beast": ["motion", "life"],
    "flesh": ["death", "beast"],
    "undead": ["motion", "death"],
    "mind": ["earth", "soul"],
    "senses": ["air", "soul"],
    "man": ["beast", "mind"],
    "crop": ["plant", "man"],
    "harvest": ["crop", "tool"],
    "metal": ["stone", "order"],
    "mine": ["man", "stone"],
    "tool": ["man", "order"],
    "weapon": ["tool", "entropy"],
    "armor": ["tool", "earth"],
    "hunger": ["life", "void"],
    "greed": ["man", "hunger"],
    "craft": ["man", "tool"],
    "cloth": ["tool", "beast"],
    "mechanism": ["motion", "tool"],
    "trap": ["motion", "entropy"],
    "exchange": ["motion", "water"],
    "wrath": ["weapon", "fire"],
    "nether": ["fire", "magic"],
    "gluttony": ["hunger", "void"],
    "envy": ["senses", "hunger"],
    "sloth": ["trap", "soul"],
    "pride": ["flight", "void"],
    "lust": ["flesh", "hunger"],
    "time": ["void", "order"],
    "electricity": ["energy", "mechanism"],
    "magnetism": ["metal", "travel"],
    "cheatiness": ["mine", "greed"],
    "radioactivity": ["light", "energy"],
    "stupidity": ["entropy", "mind"]
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


console.log("Created aspect graph.");