// --- Tema claro/oscuro ---
const THEME_KEY = 'site-theme';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const theme = saved || 'light';
    applyTheme(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
}

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

    initTheme();
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    if (toggleBtn && sidebar && mainContent) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('sidebar-active');
        });
    }
    // Botón de cierre dentro del sidebar
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    if (closeSidebarBtn && sidebar && mainContent) {
        closeSidebarBtn.addEventListener('click', function() {
            sidebar.classList.remove('active');
            mainContent.classList.remove('sidebar-active');
        });
    }

    // Menu items -> resaltar y hacer scroll
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section, #home, #cursos, #testimonials, #registro');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');

            // Update active menu item
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Scroll to target section if existe
            const target = document.getElementById(targetSection);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }

            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768 && sidebar) {
                sidebar.classList.remove('active');
                mainContent.classList.remove('sidebar-active');
            }
        });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const toggle = document.getElementById('toggleBtn');
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('active')) {
            if (!sidebar.contains(event.target) && toggle && !toggle.contains(event.target)) {
                sidebar.classList.remove('active');
                mainContent.classList.remove('sidebar-active');
            }
        }
    });

    // Close sidebar with Escape key for convenience
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('sidebar-active');
        }
    });

    const header = document.querySelector('header');
    header.style.opacity = 0;
    header.style.transition = 'opacity 1s ease';

    setTimeout(() => {
        header.style.opacity = 1;
    }, 100);
});
