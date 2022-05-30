// 5/2, 23
let recSpeak;
let text = [];
var texts = "ABCDEFU";
var chars = [];
var directionX;   // 방향

let video;
let poseNet;
let poses = [];
//var phand = point.position;   // 이전 손 위치. pmouseX 역할
let speech;

function setup() {
  //recSpeak = new p5.SpeechRec('en-US', results);
  //recSpeak.start(true, false);
  createCanvas(640,480);
  
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

function modelReady(){
  console.log('model loaded');
}

function draw() {
  background(170,170,170);
  
  image(video, 0, 0, width, height);
  
  drawKeypoints();
}

function results(){
  if(recSpeak.resultValue){
    text = recSpeak.resultString.toLowerCase().split(".");
    model = ml5.sketchRNN(text[0]);
    console.log("This is a " + text[0]);   // .을 기준으로 분리한 문자열
  }
}
