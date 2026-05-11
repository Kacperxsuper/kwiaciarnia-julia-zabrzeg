// Auto year in footer
document.getElementById('footerYear').textContent = new Date().getFullYear();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Cookie banner
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
if (localStorage.getItem('cookieAccepted')) {
    cookieBanner.classList.add('hidden');
}
cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', '1');
    cookieBanner.classList.add('hidden');
});

// Fade-in on scroll
const fadeElements = document.querySelectorAll(
    '.offer-card, .testimonial-card, .contact-card, .about-text, .about-image, .gallery-item, .pricing-card'
);
fadeElements.forEach(el => el.classList.add('fade-in'));
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);
fadeElements.forEach(el => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Gallery hover zoom
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.style.transition = 'transform 0.4s ease';
    img.parentElement.addEventListener('mouseenter', () => img.style.transform = 'scale(1.06)');
    img.parentElement.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
});
