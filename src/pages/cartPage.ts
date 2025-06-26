import type { PageStructure } from '../api/types';
import type { Cart, Product } from '../api/cartAPI';
import {
    getCart,
    resetCart,
} from '../api/cartAPI';
import { renderHeader } from '../components/header';
import { renderFooter } from '../components/footer';

export async function renderCartPage(): Promise<PageStructure> {
    const cart = await getCart();

    const main = document.createElement('main');
    main.className = 'px-4 sm:px-8 lg:px-16 py-12 flex flex-col items-center';

    const section = document.createElement('section');
    section.className = 'w-full max-w-6xl flex flex-col lg:flex-row gap-8';

    const title = document.createElement('h1');
    title.textContent = 'Your cart';
    title.className = 'text-3xl font-bold mb-6 w-full';
    main.appendChild(title);

    if (!cart || cart.products.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = 'Your cart is empty.';
        emptyMsg.className = 'text-lg text-gray-600';
        main.appendChild(emptyMsg);
        return { header: renderHeader(), main, footer: renderFooter() };
    }

    const itemsWrapper = document.createElement('div');
    itemsWrapper.className = 'flex-1 bg-white p-6 rounded-xl shadow-sm border divide-y';

    cart.products.forEach(product => {
        const item = renderCartItem(product);
        itemsWrapper.appendChild(item);
    });

    const summary = renderOrderSummary(cart);
    section.appendChild(itemsWrapper);
    section.appendChild(summary);
    main.appendChild(section);


    return {
        header: renderHeader(),
        main,
        footer: renderFooter(),
    };
}

function renderCartItem(product: Product): HTMLElement {
    const item = document.createElement('div');
    item.className = 'flex items-center justify-between gap-4 py-4';

    const left = document.createElement('div');
    left.className = 'flex items-center gap-4';

    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;
    img.className = 'w-20 h-20 object-cover rounded-lg';

    const info = document.createElement('div');
    info.className = 'flex flex-col';

    const title = document.createElement('h3');
    title.textContent = product.title;
    title.className = 'font-semibold';

    const price = document.createElement('p');
    price.className = 'font-bold';
    price.innerHTML = `$${product.discountedTotal.toFixed(0)} <span class="text-sm text-red-500 bg-red-100 px-2 py-0.5 rounded-full ml-2">-${product.discountPercentage.toFixed(0)}%</span>`;

    info.appendChild(title);
    info.appendChild(price);

    left.appendChild(img);
    left.appendChild(info);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'text-sm text-red-500 hover:underline';
    removeBtn.onclick = () => handleRemoveProduct(product.id);

    item.appendChild(left);
    item.appendChild(removeBtn);

    return item;
}

function renderOrderSummary(cart: Cart): HTMLElement {
    const summary = document.createElement('aside');
    summary.className = 'w-full lg:w-[300px] p-6 bg-white rounded-xl shadow-sm border';

    const heading = document.createElement('h2');
    heading.textContent = 'Order Summary';
    heading.className = 'text-lg font-semibold mb-6';

    const subtotal = document.createElement('div');
    subtotal.className = 'flex justify-between mb-2';
    subtotal.innerHTML = `<span>Subtotal</span><span class="font-medium">$${cart.total.toFixed(0)}</span>`;

    const discount = document.createElement('div');
    discount.className = 'flex justify-between mb-2';
    discount.innerHTML = `<span>Discount (-20%)</span><span class="text-red-500">-$${(cart.total - cart.discountedTotal).toFixed(0)}</span>`;

    const total = document.createElement('div');
    total.className = 'flex justify-between text-lg font-bold border-t pt-4 mt-4';
    total.innerHTML = `<span>Total</span><span>$${cart.discountedTotal.toFixed(0)}</span>`;

    const checkoutBtn = document.createElement('button');
    checkoutBtn.className = 'mt-6 w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition';
    checkoutBtn.innerHTML = 'Go to Checkout &rarr;';
    checkoutBtn.onclick = () => {
        window.location.href = `/checkout/${cart.id}`;
    };

    summary.appendChild(heading);
    summary.appendChild(subtotal);
    summary.appendChild(discount);
    summary.appendChild(total);
    summary.appendChild(checkoutBtn);

    return summary;
}

function handleRemoveProduct(productId: number) {
    const cartRaw = localStorage.getItem('cart');
    if (!cartRaw) return;

    const cart: Cart = JSON.parse(cartRaw);
    const newProducts = cart.products.filter(p => p.id !== productId);

    if (newProducts.length === 0) {
        resetCart();
        window.location.href = '/';
        return;
    }

    const updatedCart: Cart = {
        ...cart,
        products: newProducts,
        total: newProducts.reduce((sum, p) => sum + p.total, 0),
        discountedTotal: newProducts.reduce((sum, p) => sum + p.discountedTotal, 0),
        totalProducts: newProducts.length,
        totalQuantity: newProducts.reduce((sum, p) => sum + p.quantity, 0),
    };

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.reload();
}
