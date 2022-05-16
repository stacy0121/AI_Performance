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
      //for(let j = 0; j<keypoints.length; j++){
        //const[x, y] = keypoints[j];
        fill(0,255,0, 50);
        //var xx, yy;
        //line(xx, yy, x, y);
        //xx=x;
        //yy=y;
        //ellipse(x, y, 3, 3);
        // FaceMesh 사용하기
        beginShape();
        vertex(keypoints[133][0], keypoints[133][1]);   // x, y 좌표
        vertex(keypoints[155][0], keypoints[155][1]);
        vertex(keypoints[154][0], keypoints[154][1]);
        vertex(keypoints[153][0], keypoints[153][1]);
        vertex(keypoints[145][0], keypoints[145][1]);
        vertex(keypoints[144][0], keypoints[144][1]);
        vertex(keypoints[163][0], keypoints[163][1]);
        vertex(keypoints[7][0], keypoints[7][1]);
        vertex(keypoints[33][0], keypoints[33][1]);
        vertex(keypoints[246][0], keypoints[246][1]);
        vertex(keypoints[161][0], keypoints[161][1]);
        vertex(keypoints[160][0], keypoints[160][1]);
        vertex(keypoints[159][0], keypoints[159][1]);
        vertex(keypoints[158][0], keypoints[158][1]);
        vertex(keypoints[157][0], keypoints[157][1]);
        vertex(keypoints[173][0], keypoints[173][1]);
        endShape(CLOSE);
      //}
    }
}
