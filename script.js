console.log("script.js initialising...")


let aspect_selector = document.getElementById("aspect_selector");
for (let aspect of aspect_graph.nodes) {
    let filepath = "aspect_images/" + getImageName(aspect);
    let myImg = document.createElement("img");
    myImg.src = filepath;
    aspect_selector.appendChild(myImg);
}


