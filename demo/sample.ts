
import { sampleColor, sampleDirection, sampleNumber } from "../src/util";
import { ParticleSystem, ChamberBox, Vector2, Color, ParticleConfig, Particle } from "../src/index";
const ColorTest = Color.blue
const startPosition = new Vector2(200, 200)
const endPosition = new Vector2(200, 150)
console.log("ColorTest: ", ColorTest)
class Firework {
    
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    isContinue: boolean
    timeoutID: number
    ps: ParticleSystem
    dt: number
    newMousePosition: Vector2;
    oldMousePosition: Vector2;
    eventList: Map<string, Function>;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ps = new ParticleSystem()
        this.ps.effectors.push(new ChamberBox(0, 0, 400, 400))
        this.dt = 0.01
        this.newMousePosition = new Vector2(200, 200)
        this.oldMousePosition = new Vector2(200, 150)
        this.eventList = new Map();
        this.start(this.step.bind(this))

    }
    start(func: Function) {
        if (this.timeoutID)
            stop();
        this.isContinue = true;
    
        let loop = () => {
            func();
            if (this.isContinue)
                this.timeoutID = setTimeout(loop, 10);
        }
        loop();
    }
    stop() {
        clearTimeout(this.timeoutID);
        this.isContinue = false;
    }
    step() {
        let velocity = this.newMousePosition.subtract(this.oldMousePosition).multiply(10);
        velocity = velocity.add(sampleDirection(0, Math.PI * 2).multiply(70));
        let color = sampleColor(ColorTest, Color.yellow);
        let life = sampleNumber(1, 2);
        let size = sampleNumber(2, 4);
        let config: ParticleConfig = {
            position: this.newMousePosition,
            velocity: velocity,
            life: life,
            color: color,
            size: size
        }
        this.ps.emit(new Particle(config));
        this.oldMousePosition = this.newMousePosition;

        this.ps.simulate(this.dt);

        this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ps.render(this.ctx);
    }
    enableMouse() {
        console.log("listen: mouse")
        const mouseEvent = (e: MouseEvent) => {
            this.newMousePosition = new Vector2(e.offsetX, e.offsetY);
        }

        this.eventList.set('mouse', mouseEvent);
        this.canvas.addEventListener('mousemove', mouseEvent)
    }
    disableMouse() {
       let event = this.eventList.has('mouse') && this.eventList.get('mouse') as (this: HTMLCanvasElement, ev: MouseEvent) => any
       this.canvas.removeEventListener('mousemove', event)
    }
}
const canvasDom = document.getElementById('interactiveEmitCanvas') as HTMLCanvasElement
const fw = new Firework(canvasDom)

new EventSource('/esbuild').addEventListener('change', () =>  {
    location.reload()
    console.log("reload")
 })
function toggleMouseTrace() {
    console.log('test');
    fw.enableMouse()
}
toggleMouseTrace()