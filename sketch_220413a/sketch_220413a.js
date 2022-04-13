let img;
let poseNet;
let poses = [];

function setup() {
  createCanvas(1000, 560);
  img = createImg('libraries/runner.jpg', imageReady);
  img.size(width, height);
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
  text("Model Loaded", 10, 50);
  select('#status');//.html('Model Loaded');
  poseNet.singlePose(img);
}

function draw() {
  if(poses.length > 0){
    image(img, 0, 0, width, height);
    //drawSkeleton(poses);
    drawKeypoints(poses);
    noloop();
  }
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
