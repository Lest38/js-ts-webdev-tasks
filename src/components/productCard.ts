import type { Product } from '../api/types';

export function renderProductCard(product: Product): string {
    const hasDiscount = product.discountPercentage > 0;

    const currentPrice = hasDiscount
        ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
        : product.price.toFixed(2);

    const originalPrice = hasDiscount
        ? `<span class="text-[14px] text-[#00000066] line-through ml-2">$${product.price.toFixed(2)}</span>`
        : '';

    const discountBadge = hasDiscount
        ? `<span class="bg-[#FF33331A] text-[#FF3333] text-xs font-bold px-2 py-1 rounded-full">
                -${Math.round(product.discountPercentage)}%
           </span>`
        : '';

    const ratingStars = Array(5).fill(0).map((_, i) =>
        i < Math.round(product.rating)
            ? '<span class="text-yellow-400 text-sm leading-none">★</span>'
            : '<span class="text-gray-300 text-sm leading-none">★</span>'
    ).join('');

    return `
        <a href="/product/${product.id}" class="block rounded-lg overflow-hidden">
            <div class="relative bg-[#F0EEED] pt-[100%] mb-4 sm:mb-6">
                <img src="${product.thumbnail}" alt="${product.title}" 
                     class="absolute top-0 left-0 w-full h-full object-contain p-4 sm:p-6">
            </div>

            <div class="px-2 sm:px-4">
                <h3 class="font-[Rubik] font-bold text-[20px] leading-snug truncate mb-1 sm:mb-2">
                    ${product.title}
                </h3>

                ${product.brand
        ? `<p class="text-gray-500 text-sm mb-2 sm:mb-3">${product.brand}</p>`
        : ''}

                <div class="flex items-center gap-2 mb-2">
                    <div class="flex">${ratingStars}</div>
                    <span class="text-[14px] font-[Rubik] font-normal text-gray-600 leading-none">
                        ${product.rating.toFixed(1)}
                    </span>
                </div>

                <div class="flex flex-wrap items-center gap-2 text-[24px] font-[Rubik] font-bold leading-[100%] text-black">
                    <span class="text-black">$${currentPrice}</span>
                    ${originalPrice}
                    ${discountBadge}
                </div>
            </div>
        </a>
    `;
}
