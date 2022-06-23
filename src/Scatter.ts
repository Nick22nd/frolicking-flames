import { Color } from "./Color";
import { Particle } from "./Particle";
import { ParticleSystem } from "./ParticleSystem";
import { sampleColor, sampleDirection, sampleNumber } from "./util";
interface scatterConfig {
    life?: number
    amount?: number
    startSize?: number
    endSize?: number
}
export class Scatter {
    life: number
    amount: number
    startSize: number
    endSize: number
    ps: ParticleSystem
    constructor(config: scatterConfig, ps: ParticleSystem) {
        this.init(config)
        this.ps = ps;
    }
    init(config: scatterConfig) {
        this.life = config.life || 1
        this.amount = config.amount || 10
        this.startSize = config.startSize || 1
        this.endSize = config.endSize || 9
    }
    applys(particle: Particle) {
        console.log(particle.config.position.y, particle.config.life,  'speed', particle.config.velocity);
        // let condition = Number(particle.config.age.toFixed(2)) === 2.9
        let condition = Number(particle.config.position.y.toFixed(0)) >= 300 && particle.config.life === 3
                && particle.config.age <= 3
        if(condition) {
            particle.config.age = 3
            for (let i = 0; i < this.amount; i++) {
                let newConfig = {
                    position: particle.config.position,
                    velocity: sampleDirection(Math.PI, Math.PI * 2).multiply(80),
                    life: sampleNumber(1, this.life),
                    color: sampleColor(Color.blue),
                    size: sampleNumber(this.startSize, this.endSize)
                }
                let newParticle = new Particle(newConfig)
                this.ps.emit(newParticle)        
            }
        }
    }

}