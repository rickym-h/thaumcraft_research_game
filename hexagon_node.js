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
}