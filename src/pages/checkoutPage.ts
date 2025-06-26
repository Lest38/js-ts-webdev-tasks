import type { PageStructure } from '../api/types';
import { renderHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { createInputField } from '../components/createInputField';
import { validators } from '../utils/validators';
import { renderNewsletter } from '../components/newsletter';

export function renderCheckoutPage(): PageStructure {
    const main = document.createElement('main');
    main.className = 'px-4 sm:px-8 lg:px-16 pt-12 flex flex-col items-center gap-12';

    const container = document.createElement('div');
    container.className = 'w-full max-w-[1240px] flex flex-col lg:flex-row justify-between gap-8';

    const formWrapper = document.createElement('div');
    formWrapper.className = 'flex-1 w-full';

    const title = document.createElement('h1');
    title.textContent = 'Checkout';
    title.className = 'text-3xl font-bold mb-6';
    formWrapper.appendChild(title);

    const formContainer = document.createElement('div');
    formContainer.className = 'border border-[#0000001A] rounded-[20px] p-6 sm:p-8 flex flex-col gap-6 bg-white';

    const form = document.createElement('form');
    form.className = 'flex flex-col gap-4';

    const fields = [
        { id: 'firstName', placeholder: 'First name', value: 'John' },
        { id: 'lastName', placeholder: 'Last name', value: 'Doe' },
        { id: 'maidenName', placeholder: 'Maiden name', value: 'Smith' },
        { id: 'email', placeholder: 'Email', value: 'john.doe@example.com' },
        { id: 'phone', placeholder: 'Phone', value: '+1234567890' },
        { id: 'address', placeholder: 'Address', value: '123 Main Street' },
        { id: 'city', placeholder: 'City', value: 'New York' },
        { id: 'postalCode', placeholder: 'Postal code', value: '10001' }
    ];

    const inputs: Record<string, HTMLInputElement> = {};
    const errors: Record<string, HTMLSpanElement> = {};

    fields.forEach(({ id, placeholder, value }, index) => {
        const { wrapper, input, error } = createInputField({ id, placeholder });

        input.value = value;
        input.classList.add('rounded-[62px]', 'px-4', 'py-3', 'bg-[#F0F0F0]', 'w-full', 'text-sm', 'sm:text-base', 'placeholder:text-gray-500');

        inputs[id] = input;
        errors[id] = error;
        form.appendChild(wrapper);

        if ((index + 1) % 3 === 0 && index !== fields.length - 1) {
            const divider = document.createElement('div');
            divider.className = 'h-[1px] w-full bg-[#0000001A]';
            form.appendChild(divider);
        }
    });

    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'flex justify-end pt-4';

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Go to Payment →';
    submitBtn.className = 'bg-black text-white px-6 py-4 rounded-full font-medium hover:bg-gray-800 transition w-full sm:w-auto';

    buttonWrapper.appendChild(submitBtn);
    form.appendChild(buttonWrapper);

    form.onsubmit = (e) => {
        e.preventDefault();

        let isValid = true;
        Object.entries(inputs).forEach(([key, input]) => {
            const value = input.value.trim();
            const validate = validators[key as keyof typeof validators];
            const errorSpan = errors[key];
            const valid = validate(value);

            if (!valid) {
                input.classList.remove('border-gray-300');
                input.classList.add('border-red-400');
                errorSpan.classList.remove('hidden');
                isValid = false;
            } else {
                input.classList.remove('border-red-400');
                input.classList.add('border-gray-300');
                errorSpan.classList.add('hidden');
            }
        });

        if (isValid) {
            window.location.href = '/confirmation';
        }
    };

    formContainer.appendChild(form);
    formWrapper.appendChild(formContainer);

    const summarySection = document.createElement('div');
    summarySection.className = 'w-full lg:max-w-sm bg-white border rounded-xl p-6 h-fit';

    const summaryTitle = document.createElement('h2');
    summaryTitle.className = 'text-lg font-semibold mb-4';
    summaryTitle.textContent = 'Order Summary';

    const summaryContent = document.createElement('div');
    summaryContent.className = 'flex flex-col gap-2 text-sm mb-6';


    const cart = JSON.parse(localStorage.getItem('cart') || '{"products": []}');
    let subtotalAmount = 0;
    let discountAmount = 0;

    if (cart.products?.length) {
        cart.products.forEach((product: any) => {
            const productTotal = product.price * product.quantity;
            const productDiscount = productTotal * (product.discountPercentage / 100);

            subtotalAmount += productTotal;
            discountAmount += productDiscount;
        });
    }

    const totalAmount = subtotalAmount - discountAmount;


    summaryContent.innerHTML = `
    <div class="flex justify-between">
        <span>Subtotal</span>
        <span class="font-semibold">$${subtotalAmount.toFixed(2)}</span>
    </div>
    <div class="flex justify-between">
        <span>Discount</span>
        <span class="text-red-500 font-semibold">-$${discountAmount.toFixed(2)}</span>
    </div>
    <div class="flex justify-between mt-2 border-t pt-2">
        <span class="font-semibold">Total</span>
        <span class="font-semibold">$${totalAmount.toFixed(2)}</span>
    </div>
`;


    const paymentBtn = document.createElement('button');
    paymentBtn.className = 'w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2';
    paymentBtn.innerHTML = 'Go to Payment →';
    paymentBtn.onclick = () => form.requestSubmit();

    summarySection.appendChild(summaryTitle);
    summarySection.appendChild(summaryContent);
    summarySection.appendChild(paymentBtn);

    container.appendChild(formWrapper);
    container.appendChild(summarySection);

    main.appendChild(container);
    main.appendChild(renderNewsletter());

    return {
        header: renderHeader(),
        main,
        footer: renderFooter(),
    };
}
