// 0530, faceMesh
// facemash
let facemesh;
let video;
let predictions = [];

// posenet
let poseNet;
let poses = [];

let count = 0;
let pass = 0;
let keypointX;
let wristX;
let flag = true;

function setup() {
  //createCanvas(800, 600);
  createCanvas(640, 480);
  
  // video setting
  video = createCapture(VIDEO);
  video.size(width, height);
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;   // 예측 결과
  });
  
  // poseNet
  poseNet = ml5.poseNet(video, poseNetReady);
  poseNet.on('pose', function(results){
    poses = results;
  });
  
  video.hide();   // html 상 비디오 지우기
}

function modelReady(){
  console.log('Model ready');   // 온라인에서 불러오기 완료
}

function poseNetReady(){
  console.log('PoseNet ready');   // 온라인에서 불러오기 완료
}


function draw() {
  background(220);
  image(video, 0, 0, width, height);
  detectWrist();
  console.log(pass);
  if(pass != 0 && pass % 3 == 0){   // 세번째에만
    drawKeypoints();
  }
  
  textSize(15);
  textStyle(BOLD);
  text("오른팔을 올리고 얼굴을 세 번 스치면 가면이 나옵니다.");
}

function detectWrist(){
  for(let i=0; i<poses.length; i++) {
    const pose = poses[i].pose;
    const keypoint = pose.keypoints[10];     // 오른팔 손목
    keypointX = keypoint.position.x;   // x좌표
  }
  // 배열에 넣고 x 좌표가 맨 처음 것과 맨 적은 것
  // 왼쪽으로 움직였을 때
  if(pass == 0 && keypointX > 550 && flag == true){   // 움직이면 다시
    pass++;
    flag = false;
  }
  if(pass == 1 && keypointX < 100 && flag == false){   // 처음 한 번 저장
    pass++;
    flag = true;
  }
  if(pass == 2 && keypointX > 550 && flag == true){   // 처음 한 번 저장
    pass++;
  }
}

