import { renderHomePage } from './src/pages/homePage.ts';
import { renderCategoryPage } from './src/pages/categoryPage.ts';
import type { PageStructure } from './src/api/types.ts';
import {getCategories} from "./src/api/productsAPI.ts";
import { renderProductPage } from './src/pages/productPage.ts';
import { renderCartPage } from './src/pages/cartPage.ts';


export function initRouter() {
    const app = document.getElementById('app')!;

    async function renderPage(route: string) {
        let page: PageStructure;

        try {
            if (route === '/') {
                const categories = await getCategories();
                console.log('Loaded categories:', categories); // Для отладки
                page = await renderHomePage();
            }
            else if (route.startsWith('/category/')) {
                const categoryName = route.split('/category/')[1];
                page = await renderCategoryPage(categoryName);
            }
            else if (route.startsWith('/product/')) {
                const productId = route.split('/product/')[1];
                page = await renderProductPage(productId);
            }
            else if (route === '/cart') {
                page = await renderCartPage();
            }
            else {
                app.innerHTML = '<h1 class="text-center py-20 text-4xl">Page Not Found</h1>';
                return;
            }

            app.innerHTML = '';
            if (page.header) app.appendChild(page.header);
            app.appendChild(page.main);
            if (page.footer) app.appendChild(page.footer);

            // Обработка навигации
            document.querySelectorAll('[data-navigo]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = e.currentTarget as HTMLAnchorElement;
                    history.pushState(null, '', target.href);
                    renderPage(new URL(target.href).pathname);
                });
            });

        } catch (error) {
            console.error('Routing error:', error);
            app.innerHTML = '<h1 class="text-center py-20 text-4xl">Error loading page</h1>';
        }
    }

    renderPage(window.location.pathname);

    window.addEventListener('popstate', () => {
        renderPage(window.location.pathname);
    });
}