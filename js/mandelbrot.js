import Complex from './complex.js'

export default {
    escapeTime: escapeTime,
    render: render,
    normalize: normalize,
    draw: draw
};

const BYTES_PER_PIXEL = 4;
const ESCAPE_RADIUS_SQUARE = 4;

/**
 * Runs the escape time algorithm on a complex point.
 * Returns the number of steps needed to reach the escape condition,
 * that is, when the resulting point has magnitude greater than two.
 */
function escapeTime(startPoint, maxSteps) {
    let stepCount = 0;
    let currentPoint = startPoint;

    while (currentPoint.absSquare() <= ESCAPE_RADIUS_SQUARE && stepCount < maxSteps) {
        currentPoint = currentPoint.square().add(startPoint);
        stepCount += 1;
    }

    return stepCount;
}

/**
 * Renders the specified region of the complex plane into a matrix.
 * Returns the matrix with the escape time value for each rendered pixel.
 *
 * The region object must contain the following properties:
 *   - width: Width of the render in pixels
 *   - height: Height of the render in pixels
 *   - firstPoint: Bottom-left point of the complex region
 *   - lastPoint: Upper-right point of the complex region
 */
function render(region, maxSteps) {
    let matrix = createMatrix(region.width, region.height);
    let realDelta = (region.lastPoint.real - region.firstPoint.real) / (region.width - 1);
    let imagDelta = (region.lastPoint.imag - region.firstPoint.imag) / (region.height - 1);

    for (let x = 0; x < region.width; x++) {
        for (let y = 0; y < region.height; y++) {
            let point = region.firstPoint.add(new Complex(x * realDelta, y * imagDelta));
            matrix[x][y] = escapeTime(point, maxSteps)
        }
    }

    return matrix;
}

/**
 * Normalizes the matrix values.
 * Values outside the [min, max] range will be clipped.
 * The resulting values will be in the [0.0, 1.0] range.
 */
function normalize(matrix, min, max) {
    let range = max - min;

    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            let value = matrix[x][y];
            if (value <= min) value = 0.0;
            else if (value >= max) value = 1.0;
            else value = (value - min) / range;
            matrix[x][y] = value;
        }
    }

    return matrix;
}

/**
 * Draws the matrix into a canvas' pixel data.
 * Assumes that the matrix is normalized.
 */
function draw(matrix, imageData) {
    let width = imageData.width;
    let height = imageData.height;
    let data = imageData.data;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            // Canvas' y direction is reversed
            let yCanvas = (height - 1) - y;
            let index = (yCanvas * width + x) * BYTES_PER_PIXEL;

            let color = matrix[x][y] * 255;
            data[index] = color;
            data[index + 1] = color;
            data[index + 2] = color;
            data[index + 3] = 255;
        }
    }

    return imageData;
}

/**
 * Creates an empty matrix of the specified size
 */
function createMatrix(width, height) {
    let matrix = new Array(width);
    for (let i = 0; i < width; i++) {
        matrix[i] = new Array(height);
    }
    return matrix;
}
