
import { ParticleSystem, ChamberBox, Vector2, Color, ParticleConfig, Particle } from "../src/index";
const ColorTest = Color.red
const startPosition = new Vector2(200, 200)
const endPosition = new Vector2(200, 150)
console.log("ColorTest: ", ColorTest)
function interactiveEmit() {
    console.log("run");
    
    let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
    isContinue: boolean, timeoutID: number;
    let ps = new ParticleSystem();
    ps.effectors.push(new ChamberBox(0, 0, 400, 400));
    let dt = 0.01;
    let oldMousePosition = startPosition, newMousePosition = endPosition;
    function start(canvasName: string, func: Function) {
        if (timeoutID)
            stop();
        console.log('canvasName: ', canvasName);
    
        canvas = document.getElementById(canvasName) as HTMLCanvasElement;
        console.log(canvas, document.getElementById(canvasName));
    
        ctx = canvas.getContext("2d");
        isContinue = true;
    
        let loop = function () {
            func();
            if (isContinue)
                timeoutID = setTimeout(loop, 10);
        }
        loop();
    }
    
    function stop() {
        clearTimeout(timeoutID);
        isContinue = false;
    }
    
    function clearCanvas() {
        if (ctx != null)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function sampleDirection(angle1: number, angle2: number) {
        let t = Math.random();
        let theta = angle1 * t + angle2 * (1 - t);
        return new Vector2(Math.cos(theta), Math.sin(theta));
    }

    function sampleColor(color1: Color, color2: Color) {
        let t = Math.random();
        return color1.multiply(t).add(color2.multiply(1 - t));
    }

    function sampleNumber(value1: number, value2: number) {
        let t = Math.random();
        return value1 * t + value2 * (1 - t);
    }

    function step() {
        let velocity = newMousePosition.subtract(oldMousePosition).multiply(10);
        velocity = velocity.add(sampleDirection(0, Math.PI * 2).multiply(20));
        let color = sampleColor(ColorTest, Color.yellow);
        let life = sampleNumber(1, 2);
        let size = sampleNumber(2, 4);
        let config: ParticleConfig = {
            position: newMousePosition,
            velocity: velocity,
            life: life,
            color: color,
            size: size
        }
        ps.emit(new Particle(config));
        oldMousePosition = newMousePosition;

        ps.simulate(dt);

        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ps.render(ctx);
    }

    start("interactiveEmitCanvas", step);

    canvas.onmousemove = function (e) {
        newMousePosition = new Vector2(e.offsetX, e.offsetY);
    }
}
interactiveEmit();
new EventSource('/esbuild').addEventListener('change', () =>  {
    location.reload()
    console.log("reload")
 })
