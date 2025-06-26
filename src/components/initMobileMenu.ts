export function initMobileMenu(burgerBtnId: string) {
    const mobileMenu = createMobileMenu();
    document.body.appendChild(mobileMenu);

    const burgerBtn = document.getElementById(burgerBtnId);
    const mobileMenuCloseBtn = mobileMenu.querySelector('#mobile-menu-close');

    if (!burgerBtn || !mobileMenuCloseBtn) {
        console.error('Burger button or mobile menu close button not found');
        return;
    }

    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        const menuPanel = mobileMenu.querySelector('div')!;
        menuPanel.classList.remove('-translate-x-full');
        menuPanel.classList.add('translate-x-0');
        document.body.classList.add('overflow-hidden');
    }

    function closeMobileMenu() {
        const menuPanel = mobileMenu.querySelector('div')!;
        menuPanel.classList.add('-translate-x-full');
        menuPanel.classList.remove('translate-x-0');
        document.body.classList.remove('overflow-hidden');

        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }

    burgerBtn.addEventListener('click', openMobileMenu);
    mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);

    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) closeMobileMenu();
    });
}
