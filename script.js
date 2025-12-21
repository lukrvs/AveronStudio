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

// ==============================
// Sprachumschaltung
// ==============================
const languageSelect = document.getElementById('languageSelect');
const translatableElements = document.querySelectorAll('[data-de]');

// ==============================
// Login Elemente für Übersetzung
// ==============================
const loginElements = document.querySelectorAll('#loginModal [data-de]');
const loginMessage = document.getElementById('loginMessage');

function translatePage(lang) {
    // Alle normalen Texte übersetzen
    translatableElements.forEach(el => {
        if (el.tagName.toLowerCase() === 'h3' && el.textContent.trim() === 'Nightveil') return;

        const text = el.getAttribute('data-' + lang);
        if (text) el.textContent = text;
    });

    // Login Modal Texte übersetzen
    loginElements.forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if(text) el.textContent = text;
    });

    // Login Fehlermeldungen zurücksetzen
    loginMessage.textContent = "";
}

// Standard: Deutsch
translatePage('de');

// Event: Sprache wechseln
languageSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    translatePage(lang);
});

// ==============================
// Login Modal Funktion
// ==============================
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close-btn');

// Öffnen des Modals
function openLogin() {
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Schließen des Modals
closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Schließen bei Klick außerhalb
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Login-Formular
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // Dummy-Check Beispiel
    if(username === "test" && password === "1234") {
        loginMessage.textContent = "Login erfolgreich!";
        loginMessage.style.color = "#00ffcc";
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        // Fehlermeldungen in allen Sprachen
        const lang = languageSelect.value;
        let errorText = "Falscher Benutzername oder Passwort!";

        switch(lang) {
            case 'en': errorText = "Wrong username or password!"; break;
            case 'at': errorText = "Falscher Benutzername oder Passwort!"; break;
            case 'hu': errorText = "Hibás felhasználónév vagy jelszó!"; break;
            case 'ru': errorText = "Неверное имя пользователя или пароль!"; break;
            case 'ja': errorText = "ユーザー名またはパスワードが間違っています！"; break;
            case 'pl': errorText = "Niepoprawna nazwa użytkownika lub hasło!"; break;
            case 'zh': errorText = "用户名或密码错误！"; break;
            case 'it': errorText = "Nome utente o password errati!"; break;
            case 'fr': errorText = "Nom d'utilisateur ou mot de passe incorrect!"; break;
            case 'es': errorText = "¡Nombre de usuario o contraseña incorrectos!"; break;
            case 'ch': errorText = "Falscher Benutzername oder Passwort!"; break;
        }

        loginMessage.textContent = errorText;
        loginMessage.style.color = "#ff4c4c";
    }
});
