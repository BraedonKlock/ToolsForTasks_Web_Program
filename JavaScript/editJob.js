document.addEventListener('DOMContentLoaded', domReady);
function domReady() {
    const MainMenuBtn = document.getElementById('mainMenuBtn');
    MainMenuBtn.addEventListener('click', goToMainMenu);
    function goToMainMenu() {
        window.location.href = '../index.html'
    }
}