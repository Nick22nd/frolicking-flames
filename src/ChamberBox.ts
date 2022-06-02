/* 
* @requires Vector2, Particle
*/
import { Particle } from "./Particle";
export class ChamberBox {
    x1: number
    x2: number
    y1: number
    y2: number
    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }
    applys (particle: Particle) {
        if ( particle.config.position.x -  particle.config.size < this.x1 ||  particle.config.position.x +  particle.config.size > this.x2)
             particle.config.velocity.x = - particle.config.velocity.x;

        if ( particle.config.position.y -  particle.config.size < this.y1 ||  particle.config.position.y +  particle.config.size > this.y2)
             particle.config.velocity.y = - particle.config.velocity.y;
    };
}
