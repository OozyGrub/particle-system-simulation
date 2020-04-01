class Boid {
    constructor() {
        this.position = createVector(random(width),random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 4;
    }

    edges() {
        if (this.position.x > width) {
            //this.position.x = 0;
            this.velocity.mult(-1);
        } else if (this.position.x < 0) {
            this.velocity.mult(-1);
            //this.position.x = width;
        }

        if (this.position.y > height) {
            this.velocity.mult(-1);
            //this.position.y = 0;
        } else if (this.position.y < 0) {
            this.velocity.mult(-1);
            //this.position.y = height;
        }
    }

    align(boids) {
        //  Calculate the avg velocity
        let perceptionRadius = 100;
        let steeringVelocity = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if ( other != this && d < perceptionRadius ){
                steeringVelocity.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steeringVelocity.div(total);
            steeringVelocity.setMag(this.maxSpeed);
            steeringVelocity.sub(this.velocity);
            steeringVelocity.limit(this.maxForce);
        }
        return steeringVelocity;

    }

    cohesion(boids) {
        //  Calculate the avg velocity grouping
        let perceptionRadius = 100;
        let steeringVelocity = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if ( other != this && d < perceptionRadius ){
                steeringVelocity.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steeringVelocity.div(total);
            steeringVelocity.sub(this.position);
            steeringVelocity.setMag(this.maxSpeed);
            steeringVelocity.sub(this.velocity);
            steeringVelocity.limit(this.maxForce);
        }
        return steeringVelocity;

    }

    seperation(boids) {
        //  Calculate the avg velocity grouping
        let perceptionRadius = 50;
        let steeringVelocity = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if ( other != this && d < perceptionRadius ){
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d);
                steeringVelocity.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steeringVelocity.div(total);
            steeringVelocity.setMag(this.maxSpeed);
            steeringVelocity.sub(this.velocity);
            steeringVelocity.limit(this.maxForce);
        }
        return steeringVelocity;

    }



    flock(boids) {
        this.acceleration.mult(0);
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let seperation = this.seperation(boids);

        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        seperation.mult(seperationSlider.value());

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(seperation);

    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }

    show() {
        strokeWeight(8);
        stroke(255);
        point(this.position.x, this.position.y );
    }
}