// 손목을 따라다니는 음성 인식된 글씨. 가운데를 중심으로 양옆에서의 글씨 방향이 다름
var texts = "ABCDEFU";
var chars = [];
var directionX;   // 방향

let video;
let poseNet;
let poses = [];
let speech;
// 점선을 위한 변수
var x;
var y = 50;
var y1;
var numDots = 10;

function setup() {
  createCanvas(720,570);
  directionX = 1;   // 1은 정상적 움직임
  x = width/2;      // 화면 중심에 점선
  y1 = height-y;
  
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

  // x좌표 찾기 및 방향 설정
  for (let i = 0; i < poses.length; i ++) {
    const pose = poses[i].pose;
    const keypoint = pose.keypoints[10];
    if(keypoint.position.x<width/2){   // 왼쪽
      directionX = -1;
    }
    if(keypoint.position.x>=width/2){   // 오른쪽
      directionX = 1;
    }
  }
  textSize(15);
  textStyle(BOLD);
  text("오른팔을 올리고 한글 단어를 말해보세요. 구역에 따라 다른 방향의 글자가 손목을 따라갑니다.", 50, 40);
  
  // 가운데 점선 그리기
  spacing = 1.0/(numDots-1);
  for (var i =0; i < numDots; i++) {
    var ny = lerp(y, y1, spacing * i);   // 시작점 y좌표
    rect(x, ny, 5, 20);
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function drawKeypoints() {
  for(let i=0; i<poses.length; i++) {
    for(var j=0; j<chars.length; j++){
      const pose = poses[i].pose;
      const keypoint = pose.keypoints[10];     // 오른팔 손목
      const keypointX = keypoint.position.x;   // x좌표
      const keypointY = keypoint.position.y;   // y좌표
      // 음성 인식된 글씨 출력
      text(chars[j], keypointX+(directionX*j*15), random(keypointY-3, keypointY+3));
    }
  }
}
