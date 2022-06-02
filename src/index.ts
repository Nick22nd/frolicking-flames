import { ParticleSystem } from "./ParticleSystem";
import { Vector2 } from "./Vector2";
import { Particle } from "./Particle";
import { ParticleConfig } from "./type";
import { Color } from "./Color";
var ps = new ParticleSystem();
var dt = 0.01;
var canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
     isContinue: boolean, timeoutID: number;
var ps = new ParticleSystem();
var dt = 0.01;
function sampleDirection() {
    var theta = Math.random() * 2 * Math.PI;
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
function start(canvasName: string, func: Function) {
    if (timeoutID)
        stop();
    console.log('canvasName: ', canvasName);
    
    canvas = document.getElementById(canvasName) as HTMLCanvasElement;
    console.log(canvas, document.getElementById(canvasName));
    
    ctx = canvas.getContext("2d");
    isContinue = true;

    var loop = function() {
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


start("basicParticleSystemCanvas", step);