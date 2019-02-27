import Complex from './complex.js'

export default {
    escapeTime: escapeTime,
    render: render,
    normalize: normalize,
    draw: draw
};

const BYTES_PER_PIXEL = 4;

/**
 * Runs the escape time algorithm on a complex point.
 * Returns the number of steps needed to reach the escape condition,
 * that is when the resulting point has magnitude greater than two.
 */
function escapeTime(startPoint, maxSteps) {
    let stepCount = 0;
    let currentPoint = startPoint;
    while (currentPoint.absSquare() <= 4 && stepCount < maxSteps) {
        currentPoint = currentPoint.square().add(startPoint);
        stepCount += 1;
    }
    return stepCount;
}

/**
 * Renders the specified region.
 * Returns a matrix with the escape time of each pixel.
 */
function render(region, maxSteps) {
    let matrix = createMatrix(region.widthPx, region.heightPx);
    let realStep = (region.lastPoint.real - region.firstPoint.real) / (region.widthPx - 1);
    let imagStep = (region.lastPoint.imag - region.firstPoint.imag) / (region.heightPx - 1);

    for (let realPx = 0; realPx < region.widthPx; realPx++) {
        for (let imagPx = 0; imagPx < region.heightPx; imagPx++) {
            let point = region.firstPoint.add(new Complex(realPx * realStep, imagPx * imagStep));
            matrix[realPx][imagPx] = escapeTime(point, maxSteps)
        }
    }
    return matrix;
}

/**
 * Normalizes the matrix values.
 * All the resulting values will be in the range 0.0 to 1.0 inclusive.
 */
function normalize(matrix, maxValue) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] /= maxValue;
        }
    }
    return matrix;
}

/**
 * Draws a normalized matrix in the specified canvas
 */
function draw(matrix, imageData) {
    let width = imageData.width;
    let height = imageData.height;
    let data = imageData.data;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let pixelIdx = (y * width + x) * BYTES_PER_PIXEL;
            let color = matrix[x][height - 1 - y] * 255;

            data[pixelIdx]     = color;
            data[pixelIdx + 1] = color;
            data[pixelIdx + 2] = color;
            data[pixelIdx + 3] = 255;
        }
    }
    return imageData;
}

/** Creates a bi-dimensional array of size N x M */
function createMatrix(n, m) {
    let matrix = new Array(n);
    for (let i = 0; i < n; i++) {
        matrix[i] = new Array(m);
    }
    return matrix;
}
