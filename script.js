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
const translatableElements = document.querySelectorAll('body :not(#loginModal):not(#registerModal) [data-de]');

function translatePage(lang) {
    // =======================
    // Texte auf der Seite
    // =======================
    const translatableElements = document.querySelectorAll('body :not(#loginModal):not(#registerModal) [data-de]');
    translatableElements.forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if(text) el.textContent = text;
    });

    // =======================
    // Login Modal Texte
    // =======================
    const loginElements = loginModal.querySelectorAll('[data-de]');
    loginElements.forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if(el.tagName === 'INPUT') {
            if(text) el.placeholder = text;
        } else if(text) el.textContent = text;
    });

    // =======================
    // Register Modal Texte
    // =======================
    const registerElements = registerModal.querySelectorAll('[data-de]');
    registerElements.forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if(el.tagName === 'INPUT') {
            if(text) el.placeholder = text;
        } else if(text) el.textContent = text;
    });

    // =======================
    // Feedback-Nachrichten zurücksetzen
    // =======================
    loginMessage.textContent = '';
    registerMessage.textContent = '';
}

translatePage('de');
languageSelect.addEventListener('change', e => translatePage(e.target.value));

// ==============================
// LOGIN Modal
// ==============================
function openLogin(){
    translatePage(languageSelect.value);
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
closeBtnLogin.addEventListener('click', () => {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// ==============================
// REGISTER Modal
// ==============================
function openRegister(){
    loginModal.style.display='none';
    registerModal.style.display='flex';
    document.body.style.overflow='hidden';
}
closeBtnRegister.addEventListener('click', () => {
    registerModal.style.display='none';
    document.body.style.overflow='auto';
});
document.querySelector('.register-hint').addEventListener('click', openRegister);
window.addEventListener('click', e=>{
    if(e.target===loginModal) { loginModal.style.display='none'; document.body.style.overflow='auto'; }
    if(e.target===registerModal) { registerModal.style.display='none'; document.body.style.overflow='auto'; }
});

// ==============================
// LOGIN/Register LocalStorage
// ==============================
loginForm.addEventListener('submit', e=>{
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    const lang = languageSelect.value;

    const successText = {de:"Login erfolgreich!",en:"Login successful!"};
    const errorText = {de:"Falscher Benutzername oder Passwort!",en:"Wrong username or password!"};

    const users = JSON.parse(localStorage.getItem('users')||'{}');
    if(users[username] && users[username].password===password){
        loginMessage.textContent = successText[lang]||successText['de'];
        loginMessage.style.color = "#00ffcc";
        localStorage.setItem('currentUser',username);
        loginModal.style.display='none';
        document.body.style.overflow='auto';
        loginForm.reset();
        updateLoginState();
    } else{
        loginMessage.textContent = errorText[lang]||errorText['de'];
        loginMessage.style.color="#ff4c4c";
    }
});

registerForm.addEventListener('submit', e=>{
    e.preventDefault();
    const username = registerForm.username.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;
    const passwordConfirm = registerForm.passwordConfirm.value;
    const lang = languageSelect.value;

    const successText = {de:"Registrierung erfolgreich!",en:"Registration successful!"};
    const errorText = {de:"Passwörter stimmen nicht überein oder Benutzername existiert schon!",en:"Passwords do not match or username already exists!"};

    const users = JSON.parse(localStorage.getItem('users')||'{}');
    if(password!==passwordConfirm || users[username]){
        registerMessage.textContent = errorText[lang]||errorText['de'];
        registerMessage.style.color="#ff4c4c";
        return;
    }
    users[username] = {email,password};
    localStorage.setItem('users',JSON.stringify(users));
    registerMessage.textContent = successText[lang]||successText['de'];
    registerMessage.style.color="#00ffcc";
    registerForm.reset();
});

// ==============================
// Dropdown & Mein Konto
// ==============================
const loginNav = document.getElementById('loginNav');
const userDropdown = document.querySelector('.user-dropdown');
const accountModal = document.getElementById('accountModal');
const closeAccount = accountModal.querySelector('.close-account');
const accountUsername = document.getElementById('accountUsername');
const accountEmail = document.getElementById('accountEmail');
const account2FA = document.getElementById('account2FA');

function showAccountModal(){
    const currentUser = localStorage.getItem('currentUser');
    if(!currentUser) return;
    const users = JSON.parse(localStorage.getItem('users')||'{}');
    const data = users[currentUser];
    accountUsername.textContent = currentUser;
    accountEmail.textContent = data?.email || '';
    account2FA.textContent = "Nicht aktiviert";
    accountModal.style.display='flex';
    document.body.style.overflow='hidden';
}
closeAccount.addEventListener('click',()=>{
    accountModal.style.display='none';
    document.body.style.overflow='auto';
});
accountModal.addEventListener('click', e=>{
    if(e.target===accountModal){ accountModal.style.display='none'; document.body.style.overflow='auto'; }
});

function updateLoginState(){
    const currentUser = localStorage.getItem('currentUser');
    const lang = languageSelect.value;
    userDropdown.innerHTML='';
    if(currentUser){
        loginNav.textContent = currentUser;
        const accountBtn = document.createElement('button');
        accountBtn.textContent='Mein Konto';
        accountBtn.addEventListener('click',showAccountModal);
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent='Abmelden';
        logoutBtn.addEventListener('click', ()=>{
            localStorage.removeItem('currentUser');
            updateLoginState();
        });
        userDropdown.appendChild(accountBtn);
        userDropdown.appendChild(logoutBtn);

        loginNav.onclick = e=>{
            e.preventDefault();
            userDropdown.style.display = userDropdown.style.display==='flex'?'none':'flex';
        }
    } else {
        loginNav.textContent = loginNav.getAttribute('data-'+lang);
        userDropdown.style.display='none';
        loginNav.onclick = openLogin;
    }
}
window.addEventListener('load', updateLoginState);



