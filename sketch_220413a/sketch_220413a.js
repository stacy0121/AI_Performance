let cam;
let poseNet;
let poses = [];
// 사용자 지정 변수
let count = 0;
let score = 0;
let distance = 0;
let l_hip; let l_knee;

function setup() {
  createCanvas(800,600);
  cam = createCapture(VIDEO);
  cam.size(width, height);
  
  imageReady();
  cam.hide();
  frameRate(60);
}

function imageReady(){
  let options = {
    imageScaleFactor: 1,
    minConfidence: 0.1
  };
  poseNet = ml5.poseNet(cam, modelReady);
  poseNet.on('pose', function(results){
    poses = results;
  });
  cam.hide();
}

function modelReady(){
  select('#status').html('Model Loaded');
}

function draw() {
  image(cam, 0, 0, width, height);
  if(poses.length>0){
    // 5초 내에 준비 및 길이 측정
    if(frameCount/60<6){
      noFill();
      strokeWeight(3);
      stroke(0);
      if(poses[0].pose.keypoints[0].position.y > 20 && poses[0].pose.keypoints[15].position.y < 580){
        stroke(255);
      }
      ellipse(width/2,height/2,400,570);
      textSize(25);
      fill(0);
      stroke(0);
      text("5초 내에 원 안에 대기해주세요.", width/2-165, height/2);
      l_hip = poses[0].pose.keypoints[11].position.y;
      l_knee = poses[0].pose.keypoints[13].position.y;
      distance = l_knee-l_hip;   // 굽힌 정도 측정 변수
    }
    // 길이 측정 후 자세 카운트
    if(frameCount/60>=6){
      // 원 안에 들어갔을 때
      if(poses[0].pose.keypoints[0].position.y > 20 && poses[0].pose.keypoints[15].position.y < 580){
        countPose();
      }
    }
  }
  fill(0);
  rect(6, 4, 270, 40);
  textSize(40);
  fill(255);
  text("Squat Counter", 10, 38);
  strokeWeight(1);
  fill(0);
  text("Count: "+count, 10, 82);
  text("accuracy: "+score+"/5", 10, 115);   // 자세 정확도(5점 만점)
  textSize(15);
  text("1. 다리를 어깨너비로 벌린다.\n2. 허벅지가 수평이 되도록 한다.\n3. 등을 곧게 펴고 무게중심을 발의 중심에 둔다.",10, height-50);
}

function countPose(){
  if(poses.length>0){
    l_hip = poses[0].pose.keypoints[11].position.y;   // 현재 위치
    l_knee = poses[0].pose.keypoints[13].position.y;
    let r_hip = poses[0].pose.keypoints[12].position.y; 
    let r_knee = poses[0].pose.keypoints[14].position.y;
    //let l_shoulder = poses[0].pose.keypoints[5].position.x;
    //let r_shoulder = poses[0].pose.keypoints[6].position.x;
    // 양쪽 엉덩이와 무릎 높이가 비슷한가
    if(l_knee-l_hip<40 && l_knee-l_hip>-20){   // 차이 40 ~ -20픽셀
      if(r_knee-r_hip<40 && r_knee-r_hip>-20){
        if(frameCount%30 == 0){   // 0.5초에 한 번 카운트
          count++;
        }
      }
    }
    else{
      fill(255,0,0);
      textSize(30);
      strokeWeight(10);
      text("다리를 더 굽히세요!", width/2-40, 50);
    }
  }
    
  // 허벅지가 수평이 될수록 정확도가 높음(5점 만점)
  let accuracy = round(distance-abs(l_knee-l_hip));   // 굽힌 정도(높을수록 우수)
  if(accuracy>distance-40){
    score=5;
  }
  else if(accuracy>distance-50){            
    score=4;
  }
  else if(accuracy>distance-60){        // 차이가 60픽셀 이하일 때  
    score=3;
  }
  else if(accuracy>distance-70){            
    score=2;
  }
  else if(accuracy>distance-80){            
    score=1;
  }
}
