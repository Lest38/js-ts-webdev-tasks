const NAVIGATION_LIST_ITEMS = [
    "Jackets & Coats",
    "Hoodies",
    "T-shirts & Vests",
    "Shirts",
    "Blazers & Suits",
    "Jeans",
    "Trousers",
    "Shorts",
    "Underwear",
    "Gift Sets"
];

const PRODUCTS = [
    { title: "SLUB JERSEY T-SHIRT", price: "$ 12.99", img: "assets/images/Product image.png" },
    { title: "PRINTED T-SHIRT", price: "$ 12.99", img: "assets/images/Product image1.png" },
    { title: "COTTON T-SHIRT", price: "$ 12.99", img: "assets/images/Product image2.png" },
    { title: "T-SHIRT WITH A MOTIF", price: "$ 12.99", img: "assets/images/Product image3.png" },
    { title: "COTTON T-SHIRT REGULAR FIT", price: "$ 12.99", img: "assets/images/Product image4.png" },
    { title: "SLUB JERSEY T-SHIRT", price: "$ 12.99", img: "assets/images/Product image5.png" },
];

document.addEventListener("DOMContentLoaded", function () {
    const app = document.querySelector(".app");

    function renderPage() {
        const navItemsHTML = NAVIGATION_LIST_ITEMS.map((item, index) => {
            const activeClass = item === "T-shirts & Vests" ? "active" : "";
            return `<li class="${activeClass}" data-index="${index}">${item}</li>`;
        }).join("");

        const productCardsHTML = PRODUCTS.map(product => `
      <div class="product-card">
        <img src="${product.img}" alt="${product.title}">
        <h4>${product.title}</h4>
        <p class="price">${product.price}</p>
        <button>Add to bag</button>
      </div>
    `).join("");
        app.innerHTML = `
      <div class="layout">
        <nav class="sidebar">
          <ul class="nav-list">${navItemsHTML}</ul>
        </nav>
        <main class="product-area">
          <div class="product-header">
            <span>${PRODUCTS.length} items</span>
            <button class="sort">Sort by <strong>Recommended</strong> <img src="assets/images/fa-chevron-down.svg" alt="Arrow"/></button>
          </div>
          <div class="product-list">${productCardsHTML}</div>
        </main>
      </div>
    `;
    }

    function setupNavigationClickEvents() {
        const navItems = document.querySelectorAll(".nav-list li");
        navItems.forEach(item => {
            item.addEventListener("click", () => {
                navItems.forEach(li => li.classList.remove("active"));
                item.classList.add("active");
            });
        });
    }

    renderPage();
    setupNavigationClickEvents();
});