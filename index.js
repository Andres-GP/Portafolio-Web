//Developer Signature console log

window.onload = function consoleLog () {
    console.log(
        "Designed and Developed By Andrés García. \nMake sure width is appropriate...\nFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFaaaFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFazzzzzaFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFzzzzzzzzzaFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFFFFFFFFazzzzzzzzzzzzaFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFFFFFFfazzzzzzzzzzzzzzzaFFFFFFFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFFFFFFazzzzzzzzzzzzzzzzzaFFFFFFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFFFFFazzzzzzzzzazzzzzzzzzaFFFFFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFFFFazzzzzzzzzaFazzzzzzzzzaFFFFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFFaazzzzzzzzzaFFFazzzzzzzzzaaFFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFaazzzzzzzzaaFFFFFaazzzzzzzzaaFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFaazzzzzzzzaaFFFFFFFFazzzzzzzzaaFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFazzzzzzzzzzzzzaaaaaaaaazzzzzzzzzzaFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFaazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzaaaaFFFFFFFFFFF\nFFFFFFFFFFaazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzaFFFFFFF\nFFFFFFFFaazzzzzzzzzzzzzzzzzzzzzzzaaaaaaaazzzzzzzzzzzzzzzzzzzzzzzzzaFFFFFF\nFFFFFFFaazzzzzzzzzzzzzzzzaaaaFFFFFFFFFFFFFFaaaaazzzzzzzzzzzzzzzzaFFFFFFFF\nFFFFFFFazzzzzzzzzzzzzzzzaFFFFFFFFFFFFFFFFFFFFFFazzzzzzzzzzzaaaFFFFFFFFFFF\nFFFFFFFaaFFaazzzzzzzzzaFFFFFFFFFFFFFFFFFFFFFFFFFazzzzzzzzaaFFFFFFFFFFFFFF\nFFFFFFFFFFazzzzzzzzzaFFFFFFFFFFFFFFFFFFFFFFFFFFFFazzzzzzzzzaaFFFFFFFFFFFF\nFFFFFFFFFazzzzzzzzzaFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFaazzzzzzzzaaFFFFFFFFFFF\nFFFFFFFazzzzzzzzzzaFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFaazzzzzzzzzaFFFFFFFFFF\nFFFFFFFazzzzzzzzzaFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFaazzzzzzzzaaFFFFFFFFF\nFFFFFFFFazzzzzzzaFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFazzzzzzaFFFFFFFFFFF\nFFFFFFFFFaaaaFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFaaaFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFFFFFFFFaaaaaaaaaaaFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFaaaaaazzzzzzzzzzzzzzzaaaaaaaaaFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFaazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzaaaaaaFFFFFFFFF\nFFFFFFFFFaazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzaaFFFFF\nFFFFFFFaazzzzzzzzzzzzzzzzzzzaaaaaaaaaaaaazzzzzzzzzzzzzzzzzzzzzzzzzzaaFFFF\nFFFFFFazzzzzzzzzzzzaaaaaaaaFFFFFFFFFFFFFFFaaaaaaaazzzzzzzzzzzzzzzaaFFFFFF\nFFFFFazzzzzzzzzaaaFFFFFFFFFFFFFFFFFFFFFFFFFFFFFaaaazzzzzzzzzzzzaaFFFFFFFF\nFFFFFazzaaaaaaFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFaaaaaaaFFFFFFFFFFFFF\nFFFFFFaaFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF\nFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
        );
    console.log("👮🏿🚨Weedo👮🏿🚨Weeeeeedo!👮🏿🚨WEEEEEEEDO!\n 👮🏿 Police, open up! 👮🏿\n 👀 what are you looking for son? 👀");
};      


//Menu Modal
const openMenu = document.getElementById('openMenuButton');
const menu = document.getElementById('menu');
const menuShade = document.getElementById('menu-shade');
const menuPicker = document.getElementById('menu-Picker');
const closeMenu = document.getElementById('closeMenuButton');


openMenu.addEventListener('click', () => {
    menu.classList.add('show');
    menuShade.classList.add('show');
    menuPicker.classList.add('show');
    closeMenu.classList.add('show');
});

closeMenu.addEventListener('click', () => {
    menu.classList.remove('show');
    menuShade.classList.remove('show');
    menuPicker.classList.remove('show');
    closeMenu.classList.remove('show');
});


//Dismiss menu
menuShade.addEventListener('click', () => {
    menu.classList.remove('show');
    menuShade.classList.remove('show');
    menuPicker.classList.remove('show');
    closeMenu.classList.remove('show');
});