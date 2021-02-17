let ts = [];
let ys = [];

function setup() {
  createCanvas(1080, 1080);
  for (let t = -width/2; t < width/2; t += 1) {
    let y = 0;
    for (let w = 0; w < 50; w++) { 
      y += wave(14, w, map(t, 0, width, 0, 1));
    }
    ts.push(t);
    ys.push(y);
  }
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(2);
  translate(width/2, width/2);
  for (let i = 1; i < ts.length; i++) {
    line(ts[i-1], ys[i-1], ts[i], ys[i]);
  }
}

function wave(amplitude, frequency, t) {
  return amplitude * sin(TWO_PI * frequency * t);
}
