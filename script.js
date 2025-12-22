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
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');
const closeBtnLogin = loginModal.querySelector('.close-btn');
const closeBtnRegister = registerModal.querySelector('.close-btn-register');

// Alle Texte außerhalb Login/Register Modal
const translatableElements = document.querySelectorAll('body :not(#loginModal):not(#registerModal) [data-de]');

function translatePage(lang) {
    // Alle Texte außerhalb der Modals übersetzen
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

    // Register Modal Texte + Input Placeholders
    const registerElements = registerModal.querySelectorAll('[data-de]');
    registerElements.forEach(el => {
        if(el.tagName === 'INPUT') {
            // Wenn Input, übersetze placeholder
            const placeholder = el.getAttribute('data-' + lang);
            if(placeholder) el.placeholder = placeholder;
        } else {
            const text = el.getAttribute('data-' + lang);
            if(text) el.textContent = text;
        }
    });

    // Übersetze auch Input Placeholder im Register Modal
    const registerPlaceholders = registerForm.querySelectorAll('input');
    registerPlaceholders.forEach(input => {
        const placeholderText = input.getAttribute('data-' + lang);
        if(placeholderText) input.placeholder = placeholderText;
    });

    loginMessage.textContent = '';
    registerMessage.textContent = '';
}

// Standard: Deutsch
translatePage('de');

// Sprache wechseln
languageSelect.addEventListener('change', (e) => translatePage(e.target.value));

