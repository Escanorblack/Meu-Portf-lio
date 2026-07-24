const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurações do Jogo
const paddleWidth = 10;
const paddleHeight = 80;
const ballRadius = 7;
const winningScore = 5;

// Estado do Jogo
let playerScore = 0;
let aiScore = 0;
let gameRunning = true;
let particles = [];

// Objetos
const player = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#00d2ff",
    score: 0,
    dy: 0,
    speed: 8
};

const ai = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#ff0055",
    score: 0,
    speed: 4.5 // Velocidade da IA para não ser impossível
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    speed: 5,
    dx: 5,
    dy: 5,
    color: "#fff"
};

// Partículas para efeitos visuais
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.color = color;
        this.life = 1.0;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.02;
    }

    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function createParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// Controles
const keys = {};
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 5;
    ball.dx = -ball.dx; // Inverte direção
    ball.dy = (Math.random() - 0.5) * 10;
}

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = color;
    ctx.fillRect(x, y, w, h);
    ctx.shadowBlur = 0;
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

function drawNet() {
    ctx.setLineDash([10, 15]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = "45px Arial";
    ctx.fillText(text, x, y);
}

function update() {
    if (!gameRunning) return;

    // Movimento do Jogador
    if ((keys["ArrowUp"] || keys["w"]) && player.y > 0) player.y -= player.speed;
    if ((keys["ArrowDown"] || keys["s"]) && player.y < canvas.height - player.height) player.y += player.speed;

    // Movimento da IA (Seguindo a bola com suavidade)
    const aiTarget = ball.y - ai.height / 2;
    ai.y += (aiTarget - ai.y) * 0.1; // Interpolação para movimento suave

    // Limites da IA
    if (ai.y < 0) ai.y = 0;
    if (ai.y > canvas.height - ai.height) ai.y = canvas.height - ai.height;

    // Movimento da Bola
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Colisão com Paredes (Cima/Baixo)
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
        createParticles(ball.x, ball.y, "#fff");
    }

    // Colisão com Raquetes
    let paddle = (ball.x < canvas.width / 2) ? player : ai;

    if (collision(ball, paddle)) {
        // Onde a bola bateu na raquete (-1 a 1)
        let collidePoint = (ball.y - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
        
        // Ângulo de rebatida (máximo 45 graus)
        let angleRad = (Math.PI / 4) * collidePoint;
        
        // Direção
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        
        // Aumenta velocidade
        ball.speed += 0.5;
        ball.dx = direction * ball.speed * Math.cos(angleRad);
        ball.dy = ball.speed * Math.sin(angleRad);

        createParticles(ball.x, ball.y, paddle.color);
    }

    // Pontuação
    if (ball.x - ball.radius < 0) {
        aiScore++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        resetBall();
    }

    // Partículas
    particles.forEach((p, index) => {
        p.update();
        if (p.life <= 0) particles.splice(index, 1);
    });

    if (playerScore >= winningScore || aiScore >= winningScore) {
        gameRunning = false;
    }
}

function collision(b, p) {
    return b.x + b.radius > p.x && b.x - b.radius < p.x + p.width &&
           b.y + b.radius > p.y && b.y - b.radius < p.y + p.height;
}

function render() {
    // Limpar fundo
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawNet();

    // Desenhar Raquetes
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);

    // Desenhar Bola
    drawCircle(ball.x, ball.y, ball.radius, ball.color);

    // Desenhar Pontuação
    drawText(playerScore, canvas.width / 4, 50, "rgba(255, 255, 255, 0.5)");
    drawText(aiScore, 3 * canvas.width / 4, 50, "rgba(255, 255, 255, 0.5)");

    // Desenhar Partículas
    particles.forEach(p => p.draw());

    if (!gameRunning) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const msg = playerScore >= winningScore ? "VOCÊ VENCEU!" : "GAME OVER";
        ctx.fillStyle = "#fff";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillText(msg, canvas.width / 2, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Pressione F5 para reiniciar", canvas.width / 2, canvas.height / 2 + 40);
    }
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();
