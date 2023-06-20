import {Vector2} from "./Vector2";
import {Color} from "./Color";
import {Rect} from "./Rect";
enum Shape {
    Circle,
    Rect
}
export class Sprite {
    position: Vector2
    size = 20
    angle = 0
    angleSpeed = Math.PI
    center: Vector2 = new Vector2(200, 200)
    color: Color
    private rotateDirector: number = 1;
    radius: number
    constructor(position: Vector2, color: Color) {
        this.position = position;
        this.color = color;
        this.radius = this.position.subtract(this.center).euLength()
        let relativePosition = position.subtract(this.center)
        this.angle = this.getInitAngle(relativePosition)
        console.log("init angle: ---- ", this.angle / Math.PI * 180, this.position)
    }
    update(dt: number) {
        // console.log("update angle and position: ", this.angle / Math.PI * 180, this.position)
        this.angle = (this.angle + this.angleSpeed * dt * this.rotateDirector) % (2 * Math.PI)
        this.position.x = Math.sin(this.angle) * this.radius + this.center.x
        this.position.y = Math.cos(this.angle) * this.radius + this.center.y
    }
    getInitAngle(position: Vector2) {
        let baseVec = new Vector2(0, 1)
        let angle = Math.acos(position.dot(baseVec) / position.euLength() * baseVec.euLength())
        if(position.x < 0) angle = -angle
        return angle
    }
    setRotateDirector(rotateDirector: number) {
        this.rotateDirector = rotateDirector
    }
    get left() {
        return this.position.x - this.size
    }
    get right() {
        return this.position.x + this.size
    }
    get top() {
        return this.position.y - this.size
    }
    get bottom() {
        return this.position.y + this.size
    }
    collision(rect: Rect) {
        console.log("collision !!!")
        // 右下角
        if(rect.top < this.bottom && rect.left < this.right && rect.bottom > this.bottom && rect.right > this.right ) {
            return true
        }
    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.save()
        let alpha = 1;
        ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b}, 1)`
        // ctx.fillStyle = `steelblue`
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore()
    }

}