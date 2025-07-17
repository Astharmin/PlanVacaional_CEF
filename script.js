// Efecto smooth scroll para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación para las tarjetas al aparecer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Aplicar observador a las tarjetas de características y testimonios
document.querySelectorAll('.feature-card, .testimonial').forEach(card => {
    observer.observe(card);
});

// Opcional: Efecto de carga inicial
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    header.style.opacity = 0;
    header.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        header.style.opacity = 1;
    }, 100);
});