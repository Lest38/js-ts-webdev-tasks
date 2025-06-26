import type { Category, PageStructure } from '../api/types';
import { renderHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { renderStats } from '../components/stats';
import { renderNewsletter } from '../components/newsletter';
import { renderCategoryCard } from '../components/categoryCard';
import { getCategories } from '../api/productsAPI';

export async function renderHomePage(): Promise<PageStructure> {
    const categories = await getCategories();

    const main = document.createElement('main');
    main.className = 'flex-grow';


    const desktopHero = document.createElement('section');
    desktopHero.className = 'relative py-20 bg-cover bg-no-repeat bg-right hidden md:block';
    desktopHero.style.backgroundImage = "url('/images/homepage-background.png')";
    desktopHero.innerHTML = `
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 items-center">
          <div class="max-w-xl pr-4 md:pr-12">
            <h1 class="font-poppins font-bold text-[28px] md:text-[64px] leading-tight mb-4 md:mb-6">
              FIND <u>ANYTHING</u> THAT MATCHES YOUR STYLE
            </h1>
            <p class="font-rubik text-[14px] md:text-[16px] font-normal text-gray-600 mb-6 md:mb-8">
              Browse through our diverse range of meticulously crafted garments, 
              designed to bring out your individuality and cater to your sense of style.
            </p>
            <button class="bg-black text-white px-6 py-3 md:px-8 md:py-3 rounded-md hover:bg-gray-800 transition mb-10">
              Shop Now
            </button>
            ${renderStats().outerHTML}
          </div>
        </div>
      </div>
    `;


    const mobileHero = document.createElement('section');
    mobileHero.className = 'pt-10 pb-6 px-4 block md:hidden';
    mobileHero.innerHTML = `
      <div>
        <h1 class="font-poppins font-bold text-[28px] leading-tight mb-4">
          FIND <u>ANYTHING</u> THAT MATCHES YOUR STYLE
        </h1>
        <p class="font-rubik text-[14px] font-normal text-gray-600 mb-6">
          Browse through our diverse range of meticulously crafted garments, 
          designed to bring out your individuality and cater to your sense of style.
        </p>
        <button class="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition mb-10">
          Shop Now
        </button>
        ${renderStats().outerHTML}
        <div class="mt-6 overflow-hidden">
          <img 
            src="/images/homepage-background.png" 
            alt="Hero"
            class="w-full h-auto object-cover object-right"
            style="aspect-ratio: 1 / 1;"
          />
        </div>
      </div>
    `;

    main.appendChild(desktopHero);
    main.appendChild(mobileHero);

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
                    <img src="/images/${name}.svg" alt="${name}" class="h-[28px] sm:h-[32px] object-contain">
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
            <h2 class="text-[28px] sm:text-[64px] font-rubik font-bold mb-8 sm:mb-12 text-center">Categories</h2>
            <div class="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-[10px]" id="categories-container"></div>
        </div>
    `;

    const container = section.querySelector('#categories-container')!;
    categories.forEach(category => {
        const card = renderCategoryCard(category);

        card.className = 'bg-[#F0EEED] w-full sm:w-[295px] h-[120px] sm:h-[298px] rounded-[20px] flex items-center justify-center text-center cursor-pointer hover:opacity-90 transition-opacity';

        const nameEl = card.querySelector('h3, .category-name');
        if (nameEl) {
            nameEl.className = 'font-rubik font-bold text-[22px] sm:text-[64px] text-left';
        }

        container.appendChild(card);
    });

    return section;
}


