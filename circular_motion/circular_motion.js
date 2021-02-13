// Inspired from https://www.youtube.com/watch?v=snHKEpCv0Hk
let degree = 0;
let n = 8; // Number of circles
let r = 50;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background('#004369');
  
  noStroke();
  
  for (var i = 0; i < n; i++){
    let x = r*cos(degree+i*90/(n/2));
    fill(color('#74BDCB'));
    ellipse(width/2 + x*cos(i*90/(n/2)), 
            height/2 + x*cos(90-(i*90/(n/2))), 
            10, 10);
  }

  fill(color('#DB1F48'));
  ellipse(width/2, height/2, 5, 5); // center circle
  fill(color('#E5DDC8'));
  ellipse(width/2 + r*cos(degree), 
          height/2 + r*cos(degree+90), 
          10, 10); // outer circle
  degree += 1 % 360;
}
