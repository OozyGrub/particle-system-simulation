class Boid {
    constructor() {
        this.position = createVector(random(width),random(50, height/5));
        this.velocity = createVector(random(-2,2),random(0,2));
        //this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.isDead = false;
        this.isSurvive = false;
        this.maxForce = 0.2;
        this.maxSpeed = 2;
    }

    isDead() {
        return this.isDead;
    }

    isSurvive() {
        return this.isSurvive;
    }

    survive() {
        if(!this.isDead)
        {
            this.isSurvive = true;
        }
    }

    die() {
        this.isDead = true;
    }

    edges() {
        if (this.position.x > width) {
            //this.position.x = 0;
            this.velocity.mult(-1);
        } else if (this.position.x < 0) {
            //this.position.x = width;
            this.velocity.mult(-1);
        }


        if (this.position.y > height) {
            this.survive();
        } 


        if (this.position.y < 0) {
            this.velocity.mult(-1);
        }
    }

    align(boids) {
        //  Calculate the avg velocity
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if ( other != this && d < perceptionRadius ){
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;

    }

    cohesion(boids) {
        //  Calculate the avg velocity grouping
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if ( other != this && d < perceptionRadius ){
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;

    }

    seperation(boids) {
        //  Calculate the avg velocity grouping
        let perceptionRadius = 30;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if ( other != this && d < perceptionRadius ){
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;

    }

    wallAvoid() {
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        if (this.position.x > width-perceptionRadius) {
            let d = width-perceptionRadius-this.position.x;
            let diff = p5.Vector.sub(createVector(this.position.x, this.position.y), createVector(width-perceptionRadius ,this.position.y));
            diff.div(d);
            steering.add(diff);
            total++;
        } else if (this.position.x < perceptionRadius) {
            let d = this.position.x;
            let diff = p5.Vector.sub(createVector(this.position.x, this.position.y), createVector(0 ,this.position.y));
            diff.div(d);
            steering.add(diff);
            total++;
        }
        
        if (this.position.y < perceptionRadius) {
            let d = this.position.y;
            let diff = p5.Vector.sub(createVector(this.position.x, this.position.y), createVector(this.position.x, 0));
            diff.div(d);
            steering.add(diff);
            total++;
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    obstacleAvoid(obstacles) {
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        for (let obstacle of obstacles) {
            let d = dist(this.position.x, this.position.y, obstacle.position.x, obstacle.position.y);
            if (d < 2.5){
                let diff = p5.Vector.sub(this.position, obstacle.position);
                diff.div(d);
                steering.x = diff.x;
                steering.y = diff.y;
                return steering;
            }
            
            else if (d < perceptionRadius){
                let diff = p5.Vector.sub(this.position, obstacle.position);
                diff.div(d);
                steering.add(diff);
                total++;
            }

        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    inObstacle(obstacles) {
        for (let obstacle of obstacles) {
            let d = dist(this.position.x, this.position.y, obstacle.position.x, obstacle.position.y);
            if (d < 2.5){
                return true;
            }
        }
        return false;
    }

    fireAvoid(fire) {
        let perceptionRadius = 100;
        let steering = createVector();
        let d = this.position.y - fire.distance;
        if ( d < 0 ) {
            this.die();
        }
        else if (d < perceptionRadius) {
            steering.y += 1/d;
        }
        return steering;
    }

    flock(boids, obstacles, fire) {
        this.acceleration.mult(0);
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let seperation = this.seperation(boids);

        let wallAvoid = this.wallAvoid();
        let obstacleAvoid = this.obstacleAvoid(obstacles);
        let fireAvoid = this.fireAvoid(fire);

        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        seperation.mult(seperationSlider.value());
        wallAvoid.mult(0.5);
        obstacleAvoid.mult(0.5);
        fireAvoid.mult(0.7);

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(seperation);

        this.acceleration.add(wallAvoid);
        this.acceleration.add(obstacleAvoid);
        this.acceleration.add(fireAvoid);

    }

    update(obstacles) {
        if(!this.inObstacle(obstacles)){
            this.position.add(this.velocity);
        }
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }

    show() {
        strokeWeight(5);
        if( this.isDead ){
            stroke('red');
        } else {
            stroke('white');
        }
        let x = this.position.x;
        let y = this.position.y;
        let a = createVector(this.acceleration.x, this.acceleration.y);
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