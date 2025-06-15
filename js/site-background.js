// ----------------------------- //
// made with ♥ by smitha-dev     //
// glyph rain                    //
// ----------------------------- //

let glyphs = [];

let glyphColors = ['#001F1F', '#267F79', '#55AEAE', '#865E5B'];
let glyphChars = ['☽', '⚝', '☼', '★', '☆', '✬', '✯'];

// function to allow transparency
function colorWithAlpha(col, alpha) {
    let c = color(col);
    c.setAlpha(alpha);
    return c;
}


function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');

    textAlign(CENTER, CENTER);
    textSize(24);

    for (let i = 0; i < 100; i++) {
        glyphs.push(createGlyph());
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function createGlyph() {
    return {
        char: random(glyphChars),     // random glyph from glyphChars array
        x: random(width),             // random horizontal position
        y: random(-height, height),   // starts a bit above the canvas
        speed: random(0.5, 2),        // falling speed
        size: random(16, 64),         // size of glyph
        opacity: 255,                 // full opacity 
        rotation: random(-PI / 6, PI / 6), // random tilt between -30° and +30°
        color: random(glyphColors),   // randomize colors from glyphColors array
    };
}

function draw() {
    let xOffset = (mouseX - width / 2) * 0.005;
    let yOffset = (mouseY - height / 2) * 0.005;

    background(0, 35); // trail length


    for (let g of glyphs) {
        push();
        translate(g.x + g.speed * xOffset, g.y + g.speed * yOffset);
        rotate(g.rotation);
        fill(colorWithAlpha(g.color, g.opacity));
        textSize(g.size);
        text(g.char, 0, 0);
        pop();

        // update position
        g.y += g.speed;

        // recycle when off screen
        if (g.y > height) {
            g.x = random(width);
            g.y = random(-100, 0);
            g.speed = random(0.5, 2);
            g.size = random(16, 32);
            g.char = random(glyphChars);
            g.rotation = random(-PI / 6, PI / 6);
        }
    }

}

