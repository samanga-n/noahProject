var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running, boy_falling;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var carsGroup, car1, car2, car3

var score;
var gameOverImg,restartImg

function preload(){
    boy_running = loadAnimation("boy running 1.png","boy running 2.png","boy running 3.png","boy running 4.png","boy running 5.png","boy running 6.png");
    boy_falling = loadAnimation("boy falling down.png");
    
    groundImage = loadImage("bgImg.png");
    
    cloudImage = loadImage("clouds.png");
    
    car1img = loadImage("car.png");
    car2img = loadImage("car2.png");
    car3img = loadImage("car3.png");
   
    
    restartImg = loadImage("restart.png")
    gameOverImg = loadImage("gameOver.png")

}

function setup() {
    createCanvas(700, 200);

    
    
    boy = createSprite(50,160,20,50);
    boy.addAnimation("running", boy_running);
    boy.addAnimation("collided", boy_falling);
    // car1 = createSprite()
    // car2 = createSprite()
    // car3 = createSprite()


    // car1.addImage(car1img)
    // car2.addImage(car2img)
    // car3.addImage(car3img)
    boy.scale = 0.8;
    
    ground = createSprite(350,195,600,20);
    ground.addImage(groundImage);
    // ground.x = ground.width /2;
    ground.scale=0.2

    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(300,140);
    restart.addImage(restartImg);
    
   
    gameOver.scale = 0.5;
    restart.scale = 0.5;
    
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
    carsGroup = createGroup();
    cloudsGroup = createGroup();
  
    
    boy.setCollider("rectangle",0,0,boy.width,boy.height);
    boy.debug = true
    
    score = 0;
    
  }
  
  function draw() {
    
    background(180);
    text("Score: "+ score, 500,50);
    
    
    if(gameState === PLAY){
  
      gameOver.visible = false;
      restart.visible = false;
      
      ground.velocityX = -(4 + 3* score/100)
      score = score + Math.round(getFrameRate()/60);
      
      if(score>0 && score%100 === 0){
         
      }
      
      if (ground.x < 0){
        ground.x =width/2;
      }
      if(keyDown("space")&& boy.y >= 100) {
          boy.velocityY = -12;
      }
      boy.velocityY = boy.velocityY + 0.8
      spawnClouds();
    
      
      spawncars();
      
      if(carsGroup.isTouching(boy)){
          
          gameState = END;
        
      }
    }
     else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
        boy.changeAnimation("collided", boy_falling);
      
       
       
        ground.velocityX = 0;
        boy.velocityY = 0
      carsGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
       
       carsGroup.setVelocityXEach(0);
       cloudsGroup.setVelocityXEach(0);    
       if(mousePressedOver(restart)) {
        reset();
      }
      }
    boy.collide(invisibleGround);
    
    
  
  
    drawSprites();
}

function reset(){
    gameState=PLAY
    gameOver.visible=false
    restart.visible=false
    carsGroup.destroyEach()
    cloudsGroup.destroyEach()
    boy.changeAnimation("running", boy_running)
    score=0
  
  
  
  
  
  
  }
  
  
  function spawncars(){
   if (frameCount % 60 === 0){
     var car = createSprite(600,180,10,40);
     car.velocityX = -(6 + score/100);
     
      
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: car.addImage(car1img);
                break;
        case 2: car.addImage(car2img);
                break;
        case 3: car.addImage(car3img);
                break;
        default: break;
      }
      car.scale = 0.8;
      car.lifetime = 300;
      carsGroup.add(car);
   }
  }
  
  function spawnClouds() {
    if (frameCount % 60 === 0) {
      var cloud = createSprite(600,120,40,10);
      cloud.y = Math.round(random(80,120));
      cloud.addImage(cloudImage);
      cloud.scale = 0.1;
      cloud.velocityX = -3;
      cloud.lifetime = 200;
      cloud.depth = boy.depth;
      boy.depth = boy.depth + 1;
      cloudsGroup.add(cloud);
      
    }
  }
  












  