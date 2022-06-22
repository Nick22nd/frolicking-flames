import { Particle } from "./Particle";
import { Vector2 } from "./Vector2";
import { ChamberBox } from "./ChamberBox";
import { Scatter } from "./Scatter";
type effectorType = ChamberBox | Scatter
export class ParticleSystem {
     particles: Array<Particle> = []
     effectors: Array<effectorType> = []

    gravity: Vector2
    constructor() {
        console.log("new ParticleSystem");
        this.gravity = new Vector2(0, 100)
        // this.particles = [];
        // this.effectors = [];
    }
    emit (particle: Particle) {
        this.particles.push(particle);
    };

    simulate(dt: number) {
        this.aging(dt);
        this.applyGravity();
        this.applyEffectors();
        this.kinematics(dt);
    };

    render(ctx: CanvasRenderingContext2D) {
        for (var i in this.particles) {
            var p = this.particles[i];
            var alpha = 1 - p.config.age / p.config.life;
            ctx.fillStyle = "rgba("
                + Math.floor(p.config.color.r * 255) + ","
                + Math.floor(p.config.color.g * 255) + ","
                + Math.floor(p.config.color.b * 255) + ","
                + alpha.toFixed(2) + ")";
            ctx.beginPath();
            ctx.arc(p.config.position.x, p.config.position.y, p.config.size, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
    }

    // Private methods
    
    aging(dt: number) {
        for (var i = 0; i < this.particles.length; ) {
            var p = this.particles[i];
            p.config.age += dt;
            if (p.config.age >= p.config.life)
                this.kill(i);
            else
                i++;
        }
    }

     kill(index: number) {
        if (this.particles.length > 1) {
            this.particles[index] = this.particles[this.particles.length - 1];
        }
        // this.particles.pop();
        this.particles = this.particles.filter(item => item.config.age < item.config.life)
        console.log("particle die");
        
    }

     applyGravity() {
        // for (var i in this.particles)
            // this.particles[i].config.acceleration = this.gravity;
    }

     applyEffectors() {
        for (const effector of this.effectors) {
            for (const particle of this.particles)
                effector.applys(particle);    
        }
    }
    
     kinematics(dt: number) {
        for (var i in this.particles) {
            var p = this.particles[i];
            p.config.position = p.config.position.add(p.config.velocity.multiply(dt));
            p.config.velocity = p.config.velocity.add(p.config.acceleration.multiply(dt));
        }
    }
}