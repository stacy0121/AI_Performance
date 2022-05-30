// 손목을 따라다니는 음성인식된 글씨
var texts = "ABCDEFU";
var chars = [];
var directionX;   // 방향

let video;
let poseNet;
let poses = [];
var keypointX;
var phand;   // 이전 손목 위치. pmouseX 역할
let speech;

function setup() {
  createCanvas(640,480);
  directionX = 1;   // 1은 정상적 움직임
  
  video = createCapture(VIDEO);
  video.size(width, height);
  
  poseNet = ml5.poseNet(video);
  poseNet.on("pose", function(results){
    poses = results;
  });
  
  speechRec = new p5.SpeechRec('ko-KR', gotSpeech);
  let continuous = true;
  let interimResults = false;
  speechRec.start(continuous, interimResults);
  let output = select('#speech');
  
  function gotSpeech(){
    console.log(speechRec);
    if(speechRec.resultValue){
      let said = speechRec.resultString;
      console.log(said);
      texts = said;
      chars = texts.split("");   // string을 ""기준으로 char 13개로 분리
    }
  }
  video.hide();   // html 상 비디오 지우기
}

function draw() {
  background(170,170,170);
  image(video, 0, 0, width, height);
  
  drawKeypoints();
  // 손목의 이전 x좌표 전달
  phand = keypointX;
  // 현재 x좌표 찾기 및 방향 설정
  for (let i = 0; i < poses.length; i ++) {
    const pose = poses[i].pose;
    const keypoint = pose.keypoints[10];
    if(phand<keypoint.position.x){   // 왼쪽으로 움직임
      directionX = -1;
    }
    if(phand>=keypoint.position.x){
      directionX = 1;
    }
  }
  textSize(15);
  text("오른팔을 올리고 한글 단어를 말해보세요. 팔을 움직이는 방향에 따라 글자가 따라갑니다.", 20, 40);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function drawKeypoints() {
  for(let i=0; i<poses.length; i++) {
    for(var j=0; j<chars.length; j++){
      const pose = poses[i].pose;
      const keypoint = pose.keypoints[10];     // 오른팔 손목
      keypointX = keypoint.position.x;         // x좌표
      const keypointY = keypoint.position.y;   // y좌표
      text(chars[j], keypointX+directionX*j*15, random(keypointY-3, keypointY+3));
    }
  }
}
