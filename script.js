// script.js

// BOTÃO DE TEMA

// Seletores
const toggleSwitch = document.querySelector('.toggle-switch');
toggleSwitch.addEventListener('dragstart', (e) => e.preventDefault());
const body = document.body;

// Carrega tema salvo
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    body.classList.add("light-mode");
}

// Clica no botão = alterna tema
toggleSwitch.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    // Salva preferência
    if (body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});




//CARROSSEL DE IMAGENS DE PROJETOS
// CARROSSEL AVANÇADO

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const nav = document.querySelector('.carousel-nav');
const slideWidth = slides[0].getBoundingClientRect().width;

let currentIndex = 0;
let autoSlideInterval;

// Posiciona os slides lado a lado
function setSlidePositions() {
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });
}

// Move para slide especificado
function moveToSlide(index) {
  track.style.transform = 'translateX(-' + slides[index].style.left + ')';
  currentIndex = index;
  updateIndicators();
}

// Atualiza indicador ativo
function updateIndicators() {
  const indicators = Array.from(nav.children);
  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === currentIndex);
  });
}

// Cria indicadores dinamicamente
function createIndicators() {
  slides.forEach((_, index) => {
    const indicator = document.createElement('button');
    indicator.classList.add('carousel-indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.setAttribute('aria-label', 'Slide ' + (index + 1));
    indicator.addEventListener('click', () => {
      moveToSlide(index);
      resetAutoSlide();
    });
    nav.appendChild(indicator);
  });
}

// Funções para navegar
function showPrevSlide() {
  let newIndex = currentIndex - 1;
  if (newIndex < 0) newIndex = slides.length - 1;
  moveToSlide(newIndex);
  resetAutoSlide();
}

function showNextSlide() {
  let newIndex = currentIndex + 1;
  if (newIndex >= slides.length) newIndex = 0;
  moveToSlide(newIndex);
  resetAutoSlide();
}

// Auto slide a cada 5 segundos
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    showNextSlide();
  }, 10000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Evento para botões
prevButton.addEventListener('click', showPrevSlide);
nextButton.addEventListener('click', showNextSlide);

// Inicialização
setSlidePositions();
createIndicators();
startAutoSlide();

// Botão "Ver mais projetos"
const btnVerMais = document.getElementById('btn-ver-mais');
btnVerMais.addEventListener('click', () => {
  window.open('https://github.com/Pedrin0o', '_blank'); 
  // Troque o link para seu portfólio real
});

// Ajusta posições ao redimensionar tela
window.addEventListener('resize', () => {
  const newSlideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach((slide, index) => {
    slide.style.left = newSlideWidth * index + 'px';
  });
  moveToSlide(currentIndex); // Reposiciona o slide atual
});

