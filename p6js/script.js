let olhoX, olhoY;
let piscando = false;
let tempoPiscar = 0;
let estrelas = [];
let corFundo = 0;

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < 100; i++) {
    estrelas.push({
      x: random(width),
      y: random(height),
      tamanho: random(2, 5),
      velocidade: random(0.5, 2)
    });
  }
}

function draw() {

  corFundo += 0.3;

  background(
    120 + sin(corFundo * 0.02) * 40,
    150,
    255
  );

  desenharEstrelas();

  // Orelhas
  fill(255,220,180);
  ellipse(90,300,50,80);
  ellipse(510,300,50,80);

  // Cabelo
  fill(70,40,20);
  arc(300,250,340,320,PI,TWO_PI);

  // Rosto
  fill(255,220,180);
  ellipse(300,300,320);

  // Bochechas
  fill(255,170,170,120);
  ellipse(200,340,45);
  ellipse(400,340,45);

  // Nariz
  fill(245,190,150);
  triangle(300,270,280,330,320,330);

  // Sobrancelhas
  strokeWeight(5);
  line(180,190,240,200);
  line(360,200,420,190);

  olhoX = map(mouseX,0,width,180,220);
  olhoY = map(mouseY,0,height,220,260);

  tempoPiscar++;

  if(tempoPiscar > 180){
      piscando = true;
  }

  if(tempoPiscar > 190){
      piscando = false;
      tempoPiscar = 0;
  }

  fill(255);

  if(!piscando){

      ellipse(200,240,70);
      ellipse(400,240,70);

      fill(70);

      ellipse(olhoX,olhoY,22);
      ellipse(olhoX+200,olhoY,22);

      fill(255);
      ellipse(olhoX-5,olhoY-5,6);

      ellipse(olhoX+195,olhoY-5,6);

  }else{

      strokeWeight(4);
      line(170,240,230,240);
      line(370,240,430,240);

  }

  noFill();
  strokeWeight(6);

  if(mouseIsPressed){

      arc(300,360,120,80,0,PI);

      desenharCoracoes();

  }else{

      let sorriso = map(mouseY,0,height,PI,0);

      arc(300,360,120,80,sorriso,TWO_PI-sorriso);

  }

  // Texto
  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("😊 Mexa o mouse e clique!", width/2,40);

}

function desenharEstrelas(){

  noStroke();

  for(let e of estrelas){

      fill(255);

      circle(e.x,e.y,e.tamanho);

      e.y += e.velocidade;

      if(e.y > height){

          e.y = 0;
          e.x = random(width);

      }

  }

}

function desenharCoracoes(){

  fill(255,0,100);

  for(let i=0;i<10;i++){

      let x = random(100,500);
      let y = random(50,180);

      textSize(random(15,30));
      text("❤",x,y);

  }

}