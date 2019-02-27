import mandelbrot from './mandelbrot.js'
import Complex from "./complex.js";

let region = {
    firstPoint: new Complex(-2, -1),
    lastPoint: new Complex(1, 1),
    width: 300,
    height: 200
};
let maxSteps = 20;

let matrix = mandelbrot.render(region, maxSteps);
matrix = mandelbrot.normalize(matrix, 0, maxSteps);

let canvas = document.getElementById('mainCanvas');
let context = canvas.getContext('2d');
let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

context.putImageData(mandelbrot.draw(matrix, imageData), 0, 0);
