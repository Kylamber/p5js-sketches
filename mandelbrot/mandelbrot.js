// Code was originally from https://www.youtube.com/watch?v=gECmGwD0DaI translated into js

let rows_linspc, cols_linspc;
let result;

function setup() {
  createCanvas(400, 400);
  rows_linspc = linspace(-2, 2, width);
  cols_linspc = linspace(-2, 2, height);
  result = createArray(width, height);
  
  for (let i = 0; i < rows_linspc.length; i++) {
    for (let j = 0; j < cols_linspc.length; j++) {
      result[i][j] = mandelbrot(rows_linspc[i], cols_linspc[j], 100);
    }
  }
}

function draw() {
  background(220);
  for (let i = 0; i < rows_linspc.length; i++) {
    for (let j = 0; j < cols_linspc.length; j++) {
      let val = map(result[i][j], 0, 4, 0, 1);
      stroke(val*5, val*20, val*20);
      square(i, j, 1, 1);
    }
  }
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

// Taken from https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

// Taken from https://github.com/compute-io/linspace/blob/master/lib/index.js
function linspace( x1, x2, len ) {
  var arr, end, tmp, d;
  /*
  if (typeof x1 !== 'number' || x1 !== x1) {
	throw new TypeError('linspace()::invalid input argument. Start must be numeric.');
  }
  if (typeof x2 !== 'number' || x2 !== x2) {
	throw new TypeError( 'linspace()::invalid input argument. Stop must be numeric.' );
  }
  if ( arguments.length < 3 ) {
	len = 100;
  } else {
    if ( !isInteger( len ) || len < 0 ) {
	  throw new TypeError( 'linspace()::invalid input argument. Length must be a positive integer.' );
	}
	if ( len === 0 ) {
	  return [];
	}
  }
  */
  // Calculate the increment:
  end = len - 1;
  d = ( x2-x1 ) / end;

  // Build the output array...
  arr = new Array( len );
  tmp = x1;
  arr[ 0 ] = tmp;
  for ( var i = 1; i < end; i++ ) {
    tmp += d;
	arr[ i ] = tmp;
  }
  arr[ end ] = x2;
  return arr;
} // end FUNCTION linspace()

// Complex number system
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
