// add type.ts
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

export interface ParticleConfig {
    position: Vector2, 
    velocity: Vector2,
    acceleration?: Vector2,
    age?: number,
    life: number, 
    color: Color, 
    size: number
}
declare class Color {
    r: number;
    g: number;
    b: number;
    static black: Color;
    static white: Color;
    static red: Color;
    static green: Color;
    static blue: Color;
    static yellow: Color;
    static cyan: Color;
    static purple: Color;
    constructor(r: number, g: number, b: number);
    copy(): Color;
    add(c: Color): Color;
    multiply(s: number): Color;
    modulate(c: Color): Color;
    saturate(): void;
}
