// ==============================
// Scroll Animation für Spielkarten
// ==============================
const cards = document.querySelectorAll('.game-card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => {
    observer.observe(card);
});

// ==============================
// Lightbox Funktion
// ==============================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

cards.forEach(card => {
    const img = card.querySelector('img');
    img.addEventListener('click', () => {
        lightbox.classList.add('show');
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        document.body.style.overflow = 'hidden'; // Scroll deaktivieren
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// ==============================
// Optional: Parallax Effekt für Hero Text
// ==============================
const hero = document.getElementById('hero');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    hero.style.backgroundPosition = `center ${scrollPos * 0.3}px`;
});

// ==============================
// Extra Hover Animation für Spielkarten (leicht 3D)
// ==============================
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = (x - cx) / cx;
        const dy = (y - cy) / cy;
        card.style.transform = `rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
});
