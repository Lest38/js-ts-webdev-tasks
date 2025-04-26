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
    { title: "Slub Jersey T-Shirt", price: "$12.99", img: "assets/images/Product image.png" },
    { title: "Printed T-Shirt", price: "$12.99", img: "assets/images/Product image1.png" },
    { title: "Cotton T-Shirt", price: "$12.99", img: "assets/images/Product image2.png" },
    { title: "T-shirt with a Motif", price: "$12.99", img: "assets/images/Product image3.png" },
    { title: "Cotton T-Shirt Regular Fit", price: "$12.99", img: "assets/images/Product image4.png" },
    { title: "Slub Jersey T-Shirt", price: "$12.99", img: "assets/images/Product image5.png" },
];

const app = document.querySelector(".app");

function renderPage() {
    const navItems = NAVIGATION_LIST_ITEMS.map((item, index) => {
        const active = item === "T-shirts & Vests" ? "active" : "";
        return `<li class="${active}" data-index="${index}">${item}</li>`;
    }).join("");

    const productCards = PRODUCTS.map(product => `
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
        <ul class="nav-list">${navItems}</ul>
      </nav>
      <main class="product-area">
        <div class="product-header">
          <span>${PRODUCTS.length} items</span>
          <span class="sort">Sort by <strong>Recommended</strong></span>
        </div>
        <div class="product-list">${productCards}</div>
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
