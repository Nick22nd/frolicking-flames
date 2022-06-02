export declare class Vector2 {
    x: number;
    y: number;
    static zero: Vector2;
    /**
     *
     * @param {number} x
     * @param {number} y
     */
    constructor(x: number, y: number);
    euLength(): number;
    sqrLength(): number;
    copy(): Vector2;
    normalize(): Vector2;
    add(v: Vector2): Vector2;
    subtract(v: Vector2): Vector2;
    multiply(f: number): Vector2;
    /**
     *
     * @param {number} f
     * @returns {Vector2}
     */
    divide(f: number): Vector2;
    /**
     *
     * @param {Vector2} v
     * @returns
     */
    dot(v: Vector2): number;
    zero(): Vector2;
}
