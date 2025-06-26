import type { Product } from '../api/types';

export function renderFilterSidebar(products: Product[], activeSort: 'asc' | 'desc'): string {
    const brands = Array.from(
        new Set(products.map(p => p.brand).filter((b): b is string => typeof b === 'string' && b.trim() !== ''))
    ).sort();

    const brandList = brands.map(brand => `
        <li>
            <button data-brand="${brand}" class="text-[14px] brand-filter text-gray-500">
                ${brand}
            </button>
        </li>
    `).join('');

    return `
        <div class="bg-white border border-[#E0E0E0] rounded-[20px] p-[20px] w-[295px] sticky top-4" id="filter-sidebar">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-[20px] font-[Rubik] flex items-center gap-2">
                    Filters
                    <svg id="filter-close" width="24" height="24" viewBox="0 0 24 24" class="md:hidden cursor-pointer">
                        <path d="M6 18L18 6M6 6l12 12" stroke="black" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </h3>
            </div>

            <hr class="border border-[#0000001A] w-full mb-6" />
            ${brands.length > 0 ? `
            <div class="mb-6">
                <h4 class="font-bold text-[20px] font-[Rubik] mb-4">Sort</h4>
                <ul class="space-y-3">
                    <li>
                        <button id="sort-asc"
                            class="${activeSort === 'asc' ? 'font-bold text-black' : 'text-gray-500'} text-[14px]">
                            Ascending
                        </button>
                    </li>
                    <li>
                        <button id="sort-desc"
                            class="${activeSort === 'desc' ? 'font-bold text-black' : 'text-gray-500'} text-[14px]">
                            Descending
                        </button>
                    </li>
                </ul>
            </div>
            `: ''}

            <hr class="border border-[#0000001A] w-full mb-6" />

            <div class="mb-6">
                <h4 class="font-bold text-[20px] font-[Rubik] mb-4">Brands</h4>
                <ul class="space-y-2">
                    ${brandList}
                </ul>
            </div>

            <div class="space-y-4">
                <button id="apply-filter"
                    class="bg-black text-white text-[14px] font-[Rubik] font-medium py-4 px-14 rounded-full w-full">
                    Apply Filter
                </button>
                <button id="reset-filter"
                    class="bg-[#F2F0F1] text-black text-[14px] font-[Rubik] font-medium py-4 px-14 rounded-full w-full">
                    Reset Filter
                </button>
            </div>
        </div>
    `;
}
