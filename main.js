const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

const menuItems = [...document.querySelectorAll('[data-link]')];
const keyboardCodes = { 
    downArrow:'ArrowDown',
    upArrow:'ArrowUp',
    tab:'Tab',
    esc: 'Escape',
}

const openMenu = () => { 
    menu.setAttribute('data-shown' , 'true');
    menuBtn.setAttribute('aria-expanded' , 'true');
    menuItems[0].focus();
}

const closeMenu = () => { 
    menu.setAttribute('data-shown' , 'false');
    menuBtn.setAttribute('aria-expanded' , 'false');
}

const isMenuOpen = () => { 
    return menu.getAttribute('data-shown') === 'true';
}

menuBtn.addEventListener('click' , openMenu );
menuBtn.addEventListener('keydown' , event => { 
    if(event.code === keyboardCodes.downArrow) {
        event.preventDefault();
        openMenu()
    };
    if(event.code === keyboardCodes.upArrow && isMenuOpen()) {
        event.preventDefault();
        closeMenu()
    };
});

menu.addEventListener('keydown' , event => { 
    if(event.code === keyboardCodes.downArrow || event.code === keyboardCodes.upArrow){
        event.preventDefault();
    }

    const selected = document.activeElement;
    const next = selected.nextElementSibling;
    const prev = selected.previousElementSibling;

    if(event.code === keyboardCodes.downArrow && !next) menuItems[0].focus();

    if(event.code === keyboardCodes.upArrow && !prev) menuItems[menuItems.length -1].focus();

    if(event.code === keyboardCodes.downArrow && next) next.focus();

    if(event.code === keyboardCodes.upArrow && prev) prev.focus();

})

document.addEventListener('keydown' , event => { 
    if(event.code === keyboardCodes.esc) closeMenu();
});