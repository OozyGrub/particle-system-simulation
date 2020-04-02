class Fire {
    constructor() {
        this.distance = 0;
        this.velocity = 1;
    }

    update() {
        this.distance += this.velocity;
    }

    show() {
        fill('orange');
        noStroke();
        rect(0, 0, width, this.distance);
        //point(this.position.x, this.position.y);
    }
}