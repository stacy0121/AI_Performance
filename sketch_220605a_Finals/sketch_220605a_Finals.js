// 음성 인식된 단어의 그림이 얼굴에 그려진다.
// sketchRNN
let model;
let previous_pen = 'down';
let x, y;
let strokePath;
let recSpeak;
let text = [];

// facemash
let facemesh;
let video;
let predictions = [];
let face;
let sil;

var countText;
var px = [];
var py = [];
var xx = [];
var yy = [];

var fX;
var fY;
var img;

function preload(){
  model = ml5.sketchRNN('cat');   // 기본 고양이
}

function setup() {
  createCanvas(640, 480, WEBGL);
  // video setting
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();   // html 상 비디오 지우기
  countText = 0;  //초기화
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", result => {
    predictions = result;   // 예측 결과
  });
  face = new Face();
  
  // sketchRNN 세팅
  recSpeak = new p5.SpeechRec('en-US', results);
  recSpeak.start(true, false);
  let button = createButton('clear');
  button.mousePressed(startDrawing);   // 얼굴에 손이 스칠 때 startDrawing
  startDrawing();
}

function modelReady(){
  // 온라인에서 불러오기 완료
  console.log("You can say");
  startDrawing();
}

function startDrawing(){
  countText = 0; //초기화
  
  background(225);
  x = width/2;
  y = height/2;
  model.reset();
  model.generate(gotStroke);
}

function draw() {
  translate(-width / 2, -height / 2);
  //background(255, 0, 0);
  image(video, 0, 0, width, height);
  noStroke();
  fill(251, 206, 177, 30);
  rect(0, 0, 64, 48);   // 그림이 그려질 네모(캔버스 크기의 1/10)
  
  if(strokePath){
    if(previous_pen == 'down'){
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x+strokePath.dx, y+strokePath.dy);
      
      countText++;  // 좌표를 배열에 저장하기 위한 숫자 증가
      //위에 그려지는 그림을 array로 저장
      // 10을 나누어서 좌측 상단의 네모박스 안에도 그려지게 함
      px[countText] = x/10;
      py[countText] = y/10;
      xx[countText] = x/10 + strokePath.dx/10;
      yy[countText] = y/10 + strokePath.dy/10;
    } else {
      // 10배 작은 그림을 좌측 상단 박스에 보여줌
      for (var i = 0; i < countText; i++) {
        stroke(0);
        line(px[i],py[i],xx[i],yy[i]);
      }
    }
    // 펜을 움직임
    x += strokePath.dx;
    y += strokePath.dy;
    previous_pen = strokePath.pen;
    if(strokePath.pen != 'end'){   // 한 획이 끝남
      strokePath = null;
      model.generate(gotStroke);
    }
  }
  drawKeypoints();
  img = get(0, 0, 64, 48); // get을 이용해 좌측 상단 박스(그림)를 캡쳐
}

function gotStroke(err, s){
  strokePath = s;
}

// 음성 인식 결과 로그 출력
function results(){
  if(recSpeak.resultValue){
    text = recSpeak.resultString.toLowerCase().split(".");
    model = ml5.sketchRNN(text[0]);
    console.log("You said \"" + text[0] + "\"");   // .을 기준으로 분리한 문자열
  }
}

function drawKeypoints(){
  // FaceMash
  for(let i=0; i<predictions.length; i++){
    sil = predictions[i].scaledMesh;   // 얼굴 위치를 임의의 점으로 나눔
    
    const [x0, y0] = sil[425];
    const [x2, y2] = sil[366];
    const [x4, y4] = sil[435];
    const [x6, y6] = sil[434];   // 네 개의 꼭짓점
  
    // 캡쳐된 이미지를 볼에
    texture(img);
    textureMode(IMAGE);
    // 볼 도형화
    beginShape();
    vertex(x0, y0, 0, 0);
    vertex(x2, y2, 64, 0);
    vertex(x4, y4, 64, 48);
    vertex(x6, y6, 0, 48);
    endShape(CLOSE);
  }
}
