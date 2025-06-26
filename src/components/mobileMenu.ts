export function createMobileMenu(): HTMLElement {
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = `
    fixed inset-0 z-50 hidden bg-black bg-opacity-50 flex
  `;

    mobileMenu.innerHTML = `
    <div class="bg-white w-64 h-full p-6 shadow-lg relative transition-transform -translate-x-full">
      <button id="mobile-menu-close" class="absolute top-4 right-4 p-2 text-gray-700 hover:text-gray-900" aria-label="Close mobile menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <nav class="flex flex-col space-y-4 mt-10">
        <a href="/public" class="text-gray-900 text-lg font-semibold" data-navigo>Home</a>
        <a href="/shop" class="text-gray-900 text-lg font-semibold" data-navigo>Shop</a>
        <a href="/sale" class="text-gray-900 text-lg font-semibold" data-navigo>On Sale</a>
        <a href="/new" class="text-gray-900 text-lg font-semibold" data-navigo>New Arrivals</a>
        <a href="/brands" class="text-gray-900 text-lg font-semibold" data-navigo>Brands</a>
        <a href="/cart" class="text-gray-900 text-lg font-semibold" data-navigo>Cart</a>
      </nav>
    </div>
  `;

    return mobileMenu;
}
