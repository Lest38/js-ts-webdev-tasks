import type { Category, PageStructure } from '../api/types';
import { renderHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { renderStats } from '../components/stats';
import { renderNewsletter } from '../components/newsletter';
import { renderCategoryCard } from '../components/categoryCard';
import { getCategories } from '../api/productsAPI';
import {initMobileMenu} from "../components/initMobileMenu.ts";

export async function renderHomePage(): Promise<PageStructure> {
    const categories = await getCategories();

    const main = document.createElement('main');
    main.className = 'flex-grow';

    const hero = document.createElement('section');
    hero.className = 'py-20 bg-cover bg-no-repeat bg-right';
    hero.style.backgroundImage = "url('/images/homepage-background.png')";
    hero.innerHTML = `
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 items-center">
        <!-- Левая часть -->
        <div class="max-w-xl pr-4 md:pr-12">
          <h1 class="font-poppins font-bold text-[32px] md:text-[64px] leading-tight mb-6">
            FIND <u>ANYTHING</u> THAT MATCHES YOUR STYLE
          </h1>
          <p class="font-rubik text-[16px] font-normal text-gray-600 mb-8">
            Browse through our diverse range of meticulously crafted garments, 
            designed to bring out your individuality and cater to your sense of style.
          </p>
          <button class="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition mb-12">
            Shop Now
          </button>

          ${renderStats().outerHTML}
        </div>

        <!-- Правая часть -->
        <div class="hidden md:block h-[400px] bg-cover bg-right bg-no-repeat rounded-lg">
          <!-- Просто фон -->
        </div>
      </div>
    </div>
  `;
    main.appendChild(hero);
    initMobileMenu('burger-btn')
    main.appendChild(renderBrandsSection());
    main.appendChild(renderCategoriesSection(categories));
    main.appendChild(renderNewsletter());

    return {
        header: renderHeader(),
        main,
        footer: renderFooter()
    };
}

function renderBrandsSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'bg-black flex justify-center';

    section.innerHTML = `
        <div class="w-full max-w-[1440px] px-4 py-[45px] flex flex-wrap justify-center gap-x-[90px] gap-y-6">
            ${['versace', 'zna', 'gucci', 'prada', 'calvin-klein']
        .map(name => `
                    <img src="/images/${name}.svg" alt="${name}" class="h-[32px] object-contain">
                `)
        .join('')}
        </div>
    `;
    return section;
}



function renderCategoriesSection(categories: Category[]): HTMLElement {
    const section = document.createElement('section');
    section.className = 'py-16 bg-gray-50';

    section.innerHTML = `
        <div class="container mx-auto px-4">
            <h2 class="text-[64px] font-rubik font-bold mb-12 text-center">Categories</h2>
            <div class="flex flex-wrap justify-center gap-[10px]" id="categories-container"></div>
        </div>
    `;

    const container = section.querySelector('#categories-container')!;
    categories.forEach(category => {
        const card = renderCategoryCard(category);


        card.className = 'bg-[#F0EEED] w-[295px] h-[298px] rounded-[20px] flex items-center justify-center text-center';
        const nameEl = card.querySelector('h3, .category-name');
        if (nameEl) {
            nameEl.className = 'font-rubik font-bold text-[64px] text-left';
        }

        container.appendChild(card);
    });

    return section;
}

