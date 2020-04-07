class Particle {
    constructor() {
        this.position = createVector(random(width),random(50, height/5));
        this.velocity = createVector(random(-1,1),0);
        this.acceleration = createVector(0,0.1);

        // this.isDead = false;
        // this.isSurvive = false;
        // this.maxForce = 0.2;
        // this.maxSpeed = 2;
    }

    edges() {
        if (this.position.x > width ) {
            this.position.x = width;
            this.velocity.x *= -0.8;
        } else if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x *= -0.8;
        }


        if (this.position.y > height) {
            this.position.y = height;
            this.velocity.y *= -0.8;
        } 


        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y *= -0.8;
        }
    }

    obstacle(obstacles) {
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        let bool = true;
        for (let obstacle of obstacles) {
            let d = dist(this.position.x, this.position.y, obstacle.position.x, obstacle.position.y);
            if (d < 10){
                this.velocity.y *= -0.8;
                //this.position.y = obstacle.position.y + 10;
                let radiusVector = createVector(this.position.x - obstacle.position.x, this.position.y - obstacle.position.y);
                radiusVector.setMag(10);
                radiusVector.add(obstacle.position);
                this.position.set(radiusVector);
                bool = false;
            }
        }
        return bool;
    }

    run(particles, obstacles) {
        let obstacleHit = this.obstacle(obstacles);
        if(obstacleHit){
            let edges = this.edges();
        }
    }

    update(calForce) {
        this.position.add(this.velocity);
        //this.velocity.add(this.acceleration);
        this.velocity.add(calForce);
        //this.acceleration.set(calForce);
    }

    show() {
        strokeWeight(5);
        stroke('white');
        // if( this.isDead ){
        //     stroke('red');
        // } else {
        //     stroke('white');
        // }
        let x = this.position.x;
        let y = this.position.y;
        let v = createVector(this.velocity.x, this.velocity.y);
        let direction = createVector(v.x, v.y);
        let perp = createVector(v.x, v.y);
        direction.normalize();
        perp.rotate(HALF_PI);
        perp.normalize();
        triangle(
            x + direction.x, y + direction.y,
            x - direction.x + perp.x, y - direction.y + perp.y,
            x - direction.x - perp.x, y - direction.y - perp.y
        );
    }
}