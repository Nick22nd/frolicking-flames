import { Color } from "./Color";
import { Vector2 } from "./Vector2";
export function sampleDirection(angle1: number, angle2: number) {
    let t = Math.random();
    let theta = angle1 * t + angle2 * (1 - t);
    return new Vector2(Math.cos(theta), Math.sin(theta));
}

export function sampleColor(color1= Color.red, color2 = Color.yellow) {
    let t = Math.random();
    return color1.multiply(t).add(color2.multiply(1 - t));
}
export function sampleNumber(value1: number, value2: number) {
    let t = Math.random();
    return value1 * t + value2 * (1 - t);
}