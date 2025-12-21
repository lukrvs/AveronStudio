console.log("Website geladen!");

// Lightbox-Funktion
const cards = document.querySelectorAll('.game-card img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

cards.forEach(card => {
    card.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = card.src;
    });
});

lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});
