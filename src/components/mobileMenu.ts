export function renderMobileMenu(): HTMLElement {
    const menu = document.createElement('div');
    menu.id = 'mobile-menu';
    menu.className = 'fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 z-50 transform translate-x-full transition-transform duration-300';

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'text-2xl absolute top-4 right-4';
    closeBtn.id = 'close-menu';

    const nav = document.createElement('nav');
    nav.className = 'mt-10 flex flex-col space-y-4';

    const homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.textContent = 'Home';
    homeLink.className = 'text-gray-800 text-lg hover:text-black';
    homeLink.setAttribute('data-navigo', '');

    const cartLink = document.createElement('a');
    cartLink.href = '/cart';
    cartLink.textContent = 'Cart';
    cartLink.className = 'text-gray-800 text-lg hover:text-black';
    cartLink.setAttribute('data-navigo', '');

    nav.append(homeLink, cartLink);
    menu.append(closeBtn, nav);
    return menu;
}
