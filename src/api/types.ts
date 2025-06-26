export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    image?: string;
}

export interface PageStructure {
    header?: HTMLElement;
    main: HTMLElement;
    footer?: HTMLElement;
}