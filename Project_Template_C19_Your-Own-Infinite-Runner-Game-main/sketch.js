
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var dog, dog_running, dog_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var score;
var gameOverImg,restartImg;
var dieSound;
var message;

var background;

function preload(){
    dog_running = loadAnimation("dog.png");
    dog_collided = loadAnimation("dog_collided.jpg");
    
    groundImage = loadImage("ground2.png");

    background = loadImage("bckground.jpg")
    
    cloudImage = loadImage("cloud.png");
    
    obstacle1 = loadImage("obstacle_1.png");
    obstacle2 = loadImage("obstacle_2.jpg");
    obstacle3 = loadImage("obstacle_3.jpg");
    obstacle4 = loadImage("obstacle_4.webp");
    
    restartImg = loadImage("restart.png")
    gameOverImg = loadImage("GameOver.jpg")
    
    dieSound = loadSound("die.mp3")
    
}

function setup() {
    dog_running = loadAnimation("dog.png");
    dog_collided = loadAnimation("dog_collided.jpg");
    
    groundImage = loadImage("ground2.png");
    
    cloudImage = loadImage("cloud.png");
    
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
    
    restartImg = loadImage("restart.png")
    gameOverImg = loadImage("gameOver.png")
    
    dieSound = loadSound("die.mp3")
    
  }
  
  function setup() {
    createCanvas(600, 200);
  
    dog = createSprite(50,180,20,50);
    
    dog.addAnimation("running", dog_running);
    dog.addAnimation("collided", dog_collided);
    
  
    dog.scale = 0.5;
    
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",background,jpg);
    ground.x = ground.width /2;
    
    GameOver = createSprite(300,100);
    GameOver.addImage(GameOverImg);
    
    restart = createSprite(300,140);
    restart.addImage(restartImg);
    
    GameOver.scale = 0.5;
    restart.scale = 0.5;
    
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
    
    //create Obstacle and Cloud Groups
    obstaclesGroup = createGroup();
    cloudsGroup = createGroup();
  
    
    dog.setCollider("rectangle",0,0,dog.width,dog.height);
    dog.debug = true
    
    score = 0;
    
}

function draw() {
    background(180);
    //displaying score
    text("Score: "+ score, 500,50);
    
    console.log(message);
    
    if(gameState === PLAY){
      //move the 
      gameOver.visible = false;
      restart.visible = false;
      //change the trex animation
      dog.changeAnimation("running", dog_running);
      
      ground.velocityX = -(4 + 3* score/100)
      //scoring
      score = score + Math.round(getFrameRate()/60);
      
      if(score>0 && score%100 === 0){
         checkPointSound.play() 
      }
      
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
      //jump when the space key is pressed
      if(keyDown("space")&& dog.y >= 100) {
          dog.velocityY = -12;
      }
      
      //add gravity
      dog.velocityY = dog.velocityY + 0.8
    
      //spawn the clouds
      spawnClouds();
    
      //spawn obstacles on the ground
      spawnObstacles();
      
      if(obstaclesGroup.isTouching(dog)){
          //trex.velocityY = -12;
          jumpSound.play();
          gameState = END;
          dieSound.play()
        
      }
    }
     else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
       //change the trex animation
        dog.changeAnimation("collided", dog_collided);
         
        if(mousePressedOver(restart)){
          reset();
        }
       
        ground.velocityX = 0;
        dog.velocityY = 0
        
       
        //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
       
       obstaclesGroup.setVelocityXEach(0);
       cloudsGroup.setVelocityXEach(0);    
     }
    
   
    //stop trex from falling down
    dog.collide(invisibleGround);
    
}

drawSprites();


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
}

var rand = Math.round(random(1,6));
switch(rand) {
  case 1: obstacle.addImage(obstacle_1);
          break;
  case 2: obstacle.addImage(obstacle_2);
          break;
  case 3: obstacle.addImage(obstacle_3);
          break;
  case 4: obstacle.addImage(obstacle_4);
          break;
  default: break;
}

 //assign scale and lifetime to the obstacle           
 obstacle.scale = 0.5;
 obstacle.lifetime = 300;

 obstaclesGroup.add(obstacle);

