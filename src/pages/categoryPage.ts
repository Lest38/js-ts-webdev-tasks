import { getProductsByCategory } from '../api/productsAPI';
import { renderHeader } from '../components/header';
import { renderProductCard } from '../components/productCard';
import { renderFilterSidebar } from '../components/filter';
import { renderFooter } from '../components/footer';
import type { PageStructure } from "../api/types.ts";

export async function renderCategoryPage(categoryName: string): Promise<PageStructure> {
    const products = await getProductsByCategory(categoryName);


    const main = document.createElement('main');
    main.className = 'flex-grow py-8';

    const sortAndRender = (sortType: 'asc' | 'desc') => {

        let sorted = [...products];
        if (sortType === 'asc') {
            sorted.sort((a, b) => a.price - b.price);
        } else {
            sorted.sort((a, b) => b.price - a.price);
        }

        const productGrid = main.querySelector('#product-grid');
        if (productGrid) {
            productGrid.innerHTML = sorted.map(renderProductCard).join('');
        }

        const ascBtn = main.querySelector('#sort-asc') as HTMLButtonElement;
        const descBtn = main.querySelector('#sort-desc') as HTMLButtonElement;
        if (ascBtn && descBtn) {
            ascBtn.classList.toggle('font-bold', sortType === 'asc');
            ascBtn.classList.toggle('text-gray-500', sortType !== 'asc');

            descBtn.classList.toggle('font-bold', sortType === 'desc');
            descBtn.classList.toggle('text-gray-500', sortType !== 'desc');
        }
    };

    main.innerHTML = `
        <div class="container mx-auto px-4">
            <div class="flex items-center text-sm text-gray-500 mb-4">
                <a href="/" class="hover:text-black" data-navigo>Home</a>
                <span class="mx-2">></span>
                <span class="text-black capitalize">${categoryName.replace('-', ' ')}</span>
            </div>

            <div class="flex justify-between items-center md:hidden mb-4">
                <h2 class="text-xl font-bold capitalize">${categoryName.replace('-', ' ')}</h2>
                <button id="filter-toggle" class="p-2 border rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <div class="flex flex-col md:flex-row">
                <aside class="hidden md:block shrink-0 w-[295px] mr-8" id="filter-sidebar-wrapper">
    ${renderFilterSidebar(products, 'asc')}
</aside>


                <div class="flex-1">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="product-grid">
                        ${products.map(renderProductCard).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const ascBtn = main.querySelector('#sort-asc') as HTMLButtonElement;
        const descBtn = main.querySelector('#sort-desc') as HTMLButtonElement;
        ascBtn?.addEventListener('click', () => sortAndRender('asc'));
        descBtn?.addEventListener('click', () => sortAndRender('desc'));

        const filterToggleBtn = main.querySelector('#filter-toggle') as HTMLButtonElement;
        const sidebar = main.querySelector('#filter-sidebar') as HTMLElement;
        if (filterToggleBtn && sidebar) {
            filterToggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('hidden');
            });
        }
        const sidebarWrapper = main.querySelector('#filter-sidebar-wrapper') as HTMLElement;
        const closeBtn = main.querySelector('#filter-close') as HTMLElement;

        if (filterToggleBtn && sidebarWrapper) {
            filterToggleBtn.addEventListener('click', () => {
                sidebarWrapper.classList.toggle('hidden');
            });
        }

        if (closeBtn && sidebarWrapper) {
            closeBtn.addEventListener('click', () => {
                sidebarWrapper.classList.add('hidden');
            });
        }

    });

    let selectedBrand: string | null = null;

    const applyFilter = () => {
        const min = parseFloat((main.querySelector('#price-min') as HTMLInputElement)?.value || '10');
        const max = parseFloat((main.querySelector('#price-max') as HTMLInputElement)?.value || '2000');

        let filtered = [...products];

        if (selectedBrand) {
            filtered = filtered.filter(p => p.brand === selectedBrand);
        }

        filtered = filtered.filter(p => p.price >= min && p.price <= max);
        const productGrid = main.querySelector('#product-grid');
        if (productGrid) productGrid.innerHTML = filtered.map(renderProductCard).join('');
    };

    const resetFilter = async () => {
        const refreshed = await getProductsByCategory(categoryName);
        selectedBrand = null;

        const productGrid = main.querySelector('#product-grid');
        if (productGrid) productGrid.innerHTML = refreshed.map(renderProductCard).join('');

        const brandButtons = main.querySelectorAll('.brand-filter');
        brandButtons.forEach(btn => btn.classList.remove('font-bold', 'text-black'));
        (main.querySelector('#price-min') as HTMLInputElement).value = '10';
        (main.querySelector('#price-max') as HTMLInputElement).value = '2000';
    };

    main.querySelectorAll('.brand-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const brand = (e.target as HTMLElement).dataset.brand!;
            selectedBrand = selectedBrand === brand ? null : brand;

            main.querySelectorAll('.brand-filter').forEach(el => {
                el.classList.remove('font-bold', 'text-black');
                el.classList.add('text-gray-500');
            });

            if (selectedBrand) {
                (e.target as HTMLElement).classList.add('font-bold', 'text-black');
                (e.target as HTMLElement).classList.remove('text-gray-500');
            }
        });
    });

    main.querySelector('button.bg-black')?.addEventListener('click', () => {
        applyFilter();
        if (window.innerWidth < 768) {
            main.querySelector('#filter-sidebar')?.classList.add('hidden');
        }
    });
    main.querySelector('button.bg-#F2F0F1')?.addEventListener('click', () => {
        resetFilter();
        if (window.innerWidth < 768) {
            main.querySelector('#filter-sidebar')?.classList.add('hidden');
        }
    });

    main.querySelector('#close-filter')?.addEventListener('click', () => {
        main.querySelector('#filter-sidebar')?.classList.add('hidden');
    });




    return {
        header: renderHeader(),
        main: main,
        footer: renderFooter()
    };
}
