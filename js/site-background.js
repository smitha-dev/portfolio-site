const deg = (a) => Math.PI / 180 * a;
const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1));
const opt = {
  particles: 800,
  noiseScale: 0.009,
  angle: Math.PI / 180 * -90,
  h1: 226,
  s1: 49,
  l1: 26,

  h2: 291,
  s2: 13,
  l2: 32,
  strokeWeight: 1.2,
  tail: 82,
};
const Particles = [];
let time = 0;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lx = x;
    this.ly = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.hueSemen = Math.random();
    this.hue = this.hueSemen > 0.5 ? 20 + opt.h1 : 20 + opt.h2;
    this.sat = this.hueSemen > 0.5 ? opt.s1 : opt.s2;
    this.light = this.hueSemen > 0.5 ? opt.l1 : opt.l2;
    this.maxSpeed = this.hueSemen > 0.5 ? 3 : 2;
  }

  updatePrev() {
    this.lx = this.x;
    this.ly = this.y;
  }

  follow() {
    let angle =
      noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale) *
        Math.PI *
        0.5 +
      opt.angle;
    this.ax += Math.cos(angle);
    this.ay += Math.sin(angle);
  }

  edges() {
    if (this.x < 0) {
      this.x = width;
      this.updatePrev();
    }
    if (this.x > width) {
      this.x = 0;
      this.updatePrev();
    }
    if (this.y < 0) {
      this.y = height;
      this.updatePrev();
    }
    if (this.y > height) {
      this.y = 0;
      this.updatePrev();
    }
  }

  update() {
    this.follow();

    this.vx += this.ax;
    this.vy += this.ay;

    let p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    let a = Math.atan2(this.vy, this.vx);
    let m = Math.min(this.maxSpeed, p);
    this.vx = Math.cos(a) * m;
    this.vy = Math.sin(a) * m;

    this.x += this.vx;
    this.y += this.vy;
    this.ax = 0;
    this.ay = 0;

    this.edges();
  }

  render() {
    stroke(`hsla(${this.hue}, ${this.sat}%, ${this.light}%, .5)`);
    line(this.x, this.y, this.lx, this.ly);
    this.updatePrev();
  }
}

function setup() {
  let c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style("z-index", "-1");
  for (let i = 0; i < opt.particles; i++) {
    Particles.push(new Particle(Math.random() * width, Math.random() * height));
  }
  strokeWeight(opt.strokeWeight);
}

function draw() {
  time++;
  background(0, 100 - opt.tail);
  for (let p of Particles) {
    p.update();
    p.render();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
