class Cell {
    constructor(y, x) {
        this.y = y;
        this.x = x;
        this.clicked = false;
    }
    show(width, height) {
        if (this.clicked)
            fill(255, 204, 0);
        else
            fill("white");
        rect(this.x * width, this.y * height, width, height);
        fill("white");
    }
    click() {
        this.clicked = !this.clicked;
        this.show();
    }
}