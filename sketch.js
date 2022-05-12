  var imagemTorre, torre;
  var imagemPorta, porta, grupoPortas;
  var imagemGrade, grade, grupoGrades;
  var imagemfantasma, fantasma;
  var blocoinvisivel, grupodeBlocos;
  var somAssustador;
  var estado = "JOGAR";
  var score = 0

function preload(){
  imagemTorre = loadImage("tower.png");
  imagemPorta = loadImage("door.png");
  imagemGrade = loadImage("climber.png");
  imagemfantasma = loadImage("ghost-standing.png");
  somAssustador = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  somAssustador.loop();
  somAssustador.setVolume(0.1);
  torre = createSprite(300,300);
  torre.addImage("torre", imagemTorre);
  torre.velocityY = 1;

  grupoPortas = new Group();
  grupoGrades = new Group();
  grupodeBlocos = new Group();

  fantasma = createSprite(200,200,50,50);
  fantasma.scale = 0.3;
  fantasma.addImage("fantasma", imagemfantasma);
}

function draw() {
  background("black");
  drawSprites();
  if(estado === "JOGAR"){

  score = score + Math.round(frameRate()/60);
  if (torre.y > 590){
    torre.y = 300;
  }
  if(keyDown("right")){
    fantasma.x = fantasma.x + 3;
  }

  if(keyDown("left")){
    fantasma.x = fantasma.x - 3;
}
  if(keyDown("space")){
    fantasma.velocityY = -10;
}
  fantasma.velocityY = fantasma.velocityY + 0.8;

  if(grupoGrades.isTouching(fantasma)){
     fantasma.velocityY = 0;
  }

  if(grupodeBlocos.isTouching(fantasma) || fantasma.y > 600){
    estado = "ENCERRAR";
}
 gerarPortas();
}

  if(estado === "ENCERRAR"){
    grupoPortas.setVelocityYEach(0);
    grupoGrades.setVelocityYEach(0);
    grupodeBlocos.setVelocityYEach(0);stroke("yellow");
    torre.velocityY = 0;
    fantasma.destroy();
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
   
  }
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Score: "+score,20,30);
}

  function gerarPortas(){
   if (frameCount % 240 === 0){
    porta = createSprite(200,-50);
    porta.addImage("porta", imagemPorta);

    grade = createSprite(200,10);
    grade.addImage("grade",imagemGrade);

    blocoinvisivel = createSprite(200,15);
    blocoinvisivel.width = grade.width;
    blocoinvisivel.height = 2;

    porta.x = Math.round(random(120,400));
    porta.velocityY = 1;

    grade.x = porta.x;
    grade.velocityY = 1;

    blocoinvisivel.x = porta.x;
    blocoinvisivel.velcityY = 1;
    blocoinvisivel.visible = false;

    fantasma.depth = porta.depth;
    fantasma.depth = fantasma.depth + 1;

    porta.lifetime = 800;
    grade.lifetime = 800;
    blocoinvisivel.lifetime = 800;

    grupoPortas.add(porta);
    grupoGrades.add(grade);
    grupodeBlocos.add(blocoinvisivel);
  }
}
