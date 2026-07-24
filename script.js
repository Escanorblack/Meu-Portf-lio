// Configuração do fundo com partículas integradas ao Python.
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
	let particles = [];
	let mouseX = 0;
	let mouseY = 0;
let isConnected = false;

	// Rastreia o movimento do mouse para enviar ao servidor Python
document.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
	  mouseY = e.clientY - rect.top;
	});
	
	function resizeCanvas() {
	  canvas.width = window.innerWidth;
	  canvas.height = window.innerHeight;
	  // A criação de partículas agora é feita no backend Python
	}
	
	async function animateParticles() {
  try {
    // 1. Busca os cálculos de movimento do servidor Python
    const response = await fetch('http://127.0.0.1:5000/api/update_particles', {
      method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
	        mouse_x: (mouseX / canvas.width) * 1200, // Converte para a escala do Python (1200x700)
	        mouse_y: (mouseY / canvas.height) * 700
	      })  });

  if (response.ok) {
  particles = await response.json();
  isConnected = true;

  // 2. Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 3. Desenha as partículas recebidas do Python
  particles.forEach((p) => {
    // Ajusta as coordenadas do Python (1200x700) para o tamanho real da tela    const x = (p.x / 1200) * canvas.width;
    const y = (p.y / 700) * canvas.height;
   ctx.beginPath();
  ctx.arc(x, y, p.size, 0, Math.PI * 2);
  ctx.fillStyle = `rgb(${p.color[0]}, ${p.color[1]}, ${p.color[2]})`;
  ctx.fill();

  // Desenha a linha de conexão com o mouse (estilo Pygame original)
  ctx.beginPath();
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = 'rgba(80, 80, 120, 0.2)';
  ctx.lineWidth = 1;
  ctx.stroke();
});
  }
} catch (error) {
  // Se o servidor Python não estiver rodando, exibe uma mensagem no console uma vez
  if (isConnected) {
      console.error("Conexão com Python perdida. Certifique-se que app.py está rodando.");
      isConnected = false;
  }
  }

 requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateParticles();

// --- O RESTANTE DO SEU CÓDIGO (Efeito de digitação, projetos, etc.) CONTINUA IGUAL ---

// Efeito de digitação.
const phrases = ['HTML, CSS e JavaScript.', 'interações dinâmicas.', 'soluções em Python.'];
const typingElement = document.getElementById('typing-text');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
function typeLoop() {
  const current = phrases[phraseIndex];

 if (!deleting) {
   typingElement.textContent = current.slice(0, charIndex + 1);
   charIndex += 1;

   if (charIndex === current.length) {
     deleting = true;
     setTimeout(typeLoop, 1200);
     return;
   }
 } else {
    typingElement.textContent = current.slice(0, charIndex - 1);
   charIndex -= 1;

   if (charIndex === 0) {
    deleting = false;
     phraseIndex = (phraseIndex + 1) % phrases.length;
   }
 }

  setTimeout(typeLoop, deleting ? 45 : 90);
}

typeLoop();

// Revelação ao rolar a página.
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);    }
 });
}, { threshold: 0.2 });

revealElements.forEach((element) => observer.observe(element));

// Lista dinâmica de projetos.
const projects = [
  {
    title: 'Recomendador de filmes',
    description: 'Aplicação interativa em p5.js que sugere filmes com base na idade e nas preferências de fantasia e aventura.',
    tech: ['HTML', 'CSS', 'JavaScript', 'p5.js'],
    icon: '🎬',
    viewLink: './p5js/index.html',
    codeLink: './p5js/script.js'
  },
  {
    title: 'Rosto animado interativo',
    description: 'Desenho animado com p5.js que reage ao movimento do mouse e cria uma experiência visual divertida.',
    tech: ['JavaScript', 'p5.js', 'Canvas'],
    icon: '🧑‍🎨',
    viewLink: './p6js/index.html',
    codeLink: './p6js/script.js'
  },
  {
    title: 'Jogo de encontrar o ponto',
    description: 'Mini jogo em p5.js no qual o usuário tenta encontrar um ponto que se move aleatoriamente na tela.',
    tech: ['JavaScript', 'p5.js'],
    icon: '🎮',
    viewLink: 'p7js/index.html',
    codeLink: './p7js/script.js'
  },
  {
    title: 'Mini jogo de tênis de mesa',
    description: 'Versão simples de Pong criada com Canvas e JavaScript, com controle de raquetes e placar.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Canvas'],
    icon: '🏓',
    viewLink: 'talk/index.html',
    codeLink: './talk/index.html'
  },
	  {
	 title: 'calculadora',
    description: 'Calculadora simples com HTML, CSS e JavaScript, permitindo operações básicas de adição, subtração, multiplicação e divisão.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    icon: '🧮',
    viewLink: './calculadora/index.html',
    codeLink: './calculadora/script.js'
 }
];
const projectsGrid = document.getElementById('projects-grid');
	const projectModal = document.getElementById('project-modal');
	const projectFrame = document.getElementById('project-frame');
	const closeProjectModal = document.getElementById('close-project-modal');

function closeModal() {
  projectModal.classList.remove('active');
  projectModal.setAttribute('aria-hidden', 'true');
  projectFrame.src = '';
	}
	
	if (projectsGrid) {
	  projectsGrid.innerHTML = projects
	    .map(
	      (project) => `
	        <article class="project-card reveal">
	          <div class="project-cover">${project.icon}</div>
	          <h3>${project.title}</h3>
	          <p>${project.description}</p>
	          <div class="project-tags">
	            ${project.tech.map((item) => `<span>${item}</span>`).join('')}
	          </div>	          <div class="project-actions">
           <button class="preview-btn" type="button" data-url="${project.viewLink}">Abrir no site</button>
	            <a href="${project.codeLink}" target="_blank" rel="noreferrer">Ver código</a>
	          </div>
	        </article>
	      `
  )
  .join('');

projectsGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".preview-btn");
    if (!button) return;
    const url = button.dataset.url;
    window.open(url, "_blank");
});
}

if (closeProjectModal) closeProjectModal.addEventListener('click', closeModal);
if (projectModal) {
  projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal) closeModal();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

// Atualiza o ano do rodapé.
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-menu");
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("active");
            navMenu.classList.toggle("active");
      });
    }
	
	    if (typeof emailjs !== 'undefined' && form && status) {
	        emailjs.init({ publicKey: "mg0Bgl9emyiXW0WDi" });
	        form.addEventListener("submit", function (e) {
	            e.preventDefault();
	            status.textContent = "Enviando...";
	            emailjs.sendForm("service_fenis6s", "template_87n7bxj", form)
	            .then(() => {
	                status.textContent = "Mensagem enviada com sucesso!";
	                form.reset();
	            })
	            .catch(() => {
	                status.textContent = "Erro ao enviar. Tente novamente mais tarde.";
	            });
	        });
	    }
	});
	