function drawKeypoints(){
  for(let i=0; i<predictions.length; i++){
    const keypoints = predictions[i].scaledMesh;
    // white face
    noStroke();
    fill(255, 30);
    beginShape();
    vertex(keypoints[10][0], keypoints[10][1]);
    vertex(keypoints[338][0], keypoints[338][1]);
    vertex(keypoints[297][0], keypoints[297][1]);
    vertex(keypoints[332][0], keypoints[332][1]);
    vertex(keypoints[284][0], keypoints[284][1]);
    vertex(keypoints[251][0], keypoints[251][1]);
    vertex(keypoints[389][0], keypoints[389][1]);
    vertex(keypoints[356][0], keypoints[356][1]);
    vertex(keypoints[454][0], keypoints[454][1]);
    vertex(keypoints[323][0], keypoints[323][1]);
    vertex(keypoints[361][0], keypoints[361][1]);
    vertex(keypoints[288][0], keypoints[288][1]);
    vertex(keypoints[397][0], keypoints[397][1]);
    vertex(keypoints[365][0], keypoints[365][1]);
    vertex(keypoints[379][0], keypoints[379][1]);
    vertex(keypoints[378][0], keypoints[378][1]);
    vertex(keypoints[400][0], keypoints[400][1]);
    vertex(keypoints[377][0], keypoints[377][1]);
    vertex(keypoints[152][0], keypoints[152][1]);
    vertex(keypoints[148][0], keypoints[148][1]);
    vertex(keypoints[176][0], keypoints[176][1]);
    vertex(keypoints[149][0], keypoints[149][1]);
    vertex(keypoints[150][0], keypoints[150][1]);
    vertex(keypoints[136][0], keypoints[136][1]);
    vertex(keypoints[172][0], keypoints[172][1]);
    vertex(keypoints[58][0], keypoints[58][1]);
    vertex(keypoints[132][0], keypoints[132][1]);
    vertex(keypoints[93][0], keypoints[93][1]);
    vertex(keypoints[234][0], keypoints[234][1]);
    vertex(keypoints[127][0], keypoints[127][1]);
    vertex(keypoints[162][0], keypoints[162][1]);
    vertex(keypoints[21][0], keypoints[21][1]);
    vertex(keypoints[54][0], keypoints[54][1]);
    vertex(keypoints[103][0], keypoints[103][1]);
    vertex(keypoints[67][0], keypoints[67][1]);
    vertex(keypoints[109][0], keypoints[109][1]);
    vertex(keypoints[10][0], keypoints[10][1]);
    
    vertex(keypoints[151][0], keypoints[151][1]);
    vertex(keypoints[9][0], keypoints[9][1]);
    vertex(keypoints[8][0], keypoints[8][1]);
    vertex(keypoints[168][0], keypoints[168][1]);
    vertex(keypoints[6][0], keypoints[6][1]);
    vertex(keypoints[122][0], keypoints[122][1]);
    vertex(keypoints[245][0], keypoints[245][1]);
    vertex(keypoints[244][0], keypoints[244][1]);
    vertex(keypoints[243][0], keypoints[243][1]);
    vertex(keypoints[190][0], keypoints[190][1]);
    vertex(keypoints[56][0], keypoints[56][1]);
    vertex(keypoints[28][0], keypoints[28][1]);
    vertex(keypoints[27][0], keypoints[27][1]);
    vertex(keypoints[29][0], keypoints[29][1]);
    vertex(keypoints[30][0], keypoints[30][1]);
    vertex(keypoints[247][0], keypoints[247][1]);
    vertex(keypoints[130][0], keypoints[130][1]);
    
    vertex(keypoints[25][0], keypoints[25][1]);
    vertex(keypoints[110][0], keypoints[110][1]);
    vertex(keypoints[24][0], keypoints[24][1]);
    vertex(keypoints[23][0], keypoints[23][1]);
    vertex(keypoints[22][0], keypoints[22][1]);
    vertex(keypoints[26][0], keypoints[26][1]);
    vertex(keypoints[112][0], keypoints[112][1]);
    vertex(keypoints[243][0], keypoints[243][1]);
    vertex(keypoints[244][0], keypoints[244][1]);
    vertex(keypoints[245][0], keypoints[245][1]);
    vertex(keypoints[122][0], keypoints[122][1]);
    vertex(keypoints[6][0], keypoints[6][1]);
    vertex(keypoints[351][0], keypoints[351][1]);
    vertex(keypoints[465][0], keypoints[465][1]);
    vertex(keypoints[464][0], keypoints[464][1]);
    vertex(keypoints[463][0], keypoints[463][1]);
    vertex(keypoints[341][0], keypoints[341][1]);
    vertex(keypoints[256][0], keypoints[256][1]);
    vertex(keypoints[252][0], keypoints[252][1]);
    vertex(keypoints[253][0], keypoints[253][1]);
    vertex(keypoints[254][0], keypoints[254][1]);
    vertex(keypoints[339][0], keypoints[339][1]);
    vertex(keypoints[255][0], keypoints[255][1]);
    vertex(keypoints[359][0], keypoints[359][1]);
    vertex(keypoints[467][0], keypoints[467][1]);
    vertex(keypoints[260][0], keypoints[260][1]);
    vertex(keypoints[259][0], keypoints[259][1]);
    vertex(keypoints[257][0], keypoints[257][1]);
    vertex(keypoints[258][0], keypoints[258][1]);
    vertex(keypoints[286][0], keypoints[286][1]);
    vertex(keypoints[414][0], keypoints[414][1]);
    vertex(keypoints[463][0], keypoints[463][1]);
    vertex(keypoints[464][0], keypoints[464][1]);
    vertex(keypoints[465][0], keypoints[465][1]);
    vertex(keypoints[351][0], keypoints[351][1]);
    vertex(keypoints[6][0], keypoints[6][1]);
    
    vertex(keypoints[197][0], keypoints[197][1]);
    vertex(keypoints[195][0], keypoints[195][1]);
    vertex(keypoints[5][0], keypoints[5][1]);
    vertex(keypoints[4][0], keypoints[4][1]);
    vertex(keypoints[1][0], keypoints[1][1]);
    vertex(keypoints[19][0], keypoints[19][1]);
    vertex(keypoints[94][0], keypoints[94][1]);
    vertex(keypoints[141][0], keypoints[141][1]);
    vertex(keypoints[242][0], keypoints[242][1]);
    vertex(keypoints[20][0], keypoints[20][1]);
    vertex(keypoints[79][0], keypoints[79][1]);
    vertex(keypoints[166][0], keypoints[166][1]);
    vertex(keypoints[60][0], keypoints[60][1]);
    vertex(keypoints[20][0], keypoints[20][1]);
    vertex(keypoints[242][0], keypoints[242][1]);
    vertex(keypoints[141][0], keypoints[141][1]);
    vertex(keypoints[94][0], keypoints[94][1]);
    vertex(keypoints[2][0], keypoints[2][1]);
    vertex(keypoints[164][0], keypoints[164][1]);
    vertex(keypoints[0][0], keypoints[0][1]);
    vertex(keypoints[37][0], keypoints[37][1]);
    vertex(keypoints[39][0], keypoints[39][1]);
    vertex(keypoints[40][0], keypoints[40][1]);
    vertex(keypoints[185][0], keypoints[185][1]);
    vertex(keypoints[61][0], keypoints[61][1]);
    vertex(keypoints[146][0], keypoints[146][1]);
    vertex(keypoints[91][0], keypoints[91][1]);
    vertex(keypoints[181][0], keypoints[181][1]);
    vertex(keypoints[84][0], keypoints[84][1]);
    vertex(keypoints[17][0], keypoints[17][1]);
    
    vertex(keypoints[314][0], keypoints[314][1]);
    vertex(keypoints[405][0], keypoints[405][1]);
    vertex(keypoints[321][0], keypoints[321][1]);
    vertex(keypoints[375][0], keypoints[375][1]);
    vertex(keypoints[291][0], keypoints[291][1]);
    vertex(keypoints[409][0], keypoints[409][1]);
    vertex(keypoints[270][0], keypoints[270][1]);
    vertex(keypoints[269][0], keypoints[269][1]);
    vertex(keypoints[267][0], keypoints[267][1]);
    vertex(keypoints[0][0], keypoints[0][1]);
    vertex(keypoints[164][0], keypoints[164][1]);
    vertex(keypoints[2][0], keypoints[2][1]);
    vertex(keypoints[94][0], keypoints[94][1]);
    vertex(keypoints[170][0], keypoints[170][1]);
    vertex(keypoints[462][0], keypoints[462][1]);
    // 오른쪽 콧구멍
    vertex(keypoints[250][0], keypoints[250][1]);
    vertex(keypoints[290][0], keypoints[290][1]);
    vertex(keypoints[392][0], keypoints[392][1]);
    vertex(keypoints[309][0], keypoints[309][1]);
    vertex(keypoints[250][0], keypoints[250][1]);
    vertex(keypoints[462][0], keypoints[462][1]);
    vertex(keypoints[170][0], keypoints[170][1]);
    vertex(keypoints[94][0], keypoints[94][1]);
    vertex(keypoints[19][0], keypoints[19][1]);
    vertex(keypoints[1][0], keypoints[1][1]);
    vertex(keypoints[4][0], keypoints[4][1]);
    vertex(keypoints[5][0], keypoints[5][1]);
    vertex(keypoints[195][0], keypoints[195][1]);
    vertex(keypoints[197][0], keypoints[197][1]);
    vertex(keypoints[6][0], keypoints[6][1]);
    vertex(keypoints[351][0], keypoints[351][1]);
    vertex(keypoints[465][0], keypoints[465][1]);
    vertex(keypoints[464][0], keypoints[464][1]);
    vertex(keypoints[463][0], keypoints[463][1]);
    endShape(CLOSE);
    
    beginShape();    
    vertex(keypoints[463][0], keypoints[463][1]);
    vertex(keypoints[464][0], keypoints[464][1]);
    vertex(keypoints[465][0], keypoints[465][1]);
    vertex(keypoints[351][0], keypoints[351][1]);
    vertex(keypoints[6][0], keypoints[6][1]);
    vertex(keypoints[168][0], keypoints[168][1]);
    vertex(keypoints[8][0], keypoints[8][1]);
    vertex(keypoints[9][0], keypoints[9][1]);
    vertex(keypoints[151][0], keypoints[151][1]);
    vertex(keypoints[10][0], keypoints[10][1]);
    endShape(CLOSE);
    
    // left
    fill(255,0,0,40);
    beginShape();
    vertex(keypoints[130][0], keypoints[130][1]);
    vertex(keypoints[7][0], keypoints[7][1]);
    vertex(keypoints[163][0], keypoints[163][1]);
    vertex(keypoints[144][0], keypoints[144][1]);
    vertex(keypoints[24][0], keypoints[24][1]);
    vertex(keypoints[229][0], keypoints[229][1]);
    vertex(keypoints[118][0], keypoints[118][1]);
    vertex(keypoints[50][0], keypoints[50][1]);
    vertex(keypoints[117][0], keypoints[117][1]);
    vertex(keypoints[31][0], keypoints[31][1]);
    endShape(CLOSE);
    
    // right
    fill(0,0,255,40);
    beginShape();
    vertex(keypoints[359][0], keypoints[359][1]);
    vertex(keypoints[249][0], keypoints[249][1]);
    vertex(keypoints[390][0], keypoints[390][1]);
    vertex(keypoints[373][0], keypoints[373][1]);
    vertex(keypoints[254][0], keypoints[254][1]);
    vertex(keypoints[449][0], keypoints[449][1]);
    vertex(keypoints[347][0], keypoints[347][1]);
    vertex(keypoints[280][0], keypoints[280][1]);
    vertex(keypoints[346][0], keypoints[346][1]);
    vertex(keypoints[261][0], keypoints[261][1]);
    endShape(CLOSE);
    
    // red mouth
    fill(255,0,0,40);
    beginShape();
    vertex(keypoints[291][0], keypoints[291][1]);
    vertex(keypoints[409][0], keypoints[409][1]);
    vertex(keypoints[270][0], keypoints[270][1]);
    vertex(keypoints[269][0], keypoints[269][1]);
    vertex(keypoints[267][0], keypoints[267][1]);
    vertex(keypoints[0][0], keypoints[0][1]);
    vertex(keypoints[37][0], keypoints[37][1]);
    vertex(keypoints[39][0], keypoints[39][1]);
    vertex(keypoints[40][0], keypoints[40][1]);
    vertex(keypoints[185][0], keypoints[185][1]);
    vertex(keypoints[61][0], keypoints[61][1]);
    vertex(keypoints[146][0], keypoints[146][1]);
    vertex(keypoints[91][0], keypoints[91][1]);
    vertex(keypoints[181][0], keypoints[181][1]);
    vertex(keypoints[84][0], keypoints[84][1]);
    vertex(keypoints[17][0], keypoints[17][1]);
    vertex(keypoints[314][0], keypoints[314][1]);
    vertex(keypoints[405][0], keypoints[405][1]);
    vertex(keypoints[321][0], keypoints[321][1]);
    vertex(keypoints[375][0], keypoints[375][1]);
    vertex(keypoints[291][0], keypoints[291][1]);
    
    vertex(keypoints[306][0], keypoints[306][1]);
    vertex(keypoints[308][0], keypoints[308][1]);
    vertex(keypoints[324][0], keypoints[324][1]);
    vertex(keypoints[318][0], keypoints[318][1]);
    vertex(keypoints[402][0], keypoints[402][1]);
    vertex(keypoints[317][0], keypoints[317][1]);
    vertex(keypoints[14][0], keypoints[14][1]);
    vertex(keypoints[87][0], keypoints[87][1]);
    vertex(keypoints[178][0], keypoints[178][1]);
    vertex(keypoints[88][0], keypoints[88][1]);
    vertex(keypoints[95][0], keypoints[95][1]);
    vertex(keypoints[78][0], keypoints[78][1]);
    vertex(keypoints[191][0], keypoints[191][1]);
    vertex(keypoints[80][0], keypoints[80][1]);
    vertex(keypoints[81][0], keypoints[81][1]);
    vertex(keypoints[82][0], keypoints[82][1]);
    vertex(keypoints[13][0], keypoints[13][1]);
    vertex(keypoints[312][0], keypoints[312][1]);
    vertex(keypoints[311][0], keypoints[311][1]);
    vertex(keypoints[310][0], keypoints[310][1]);
    vertex(keypoints[415][0], keypoints[415][1]);
    endShape(CLOSE);
  }
}
