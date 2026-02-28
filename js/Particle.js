/**
*
* @description : class Particles
*
* @author cxts
* @github https://github.com/cxts
* @date 13/03/2021
* @required Vector.js
* @param {NUMBER} x : value of the position on x axis
* @param {NUMBER} y : value of the position on y axis
* @param {NUMBER} size : value of the size of the particle
* @param {STRING} color [optional] : particle color in CSS format
* @return {OBJECT} : return a particle
*
*/
class Particle {
    massConst = .5;  // TUNNING
    pos;
    previousPos;
    vel = new Vector(-.66, 0);  // TUNNING
    acc = new Vector();
    //
    size;
    mass;
    color;
    //
    constructor(x, y, size, color) {
        this.pos = new Vector(x, y);
        this.previousPos = new Vector(x, y);
        this.size = size;
        this.mass = this.size * this.massConst;
        this.color = color || "#000";
    }
}

/**
*
* @description : display the particle using the display function of class Vector.js
* @param {OBJECT} ctx : context object from the HTMLCanvasElementPrototype
* @return {}
*
**/
Particle.prototype.display = function(ctx) {
    this.pos.display(ctx, this.size, true, false, this.color);
}


/**
*
* @description : draw the object as a stroked line
* @param {OBJECT} ctx : context object from the HTMLCanvasElementPrototype
* @return {VOID}
*
**/
Particle.prototype.displayStroked = function(ctx) {
    this.pos.display(ctx, this.size, false, true, this.color);
}

/**
*
* @description : draw the object as a line
* @param {OBJECT} ctx : context object from the HTMLCanvasElementPrototype
* @return {VOID}
*
**/
Particle.prototype.displayLine = function(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.previousPos.x, this.previousPos.y);
    ctx.lineTo(this.pos.x, this.pos.y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    // this.pos.arrowFrom(ctx, this.previousPos);
}


/**
*
* @description : draw the object as a dot of 1x1 pixel
* @param {OBJECT} ctx : context object from the HTMLCanvasElementPrototype
* @return {VOID}
*
**/
Particle.prototype.displayDot = function(ctx) {
    this.pos.display(ctx, 1, true, false, this.color);
}


/**
*
* @description : keep the last one position in memory
* @param {VOID}
* @return {VOID}
*
**/
Particle.prototype.savePos = function() {
    this.previousPos = new Vector(this.pos.x, this.pos.y);
}


/**
*
* @description : update (acceleration algorithm)
* @param {void}
* @return {void}
*
**/
Particle.prototype.update = function() {
    this.savePos();
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
}

/**
*
* @description : apply a force
* @param {OBJECT} force : Vector class object
* @return {VOID} :
*
**/
Particle.prototype.apply = function(force) {
    this.acc.add(force);
}

/**
*
* @description : simulate the attraction effect between two objects
* @param {OBJECT} target : object from the Particle class or which have a '.mass' property set
* @return {VOID}
*
**/
Particle.prototype.attracted = function(target) {
    let force = Vector.sub(target.pos, this.pos);
    let distSquared = force.magSq();
    distSquared = constrain(distSquared, 500, 700);
    //let G = 6.67408;
    let G = 60;
    let strength = G * ((this.mass * target.mass)/ distSquared);
    //let strength = G / distSquared;
    force.setMag(strength);
    this.apply(force);
}




// NOTE :
// Gravitationnal force
// F = G * (mass1 + mass2) / distance ^ 2
