import mandelbrot from '../js/mandelbrot.js';
import Complex from "../js/complex.js";

QUnit.module("mandelbrot.js");

QUnit.test("Test escapeTime for external point", function(assert) {
    let point = new Complex(0, 2.5);

    assert.equal(mandelbrot.escapeTime(point, 10), 0, "Result is correct for 10 max iterations");
    assert.equal(mandelbrot.escapeTime(point, 50), 0, "Result is correct for 50 max iterations");
    assert.equal(mandelbrot.escapeTime(point, 100), 0, "Result is correct for 100 max iterations");
});

QUnit.test("Test escapeTime for internal point", function(assert) {
    let point = new Complex(0, 0);

    assert.equal(mandelbrot.escapeTime(point, 10), 10, "Result is correct for 10 max iterations");
    assert.equal(mandelbrot.escapeTime(point, 50), 50, "Result is correct for 50 max iterations");
    assert.equal(mandelbrot.escapeTime(point, 100), 100, "Result is correct for 100 max iterations");
});

QUnit.test("Test escapeTime for edge point", function(assert) {
    let point = new Complex(-1.5, 0.1);

    assert.equal(mandelbrot.escapeTime(point, 3), 3, "Result is correct for 3 max iterations");
    assert.equal(mandelbrot.escapeTime(point, 5), 5, "Result is correct for 5 max iterations");
    assert.equal(mandelbrot.escapeTime(point, 10), 6, "Result is correct for 10 max iterations");
    assert.equal(mandelbrot.escapeTime(point, 50), 6, "Result is correct for 50 max iterations");
});

QUnit.test("Test render function", function(assert) {
    let region = {
        firstPoint: new Complex(-1, -1),
        lastPoint: new Complex(1, 1),
        width: 3,
        height: 5
    };
    let result = mandelbrot.render(region, 3);

    assert.equal(result.length, 3, "Size of array correct");
    assert.equal(result[0].length, 5, "Size of first row is correct");
    assert.equal(result[1].length, 5, "Size of second row is correct");
    assert.equal(result[2].length, 5, "Size of third row is correct");
    assert.strictEqual(result[3], undefined, "Fourth row doesn't exist")
});

QUnit.test("Test normalize function", function(assert) {
   let result = mandelbrot.normalize([[0, 1, 2], [3, 4, 0]], 4);

   assert.deepEqual(result, [[0.0, 0.25, 0.5], [0.75, 1.0, 0.0]], "Result is correct")
});
