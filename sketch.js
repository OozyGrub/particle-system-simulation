const flock = [];
const obstacles = [];
let fire;
let alignSlider, cohesionSlider, seperationSlider;
let deadCount, surviveCount;
function setup() {
    createCanvas(640, 800);
    alignSlider = createSlider(0, 3, 1.5, 0.1);
    cohesionSlider = createSlider(0, 3, 1.5, 0.1);
    seperationSlider = createSlider(0, 3, 2, 0.1);
    deadCount = 0;
    surviveCount = 0;
    fire = new Fire();
    for (let i = 0; i < 100; i++){
        obstacles.push(new Obstacle(i));
    }

    for (let i = 0; i < 100; i++){
        flock.push(new Boid());
    }
}

function draw() {
    background(50);
    fire.update();
    fire.show();
    for (let obstacle of obstacles) {
        obstacle.show();
    }
    let sCount = 0;
    let dCount = 0;
    for (let boid of flock) {
        boid.flock(flock, obstacles, fire);
        boid.edges();
        boid.update(obstacles);
        if (boid.isSurvive) {
            sCount += 1;
        }
        else if (boid.isDead) {
            dCount += 1;
        } 
        else {
            boid.show();
        }
    }
    deadCount = dCount;
    surviveCount = sCount;
    textSize(32);
    fill("red");
    text(deadCount.toString(), 580, 50);
    fill("green");
    text(surviveCount.toString(), 50, 50);
}