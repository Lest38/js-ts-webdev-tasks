import type {Product, Category} from "./types";

const API_URL = 'https://dummyjson.com';


export async function getProducts(params: { limit?: number } = {}): Promise<Product[]> {
    const url = new URL(`${API_URL}/products`);

    if (params.limit) {
        url.searchParams.append('limit', params.limit.toString());
    }

    const response = await fetch(url.toString());
    const data = await response.json();
    return data.products;
}

export async function getCategories(): Promise<Category[]> {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categoryNames = await response.json() as string[];

        return categoryNames.map((name, index) => {
            console.log(name);
            return {
                id: index.toString(),
                image: '',
                name: name['name'],
                slug: name['slug']
            };
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    const data = await response.json();
    return data.products;
}

export async function getProductById(id: string | number): Promise<Product> {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch product with id ${id}`);
    }
    const data = await response.json();
    return data;
}