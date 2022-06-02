export declare class Color {
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
