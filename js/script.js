/**
* @description script dealing with particles attraction and repulsion principles
*
* @author cxts
* @github https://github.com/cxts
* @date 13/03/21
* @required Particle.js, setup.js, Draw.js, misc.js, Vector.js
* @param NONE
* @return {VOID}
*
**/

// Populating satellites array
let nbSatellite = 10; // TUNNING
let satellites = [];
let satColor = "rgba(0, 0, 0, 0.8)";
let satColor2 = "rgba(255, 255, 255, 0.05)";
let sat;
for(let i = 0; i < nbSatellite; i++) {
    sat = new Particle(getRandom(width - 50), getRandom(height - 50), getRandom(1, 5), satColor2);
    satellites.push(sat);
}


// Populating attractors array
let nbAttractors = 10; // TUNNING
let attractors = [];
let rand = true; // TUNNING

for(let i = 0; i < nbAttractors; i++) {
    let a;
    if(rand) {
        a = new Particle(getRandom(width - 150), getRandom(height - 150), getRandom(7, 30), "#FFFFFF11");
    } else {
        a = new Particle(width / 2, height / 2, 10, "#FFFFFF11");
    }
    attractors.push(a);
}


// set on true will provide a bottom screen slider for satellitess mass control
// see "SAT MASS" section in draw()
let addSlider = true; // TUNNING
let massSat;
if(addSlider) {
    massSat = slider(0, 10, .01, "sat_mass");
}

// set it to false avoid tracing sattelite trajectories
let trace = true; // TUNNING

/**
* @description called by window.requestAniamtionFrame(), draw the entire animation on canvas
* @param NONE
* @return {VOID}
*
**/
function draw() {
    if(!trace) {
        clear();
    }
    // updates each satellitess in satellites
    for(let j = 0; j < satellites.length; j++) {
        for(let i = 0; i < attractors.length; i++) {
            satellites[j].attracted(attractors[i]);
        }
        /* SAT MASS */
        if(massSat) {
            satellites[j].mass = (parseFloat(massSat.getValue(), 10) == 0) ? satellites[j].mass : parseFloat(massSat.getValue(), 10);
        }
        /**/
        satellites[j].update();
        satellites[j].displayLine(ctx);
    }
    if(!paused) {
        window.requestAnimationFrame(draw);
    }
}
window.requestAnimationFrame(draw);
