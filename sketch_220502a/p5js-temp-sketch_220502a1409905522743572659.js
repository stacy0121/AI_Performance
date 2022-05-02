var texts = "ABCDEFU";
var chars = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  chars = texts.split("");   // string을 ""기준으로 char 13개로 분리
}


function draw() {
  textSize(mouseY-50);
  background(170,170,170);
  for(var i=0;i<chars.length;i++){
    text(chars[i],mouseX+i*10, random(mouseY-20,mouseY+20));   // 10픽셀 거리
  }
}
