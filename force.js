class Force {
    constructor() {
        this.force = createVector(0,0.05);
        // this.position = createVector(random(width),random(50, height/5));
        // this.velocity = createVector(random(-1,1),0);
        // this.acceleration = createVector(0,0.1);
    }

    applyOn(position, acceleration) {
        let calForce = createVector();
        if(position.x > width/2) {
            this.force.x = -0.05;
        }
        else {
            this.force.x = 0.05;
        }
   //
        calForce.add(this.force);
        return calForce;
    }
}