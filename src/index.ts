import { ParticleSystem } from "./ParticleSystem";
import { Vector2 } from "./Vector2";
import { Particle } from "./Particle";
import { ParticleConfig } from "./type";
import { Color } from "./Color";
import { ChamberBox } from "./ChamberBox";


function basicParticleSystem() {
    let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
    isContinue: boolean, timeoutID: number;
    let ps = new ParticleSystem();
    let dt = 0.01;
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
    function sampleDirection() {
        let theta = Math.random() * 2 * Math.PI;
        return new Vector2(Math.cos(theta), Math.sin(theta));
    }
    
    function step() {
        let config: ParticleConfig = {
            position: new Vector2(200, 200),
            velocity: sampleDirection().multiply(100),
            life: 1,
            color: Color.red,
            size: 5
        }
        ps.emit(new Particle(config));
        ps.simulate(dt);
    
        clearCanvas();
        ps.render(ctx);
    }
    start("basicParticleSystemCanvas", step);
}

// basicParticleSystem();
function interactiveEmit() {
    let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
    isContinue: boolean, timeoutID: number;
    let ps = new ParticleSystem();
    ps.effectors.push(new ChamberBox(0, 0, 400, 400));
    let dt = 0.01;
    let oldMousePosition = Vector2.zero, newMousePosition = Vector2.zero;
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
        let color = sampleColor(Color.red, Color.yellow);
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

function kinematics() {
    let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
    isContinue: boolean, timeoutID: number;
    let ps = new ParticleSystem();
    let dt = 0.1;
    let position = new Vector2(10, 200);
    let velocity = new Vector2(50, -50);
    let acceleration = new Vector2(0, 10);
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
    function step() {
        position = position.add(velocity.multiply(dt));
        velocity = velocity.add(acceleration.multiply(dt));

        ctx.strokeStyle = "#FF0000";
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(position.x, position.y, 10, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
        
    start("kinematicsCancas", step);
}
// kinematics();