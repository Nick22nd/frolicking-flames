import { Vector2 } from "./Vector2"

export class Rect {
    width: number
    height: number
    center: Vector2
    constructor(center: Vector2, width: number, height: number) {
        this.center = center;
        this.width = width;
        this.height = height
    }
    get left() {
        return this.center.x - this.width / 2
    }
    get right() {
        return this.center.x + this.width / 2
    }
    get top() {
        return this.center.y - this.height / 2
    }
    get bottom() {
        return this.center.y + this.height / 2
    }
    move(step: Vector2) {
        this.center = this.center.add(step)
    }
}