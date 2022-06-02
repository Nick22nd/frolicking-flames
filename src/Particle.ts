import { ParticleConfig } from "./type";
import { Vector2 } from "./Vector2";
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