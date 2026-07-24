let alvoX, alvoY;
let pontos = 0;
let vidas = 3;
let nivel = 1;

let tempo = 60;
let ultimoSegundo = 0;

let particulas = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Arial");

  ultimoSegundo = millis();

  novoAlvo();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function novoAlvo() {
  alvoX = random(50, width - 50);
  alvoY = random(50, height - 50);
}

function draw() {

  desenharFundo();

  // Cronômetro
  if (millis() - ultimoSegundo >= 1000) {
    tempo--;
    ultimoSegundo = millis();

    if (tempo <= 0) {
      fimDeJogo("⏰ Tempo Esgotado!");
    }
  }

  // Movimento do alvo
  alvoX += random(-nivel, nivel);
  alvoY += random(-nivel, nivel);

  alvoX = constrain(alvoX, 30, width - 30);
  alvoY = constrain(alvoY, 30, height - 30);

  let distancia = dist(mouseX, mouseY, alvoX, alvoY);

  // Barra de proximidade
  let barra = map(distancia, width, 0, 0, 300);
  barra = constrain(barra, 0, 300);

  fill(255);
  rect(20, 20, 300, 20);

  fill(0, 255, 0);
  rect(20, 20, barra, 20);

  // Círculo detector
  noStroke();
  fill(233, 30, 99, 120);
  circle(mouseX, mouseY, distancia);

  // HUD
  fill(255);
  textSize(22);

  text("⭐ Pontos: " + pontos, 20, 70);
  text("❤️ Vidas: " + vidas, 20, 100);
  text("⏱ Tempo: " + tempo, 20, 130);
  text("🎮 Nível: " + nivel, 20, 160);

  // Partículas
  atualizarParticulas();

  // Encontrou o alvo
  if (distancia < 10) {

    criarExplosao(alvoX, alvoY);

    pontos++;

    if (pontos % 5 == 0) {
      nivel++;
    }

    novoAlvo();
  }
}

function desenharFundo() {

  for (let y = 0; y < height; y++) {

    let c = map(y, 0, height, 80, 180);

    stroke(20, c, 255);

    line(0, y, width, y);

  }

}

function criarExplosao(x, y) {

  for (let i = 0; i < 40; i++) {

    particulas.push({

      x: x,
      y: y,
      vx: random(-5, 5),
      vy: random(-5, 5),
      vida: 255

    });

  }

}

function atualizarParticulas() {

  noStroke();

  for (let i = particulas.length - 1; i >= 0; i--) {

    let p = particulas[i];

    fill(255, 215, 0, p.vida);

    circle(p.x, p.y, 6);

    p.x += p.vx;
    p.y += p.vy;

    p.vida -= 5;

    if (p.vida <= 0) {
      particulas.splice(i, 1);
    }

  }

}

function mousePressed() {

  let d = dist(mouseX, mouseY, alvoX, alvoY);

  if (d < 10) {
    return;
  }

  if (d > 120) {

    vidas--;

    if (vidas <= 0) {
      fimDeJogo("💀 Você perdeu!");
    }

  }

}

function fimDeJogo(mensagem) {

  noLoop();

  background(30);

  fill(255);
  textAlign(CENTER, CENTER);

  textSize(55);
  text(mensagem, width / 2, height / 2 - 70);

  textSize(30);
  text("Pontuação: " + pontos, width / 2, height / 2);

  textSize(22);
  text("Recarregue a página para jogar novamente.", width / 2, height / 2 + 60);

}