import Complex from "./complex.js";
import mandelbrot from "./mandelbrot.js";

export default {
    init:init
};

/**
 * Registers events listeners and executes necessary setup
 */
function init() {
    document.getElementById('iterationExponent').addEventListener('input', displayIterations);
    document.getElementById('renderOptions').addEventListener('submit', startRender);

    displayIterations();
    startRender(null);
}

/**
 * Updates the helper text for the iterations input
 */
function displayIterations() {
    let formInput = document.getElementById('iterationExponent');
    let helpText = document.getElementById('helpIterationExponent');

    let exponent = formInput.valueAsNumber;
    let iterations = calculateIterations(exponent);
    helpText.innerHTML = '10<sup>' + exponent + '</sup> = ' + iterations.toLocaleString('en-US') + ' iterations';
}

/**
 * Handles form submission and starts the rendering process
 */
function startRender(event) {
    let form = document.getElementById('renderOptions');

    let params = toRenderParams(serialize(form.elements));
    mandelbrot.runPipeline(params);

    if (event) event.preventDefault()
}

/**
 * Returns the real number of iterations given the iteration exponent
 */
function calculateIterations(exponent) {
    return Math.trunc(Math.pow(10, exponent));
}

/**
 * Returns the form values as an object
 */
function serialize(formElements) {
    let result = {};

    for (let i = 0; i < formElements.length; i++) {
        let control = formElements[i];
        if (control.name) {
            result[control.name] = control.valueAsNumber;
        }
    }

    return result;
}

/**
 * Transforms the serialized form
 */
function toRenderParams(form) {
    return {
        region: {
            firstPoint: new Complex(-2, -1.125),
            lastPoint: new Complex(1, 1.125),
            width: 600,
            height: 450
        },
        maxSteps: calculateIterations(form.iterationExponent),
        canvas: document.getElementById('mainCanvas')
    };
}
