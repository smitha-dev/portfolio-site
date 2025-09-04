// Variables etc
let t = 0;
const numForeground = 20;
const numBackground = 8;
let swooshOffsets = [];
let palette = [];

// Eased mouse position
let easedX, easedY;

// p5.js setup function
function setup() {
  // Create a full-viewport canvas
  const cnv = createCanvas(1600, 900);
  frameRate(30);
  pixelDensity(0.5);

  // Canvas behind page content
  cnv.elt.style.position = 'fixed';
  cnv.elt.style.top = '0';
  cnv.elt.style.left = '0';
  cnv.elt.style.width = '100%';
  cnv.elt.style.height = '100%';
  cnv.elt.style.zIndex = '0';
  cnv.elt.style.pointerEvents = 'none'; // allow interaction through canvas

  // Insert canvas as first child of body
  if (document.body.firstChild !== cnv.elt) {
    document.body.insertBefore(cnv.elt, document.body.firstChild);
  }

  noFill();

  // Color palette for swooshes
  palette = [
    color(255, 255, 254, 50),
    color(250, 250, 254, 40),
    color(247, 247, 251, 100),
  ];

  // Swoosh calculations
  for (let i = 0; i < numForeground + numBackground; i++) {
    swooshOffsets.push({
      xBias: random(-400, 400),
      yBias: random(-150, 150)
    });
  }

  easedX = width / 2;
  easedY = height / 2;
}

// p5.js draw loop
function draw() {
  // Draw full-viewport gradient background
  drawGradient('#d5d8ed', '#f7f7fb');


  // Draw background and foreground swooshes
  drawSideBowlSwooshes(numBackground, 15, palette);
  drawSideBowlSwooshes(numForeground, 6, palette);

  t += 0.0004;
}

// Draw a top-to-bottom gradient
function drawGradient(startHex, endHex) {
  const startColor = color(startHex);
  const endColor = color(endHex);
  for (let y = 0; y < height; y++) {
    const inter = map(y, 0, height, 0, 1);
    const newColor = lerpColor(startColor, endColor, inter);
    stroke(newColor);
    line(0, y, width, y);
  }
}

// Draw swooshes on the sides of the bowl
function drawSideBowlSwooshes(count, maxWeight, palette) {
  for (let i = 0; i < count; i++) {
    const bias = swooshOffsets[i];
    const x1 = -100;
    const y1 = noise(t + i * 0.1) * height * 1.3 - height * 0.15;
    const x4 = width + 100;
    const y4 = noise(t + i * 0.2 + 50) * height * 1.3 - height * 0.15;

    const x2 = lerp(x1, easedX, 0.85) + bias.xBias;
    const y2 = lerp(y1, easedY, 0.85) + bias.yBias;
    const x3 = lerp(x4, easedX, 0.85) - bias.xBias;
    const y3 = lerp(y4, easedY, 0.85) - bias.yBias;

    strokeWeight(map(i, 0, count, 1, maxWeight));
    const c = palette[i % palette.length];
    stroke(c);
    bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  }
}

// Keep the canvas full viewport on resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}