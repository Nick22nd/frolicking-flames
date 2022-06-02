export class Vector2 {
    x: number;
    y: number;
    static zero = new Vector2(0, 0);
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    euLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    sqrLength() {
        return this.x * this.x + this.y * this.y;
    }
    copy() {
        return new Vector2(this.x, this.y);
    }
    normalize() {
        const inv = 1 / this.euLength();
        return new Vector2(this.x * inv, this.y * inv);
    }
    add(v: Vector2) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    subtract(v: Vector2) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    multiply(f: number) {
        return new Vector2(this.x * f, this.y * f);
    }
    /**
     * 
     * @param {number} f 
     * @returns {Vector2}
     */
    divide(f: number) {
        const invf = 1/f;
        return new Vector2(this.x * invf, this.y * invf);
    }
    /**
     * 
     * @param {Vector2} v 
     * @returns 
     */
    dot(v: Vector2) {
        return this.x * v.x + this.y * v.y
    }
    zero() {
        return new Vector2(0, 0);
    }
}