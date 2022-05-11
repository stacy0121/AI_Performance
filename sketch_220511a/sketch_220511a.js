// faceapi
//let faceapi;
//let detections = [];   // 신체 측정
//let video;

//function setup() {
//  createCanvas(360,270);
//  video = createCapture(VIDEO);
//  video.size(width, height);
//  const faceOptions = {withLandmarks:true, withExpressions:false, withDescriptors:false};
//  faceapi = ml5.faceApi(video, faceOptions, faceReady);
//}

//function faceReady(){
//  faceapi.detect(gotFaces);
//}

//function gotFaces(error, result){
//  if(error){
//    console.log(error);
//    return;
//  }
//  detections = result;
//  faceapi.detect(gotFaces);
//}

//function draw() {
//  background(0);
  
//  if(detections.length > 0){
//    let points = detections[0].landmarks.positions;
//    for(let i=0; i<points.length; i++){
//      stroke(161,95,251);
//      strokeWeight(4);
//      point(points[i]._x, points[i]._y);
//    }
//  }
//}
