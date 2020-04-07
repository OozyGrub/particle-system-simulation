const particles = [];
const obstacles = [];
let force;

// let alignSlider, cohesionSlider, seperationSlider;
// let deadCount, surviveCount;
function setup() {
    createCanvas(640, 800);
    // alignSlider = createSlider(0, 3, 1.5, 0.1);
    // cohesionSlider = createSlider(0, 3, 1.5, 0.1);
    // seperationSlider = createSlider(0, 3, 1.5, 0.1);
    // deadCount = 0;
    // surviveCount = 0;
    force = new Force();
    for (let i = 0; i < 100; i++){
        obstacles.push(new Obstacle(i));
    }

    for (let i = 0; i < 100; i++){
        particles.push(new Particle());
    }
}

function draw() {
    background(50);
    // fire.update();
    // fire.show();
    for (let obstacle of obstacles) {
        obstacle.show();
    }
    // let sCount = 0;
    // let dCount = 0;
    for (let particle of particles) {
        //particle.obstacle(obstacles);
        particle.run(particles, obstacles);
        let calForce = force.applyOn(particle.position,particle.acceleration);
        //particle.edges();
        particle.update(calForce);
        particle.show();
        // if (boid.isSurvive) {
        //     sCount += 1;
        // }
        // else if (boid.isDead) {
        //     dCount += 1;
        // } 
        // else {
            // boid.show();
        // }
    }
    // deadCount = dCount;
    // surviveCount = sCount;
    // textSize(32);
    // fill("red");
    // text(deadCount.toString(), 580, 50);
    // fill("green");
    // text(surviveCount.toString(), 50, 50);
}