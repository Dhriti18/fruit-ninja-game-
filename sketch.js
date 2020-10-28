var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

var monster, monsterImage, enemyGroup,ds;


var fruitsGroup, fr1, fr1img;
var fr2, fr2img;
var fr3, fr3img;
var fr4, fr4img;


var sword, swordImage, gmoi,gos;

function preload() {
  swordImage = loadImage("sword.png");
  gmoi = loadImage("gameover.png");
  fr1img = loadImage("fruit1.png");
  fr2img = loadImage("fruit2.png");
  fr3img = loadImage("fruit3.png");
  fr4img = loadImage("fruit4.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png");
  ds=loadSound("knifeSwooshSound.mp3");
  gos=loadSound("gameover.mp3");

}

function setup() {
  createCanvas(400, 400);
  sword = createSprite(200, 200, 10, 10);
  sword.addImage("sword", swordImage);
  
  sword.addImage("game",gmoi);
  
  
  sword.scale = 0.5;
  fruitsGroup = createGroup();
  enemyGroup = createGroup();


}

function draw() {
  background("lightblue");
  text("Score: " + score, 300, 300);

  if (gameState === PLAY) {
    sFruit();

    Enemy();
    sword.y = World.mouseY;
    sword.x = World.mouseX;

    if (sword.isTouching(fruitsGroup)) {
      fruitsGroup.destroyEach();
      score = score + 2;
      ds.play();
    }
    if (sword.isTouching(enemyGroup)) {
      gameState = END;
      
      gos.play();
  
    
    
    }
  }


  if (gameState === END) {
     sword.changeImage("game",gmoi);
    sword.scale=1.5;
    fruitsGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitsGroup.setVelocityEach(0);
    enemyGroup.setVelocityEach(0);
   sword.x=200;
    sword.y=200;
   
  }


  drawSprites();

}

function sFruit() {
  if (World.frameCount % 80 === 0) {
    var fruits = createSprite(400, 200, 20, 20);
    fruits.scale = 0.2;
    r = Math.round(random(1, 4));


    if (r === 1) {
      fruits.addImage(fr1img);
    } else if (r === 2) {
      fruits.addImage(fr2img);

    } else if (r == 3) {
      fruits.addImage(fr3img);
    } else {
      fruits.addImage(fr4img);
    }

    fruits.y = Math.round(random(50, 340));
    
    
    position=Math.round(random(1,2))
    console.log(position);
      if(position===1){
        fruits.x=400;
        
         fruits.velocityX = -(7+3*score/4);
         }
      else {
        if(position===2){
       fruits.x=0; 
         fruits.velocityX = (7+3*score/4);}
      }
    
    
    
    
    fruits.setLifetime = 100;

    fruitsGroup.add(fruits);


  }
}

function Enemy() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 250, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -(8+2*score/10);
    monster.setLifetime = 50;

    enemyGroup.add(monster);
  }



}