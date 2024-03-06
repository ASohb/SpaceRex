
var trex, trex_running, edges;
var groundImage;
var score;




var LOSE = 0;
var PLAY = 1;
var WIN = 2;
var fim;



var gameState=PLAY;




function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  groundImage = loadImage("ground2.png")
  obstacle1 = loadAnimation ("Obstaculo10.png","Obstaculo11.png","Obstaculo12.png" )
  obstacle2 = loadAnimation("Obstaculo0.png","Obstaculo1.png","Obstaculo2.png")
  trex_collided = loadImage("trex_collided.png");
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")

  animationWinLose = loadAnimation("FINALanimation00.png","FINALanimation01.png","FINALanimation02.png","FINALanimation03.png","FINALanimation04.png","FINALanimation05.png","FINALanimation06.png","FINALanimation07.png","FINALanimation08.png","FINALanimation09.png","FINALanimation10.png","FINALanimation11.png","FINALanimation12.png")

}




function setup(){
  createCanvas(600,200);
 
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);


 // trex.addAnimation ("animationWinLose",animationWinLose)
 gameOver = createSprite(300,100);
 gameOver.addImage(gameOverImg);
 
 restart = createSprite(300,140);
 restart.addImage(restartImg);
 
 gameOver.scale = 0.5;
 restart.scale = 0.5;
 

  edges = createEdgeSprites();


  fim = createSprite(200, 100, 600, 200);
  fim.addAnimation("animation",  animationWinLose);
  fim.visible=false;



  trex.debug = false
  trex.setCollider("rectangle",0,0,50,50)




  Ground=createSprite (50,195,400,15)
  Ground.addImage (groundImage)
 
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50




teto = createSprite(0, 3, 600, 5)
teto.visible = false;




score = 0;




obstacleGroup = createGroup();
starGroup = createGroup();




}








function draw(){
  // Definir a cor do plano de fundo
  background("#181824");
  fill ("white");
  text("Pontuação: "+score, 500, 20);

  // Verificar se o score é maior ou igual a 200
  if(score >= 200){
      gameState = WIN;
  }

  // Lógica do jogo para o estado PLAY
  if(gameState === PLAY){
      score = score + Math.round(frameCount/60);
      gameOver.visible = false;
      restart.visible = false;
      
      if(keyDown("space")){
          trex.velocityY = -7;
      }
      trex.velocityY = trex.velocityY + 0.5;
      Ground.velocityX = -7;
      spawnStar();
      spawnObstacles();

      trex.collide(teto);
      trex.collide(Ground);

      if(obstacleGroup.isTouching(trex) || trex.y >= 300){
          gameState = LOSE;
      }
  }
  // Lógica para exibir a animação final quando o jogo é vencido
  else if(gameState === WIN){
      fim.visible = true;
      x=200
      y=200
  }
  // Lógica para exibir a animação de perda quando o jogo é perdido
  else if(gameState === LOSE){
      fim.visible = false;
      gameOver.visible = true;
      restart.visible = true;

      trex.changeAnimation("collided", trex_collided);
  }

  drawSprites();
}


function spawnStar(){
  if(frameCount%30  ===0){
star = createSprite(600, 100, 5,5);
star.y= Math.round(random(5, 200));
star.velocityX = -5
trex.depth = star.depth;
trex.depth += 1;
star.lifetime = 200;
starGroup.add(star)
  }
  if(frameCount%25  ===0){
    star = createSprite(600, 100, 5,5);
    star.y= Math.round(random(5, 200));
    star.velocityX = -5
    trex.depth = star.depth;
  trex.depth += 1;
  star.lifetime = 200;
  starGroup.add(star)
 }
 
}




function spawnObstacles(){
  if (frameCount %60 ===0){
    var obstacle = createSprite (600, 165, 10, 40);
    obstacle.velocityX = -3;
    obstacle.y = Math.round(random(5,200));


    var rand = Math.round (random(1,2));
    switch(rand){
      case 1: obstacle.addAnimation ("obstaculos", obstacle1)
      break;
      case 2: obstacle.addAnimation ("obstaculos2", obstacle2)
      break;
      default:break;


    }
    obstacle.scale = 1.5;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}

