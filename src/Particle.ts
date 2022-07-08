import { Color } from "./Color";
import { Vector2 } from "./Vector2";

export interface ParticleConfig {
    position: Vector2, 
    velocity: Vector2,
    acceleration?: Vector2,
    age?: number,
    life: number, 
    color: Color, 
    size: number,
    index?: number
}
export class Particle {
    config: ParticleConfig
    // position: any;
    // size: any;
    // velocity: any;
    constructor(config: ParticleConfig) {
        this.config = config
        this.config.age = 0
        this.config.acceleration = Vector2.zero
    }
}