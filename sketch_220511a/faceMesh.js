let facemesh;
let video;
let predictions = [];

function setup(){
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;   // 예측 결과
  });
  video.hide();
}

function modelReady(){
  console.log("Model ready!");   // 온라인에서 불러오기 완료 표시
}

function draw(){
  image(video, 0, 0, width, height);
  drawKeypoints();
}

function drawKeypoints(){
  for(let i=0; i<predictions.length; i++){
      const keypoints = predictions[i].scaledMesh;
      for(let j = 0; j<keypoints.length; j++){
        const[x, y] = keypoints[j];
        fill(0,255,0);
        var xx, yy;
        line(xx, yy, x, y);
        xx=x;
        yy=y;
        //ellipse(x, y, 3, 3);
      }
    }
}
