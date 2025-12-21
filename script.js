// ==============================
// Scroll Animation für Spielkarten
// ==============================
const cards = document.querySelectorAll('.game-card');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.2 });
cards.forEach(card => observer.observe(card));

// ==============================
// Lightbox Funktion
// ==============================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

cards.forEach(card => {
    const img = card.querySelector('img');
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        document.body.style.overflow = 'hidden';
    });
});

lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// ==============================
// Parallax Effekt für Hero Text
// ==============================
const hero = document.getElementById('hero');
window.addEventListener('scroll', () => {
    hero.style.backgroundPosition = `center ${window.scrollY * 0.3}px`;
});

// ==============================
// Extra Hover Animation für Spielkarten
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
        card.style.transform = `rotateY(${dx*10}deg) rotateX(${-dy*10}deg) scale(1.05)`;
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
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const closeBtn = loginModal.querySelector('.close-btn');

function translatePage(lang) {
    // Alle Texte mit data-* übersetzen
    translatableElements.forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if(text) el.textContent = text;
    });

    // Login Modal Texte
    const loginElements = loginModal.querySelectorAll('[data-de]');
    loginElements.forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if(text) el.textContent = text;
    });

    loginMessage.textContent = '';
}

// Standard: Deutsch
translatePage('de');

// Sprache wechseln
languageSelect.addEventListener('change', (e) => translatePage(e.target.value));

// ==============================
// Login Modal Funktion
// ==============================
function openLogin() {
    const lang = languageSelect.value;
    const loginElements = loginModal.querySelectorAll('[data-de]');
    loginElements.forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if(text) el.textContent = text;
    });

    loginMessage.textContent = '';
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if(e.target === loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ==============================
// Login-Formular
// ==============================
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    const lang = languageSelect.value;

    const successText = {
        de: "Login erfolgreich!",
        en: "Login successful!",
        at: "Login erfolgreich!",
        hu: "Sikeres bejelentkezés!",
        ru: "Вход успешен!",
        ja: "ログイン成功！",
        pl: "Logowanie udane!",
        zh: "登录成功！",
        it: "Login riuscito!",
        fr: "Connexion réussie !",
        es: "¡Inicio de sesión correcto!",
        ch: "Login erfolgreich!"
    };

    const errorText = {
        de: "Falscher Benutzername oder Passwort!",
        en: "Wrong username or password!",
        at: "Falscher Benutzername oder Passwort!",
        hu: "Hibás felhasználónév vagy jelszó!",
        ru: "Неверное имя пользователя или пароль!",
        ja: "ユーザー名またはパスワードが間違っています！",
        pl: "Niepoprawna nazwa użytkownika lub hasło!",
        zh: "用户名或密码错误！",
        it: "Nome utente o password errati!",
        fr: "Nom d'utilisateur ou mot de passe incorrect !",
        es: "¡Nombre de usuario o contraseña incorrectos!",
        ch: "Falscher Benutzername oder Passwort!"
    };

    if(username === "test" && password === "1234") {
        loginMessage.textContent = successText[lang];
        loginMessage.style.color = "#00ffcc";
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        loginMessage.textContent = errorText[lang];
        loginMessage.style.color = "#ff4c4c";
    }
});
