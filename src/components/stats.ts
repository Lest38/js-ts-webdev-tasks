export function renderStats(): HTMLElement {
    const statsSection = document.createElement('section');
    statsSection.className = 'py-12';

    statsSection.innerHTML = `
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div class="p-6">
                    <div class="text-4xl font-bold mb-2 text-gray-900">200+</div>
                    <div class="text-gray-600">International Brands</div>
                </div>
                
                <div class="p-6">
                    <div class="text-4xl font-bold mb-2 text-gray-900">2,000+</div>
                    <div class="text-gray-600">High-Quality Products</div>
                </div>
                
                <div class="p-6">
                    <div class="text-4xl font-bold mb-2 text-gray-900">30,000+</div>
                    <div class="text-gray-600">Happy Customers</div>
                </div>
            </div>
        </div>
    `;

    return statsSection;
}