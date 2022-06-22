import { ParticleSystem } from "./ParticleSystem";
import { Vector2 } from "./Vector2";
import { Particle } from "./Particle";
import { ParticleConfig } from "./type";
import { Color } from "./Color";
import { ChamberBox } from "./ChamberBox";
import { Scatter } from "./Scatter";
import { sampleColor, sampleDirection, sampleNumber } from "./util";


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
    ps.effectors.push(new Scatter({}, ps))
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

    function step() {
        // let velocity = newMousePosition.subtract(oldMousePosition).multiply(10);
        // velocity = velocity.add(sampleDirection(0, Math.PI * 2).multiply(20));

        let velocity = sampleDirection(0, Math.PI * 2).multiply(20);

        let color = sampleColor(Color.red, Color.yellow);
        let life = 3;
        let size = sampleNumber(10, 20);
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

        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save()
        // ctx.lineWidth = 2
        // ctx.strokeStyle ='#f36';  
        ctx.fillStyle = "white"
        ctx.fillRect(0, 300, 400,3)
        ctx.restore()

        ps.render(ctx);
    }

    start("interactiveEmitCanvas", step);

    canvas.onmousemove = function (e) {
        newMousePosition = new Vector2(e.offsetX, e.offsetY);
    }
    canvas.onclick = function(e) {
        let config: ParticleConfig = {
            position: new Vector2(e.offsetX, e.offsetY),
            velocity: sampleDirection(0, Math.PI * 2).multiply(60),
            life: 3,
            color: sampleColor(Color.red, Color.yellow),
            
            size: 10
        }
        ps.emit(new Particle(config));
    }
}
interactiveEmit();

function kinematics() {
    let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
    isContinue: boolean, timeoutID: number;
    let ps = new ParticleSystem();

    function start(canvasName: string, func: Function) {
        if (timeoutID)
            stop();
        console.log('canvasName: ', canvasName);
    
        canvas = document.getElementById(canvasName) as HTMLCanvasElement;

        console.log(canvas, document.getElementById(canvasName));
        document
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
    let dt = 0.1;
    let radius = 100;
    let angleSpeed = 2 * Math.PI / 4; // 1s 1/4圈
    let position = new Vector2(300, 200) // 初始位置 center 200, 200
    let velocity = new Vector2(0, - Math.PI * radius / 2); // 初始速度, 顺时针
    // let position = new Vector2(radius * Math.cos(angleSpeed * 0), radius * Math.sin(angleSpeed * 0)).add(new Vector2(200, 200));
    // let velocity = new Vector2(- radius * angleSpeed *  Math.sin(angleSpeed * 0), radius * angleSpeed * Math.cos(angleSpeed * 0));
    // let acceleration = new Vector2(0, 10);
    let theta = 0;
    let count = 0;
    let angle = 0;

    // circular motion
    let generateCircularMotionAcceleration = (time: number) => {
        let ret;
        //
        let ax = - radius * angleSpeed * angleSpeed *  Math.cos(angle + angleSpeed * time);
        let ay = - radius * angleSpeed * angleSpeed * Math.sin(angle + angleSpeed * time);
        ret = new Vector2(ax, ay).multiply(time);
        // theta += time * angleSpeed;
        // let ret =  new Vector2(Math.cos(theta), Math.cos(theta)).multiply(-1 * Math.pow(angleSpeed, 2) );
        // let ret = velocity.multiply(dt * w);
        // let ret = acceleration.multiply(dt)
        // let ret = new Vector2(- angleSpeed * angleSpeed * Math.cos(theta) * radius , - angleSpeed * angleSpeed * Math.sin(theta) * radius);
        if(velocity.y > 0) {

            // console.log("count", count);
        }
        count++;
        // console.log(ret, theta / (Math.PI * 2));
        return ret;
          
    }
    function generateVelocity(time: number) {
        let ret;
        let vx = - radius * angleSpeed *  Math.sin(angle + angleSpeed * time);
        let vy = radius * angleSpeed * Math.cos(angle + angleSpeed * time);
        ret = new Vector2(vx, vy);
        return ret
    }
    function step() {
        position = position.add(velocity.multiply(dt));
        // velocity = generateVelocity(dt); // OK
        velocity = velocity.add(generateCircularMotionAcceleration(dt));
        angle = angle + angleSpeed * dt;
        // position = position.add(velocity.multiply(dt));
        // velocity = velocity.add(acceleration.multiply(dt));
        if(angle < 3 * Math.PI) {
            console.log(Math.round(angle/ Math.PI) ,'position', position,'velocity', velocity);
        }
        ctx.strokeStyle = "#FF0000";
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(position.x, position.y, 10, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
        
    document.getElementById('start').addEventListener('click', () => {
        start("kinematicsCancas", step);
    })
    document.getElementById('stop').addEventListener('click', () => {
        stop();
        clearCanvas()        
    })

}
// kinematics();