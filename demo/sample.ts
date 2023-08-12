
import { sampleColor, sampleDirection, sampleNumber } from "../src/util";
import { ParticleSystem, ChamberBox, Vector2, Color, ParticleConfig, Particle } from "../src/index";
import { ParticleType } from "../src/type";
const ColorTest = Color.red
let isDebug = false
console.log("ColorTest: ", ColorTest)
class Firework {
    static startPosition = new Vector2(200, 200)
    static endPosition = new Vector2(200, 150)
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
        this.prepare()
        this.start(this.step.bind(this))
    }
    prepare() {
        let velocity = Firework.startPosition.subtract(Firework.endPosition).multiply(7);
        velocity = velocity.add(sampleDirection(Math.PI * 1 / 4, Math.PI * 3 / 4).multiply(70));
        let color = sampleColor(ColorTest, Color.yellow);
        let life = sampleNumber(1, 2);
        let size = sampleNumber(2, 4);
        let config: ParticleConfig = {
            position: new Vector2(200, 400),
            velocity: velocity,
            life: life,
            color: color,
            size: size,
            type: ParticleType.raw,
            age: 0
        }
        isDebug && console.table(config)
        this.ps.emit(new Particle(config))
        // setInterval(
        //     () => {
        //         console.log(config);
                
        //     }, 2000
        // )
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
        const rawParticle = this.ps.particles.find(item => item.config.type === ParticleType.raw)
        if(rawParticle && rawParticle.config.position.y <= sampleNumber(0, 200)) {
            rawParticle.config.age = rawParticle.config.life;
            for (let i = 0; i < 50; i++) {
                this.addParticles(rawParticle.config.position);
            }
        }
        if(this.ps.particles.length === 0) {
            this.prepare()
        }
        this.oldMousePosition = this.newMousePosition;

        this.ps.simulate(this.dt);

        this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ps.render(this.ctx);
    }
    private addParticles(position: Vector2) {
        let velocity = this.newMousePosition.subtract(this.oldMousePosition).multiply(10);
        velocity = velocity.add(sampleDirection(0, Math.PI * 2).multiply(70));
        let color = sampleColor(ColorTest, Color.yellow);
        let life = sampleNumber(1, 2);
        let size = sampleNumber(2, 4);
        let config: ParticleConfig = {
            position: position,
            velocity: velocity,
            life: life,
            color: color,
            size: size,
            type: ParticleType.child
        };
        this.ps.emit(new Particle(config));
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
let toggleMouse = false;
new EventSource('/esbuild').addEventListener('change', () =>  {
    location.reload()
    console.log("reload")
 })
function toggleMouseTrace() {
    toggleMouse = !toggleMouse
    toggleMouse ? fw.enableMouse() : fw.disableMouse()
}
// toggleMouseTrace()

let mouseButton = document.getElementById('mouse')
mouseButton.addEventListener('click', (e) => {
    toggleMouseTrace()
    isDebug = !isDebug
    console.log(`${isDebug? 'enable' :'disable'} debug mode`);
    
    console.log(Object.entries(fw.ps.particles.pop().config))
})
function insertTable() {
    let tableDOM = document.getElementById("config")
    tableDOM.innerHTML = `<div>number: ${fw.ps.particles.length}</div>`
    
}
setInterval(() => insertTable(), 50)