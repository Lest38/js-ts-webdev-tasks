export type Product = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
};

export type Cart = {
    id: number;
    products: Product[];
    total: number;
    discountedTotal: number;
    totalProducts: number;
    totalQuantity: number;
};

let cart: Cart | null = null;

export function saveCartToStorage() {
    if (cart) localStorage.setItem('cart', JSON.stringify(cart));
}

export function loadCartFromStorage(): Cart | null {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : null;
}

export async function getCart(): Promise<Cart | null> {
    if (cart) return cart;

    const saved = loadCartFromStorage();
    if (saved) {
        cart = saved;
        return cart;
    }

    const res = await fetch('https://dummyjson.com/carts');
    const data = await res.json();
    const randomCart = data.carts[Math.floor(Math.random() * data.carts.length)];

    cart = randomCart;
    saveCartToStorage();

    return cart;
}

export async function addToCart(productId: number, quantity: number = 1): Promise<Cart> {
    if (!cart) await getCart();

    const existing = cart!.products.find(p => p.id === productId);

    if (existing) {
        existing.quantity += quantity;
        existing.total = +(existing.price * existing.quantity).toFixed(2);
        existing.discountedTotal = +(existing.total * (1 - existing.discountPercentage / 100)).toFixed(2);
    } else {
        // Здесь можно сделать fetch на `https://dummyjson.com/products/${productId}`, чтобы взять цену и скидку
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await res.json();

        const newProduct: Product = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity,
            total: +(product.price * quantity).toFixed(2),
            discountPercentage: product.discountPercentage,
            discountedTotal: +((product.price * quantity) * (1 - product.discountPercentage / 100)).toFixed(2),
            thumbnail: product.thumbnail,
        };

        cart!.products.push(newProduct);
    }

    // Обновить totals
    cart!.total = cart!.products.reduce((sum, p) => sum + p.total, 0);
    cart!.discountedTotal = cart!.products.reduce((sum, p) => sum + p.discountedTotal, 0);
    cart!.totalProducts = cart!.products.length;
    cart!.totalQuantity = cart!.products.reduce((sum, p) => sum + p.quantity, 0);

    saveCartToStorage();
    console.log(cart);
    return cart!;
}

export function resetCart() {
    cart = null;
    localStorage.removeItem('cart');
}
