// Configuração do carrossel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');

// Criar indicadores
function createIndicators() {
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
}

// Atualizar indicadores
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Mostrar slide específico
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    updateIndicators();
}

// Ir para o próximo slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Ir para o slide anterior
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Ir para um slide específico
function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Event listeners para os botões
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Suporte para touch/swipe em dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

const carousel = document.querySelector('.carousel');

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            nextSlide(); // Swipe left
        } else {
            prevSlide(); // Swipe right
        }
    }
}

// Auto-play (opcional - descomente se quiser)
// let autoplayInterval = setInterval(nextSlide, 5000);

// Pausar autoplay ao passar o mouse (se autoplay estiver ativo)
// carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
// carousel.addEventListener('mouseleave', () => {
//     autoplayInterval = setInterval(nextSlide, 5000);
// });

// Inicializar
createIndicators();
showSlide(currentSlide);