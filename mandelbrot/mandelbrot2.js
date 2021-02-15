// This is another way of doing it without using the linspace function in mandelbrot.js, still equally or probably more laggy than mandelbrot.js.
// Inspired/taken from Coding Train's video, https://www.youtube.com/watch?v=6z7GQewK-Ks

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let re = map(x, 0, width, -2, 2);
      let im = map(y, 0, height, -2, 2);
      
      let val = map(mandelbrot(re, im, 100), 0, 100, 0, 255);
      print(val);
      let pix = (x + y * width) * 4;
      pixels[pix + 0] = val;
      pixels[pix + 1] = val;
      pixels[pix + 2] = val;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}

function mandelbrot(re, im, max_iter) {
  c = new Complex(re, im);
  z = new Complex(0, 0);
  
  for (let i = 0; i < max_iter; i++) {
    z = z.mul(z).add(c)
    if (z.re * z.re + z.im * z.im >= 4)  {
      return i
    } 
  }
  
  return max_iter
}

class Complex {
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }
  
  add (other) {
    let re = this.re + other.re;
    let im = this.im + other.im;
    return new Complex(re, im);
  }
  
  sub (other) {
    let re = this.re - other.re;
    let im = this.im - other.im;
    return new Complex(re, im);
  }
  
  mul (other) {
    let re = this.re*other.re - this.im*other.im;
    let im = this.re*other.im + other.re*this.im;
    return new Complex(re, im);
  }
}
