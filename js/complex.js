/**
 * Represents and handles math operations on complex numbers
 */
export default class Complex {

    /** Creates a new complex number */
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }

    /** Returns the sum of two complex numbers */
    add(other) {
        return new Complex(
            this.real + other.real,
            this.imag + other.imag
        );
    }

    /** Returns the square of a complex number */
    square() {
        return new Complex(
            this.real * this.real - this.imag * this.imag,
            2 * this.real * this.imag
        );
    }

    /** Returns the square of the magnitude of a complex number */
    absSquare() {
        return this.real * this.real + this.imag * this.imag;
    }
}
