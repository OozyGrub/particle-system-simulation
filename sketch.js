const flock = [];

let alignSlider, cohesionSlider, seperationSlider;

function setup() {
    createCanvas(640, 360);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1.5, 0.1);
    seperationSlider = createSlider(0, 5, 2, 0.1);
    flock.push(new Boid());
    for (let i = 0; i < 100; i++){
        flock.push(new Boid());
    }
}

function draw() {
    background(51);

    for (let boid of flock) {
        boid.flock(flock);
        boid.edges();
        boid.update();
        boid.show();
    }
}