// Inspired from https://www.youtube.com/watch?v=spUNpyF58BY

let waves = [];
let slider = 0;
let history = [];

function setup() {
  createCanvas(750, 750);
  frameRate(60);
  waves[0] = new Wave(1, 1);
  waves[1] = new Wave(2, 2);
  // slider = createSlider(0, 10, 1, 0.001);
}

function draw() {
  background(0);
  grid(-5, 5, -5, 5);
  
  stroke(255);
  
  // Storing the xs and ys for the center of the "mass" of the 
  // wrapped around circle wave.
  let meanx = 0;
  let meany = 0;
  
  let lastx = 0;
  let lasty = 0;
  
  let lastlx = 0;
  let lastly = 0;
  
  for (let x = 0; x < width; x+=1) {
    let mx = map(x, 0, width, -5, 5);
    
    let y = 0; 
    
    for (let wave of waves) { 
      y += -wave.calculate(mx); //positive is down...
    }
    
    y = map(y, -5, 5, 0, height);
    
    // the wave
    // ellipse(x, y, 1, 1);
    
    // let angle = TWO_PI*slider.value()*mx+PI/2;
    let angle = TWO_PI*slider*mx+PI/2;
    
    // dividing by 2 for y is to scale the wrapped around circle wave
    // adding width and height is to put it in the middle
    let calcx = y/2*cos(angle)+width/2;
    let calcy = y/2*sin(angle)+height/2;
    
    if (x == 0) {
      lastx = calcx;
      lasty = calcy;
      
      lastlx = x;
      lastly = y;
    }
    
    line(calcx, calcy, lastx, lasty);
    // Line for the wrapped around circle wave
    
    // circle(x, y, 1)
    // Circle for the wave
    // line(x, y, lastlx, lastly)
    // Line for the wave
    
    // circle(calcx, calcy, 1);
    // Circle for the wrapped around circle wave
    
    lastx = calcx;
    lasty = calcy;
    
    lastlx = x;
    lastly = y;
    
    meanx += calcx;meany += calcy; 
  }
  
  meanx = meanx/width;
  meany = meany/height;
  
  circle(meanx, meany, 5);
  
  history.push(meanx);
  for (let x = 0; x < history.length; x++) {
    // The map is for turning it around
    let y = map(history[x], 0, height, height, 0); 
    // let y = history[x]; // without the mapping.
    
    // Circle for the center of the "mass" 
    circle(x + width/2, y, 2);
  }
  
  // text(slider.value(), 0, 710);
  text(slider, 0, 710);
  slider += 1/75;
}

// To make the grid.
function grid(lowx, highx, lowy, highy) {
  fill(255, 255, 255, 100);
  let rangex = highx - lowx;
  let rangey = highy - lowy;
  let divisionx = width/rangex;
  let divisiony = height/rangey;
  
  stroke(100, 100, 100, 100);
  strokeWeight(1);
  for (let x = 0; x < width; x += divisionx/2) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < width; y += divisiony/2) {
    line(0, y, width, y);
  }
  
  stroke(255, 255, 255, 100);
  for (let x = 0; x < width; x += divisionx) {
    line(x, 0, x, height);
    text(map(x, 0, width, lowx, highy), x+3, height/2+10);
  }
  for (let y = 0; y < width; y += divisiony) {
    line(0, y, width, y);
    text(map(y, 0, width, highy, lowy), width/2+3, y+10);
  }
  
  stroke(0, 100, 255, 100);
  strokeWeight(2);
  line(width/2, 0, width/2, height);
  line(0, height/2, width, height/2);
  
  //RESET
  strokeWeight(1);
  stroke(255);
  fill(255);
}

class Wave {
  constructor(amplitude, frequency) {
    this.amplitude = amplitude;
    this.frequency = frequency;
  }
  
  calculate(x) {
    return sin(TWO_PI*x*this.frequency)*this.amplitude;
  }
}
