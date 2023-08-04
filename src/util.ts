import { Color } from "./Color";
import { Vector2 } from "./Vector2";

export function clearCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    if (ctx != null)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}
export function sampleDirection(angle1: number, angle2: number) {
    let t = Math.random();
    let theta = angle1 * t + angle2 * (1 - t);
    return new Vector2(Math.cos(theta), Math.sin(theta));
}

export function sampleColor(color1: Color, color2: Color) {
    let t = Math.random();
    return color1.multiply(t).add(color2.multiply(1 - t));
}

export function sampleNumber(value1: number, value2: number) {
    let t = Math.random();
    return value1 * t + value2 * (1 - t);
}