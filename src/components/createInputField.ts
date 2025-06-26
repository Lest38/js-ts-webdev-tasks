export function createInputField({
                                     id,
                                     placeholder,
                                 }: {
    id: string;
    placeholder: string;
}): {
    wrapper: HTMLDivElement;
    input: HTMLInputElement;
    error: HTMLSpanElement;
} {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-col gap-1 w-full';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.placeholder = placeholder;
    input.className = 'rounded-[62px] px-4 py-3 bg-[#F0F0F0] w-full text-sm sm:text-base placeholder:text-gray-500';

    const error = document.createElement('span');
    error.className = 'text-red-500 text-xs hidden';
    error.textContent = 'Please enter a valid value';

    wrapper.appendChild(input);
    wrapper.appendChild(error);

    return { wrapper, input, error };
}
