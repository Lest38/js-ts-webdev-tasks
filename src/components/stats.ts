export function renderStats(): HTMLElement {
    const statsSection = document.createElement('section');
    statsSection.className = 'py-10';

    statsSection.innerHTML = `
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6 text-center max-w-md mx-auto md:max-w-none">
                <div class="p-4">
                    <div class="text-xl md:text-4xl font-bold mb-1 text-gray-900">200+</div>
                    <div class="text-gray-600 text-sm md:text-base">International Brands</div>
                </div>
                
                <div class="p-4">
                    <div class="text-xl md:text-4xl font-bold mb-1 text-gray-900">2,000+</div>
                    <div class="text-gray-600 text-sm md:text-base">High-Quality Products</div>
                </div>
                
                <div class="p-4 col-span-2 md:col-span-1 mx-auto">
                    <div class="text-xl md:text-4xl font-bold mb-1 text-gray-900">30,000+</div>
                    <div class="text-gray-600 text-sm md:text-base">Happy Customers</div>
                </div>
            </div>
        </div>
    `;
    return statsSection;
}
