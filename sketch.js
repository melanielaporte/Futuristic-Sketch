// Project 2: Bold & Dynamic Pink Nebula Particles (Interactive)
let particles = [];
let colorPicker, shapeSelector;

function setup() {
  createCanvas(600, 600);
  background(10, 10, 30);
  
  colorPicker = createColorPicker('#ff66b2');
  colorPicker.position(10, height + 10);
  
  shapeSelector = createSelect();
  shapeSelector.position(160, height + 10);
  shapeSelector.option('Circle');
  shapeSelector.option('Square');
  shapeSelector.selected('Circle');
}

function draw() {
  background(10, 10, 30, 20);
  let p = new Particle(mouseX, mouseY, colorPicker.color(), shapeSelector.value());
  particles.push(p);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isFaded()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y, color, shape) {
    this.x = x;
    this.y = y;
    this.size = random(20, 50);
    this.alpha = 255;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
    this.color = color;
    this.shape = shape;
  }
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.alpha -= 4;
  }
  display() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    if (this.shape === 'Circle') {
      ellipse(this.x, this.y, this.size, this.size);
    } else {
      rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
  }
  isFaded() {
    return this.alpha <= 0;
  }
}

