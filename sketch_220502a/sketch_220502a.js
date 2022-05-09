// 마우스 방향을 따라다니는 글씨
// 손을 따라다니는 글씨
var texts = "ABCDEFU";
var chars = [];
var directionX;   // 방향

let video;
let poseNet;
let poses = [];
//var phand = point.position;   // 이전 손 위치. pmouseX 역할
let speech;

function setup() {
  createCanvas(640,480);
  //directionX = 1;   // 정상적 움직임
  
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
      //output.html(said);
      texts = said;
      chars = texts.split("");   // string을 ""기준으로 char 13개로 분리
    }
  }
  
  video.hide();   // html 상 비디오 지우기
}

//function modelReady() {
//  select("#status").html("Model Loaded");
//}

function draw() {
  background(170,170,170);
  //if(pmouseX<mouseX){   // 왼쪽으로 움직임
  //  directionX = -1;
  //}
  //if(pmouseX>=mouseX){
  //  directionX = 1;
  //}
  //for(var i=0;i<chars.length;i++){
    //text(chars[i],mouseX+directionX*i*10, random(mouseY-5,mouseY+5));   // 10 or -10픽셀 거리
    //text(chars[i],keypoint.position.x, keypoint.position.y);
  //}
  
  image(video, 0, 0, width, height);
  
  drawKeypoints();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function drawKeypoints() {
  for (let i = 0; i < poses.length; i += 1) {
    for(var j=0;i<chars.length;i++){
      const pose = poses[i].pose;
      const keypoint = pose.keypoints[10];   // 오른손
      //text("hello", keypoint.position.x, keypoint.position.y);
      text(chars[j],keypoint.position.x, keypoint.position.y);
    }
  }
}
