import { getProductById } from '../api/productsAPI';
import { renderHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { renderNewsletter } from '../components/newsletter';
import {addToCart, getCart} from '../api/cartAPI';
import type { PageStructure } from '../api/types';

export async function renderProductPage(productId: string): Promise<PageStructure> {
    const product = await getProductById(productId);
    const images = [product.thumbnail, ...product.images.slice(0, 3)];

    const main = document.createElement('main');
    main.className = 'flex-grow pt-8';

    main.innerHTML = `
        <div class="container mx-auto px-4">
            <nav class="text-sm text-gray-500 mb-4">
                <a href="/" class="hover:underline">Home</a> &gt; 
                <a href="/category/${product.category}" class="hover:underline">${product.category}</a> &gt; 
                <span>${product.title}</span>
            </nav>
            <div class="flex flex-col md:flex-row gap-8">
                <!-- Left Image Gallery -->
                <div class="w-full md:w-1/2 flex flex-col md:flex-row gap-4">
                    <div class="flex md:flex-col gap-2 order-2 md:order-1">
                        ${images.map((src, i) => `
                            <img src="${src}" data-index="${i}"
                                 class="thumbnail w-20 h-20 object-cover rounded-lg cursor-pointer border ${i === 0 ? 'ring-2 ring-black' : ''}">
                        `).join('')}
                    </div>
                    <div class="w-full aspect-square order-1 md:order-2 rounded-lg bg-[#F0EEED] flex justify-center items-center">
                        <img id="main-image" src="${images[0]}" alt="${product.title}" class="object-cover max-h-full rounded-lg">
                    </div>
                </div>

                <div class="w-full md:w-1/2 space-y-4">
                    <h1 class="text-3xl font-bold">${product.title}</h1>
                    <div class="flex items-center gap-2">
                        <div class="text-yellow-400 text-lg">★★★★★</div>
                        <div class="text-sm text-gray-600">${product.rating.toFixed(1)}/5</div>
                    </div>

                    <div class="flex items-center gap-4">
                        <p class="text-2xl font-bold text-black">$${product.price}</p>
                        <p class="line-through text-gray-400 text-lg">$${(product.price * 1.15).toFixed(0)}</p>
                        <span class="text-red-500 text-sm">-15%</span>
                    </div>

                    <p class="text-gray-600">${product.description}</p>
                    ${product.brand? `<p><strong>Brand:</strong> ${product.brand}</p>`: ``}
                    <p><strong>In Stock:</strong> ${product.stock} items</p>

                    <div class="flex items-center gap-4">
                        <button id="decrease" class="bg-gray-200 px-3 py-1 rounded text-lg">−</button>
                        <span id="quantity" class="min-w-[24px] text-center text-lg">1</span>
                        <button id="increase" class="bg-gray-200 px-3 py-1 rounded text-lg">+</button>
                    </div>

                    <button id="add-to-cart" class="bg-black text-white w-full py-3 rounded-full hover:bg-gray-800 transition text-lg font-semibold">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;

    main.appendChild(renderNewsletter());
    const mainImage = main.querySelector<HTMLImageElement>('#main-image')!;
    const thumbnails = main.querySelectorAll<HTMLImageElement>('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;
            thumbnails.forEach(t => t.classList.remove('ring-2', 'ring-black'));
            thumb.classList.add('ring-2', 'ring-black');
        });
    });

    let quantity = 1;
    const quantitySpan = main.querySelector('#quantity')!;
    main.querySelector('#increase')?.addEventListener('click', () => {
        quantity++;
        quantitySpan.textContent = String(quantity);
    });
    main.querySelector('#decrease')?.addEventListener('click', () => {
        if (quantity > 1) quantity--;
        quantitySpan.textContent = String(quantity);
    });

    main.querySelector('#add-to-cart')?.addEventListener('click', async () => {
        const cart = await getCart();

        if (cart) {
            await addToCart( product.id, quantity );
        } else {
            await getCart();
        }

        alert('Added to cart successfully!');
    });

    return {
        header: renderHeader(),
        main,
        footer: renderFooter()
    };
}


