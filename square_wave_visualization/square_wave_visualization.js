// Inspired from https://www.youtube.com/watch?v=ds0cmAV-Yek

let traces = [];
let waves = [];

function setup() {
  createCanvas(800, 400);
  
  for (let i = 1; i <= 3; i++){
    let n = 2*i-1;
    waves[i-1] = new Wave(50/n, 0.008*n); 
  }
  // creates waves using loop for a square wave since it's repetitive
  // creating the waves individually would also work
}

function draw() {
  background(0);
  stroke(255);
  
  let lastLineX = 0; 
  let lastLineY = 0;
  // stores locations for lines
  let yTotal = 0;
  
  let lastCircleX = 0;
  let lastCircleY = 0;
  // stores the location of the last rotating cirlce
  
  push(); // to later then reset the translate
  noFill(); // removes fill from circle
  for (let wave of waves){
    let lineX = wave.cal_cos(frameCount);
    let lineY = wave.cal_sin(frameCount);
    
    yTotal += lineY;
    lastCircleX += lineX;
    lastCircleY += lineY;
    
    translate(lastLineX, lastLineY);
    
    let diameter = dist(150, height/2, lineX + 150, lineY + height/2)*2
    circle(150, height/2, diameter);
    line(150, height/2, lineX + 150, lineY+height/2);
    
    lastLineX = lineX;
    lastLineY = lineY;
  }
  pop(); // resets the translate
  
  yTotal += height/2;
  
  line(lastCircleX + 150, lastCircleY + height/2, 300, yTotal);
  circle(300, yTotal, 5); // the circle that's moving up and down
  for (let trace of traces) { // draws the circle's path
    trace.x += 5;
    circle(trace.x, trace.y, 2);
  }
  
  traces.push(new p5.Vector(305, yTotal));
  // stores the history of the current 
  
  if (traces[0].x > width) traces.splice(0, 1); 
  // delete the traced path that's out of view
}

class Wave {
  constructor(amplitude, frequency) {
    this.amplitude = amplitude;
    this.frequency = frequency;
  }
  
  cal_sin(t) { 
    return this.amplitude * sin(TWO_PI*t*this.frequency);
  }
  
  cal_cos(t) {
    return this.amplitude * cos(TWO_PI*t*this.frequency);
  }
}
