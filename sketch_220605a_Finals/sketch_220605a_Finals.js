// 음성 인식된 단어의 그림이 얼굴에 그려진다. 손으로 얼굴을 스치면 그림이 바뀐다.
// 0511, 0523, 0530
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
var xx =0; var yy=0;

// posenet
let poseNet;
let poses = [];
var wristX; var wristY;
var photo =0;
let c;

function preload(){
  model = ml5.sketchRNN('cat');   // 기본 고양이
  c = loadImage("alpha.png");
}

function setup() {
  createCanvas(640, 480, WEBGL);
  background(220);
  
  // video setting
  video = createCapture(VIDEO);
  video.size(width, height);
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", result => {
    predictions = result;   // 예측 결과
  });
  video.hide();   // html 상 비디오 지우기
  
  // 음성 인식 세팅
  recSpeak = new p5.SpeechRec('en-US', results);
  recSpeak.start(true, false);
  let button = createButton('clear');
  button.mousePressed(startDrawing);   // 얼굴에 손이 스칠 때 startDrawing
  
  //PoseNet
  poseNet = ml5.poseNet(video);
  poseNet.on("pose", function(result_){
    poses = result_;
  });
}

function modelReady(){
  console.log('model loaded');   // 온라인에서 불러오기 완료 표시
}

function startDrawing(){
  background(225);
  x = width/2;
  y = height/2;
  model.reset();
  model.generate(gotStroke);
}    // 다 실행됨

function draw() {
  if(photo === 1){   // 그림이 다 그려졌을 때 비디오가 나온다
    image(video, 0, 0, width, height);
  }
  if(photo === 0){   // 그림이 먼저 그려진다
    if(strokePath){
      if(previous_pen == 'down'){
        stroke(0);
        strokeWeight(3.0);
        line(x, y, x+strokePath.dx, y+strokePath.dy);
        // noFill + 도형화해서 그 위에 texture().
        // 궤적?
      }
      // 펜을 움직임
      x += strokePath.dx;
      y += strokePath.dy;
      previous_pen = strokePath.pen;
      if(strokePath.pen != 'end'){   // 그림 그리기가 끝나면
        strokePath = null;
        model.generate(gotStroke);
        c = get();   // 이미지로 저장
        photo = 1;   // flag 바꾸기
      }
    }
    drawKeypoints();
  }
}

function gotStroke(err, s){
  strokePath = s;
}

// 음성 인식 결과 로그 출력
function results(){   // 너무 늦게 됨
  if(recSpeak.resultValue){
    text = recSpeak.resultString.toLowerCase().split(".");
    model = ml5.sketchRNN(text[0]);
    console.log("You said \"" + text[0] + "\"");   // .을 기준으로 분리한 문자열
  }
}

function drawKeypoints(){
  // PoseNet
  //for(let i=0; i<poses.length; i++) {
  //  for(var j=0; j<chars.length; j++){
  //    const pose = poses[i].pose;
  //    const keypoint = pose.keypoints[10];     // 오른팔 손목
  //    wristX = keypoint.position.x;
  //    wristY = keypoint.position.y;
  //  }
  //}
  
  // FaceMash (볼이 캔버스)
  for(let i=0; i<predictions.length; i++){
    sil = predictions[i].annotations;
    texture(c);        // sketchRNN 그림
    noStroke();
    noFill();
    rightEyeLower();   // 오른쪽 볼 도형화
    image(c, x, y);
  }
}

function rightEyeLower(){
    beginShape();
    for(let i = 0;i<9;i++){
        let [xx, yy] = sil.rightEyeLower0[i];   // rightEyeLower0: Array[9]
        vertex(xx, yy);
      }
    
    for(let i = 8;i<-1;i--){   // -- 아닌가
        let [xx, yy] = sil.rightEyeLower1[i];   // rightEyeLower1: Array[9]
        vertex(xx, yy);
      }
    for(let i = 0;i<9;i++){
        let [xx, yy] = sil.rightEyeLower2[i];   // rightEyeLower2: Array[9]
        vertex(xx, yy);
      }
    for(let i = 8;i<-1;i--){
        let [xx, yy] = sil.rightEyeLower3[i];   // rightEyeLower3: Array[9]
        vertex(xx, yy);
      }
    endShape();
  }
