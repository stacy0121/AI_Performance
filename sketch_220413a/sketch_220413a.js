let img;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 360);
  img = createImg('runner.jpg', imageReady);
  img.size(640, 360);   // width, height
  img.hide();
  frameRate(1);
}

function imageReady(){
  let options = {
    imageScaleFactor: 1,
    minConfidence: 0.1
  };
  poseNet = ml5.poseNet(modelReady, options);
  poseNet.on('pose', function(results){
    poses = results;
  });
}

function modelReady(){
  // select('#status').html('Model Loaded');
  let div = createDiv("Model Loaded");   // text("Model Loaded", 10, 50);
  poseNet.singlePose(img);
}

function draw() {
  //if(poses.length > 0){
    image(img, 0, 0, width, height);
    //drawSkeleton(poses);
    drawKeypoints(poses);
    noLoop();
  //}
}

function drawKeypoints(){
  for(let i=0; i<poses.length; i++){
    let pose = poses[i].pose;   // person
    for(let j=0; j<pose.keypoints.length; j++){
      let keypoint = pose.keypoints[j];   // body
      if(keypoint.score>0.2){
        fill(255);
        stroke(20);
        strokeWeight(4);
        ellipse(round(keypoint.position.x), round(keypoint.position.y), 8, 8);
      }
    }
  }
}
