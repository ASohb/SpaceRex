var trex, trex_running, edges;
var groundImage;
var score;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  groundImage = loadImage("ground2.png")
  obstacle1 = loadAnimation ("Obstaculo10.png","Obstaculo11.png","Obstaculo12.png" )
  obstacle2 = loadAnimation("Obstaculo0.png","Obstaculo1.png","Obstaculo2.png")

}

function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);

  edges = createEdgeSprites();

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
}


function draw(){
  //definir a cor do plano de fundo 
  background("#181824");
  
  fill ("white")
  text("Pontuação: "+score, 500, 20)
  score = score+Math.round(frameCount/60);
  //registrando a posição y do trex
  console.log(trex.y)
  
  //pular quando tecla de espaço for pressionada
  if(keyDown("space")){
    trex.velocityY = -7;
  }
  //if (Ground.x < 0) {
   // Ground.x = Ground.width / 2
  //}
  trex.velocityY = trex.velocityY + 0.5;
  Ground.velocityX = -7
  spawnStar()
  spawnObstacles();
trex.collide(teto)
 //impedir que o trex caia
  trex.collide(Ground)
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
  }
  if(frameCount%25  ===0){
    star = createSprite(600, 100, 5,5);
    star.y= Math.round(random(5, 200));
    star.velocityX = -5
    trex.depth = star.depth;
  trex.depth += 1; 
  star.lifetime = 200;
 }
  
} 


function spawnObstacles(){
  if (frameCount %60 ===0){
    var obstacle = createSprite (600, 165, 10, 40);
    obstacle.velocityX = -3;
    obstacle.y = Math.round(random(5,200));

    var rand = Math.round (random(1,2));
    switch(rand){
      case 1: obstacle.addAnimation, ("Obstaculo10.png","Obstaculo11.png","Obstaculo12.png", obstacle1 );
      break;
      case 2: obstacle.addAnimation, ("Obstaculo0.png","Obstaculo1.png","Obstaculo2.png", obstacle2 )
      break;
      default:break;

    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
  }
}