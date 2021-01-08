var dog,dogSitImg,dogStand,dogStandImg;
var database=firebase.database();
var Food,dogFood;
var remaining = 20;

function preload(){
  dogSitImg = loadImage("images/dogImg.png");
  dogStandImg = loadImage("images/dogImg1.png");
}

function setup(){
    createCanvas(500,500);
    dog = createSprite(250,250,10,10);
    dog.addImage("dog",dogSitImg);
    dog.scale = 0.15;

    dogFood = database.ref("dog/");
    dogFood.on("value",feedFood)

}

function draw(){
    background("green");
    if(keyWentDown(UP_ARROW)){
      remaining--;
      feedFood();
      dog.addImage("dog",dogStandImg);
    }

    
    if(remaining<0){
      remaining=0;
    }

    drawSprites();

    textSize(20);
    fill(255);
    textFont("lucida calligraphy");
    strokeWeight(0.6);
    stroke(255)
    text("Food remaining : "+remaining,150,170);
    text("Press  UP_ARROW  to  feed  the  dog",70,50);
}


function readFood(data){
  dogFood = data.val();
  remaining = dogFood;
}

function feedFood(){
  dogFood.set({
  Food:remaining
})

}