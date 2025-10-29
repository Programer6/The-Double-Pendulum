let r1 = 200;
let r2 = 200;
let m1 = 40;
let m2 = 40;
let a1 = Math.PI / 2;
let a2 = Math.PI / 2;
let a1_v = 0.01;
let a2_v = -0.001;

let g = 1; // gravity constant

let canvasBuffer;

let prevX2 = -1;
let prevY2 = -1;

let centerX;
let centerY;

function setup () {
    createCanvas(600, 600);
    centerX = width / 2;
    centerY = 50;
    canvasBuffer = createGraphics(600, 600);
    canvasBuffer.background(255);
}

function draw() {
    background(255);

    // Calculating positions based on angles
    let num1 = -g * (2 * m1 + m2) * Math.sin(a1);
    let num2 = -m2 * g * Math.sin(a1 - 2 * a2);
    let num3 = -2 * Math.sin(a1 - a2) * m2;
    let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2);

    let den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
    a1_a = (num1 + num2 + num3 * num4) / den;

    let num5 = 2 * Math.sin(a1 - a2);
    let num6 = (a1_v * a1_v * r1 * (m1 + m2));
    let num7 = g * (m1 + m2) * Math.cos(a1);
    let num8 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2);
    let den2 = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
    a2_a = (num5 * (num6 + num7 + num8)) / den2;

    // Positions
    let x1 = r1 * Math.sin(a1);
    let y1 = r1 * Math.cos(a1);
    let x2 = x1 + r2 * Math.sin(a2);
    let y2 = y1 + r2 * Math.cos(a2);

    // Draw the trail to the buffer (absolute coords)
    if (prevX2 !== -1 && prevY2 !== -1) {
        canvasBuffer.stroke(255, 0, 0);
        canvasBuffer.strokeWeight(2);
        canvasBuffer.line(centerX + prevX2, centerY + prevY2, centerX + x2, centerY + y2);
    }
    prevX2 = x2;
    prevY2 = y2;

    image(canvasBuffer, 0, 0); // draw the buffer

    stroke(0);
    strokeWeight(2);
    fill(0, 0, 0);
    push();
    translate(centerX, centerY); // origin point

    ellipse(0, 0, 16, 16); // origin point

    line(0, 0, x1, y1);
    fill(255, 0, 0);
    ellipse(x1, y1, m1, m1); // m1 = width and height

    line(x1, y1, x2, y2); // second arm
    fill(0, 0, 255);
    ellipse(x2, y2, m2, m2);

    pop();

    // Update velocities and angles
    a1_v += a1_a;
    a2_v += a2_a;
    a1 += a1_v;
    a2 += a2_v;
}