// ==============================
// LOGIN MODAL
// ==============================
function openLogin() {
    translatePage(languageSelect.value);
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close Login
closeBtnLogin.addEventListener('click', () => {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// ==============================
// REGISTER MODAL
// ==============================
function openRegister() {
    loginModal.style.display = 'none';
    registerModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close Register
closeBtnRegister.addEventListener('click', () => {
    registerModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Klick außerhalb schließen
window.addEventListener('click', (e) => {
    if(e.target === loginModal){
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if(e.target === registerModal){
        registerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Klick auf „Noch keinen Account? Registrieren“
const registerHint = document.querySelector('.register-hint');
registerHint.addEventListener('click', openRegister);

// ==============================
// LOGIN-Formular mit LocalStorage
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

    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if(users[username] && users[username].password === password) {
        loginMessage.textContent = successText[lang];
        loginMessage.style.color = "#00ffcc";

        // Aktuellen Benutzer speichern
        localStorage.setItem('currentUser', username);

        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        loginForm.reset();

        updateNavUser(); // Navbar aktualisieren
    } else {
        loginMessage.textContent = errorText[lang];
        loginMessage.style.color = "#ff4c4c";
    }
});

// ==============================
// REGISTER-Formular mit LocalStorage
// ==============================
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = registerForm.username.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;
    const passwordConfirm = registerForm.passwordConfirm.value;
    const lang = languageSelect.value;

    const successText = {
        de: "Registrierung erfolgreich!",
        en: "Registration successful!",
        at: "Registrierung erfoigreich!",
        hu: "Sikeres regisztráció!",
        ru: "Регистрация успешна!",
        ja: "登録成功！",
        pl: "Rejestracja udana!",
        zh: "注册成功！",
        it: "Registrazione riuscita!",
        fr: "Inscription réussie !",
        es: "¡Registro exitoso!",
        ch: "Registrierung erfolgreich!"
    };

    const errorText = {
        de: "Passwörter stimmen nicht überein oder Benutzername existiert schon!",
        en: "Passwords do not match or username already exists!",
        at: "Passwörter stimmen nicht überein oder Benutzername existiert schon!",
        hu: "A jelszavak nem egyeznek vagy a felhasználónév már létezik!",
        ru: "Пароли не совпадают или имя пользователя уже существует!",
        ja: "パスワードが一致しないか、ユーザー名はすでに存在します！",
        pl: "Hasła nie zgadzają się lub nazwa użytkownika już istnieje!",
        zh: "密码不匹配或用户名已存在！",
        it: "Le password non corrispondono o il nome utente esiste già!",
        fr: "Les mots de passe ne correspondent pas ou le nom d'utilisateur existe déjà !",
        es: "¡Las contraseñas no coinciden o el nombre de usuario ya existe!",
        ch: "Passwörter stimmen nicht überein oder Benutzername existiert schon!"
    };

    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if(password !== passwordConfirm || users[username]) {
        registerMessage.textContent = errorText[lang];
        registerMessage.style.color = "#ff4c4c";
        return;
    }

    users[username] = { email, password };
    localStorage.setItem('users', JSON.stringify(users));

    registerMessage.textContent = successText[lang];
    registerMessage.style.color = "#00ffcc";

    registerForm.reset();
});

// ==============================
// Navbar aktualisieren für angemeldeten Benutzer
// ==============================
function updateNavUser() {
    const loginNav = document.querySelector('nav a[href="javascript:void(0);"]');
    const currentUser = localStorage.getItem('currentUser');

    if(currentUser) {
        loginNav.textContent = currentUser;

        // Dropdown erstellen
        let dropdown = document.createElement('div');
        dropdown.classList.add('user-dropdown');
        dropdown.style.position = 'absolute';
        dropdown.style.background = '#111';
        dropdown.style.color = '#fff';
        dropdown.style.padding = '10px';
        dropdown.style.display = 'none';
        dropdown.style.flexDirection = 'column';
        dropdown.style.gap = '5px';
        dropdown.style.borderRadius = '5px';

        // Mein Konto
        let accountBtn = document.createElement('button');
        accountBtn.textContent = 'Mein Konto';
        accountBtn.addEventListener('click', showAccount);
        dropdown.appendChild(accountBtn);

        // Abmelden
        let logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Abmelden';
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            location.reload();
        });
        dropdown.appendChild(logoutBtn);

        // Dropdown zum Navbar-Link hinzufügen
        loginNav.style.position = 'relative';
        loginNav.appendChild(dropdown);

        // Dropdown bei Klick anzeigen/ausblenden
        loginNav.addEventListener('click', () => {
            dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// ==============================
// „Mein Konto“ Funktion
// ==============================
function showAccount() {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if(users[currentUser]) {
        alert(`Benutzername: ${currentUser}\nPasswort: ${users[currentUser].password}`);
    }
}
function updateNavUser() {
    const loginNav = document.getElementById('loginNav'); // Holt den Login-Link
    const currentUser = localStorage.getItem('currentUser');

    if(currentUser && loginNav) {
        loginNav.textContent = currentUser;

        // Dropdown erstellen
        let dropdown = document.createElement('div');
        dropdown.classList.add('user-dropdown');
        dropdown.style.position = 'absolute';
        dropdown.style.background = '#111';
        dropdown.style.color = '#fff';
        dropdown.style.padding = '10px';
        dropdown.style.display = 'none';
        dropdown.style.flexDirection = 'column';
        dropdown.style.gap = '5px';
        dropdown.style.borderRadius = '5px';
        dropdown.style.top = '30px'; // Abstand unter dem Namen
        dropdown.style.left = '0';

        // Mein Konto
        let accountBtn = document.createElement('button');
        accountBtn.textContent = 'Mein Konto';
        accountBtn.addEventListener('click', showAccount);
        dropdown.appendChild(accountBtn);

        // Abmelden
        let logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Abmelden';
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            location.reload();
        });
        dropdown.appendChild(logoutBtn);

        loginNav.style.position = 'relative';
        loginNav.appendChild(dropdown);

        loginNav.addEventListener('click', () => {
            dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}
function showAccount() {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if(currentUser && users[currentUser]) {
        alert(
            `Benutzername: ${currentUser}\nPasswort: ${users[currentUser].password}`
        );
    } else {
        alert('Keine Benutzerdaten gefunden.');
    }
}

// ==============================
// Beim Laden prüfen, ob Benutzer angemeldet ist
// ==============================
window.addEventListener('load', () => {
    updateNavUser();
});

// ==============================
// User Dropdown & Login-Namen
// ==============================
const loginNav = document.getElementById('loginNav');
const userDropdown = document.querySelector('.user-dropdown');
const dropdownUsername = document.getElementById('dropdownUsername');
const logoutBtn = document.getElementById('logoutBtn');

function updateLoginState() {
    const currentUser = localStorage.getItem('currentUser');
    if(currentUser) {
        // Login-Link zeigt jetzt Benutzernamen
        loginNav.textContent = currentUser;
        loginNav.onclick = () => {
            // Dropdown ein/ausblenden beim Klicken auf Name
            if(userDropdown.style.display === 'none' || userDropdown.style.display === '') {
                // Dropdown-Inhalt setzen
                dropdownUsername.innerHTML = `
                    <p>Mein Konto:</p>
                    <p>Benutzername: ${currentUser}</p>
                    <p>Passwort: ${JSON.parse(localStorage.getItem('users'))[currentUser].password}</p>
                `;
                userDropdown.style.display = 'block';
            } else {
                userDropdown.style.display = 'none';
            }
        };
    } else {
        // Kein User angemeldet → Login-Link zurücksetzen
        translatePage(languageSelect.value); // Übersetzungen für "Anmelden"
        userDropdown.style.display = 'none';
        loginNav.onclick = openLogin; // wieder Login öffnen möglich
    }
}

// Logout-Button
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    updateLoginState(); // nach Logout wieder alles korrekt setzen
});

// Beim Laden prüfen, ob User angemeldet
window.addEventListener('load', updateLoginState);
