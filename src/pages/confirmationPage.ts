import type { PageStructure } from '../api/types';
import { renderHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { resetCart } from '../api/cartAPI';
import { renderNewsletter } from '../components/newsletter.ts';

export function renderConfirmationPage(): PageStructure {
    const main = document.createElement('main');
    main.className = 'flex flex-col items-center py-20 px-4 gap-8';

    const breadcrumbs = document.createElement('nav');
    breadcrumbs.className = 'w-full max-w-[620px] text-sm text-gray-500';
    breadcrumbs.innerHTML = `<span class="text-gray-400">Home</span> <span class="mx-2">></span> <span class="text-black">Order Confirmation</span>`;

    const title = document.createElement('h1');
    title.textContent = 'Order Confirmation';
    title.className = 'text-[28px] sm:text-[32px] font-semibold text-center';

    const container = document.createElement('div');
    container.className = 'max-w-[620px] w-full bg-white border border-gray-200 rounded-[20px] px-8 sm:px-12 py-12 text-center';

    const subtitle = document.createElement('p');
    subtitle.textContent = 'Success! Your order has been confirmed. Please check out your email address to track delivery progress';
    subtitle.className = 'text-gray-600 text-base sm:text-lg leading-relaxed';

    container.appendChild(subtitle);

    main.appendChild(breadcrumbs);
    main.appendChild(title);
    main.appendChild(container);
    main.appendChild(renderNewsletter());

    resetCart();
    setTimeout(() => {
        window.location.href = '/';
    }, 5000);

    return {
        header: renderHeader(),
        main,
        footer: renderFooter(),
    };
}
