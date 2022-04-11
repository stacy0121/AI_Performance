let objectDetector;
let img; let objects = [];
//let status;

function preload(){
  img = loadImage('photo.jpg');

}

function setup(){
  createCanvas(640,420);
  objectDetector = ml5.objectDectector('cocossd', modelReady);
}

function modelReady(){
  console.log("model Ready!");
  //status = true;
  console.log('Decting');
  objectDetector.detect(img, gotResult);
}

function gotResult(err, results){
  if(err){
  console.log(err);
  }
  console.log(results);
  objects = results;
}

function draw(){
  //if(status != undefined){
    image(img, 0, 0);
    for(let i = 0; i< objects.Length; i++){
      noStroke();
      fill(0, 255, 0);
      text(objects[i].label + " " + nfc(objects[i].confidence * 100.0, 2) + "%", objects[i].x + 5, objects[i].y + 15);
      noFill();
      strokeWeights(4);
      stroke(0, 255, 0);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      
    }
  //}
}
