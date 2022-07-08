import { ParticleSystem } from "./ParticleSystem";
import { Vector2 } from "./Vector2";
import { Particle, ParticleConfig } from "./Particle";
import { Color } from "./Color";
import { ChamberBox } from "./ChamberBox";
import { Scatter } from "./Scatter";
import {sampleColor, sampleDirection, sampleNumber} from "./util";
import { Rect } from "./Rect";

function interactiveEmit() {
    let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
    isContinue: boolean;
    let ps = new ParticleSystem();
    ps.effectors.push(new ChamberBox(0, 0, 400, 400));
    let scatterEffect = new Scatter({}, ps)
    ps.effectors.push(scatterEffect)
    let dt = 0.01;
    let frame = 0;
    let startPosition = new Vector2(220, 315);
    let spriteRect = new Rect(startPosition, 40, 30);
    scatterEffect.setSprite(spriteRect)
    let oldMousePosition = Vector2.zero, newMousePosition = Vector2.zero;
    function start(canvasName: string, func: Function) {
        console.log('canvasName: ', canvasName);
        canvas = document.getElementById(canvasName) as HTMLCanvasElement;
        console.log(canvas, document.getElementById(canvasName));
        ctx = canvas.getContext("2d");
        isContinue = true;
    
        let loop = function () {
            func();
            if (isContinue){
                // timeoutID = setTimeout(loop, 10);
                window.requestAnimationFrame(loop)
            }
        }
        loop();
        setInterval(() => {
            let countOfParticles = ps.particles.length
            ctx.save()
            ctx.fillStyle = 'white'
            ctx.fillText(`fps: ${frame}`, 10, 10)
            ctx.fillText(`particle: ${countOfParticles}`, 10, 20)
            // console.log('frame: ', frame);
            frame = 0
            ctx.restore()

        }, 1000)
    }
    
    function stop() {
        isContinue = false;
    }
    
    function clearCanvas() {
        if (ctx != null)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function step() {
        frame++;
        // let velocity = newMousePosition.subtract(oldMousePosition).multiply(10);
        let velocity = sampleDirection(0, Math.PI * 2).multiply(20);
        let color = sampleColor(Color.red, Color.yellow);
        let life = 3;
        let size = sampleNumber(4, 10);
        let config: ParticleConfig = {
            position: newMousePosition,
            velocity: velocity,
            life: life,
            color: color,
            size: size
        }
        // ps.emit(new Particle(config));
        oldMousePosition = newMousePosition;

        ps.simulate(dt);

        const mainCanvas = {
            width: 400,
            height: 400
        }
        ctx.save()
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.rect(0, 0, mainCanvas.width, spriteRect.top) // top
        ctx.rect(0, spriteRect.top , spriteRect.left, spriteRect.height) // left
        ctx.rect(spriteRect.right, spriteRect.top , mainCanvas.width - spriteRect.right, spriteRect.height) // left
        ctx.rect(0, spriteRect.bottom, mainCanvas.width, mainCanvas.height - spriteRect.bottom) // bottom
        ctx.clip();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore()

        ctx.save()
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(spriteRect.left, spriteRect.top, spriteRect.width, spriteRect.height)
        ctx.restore();
        ps.render(ctx);
    }

    start("interactiveEmitCanvas", step);
    let count = 0
    canvas.onmousemove = function (e) {
        newMousePosition = new Vector2(e.offsetX, e.offsetY);
    }
    canvas.onclick = function(e) {
        let tt = 30;
        while(tt > 0) {
            let config: ParticleConfig = {
                position: new Vector2(e.offsetX, e.offsetY),
                velocity: sampleDirection(0, Math.PI * 2).multiply(100),
                life: 3,
                color: sampleColor(Color.red, Color.yellow),
                index: count,
                size: 10
            }
            count += 1;
            ps.emit(new Particle(config));
            tt--;
        }
    }
    document.getElementById('moveleft').onclick = (e) => {
        spriteRect.move(new Vector2(-20, 0));
        console.log('bound, l r', spriteRect.left, spriteRect.right);
    }
    document.getElementById('moveright').onclick = (e) => {
        spriteRect.move(new Vector2(20, 0));
        console.log('bound, l r', spriteRect.left, spriteRect.right);
    }
    document.onkeydown = (e) => {
        if(e.key == 'a') {
            spriteRect.move(new Vector2(-20, 0));
        } else if(e.key == 'd') {
            spriteRect.move(new Vector2(20, 0));
        }
    }
    // canvas.ontouchstart = function(e) {
    //     let config: ParticleConfig = {
    //         position: new Vector2(200, 200),
    //         velocity: sampleDirection(0, Math.PI * 2).multiply(60),
    //         life: 3,
    //         color: sampleColor(Color.red, Color.yellow),
    //
    //         size: 10
    //     }
    //     ps.emit(new Particle(config));
    // }
}
interactiveEmit();