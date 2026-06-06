// Toggle Mobile Menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation
const faders = document.querySelectorAll('.fade-in-section');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('is-visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Form Submit Handler
function handleSubmit(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;

    // Aqui você pode adicionar a lógica de envio do formulário
    alert(`Obrigado, ${nome}! Sua mensagem foi recebida. Entraremos em contato em breve.`);

    // Limpar formulário
    event.target.reset();
}

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('header');

    if (currentScroll > 100) {
        header.style.background = 'rgba(0, 33, 71, 0.95)';
    } else {
        header.style.background = 'linear-gradient(135deg, #002147 0%, #003366 100%)';
    }

    lastScroll = currentScroll;
});

// Carrossel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const dots = document.querySelectorAll('.carousel-dot');
let carouselInterval;

function updateSlide() {
    const offset = -currentSlide * 100;
    document.querySelector('.carousel-wrapper').style.transform = `translateX(${offset}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
    resetCarouselInterval();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
    resetCarouselInterval();
}

function startCarouselAutoPlay() {
    carouselInterval = setInterval(nextSlide, 10000); // 10 segundos
}

function resetCarouselInterval() {
    clearInterval(carouselInterval);
    startCarouselAutoPlay();
}

// Initialize carousel
updateSlide();
startCarouselAutoPlay();

// Pause carousel on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    startCarouselAutoPlay();
});
