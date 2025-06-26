import type { Category } from '../api/types';

export function renderCategoryCard(category: Category): HTMLElement {
    const card = document.createElement('div');
    card.className = `
        w-[295px] h-[298px] 
        bg-[#F0EEED] rounded-[20px] 
        flex items-center justify-center 
        text-center px-4
    `;

    const nameEl = document.createElement('h3');
    nameEl.className = `
        font-rubik font-bold text-[64px] 
        leading-tight
        break-words 
        overflow-wrap-break 
        word-break-break-all
    `;
    nameEl.style.overflowWrap = 'break-word';
    nameEl.style.wordBreak = 'break-word';
    nameEl.textContent = category.name;

    card.appendChild(nameEl);
    card.addEventListener('click', () => {
        const slug = typeof category.slug === 'string'
            ? category.slug
            : category.name.toLowerCase().replace(/\s+/g, '-');
        window.location.href = `/category/${slug}`;
    });
    return card;
}
