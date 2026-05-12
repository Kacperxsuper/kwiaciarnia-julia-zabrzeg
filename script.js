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

// Lightbox
(function() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Zamknij">&times;</button>
        <button class="lightbox-prev" aria-label="Poprzednie">&lsaquo;</button>
        <button class="lightbox-next" aria-label="Następne">&rsaquo;</button>
        <img class="lightbox-img" src="" alt="">
        <span class="lightbox-counter"></span>
    `;
    document.body.appendChild(lightbox);

    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbCounter = lightbox.querySelector('.lightbox-counter');
    const images = Array.from(document.querySelectorAll('.gallery-item img'));
    let current = 0;

    function show(index) {
        current = (index + images.length) % images.length;
        lbImg.src = images[current].src;
        lbImg.alt = images[current].alt;
        lbCounter.textContent = (current + 1) + ' / ' + images.length;
    }

    function open(index) {
        show(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    images.forEach((img, i) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => open(i));
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });
})();
