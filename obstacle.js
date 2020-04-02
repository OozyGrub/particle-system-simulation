class Obstacle {
    constructor(index) {
        index++;
        let row = ceil(index/5);
        let col = (index%5);
        if (row % 2 == 0)
        {
            this.position = createVector(col * width / 5 + width / 10, row * height / 10);
        } else {
            this.position = createVector(col * width / 5, row * height / 10);
        }
    }

    show() {
        stroke('yellow');
        strokeWeight(20);
        point(this.position.x, this.position.y);
    }
}