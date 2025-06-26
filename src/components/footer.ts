export function renderFooter(): HTMLElement {
    const footer = document.createElement('footer');
    footer.className = 'bg-[#F0F0F0] text-black py-12';

    footer.innerHTML = `
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-[108px]">
                <div>
                    <h3 class="text-2xl font-bold mb-4">SHOP.CO</h3>
                    <p class="text-gray-400">
                        We have clothes that suit your style and which you're proud to wear. From women to men.
                    </p>
                </div>

                ${[
        { title: 'COMPANY', items: ['About', 'Features', 'Works', 'Career'] },
        { title: 'HELP', items: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
        { title: 'FAQ', items: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
        { title: 'Resources', items: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'] }
    ].map(section => `
                    <div>
                        <h4 class="font-bold mb-4">${section.title}</h4>
                        <ul class="space-y-2 text-gray-400">
                            ${section.items.map(item => `
                                <li><a href="#" class="hover:text-[#4c4c4c]">${item}</a></li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>

            <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <div class="text-gray-400 mb-4 md:mb-0">
                    Shop.co © 2000–2023, All Rights Reserved
                </div>
                <div class="flex space-x-4">
                    ${['VISA', 'PayPal', 'G Pay'].map(payment => `
                        <span class="text-gray-400">${payment}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    return footer;
}
