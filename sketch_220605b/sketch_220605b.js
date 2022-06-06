let model;
let previous_pen = 'down';
let x, y;
let strokePath;
let seedStrokes = [];
let canvas;

function setup() {
  canvas = createCanvas(640, 480);
  canvas.hide();
  background(220);
  model = ml5.sketchRNN('cat', modelReady);
  let button = createButton('clear');
  button.mousePressed(clearDrawing);
}

function modelReady(){
  canvas.show();
  canvas.mouseReleased(startSketchRNN);
  let div = createDiv('Model Loaded');
}

function clearDrawing(){
  background(220);
  seedStrokes = [];
  model.reset();
}

function startSketchRNN(){
  x = mouseX;
  y = mouseY;
  model.generate(seedStrokes, gotStroke);
}

function draw() {
  if(mouseIsPressed){
    stroke(0);
    strokeWeight(3.0);
    line(pmouseX, pmouseY, mouseX, mouseY);
    let userStroke = {
      dx: mouseX - pmouseX,
      dy: mouseY - pmouseY,
      pen: 'down'
    };
    seedStrokes.push(userStroke);   // 획 추가
  }
  
  if(strokePath){
    if(previous_pen == 'down'){
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x+strokePath.dx, y+strokePath.dy);
    }
    x += strokePath.dx;
    y += strokePath.dy;
    previous_pen = strokePath.pen;
    if(strokePath.pen !== 'end'){
      strokePath = null;
      model.generate(gotStroke);
    }
  }
}

function gotStroke(err, s){
  strokePath = s;
}
