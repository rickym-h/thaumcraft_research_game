function getNameFromPos(x,y) {
    return "x"+x.toString()+"y"+y.toString();
}

class hNode {
    constructor(x, y) {
        this.name = "x"+x.toString()+"y"+y.toString();
        this.x = x;
        this.y = y;
        this.type = "empty";
    }

    get_svg_img() {
        let img = document.createElement("img");
        img.src = "aspect_images/" + getImageName(this.type);
    }

    set_type(aspect) {
        this.type = aspect;
    }

    get_surrounding_node_names() {
        let upLeft = getNameFromPos(this.x-1, this.y-1);
        let upRight = getNameFromPos(this.x-1, this.y);
        let left = getNameFromPos(this.x, this.y-1);
        let right = getNameFromPos(this.x, this.y+1);
        let downLeft = getNameFromPos(this.x+1, this.y-1);
        let downRight = getNameFromPos(this.x+1, this.y);
        let list = [upLeft, upRight, left, right, downLeft, downRight]
        return list;
    }
}