document.addEventListener('DOMContentLoaded', domReady);

function domReady() {
    const mainMenuBtn = document.getElementById('mainMenuBtn');
    mainMenuBtn.addEventListener('click', goToMainMenu);
}

function goToMainMenu() {
    window.location.href = '../index.html'
}