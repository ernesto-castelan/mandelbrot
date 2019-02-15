import Complex from '../js/complex.js';

QUnit.module("complex.js");

QUnit.test("Test constructor", function(assert) {
    let result = new Complex(3, 5);

    assert.equal(result.real, 3, "Real part is correct");
    assert.equal(result.imag, 5, "Imaginary part is correct");
});

QUnit.test("Test addition", function(assert) {
    let numA = new Complex(3, 5);
    let numB = new Complex(7, 1);
    let result = numA.add(numB);

    assert.equal(result.real, 10, "Real part is correct");
    assert.equal(result.imag, 6, "Imaginary part is correct");
});

QUnit.test("Test squaring for real number", function(assert) {
    let result = new Complex(3, 0).square();

    assert.equal(result.real, 9, "Real part is correct");
    assert.equal(result.imag, 0, "Imaginary part is correct");
});

QUnit.test("Test squaring for imaginary number", function(assert) {
    let result = new Complex(0, 5).square();

    assert.equal(result.real, -25, "Real part is correct");
    assert.equal(result.imag, 0, "Imaginary part is correct");
});

QUnit.test("Test squaring for complex number", function(assert) {
    let result = new Complex(3, 5).square();

    assert.equal(result.real, -16, "Real part is correct");
    assert.equal(result.imag, 30, "Imaginary part is correct");
});

QUnit.test("Test absSquare for real number", function(assert) {
    let result = new Complex(-3, 0).absSquare();

    assert.equal(result, 9, "Result is correct");
});

QUnit.test("Test absSquare for imaginary number", function(assert) {
    let result = new Complex(0, -5).absSquare();

    assert.equal(result, 25, "Result is correct");
});

QUnit.test("Test absSquare for complex number", function(assert) {
    let result = new Complex(-3, -5).absSquare();

    assert.equal(result, 34, "Result is correct");
});


