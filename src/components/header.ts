import {renderMobileMenu} from "./mobileMenu.ts";

export function renderHeader(): HTMLElement {
    const header = document.createElement('header');
    header.className = 'bg-white shadow-sm sticky top-0 z-10';

    header.innerHTML = `
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
            <a href="/" class="text-2xl font-bold text-gray-900" data-navigo>SHOP.CO</a>
            <div class="flex items-center space-x-4">
                <a href="/cart" class="p-2 text-gray-700 hover:text-gray-900 relative" data-navigo>
                    <!-- ... SVG ... -->
                    <span class="cart-counter absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 items-center justify-center hidden">0</span>
                </a>
                <button id="burger-btn" class="md:hidden p-2 text-gray-700 hover:text-gray-900">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

    const mobileMenu = renderMobileMenu();
    document.body.appendChild(mobileMenu);

    const overlay = document.createElement('div');
    overlay.id = 'mobile-overlay';
    overlay.className = 'fixed inset-0 z-40 bg-black bg-opacity-50 hidden';
    document.body.appendChild(overlay);

    setTimeout(() => {
        const burgerBtn = document.getElementById('burger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeBtn = document.getElementById('close-menu');

        function openMenu() {
            mobileMenu?.classList.remove('translate-x-full');
            overlay?.classList.remove('hidden');
        }

        function closeMenu() {
            mobileMenu?.classList.add('translate-x-full');
            overlay?.classList.add('hidden');
        }

        burgerBtn?.addEventListener('click', openMenu);
        closeBtn?.addEventListener('click', closeMenu);
        overlay?.addEventListener('click', closeMenu);
        mobileMenu?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }, 0);

    return header;
}
