// sketchRNN (스쿼트 자세가 좋을 때, 구령)
let model;
let previous_pen = 'down';
let x, y;
let strokePath;
let recSpeak;
let text = [];

function preload(){
  model = ml5.sketchRNN('cat');   // 기본 고양이
}

function setup() {
  createCanvas(640, 480);
  background(220);
  recSpeak = new p5.SpeechRec('en-US', results);
  recSpeak.start(true, false);
  let button = createButton('clear');
  button.mousePressed(startDrawing);   // 자동으로?(시간), 손 스치는 걸로
}

function modelReady(){
  console.log('model loaded');
}

function startDrawing(){
  background(220);
  x = width/2;   // width/2 바꾸기 keypoints[a][x]로
  y = height/2;
  model.reset();
  model.generate(gotStroke);
}

function draw() {
  if(strokePath){
    if(previous_pen == 'down'){
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x+strokePath.dx, y+strokePath.dy);
    }
    x += strokePath.dx;
    y += strokePath.dy;
    previous_pen = strokePath.pen;
    if(strokePath.pen != 'end'){
      strokePath = null;
      model.generate(gotStroke);
    }
  }
}

function gotStroke(err, s){
  strokePath = s;
}

function results(){
  if(recSpeak.resultValue){
    text = recSpeak.resultString.toLowerCase().split(".");
    model = ml5.sketchRNN(text[0]);
    console.log("This is a " + text[0]);   // .을 기준으로 분리한 문자열
  }
}
