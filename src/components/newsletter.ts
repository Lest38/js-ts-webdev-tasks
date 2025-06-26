export function renderNewsletter(): HTMLElement {
    const newsletter = document.createElement('section');
    newsletter.className = 'py-16';

    newsletter.innerHTML = `
        <div class="container mx-auto px-4 flex justify-center">
            <div class="w-full max-w-[1240px] bg-black rounded-[20px] px-6 md:px-[64px] py-[36px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <h2 class="text-xl md:text-2xl font-bold text-white md:max-w-[50%]">
                    STAY UPTO DATE ABOUT OUR LATEST OFFERS
                </h2>
                <div class="flex flex-col gap-[12px] w-full md:w-auto">
                    <div class="relative w-full md:w-[349px] h-[48px]">
                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 4.125H3C2.70163 4.125 2.41548 4.24353 2.2045 4.4545C1.99353 4.66548 1.875 4.95163 1.875 5.25V18C1.875 18.4973 2.07254 18.9742 2.42417 19.3258C2.77581 19.6775 3.25272 19.875 3.75 19.875H20.25C20.7473 19.875 21.2242 19.6775 21.5758 19.3258C21.9275 18.9742 22.125 18.4973 22.125 18V5.25C22.125 4.95163 22.0065 4.66548 21.7955 4.4545C21.5845 4.24353 21.2984 4.125 21 4.125ZM12 11.9738L5.89219 6.375H18.1078L12 11.9738ZM8.69906 12L4.125 16.1925V7.8075L8.69906 12ZM10.3641 13.5262L11.2397 14.3297C11.4472 14.52 11.7185 14.6255 12 14.6255C12.2815 14.6255 12.5528 14.52 12.7603 14.3297L13.6359 13.5262L18.1078 17.625H5.89219L10.3641 13.5262ZM15.3009 12L19.875 7.8075V16.1925L15.3009 12Z"
                                    fill="black" fill-opacity="0.4"/>
                            </svg>
                        </span>
                        <input type="email" placeholder="Enter your email address"
                            class="w-full h-full pl-[44px] pr-[16px] py-[12px] rounded-[62px] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-white"/>
                    </div>
                    <button class="w-full md:w-[349px] h-[48px] rounded-[62px] px-[16px] py-[12px] bg-white text-black font-medium hover:bg-gray-800 hover:text-white transition">
                        Subscribe to Newsletter
                    </button>
                </div>
            </div>
        </div>
    `;

    return newsletter;
}
