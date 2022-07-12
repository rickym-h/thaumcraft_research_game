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
        return img;
    }

    set_type(aspect) {
        this.type = aspect;
    }

    get_surrounding_node_names() {
        let upLeft;
        let upRight;
        let left;
        let right;
        let downLeft;
        let downRight;
        switch(true) {
            case this.x < 4:
                upLeft = getNameFromPos(this.x-1, this.y-1);
                upRight = getNameFromPos(this.x-1, this.y);
                left = getNameFromPos(this.x, this.y-1);
                right = getNameFromPos(this.x, this.y+1);
                downLeft = getNameFromPos(this.x+1, this.y);
                downRight = getNameFromPos(this.x+1, this.y+1);
                break;
            case this.x === 4:
                upLeft = getNameFromPos(this.x-1, this.y-1);
                upRight = getNameFromPos(this.x-1, this.y);
                left = getNameFromPos(this.x, this.y-1);
                right = getNameFromPos(this.x, this.y+1);
                downLeft = getNameFromPos(this.x+1, this.y-1);
                downRight = getNameFromPos(this.x+1, this.y);
                break;
            case this.x > 4:
                upLeft = getNameFromPos(this.x-1, this.y);
                upRight = getNameFromPos(this.x-1, this.y+1);
                left = getNameFromPos(this.x, this.y-1);
                right = getNameFromPos(this.x, this.y+1);
                downLeft = getNameFromPos(this.x+1, this.y-1);
                downRight = getNameFromPos(this.x+1, this.y);
                break;
            default:
        }
        let list = [upLeft, upRight, left, right, downLeft, downRight]
        return list;
    }
}