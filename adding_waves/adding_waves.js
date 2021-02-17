let waves = [];

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 3; i++) {
    waves[i] = new Wave(random(20, 50), random(20, 100), random(1e-3, 1e-2));
  }
}

function draw() {
  background(0);
  stroke(255);
  translate(0, 200);
  for (let x = 0; x < width; x += 1) {
    let y = 0
    for (let wave of waves) {
      y += wave.calculate(x, frameCount);
    }
    ellipse(x, y, 5, 5);
  }
}

class Wave {
  constructor(amplitude, length, frequency, phase = 0) {
    this.amplitude = amplitude;
    this.length = length;
    this.frequency = frequency;
    this.phase = phase;
  }
  
  calculate(x, t) {
    return sin(TWO_PI * (x/this.length - t*this.frequency) + this.phase) * this.amplitude
  }
}
